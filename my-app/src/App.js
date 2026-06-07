import { useState, useEffect, useMemo } from 'react';
import './App.css';
import Welcome from './Welcome';

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [darkMode, setDarkMode] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const pebbleStyles = useMemo(() => {
    const pebbleColors = [
      '#f0c7a1',
      '#d8b4a6',
      '#b5d6a8',
      '#8fc8ff',
      '#f3b0c3',
      '#ffe2b3',
      '#d9e6c3',
      '#dab1ff',
      '#ffc4d8',
      '#ffb2a8',
      '#b8f1d3',
      '#fbcf8f',
      '#c9d4ff',
      '#ead3d2',
      '#ffdb9c',
      '#a7c9c5',
      '#d9b4ff',
      '#f7c8b6',
      '#c6f0f7',
      '#d7e6a1',
    ];
    const count = 62;
    return Array.from({ length: count }, (_, index) => {
      const size = Math.floor(Math.random() * 20) + 10;
      const left = Math.random() * 94 + 1;
      const bottom = Math.random() * 20 + 2;
      const color = pebbleColors[index % pebbleColors.length];
      const rotate = Math.floor(Math.random() * 360);
      const delay = `${Math.random() * 4}s`;
      return {
        key: `pebble-${index}`,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          bottom: `${bottom}%`,
          background: color,
          transform: `rotate(${rotate}deg)`,
          animationDelay: delay,
        },
      };
    });
  }, []);
  
  // Login form state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginFocus, setLoginFocus] = useState({ email: false, password: false });
  
  // Signup form state
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [signupFocus, setSignupFocus] = useState({ name: false, email: false, password: false, confirm: false });
  
  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotFocus, setForgotFocus] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const showNotification = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (!email || !password) {
      showNotification('Please enter both email and password', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    showNotification('✓ Login successful! Welcome back.');
    setAuthenticated(true);
    setUserEmail(email);
    setLoginData({ email: '', password: '' });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = signupData;

    if (!name || !email || !password || !confirm) {
      showNotification('Please complete all fields', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    if (password.length < 8) {
      showNotification('Password must be at least 8 characters', 'error');
      return;
    }

    if (password !== confirm) {
      showNotification('Passwords do not match', 'error');
      return;
    }

    showNotification('✓ Account created successfully!');
    setTimeout(() => {
      setSignupData({ name: '', email: '', password: '', confirm: '' });
      setActiveTab('login');
    }, 1500);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      showNotification('Please enter your email address', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    showNotification('✓ Password reset link sent to your email');
    setForgotEmail('');
    setShowForgotPassword(false);
  };

  const handleSocialLogin = (provider) => {
    showNotification(`Connecting with ${provider}...`);
    setTimeout(() => showNotification(`✓ Logged in with ${provider}`), 1000);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      {/* Animated background */}
      <div className="gradient-bg">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>

      {/* Sky clouds */}
      <div className="sky-cloud cloud-1"></div>
      <div className="sky-cloud cloud-2"></div>
      <div className="sky-cloud cloud-3"></div>

      {/* Rain from clouds */}
      <div className="rain-layer" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} className={`raindrop drop-${(index % 8) + 1}`}></span>
        ))}
      </div>

      {/* Sailing boat */}
      <div className="sailing-boat">⛵</div>
      <div className="sailing-boat boat-2">⛴</div>

      {/* Beach pebbles */}
      <div className="pebbles" aria-hidden="true">
        {pebbleStyles.map((pebble) => (
          <div key={pebble.key} className="pebble" style={pebble.style}></div>
        ))}
        <div className="beach-rock rock-1"></div>
        <div className="beach-rock rock-2"></div>
        <div className="beach-rock rock-3"></div>
        <div className="beach-rock rock-4"></div>
        <div className="beach-rock rock-5"></div>
        <div className="beach-crab crab-1">🦀</div>
        <div className="beach-crab crab-2">🦀</div>
        <div className="beach-crab crab-3">🦀</div>
        <div className="beach-crab crab-4">🦀</div>
      </div>

      {/* Layout container */}
      {authenticated ? (
        <Welcome onLogout={() => {
            setAuthenticated(false);
            setUserEmail('');
          }}
          userEmail={userEmail} />
      ) : (
      <div className="layout-wrapper">
        {/* Main card */}
        <div className="auth-container">
        <div className="auth-card">
          {/* Header with dark mode toggle */}
          <div className="card-header">
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="brand-section">
              <div className="brand-icon">✨</div>
              <div>
                <h1 className="brand-name">AuthFlow</h1>
                <p className="brand-tagline">Premium Authentication</p>
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              <span className="tab-icon">🔐</span>
              Login
            </button>
            <button
              className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              <span className="tab-icon">✍️</span>
              Sign Up
            </button>
          </div>

          {/* Notification */}
          {message && (
            <div className={`notification ${messageType}`}>
              {message}
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form className="auth-form login-form" onSubmit={handleLoginSubmit}>
              {/* Email field */}
              <div className="form-group">
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email address"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    onFocus={() => setLoginFocus({ ...loginFocus, email: true })}
                    onBlur={() => setLoginFocus({ ...loginFocus, email: false })}
                  />
                  <label className={`floating-label ${loginFocus.email || loginData.email ? 'active' : ''}`}>
                    Email address
                  </label>
                </div>
              </div>

              {/* Password field */}
              <div className="form-group">
                <div className="input-wrapper">
                  <span className="input-icon">🔑</span>
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    onFocus={() => setLoginFocus({ ...loginFocus, password: true })}
                    onBlur={() => setLoginFocus({ ...loginFocus, password: false })}
                  />
                  <label className={`floating-label ${loginFocus.password || loginData.password ? 'active' : ''}`}>
                    Password
                  </label>
                </div>
              </div>

              {/* Forgot password link */}
              <button
                type="button"
                className="forgot-password-btn"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot password?
              </button>

              {/* Submit button */}
              <button type="submit" className="submit-btn">
                <span className="btn-icon">→</span>
                Sign In
              </button>

              {/* Divider */}
              <div className="divider">
                <span>or continue with</span>
              </div>

              {/* Social buttons */}
              <div className="social-buttons">
                <button 
                  type="button"
                  className="social-btn google"
                  onClick={() => handleSocialLogin('Google')}
                  title="Sign in with Google"
                >
                  <span>🔵</span>
                </button>
                <button 
                  type="button"
                  className="social-btn github"
                  onClick={() => handleSocialLogin('GitHub')}
                  title="Sign in with GitHub"
                >
                  <span>⚫</span>
                </button>
                <button 
                  type="button"
                  className="social-btn apple"
                  onClick={() => handleSocialLogin('Apple')}
                  title="Sign in with Apple"
                >
                  <span>⚪</span>
                </button>
              </div>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <form className="auth-form signup-form" onSubmit={handleSignupSubmit}>
              {/* Name field */}
              <div className="form-group">
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Full name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    onFocus={() => setSignupFocus({ ...signupFocus, name: true })}
                    onBlur={() => setSignupFocus({ ...signupFocus, name: false })}
                  />
                  <label className={`floating-label ${signupFocus.name || signupData.name ? 'active' : ''}`}>
                    Full name
                  </label>
                </div>
              </div>

              {/* Email field */}
              <div className="form-group">
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email address"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    onFocus={() => setSignupFocus({ ...signupFocus, email: true })}
                    onBlur={() => setSignupFocus({ ...signupFocus, email: false })}
                  />
                  <label className={`floating-label ${signupFocus.email || signupData.email ? 'active' : ''}`}>
                    Email address
                  </label>
                </div>
              </div>

              {/* Password field */}
              <div className="form-group">
                <div className="input-wrapper">
                  <span className="input-icon">🔑</span>
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Password (min. 8 characters)"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    onFocus={() => setSignupFocus({ ...signupFocus, password: true })}
                    onBlur={() => setSignupFocus({ ...signupFocus, password: false })}
                  />
                  <label className={`floating-label ${signupFocus.password || signupData.password ? 'active' : ''}`}>
                    Password
                  </label>
                </div>
              </div>

              {/* Confirm password field */}
              <div className="form-group">
                <div className="input-wrapper">
                  <span className="input-icon">✓</span>
                  <input
                    type="password"
                    name="confirm"
                    className="form-input"
                    placeholder="Confirm password"
                    value={signupData.confirm}
                    onChange={handleSignupChange}
                    onFocus={() => setSignupFocus({ ...signupFocus, confirm: true })}
                    onBlur={() => setSignupFocus({ ...signupFocus, confirm: false })}
                  />
                  <label className={`floating-label ${signupFocus.confirm || signupData.confirm ? 'active' : ''}`}>
                    Confirm password
                  </label>
                </div>
              </div>

              {/* Terms checkbox */}
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>I agree to the <a href="#terms">Terms & Conditions</a></span>
              </label>

              {/* Submit button */}
              <button type="submit" className="submit-btn">
                <span className="btn-icon">→</span>
                Create Account
              </button>

              {/* Divider */}
              <div className="divider">
                <span>or sign up with</span>
              </div>

              {/* Social buttons */}
              <div className="social-buttons">
                <button 
                  type="button"
                  className="social-btn google"
                  onClick={() => handleSocialLogin('Google')}
                  title="Sign up with Google"
                >
                  <span>🔵</span>
                </button>
                <button 
                  type="button"
                  className="social-btn github"
                  onClick={() => handleSocialLogin('GitHub')}
                  title="Sign up with GitHub"
                >
                  <span>⚫</span>
                </button>
                <button 
                  type="button"
                  className="social-btn apple"
                  onClick={() => handleSocialLogin('Apple')}
                  title="Sign up with Apple"
                >
                  <span>⚪</span>
                </button>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="card-footer">
            <p className="footer-text">
              {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="switch-tab-btn"
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
              >
                {activeTab === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>

      </div>)}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="modal-overlay" onClick={() => setShowForgotPassword(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowForgotPassword(false)}
            >
              ✕
            </button>
            <h2 className="modal-title">Reset Password</h2>
            <p className="modal-description">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleForgotSubmit}>
              <div className="form-group">
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Email address"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    onFocus={() => setForgotFocus(true)}
                    onBlur={() => setForgotFocus(false)}
                  />
                  <label className={`floating-label ${forgotFocus || forgotEmail ? 'active' : ''}`}>
                    Email address
                  </label>
                </div>
              </div>
              <button type="submit" className="submit-btn">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
