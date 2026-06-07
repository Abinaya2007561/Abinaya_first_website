import React from 'react';
import './App.css';

export default function Welcome({ onLogout, userEmail }) {
  return (
    <div className="layout-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          <div className="card-header">
            <div className="brand-section">
              <div className="brand-icon">✨</div>
              <div>
                <h1 className="brand-name">Welcome</h1>
                <p className="brand-tagline">Your dashboard</p>
              </div>
            </div>
            <button
              className="theme-toggle"
              onClick={onLogout}
              title="Logout"
            >
              ⎋
            </button>
          </div>

          <div style={{ padding: 8 }}>
            <h2 style={{ margin: '8px 0' }}>Hello, {userEmail || 'User'}!</h2>
            <p style={{ margin: '6px 0', color: 'var(--color-text-light-muted)' }}>
              This is a simple welcome page. You can extend this into a full dashboard.
            </p>

            <div style={{ marginTop: 16 }}>
              <button className="submit-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
