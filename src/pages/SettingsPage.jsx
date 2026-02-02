import React, { useState, useEffect } from 'react';
import LiquidEther from '../components/LiquidEther';
import { getOptimizedSettings } from '../utils/detectWindows';
import { useAuth } from '../context/AuthContext';
import { accountApi, stripeApi } from '../api/account';
import '../styles/page.css';
import '../styles/account.css';

export default function SettingsPage() {
    const { user, updateUser } = useAuth();
    const isMobile = typeof window !== 'undefined' && (
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth <= 768
    );

    const settings = getOptimizedSettings(isMobile);

    const [profileForm, setProfileForm] = useState({
        username: user?.username || '',
        email: user?.email || '',
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [addressForm, setAddressForm] = useState({
        billing: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: 'United States',
        },
        shipping: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: 'United States',
        },
        sameAsBilling: false,
    });

    const [subscriptions, setSubscriptions] = useState([]);
    const [pastSubscriptions, setPastSubscriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [portalLoading, setPortalLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (user) {
            setProfileForm({
                username: user.username,
                email: user.email,
            });
            loadAddresses();
            loadSubscriptions();
        }
    }, [user]);

    const loadAddresses = async () => {
        try {
            const addresses = await accountApi.getAddresses();
            if (addresses.billing || addresses.shipping) {
                setAddressForm({
                    billing: addresses.billing || addressForm.billing,
                    shipping: addresses.shipping || addressForm.shipping,
                    sameAsBilling: false,
                });
            }
        } catch (err) {
            console.error('Failed to load addresses:', err);
        }
    };

    const loadSubscriptions = async () => {
        try {
            const active = await accountApi.getSubscriptions('active');
            const cancelled = await accountApi.getSubscriptions('cancelled');
            setSubscriptions(active || []);
            setPastSubscriptions(cancelled || []);
        } catch (err) {
            console.error('Failed to load subscriptions:', err);
        }
    };

    const handleProfileChange = (e) => {
        setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
        setError(null);
        setSuccess(null);
    };

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
        setError(null);
        setSuccess(null);
    };

    const handleAddressChange = (type, field, value) => {
        setAddressForm({
            ...addressForm,
            [type]: {
                ...addressForm[type],
                [field]: value,
            },
        });
        setError(null);
        setSuccess(null);
    };

    const handleSameAsBillingChange = (e) => {
        const checked = e.target.checked;
        setAddressForm({
            ...addressForm,
            sameAsBilling: checked,
            shipping: checked ? { ...addressForm.billing } : addressForm.shipping,
        });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const updatedUser = await accountApi.updateProfile({
                username: profileForm.username.trim(),
                email: profileForm.email.trim(),
            });
            updateUser(updatedUser);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setError('New passwords do not match!');
            return;
        }

        if (passwordForm.newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);

        try {
            await accountApi.updatePassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            });
            setSuccess('Password updated successfully!');
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (err) {
            setError(err.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            await accountApi.updateAddresses({
                billing: addressForm.billing,
                shipping: addressForm.sameAsBilling ? addressForm.billing : addressForm.shipping,
            });
            setSuccess('Addresses updated successfully!');
        } catch (err) {
            setError(err.message || 'Failed to update addresses');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelSubscription = async (subscriptionId) => {
        if (!confirm('Are you sure you want to cancel this subscription?')) return;

        try {
            await accountApi.cancelSubscription(subscriptionId);
            setSuccess('Subscription cancelled successfully!');
            loadSubscriptions();
        } catch (err) {
            setError(err.message || 'Failed to cancel subscription');
        }
    };

    const handleManageBilling = async () => {
        setPortalLoading(true);
        setError(null);

        try {
            // Get the first subscription's customer ID
            // In a real app, you'd store this in the user profile
            const firstSub = subscriptions[0];
            if (!firstSub || !firstSub.stripe_customer_id) {
                setError('No billing information found. Please contact support.');
                return;
            }

            const { url } = await stripeApi.createPortalSession(firstSub.stripe_customer_id);
            if (url) {
                window.location.href = url;
            }
        } catch (err) {
            console.error('Portal error:', err);
            setError('Failed to open billing portal. Please try again.');
        } finally {
            setPortalLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="page-container">
            <LiquidEther
                colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                mouseForce={isMobile ? 18 : 24}
                cursorSize={isMobile ? 80 : 100}
                isViscous
                viscous={30}
                iterationsViscous={settings.iterationsViscous}
                iterationsPoisson={settings.iterationsPoisson}
                resolution={settings.resolution}
                isBounce={false}
                autoDemo
                autoSpeed={settings.autoSpeed}
                autoIntensity={2.2}
                takeoverDuration={0.25}
                autoResumeDelay={3000}
                autoRampDuration={0.6}
            />

            <div className="page-content">
                <h1 className="page-title">Account Settings</h1>

                <div className="account-form-wrapper">
                    {/* Success/Error Messages */}
                    {error && (
                        <div className="form-error" role="alert">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="form-success" role="alert">
                            {success}
                        </div>
                    )}

                    {/* Profile Settings */}
                    <form onSubmit={handleProfileSubmit} className="account-form">
                        <h2 className="form-section-title">Profile Information</h2>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={profileForm.username}
                                onChange={handleProfileChange}
                                required
                                placeholder="Your username"
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={profileForm.email}
                                onChange={handleProfileChange}
                                required
                                placeholder="Your email"
                                autoComplete="email"
                            />
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Profile'}
                        </button>
                    </form>

                    {/* Address Forms */}
                    <form onSubmit={handleAddressSubmit} className="account-form" style={{ marginTop: '2rem' }}>
                        <h2 className="form-section-title">Billing Address</h2>

                        <div className="form-group">
                            <label htmlFor="billing-street">Street Address</label>
                            <input
                                type="text"
                                id="billing-street"
                                value={addressForm.billing.street}
                                onChange={(e) => handleAddressChange('billing', 'street', e.target.value)}
                                placeholder="123 Main St"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="billing-city">City</label>
                                <input
                                    type="text"
                                    id="billing-city"
                                    value={addressForm.billing.city}
                                    onChange={(e) => handleAddressChange('billing', 'city', e.target.value)}
                                    placeholder="City"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="billing-state">State</label>
                                <input
                                    type="text"
                                    id="billing-state"
                                    value={addressForm.billing.state}
                                    onChange={(e) => handleAddressChange('billing', 'state', e.target.value)}
                                    placeholder="State"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="billing-zip">ZIP Code</label>
                                <input
                                    type="text"
                                    id="billing-zip"
                                    value={addressForm.billing.zip}
                                    onChange={(e) => handleAddressChange('billing', 'zip', e.target.value)}
                                    placeholder="12345"
                                />
                            </div>
                        </div>

                        <h2 className="form-section-title" style={{ marginTop: '2rem' }}>Shipping Address</h2>

                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={addressForm.sameAsBilling}
                                    onChange={handleSameAsBillingChange}
                                />
                                <span>Same as billing address</span>
                            </label>
                        </div>

                        {!addressForm.sameAsBilling && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="shipping-street">Street Address</label>
                                    <input
                                        type="text"
                                        id="shipping-street"
                                        value={addressForm.shipping.street}
                                        onChange={(e) => handleAddressChange('shipping', 'street', e.target.value)}
                                        placeholder="123 Main St"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="shipping-city">City</label>
                                        <input
                                            type="text"
                                            id="shipping-city"
                                            value={addressForm.shipping.city}
                                            onChange={(e) => handleAddressChange('shipping', 'city', e.target.value)}
                                            placeholder="City"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="shipping-state">State</label>
                                        <input
                                            type="text"
                                            id="shipping-state"
                                            value={addressForm.shipping.state}
                                            onChange={(e) => handleAddressChange('shipping', 'state', e.target.value)}
                                            placeholder="State"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="shipping-zip">ZIP Code</label>
                                        <input
                                            type="text"
                                            id="shipping-zip"
                                            value={addressForm.shipping.zip}
                                            onChange={(e) => handleAddressChange('shipping', 'zip', e.target.value)}
                                            placeholder="12345"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Addresses'}
                        </button>
                    </form>

                    {/* Current Subscriptions */}
                    <div className="subscriptions-section" style={{ marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 className="form-section-title" style={{ margin: 0 }}>Current Subscriptions</h2>
                            {subscriptions.length > 0 && (
                                <button
                                    onClick={handleManageBilling}
                                    disabled={portalLoading}
                                    className="submit-btn"
                                    style={{
                                        padding: '0.5rem 1.5rem',
                                        fontSize: '0.9rem',
                                        background: 'linear-gradient(135deg, #5227FF, #B19EEF)',
                                    }}
                                >
                                    {portalLoading ? 'Loading...' : '💳 Manage Billing'}
                                </button>
                            )}
                        </div>
                        {subscriptions.length === 0 ? (
                            <p className="no-subscriptions">You don't have any active subscriptions yet.</p>
                        ) : (
                            <div className="subscriptions-grid">
                                {subscriptions.map((sub) => (
                                    <div key={sub.id} className="subscription-card">
                                        <div className="subscription-header">
                                            <h3>{sub.packageName}</h3>
                                            <span className="subscription-tier">{sub.tier}</span>
                                        </div>
                                        <div className="subscription-details">
                                            <p><strong>Duration:</strong> {sub.duration}</p>
                                            <p><strong>Price:</strong> ${sub.price}</p>
                                            <p><strong>Started:</strong> {formatDate(sub.startDate)}</p>
                                            <p><strong>Next Billing:</strong> {formatDate(sub.nextBillingDate)}</p>
                                        </div>
                                        <button
                                            className="cancel-btn"
                                            onClick={() => handleCancelSubscription(sub.id)}
                                        >
                                            Cancel Subscription
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Past Subscriptions */}
                    {pastSubscriptions.length > 0 && (
                        <div className="subscriptions-section" style={{ marginTop: '2rem' }}>
                            <h2 className="form-section-title">Past Subscriptions</h2>
                            <div className="subscriptions-grid">
                                {pastSubscriptions.map((sub) => (
                                    <div key={sub.id} className="subscription-card cancelled">
                                        <div className="subscription-header">
                                            <h3>{sub.packageName}</h3>
                                            <span className="subscription-tier cancelled">{sub.tier}</span>
                                        </div>
                                        <div className="subscription-details">
                                            <p><strong>Duration:</strong> {sub.duration}</p>
                                            <p><strong>Price:</strong> ${sub.price}</p>
                                            <p><strong>Started:</strong> {formatDate(sub.startDate)}</p>
                                            <p><strong>Cancelled:</strong> {formatDate(sub.cancelledAt)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Password Change */}
                    <form onSubmit={handlePasswordSubmit} className="account-form" style={{ marginTop: '2rem' }}>
                        <h2 className="form-section-title">Change Password</h2>

                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={passwordForm.currentPassword}
                                onChange={handlePasswordChange}
                                required
                                placeholder="Enter current password"
                                autoComplete="current-password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={passwordForm.newPassword}
                                onChange={handlePasswordChange}
                                required
                                placeholder="Enter new password"
                                minLength={8}
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={passwordForm.confirmPassword}
                                onChange={handlePasswordChange}
                                required
                                placeholder="Confirm new password"
                                minLength={8}
                                autoComplete="new-password"
                            />
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
