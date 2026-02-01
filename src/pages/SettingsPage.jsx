import React, { useState, useEffect } from 'react';
import LiquidEther from '../components/LiquidEther';
import { getOptimizedSettings } from '../utils/detectWindows';
import { useAuth } from '../context/AuthContext';
import { accountApi } from '../api/account';
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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (user) {
            setProfileForm({
                username: user.username,
                email: user.email,
            });
        }
    }, [user]);

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
