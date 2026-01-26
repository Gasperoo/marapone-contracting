import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function ManageAccountPage() {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="manage-account-page">
        <p>Please log in to manage your account.</p>
      </div>
    );
  }

  return (
    <div className="manage-account-page">
      <h1>Manage Account</h1>
      {user && <p>Email: {user.email}</p>}
      {/* Account management form will go here */}
    </div>
  );
}
