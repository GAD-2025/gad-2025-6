import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signup, login as apiLogin } from '../../api/auth'; // Import signup and login APIs
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook from AuthContext
import EyeOpenIcon from '../../assets/icons/eye-open.svg';
import EyeClosedIcon from '../../assets/icons/eye-closed.svg';

const PasswordSignUpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Get login function from AuthContext
  const { name, email } = location.state || {};
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const isButtonEnabled = password.length > 0 && passwordConfirmation.length > 0;

  const handleSignUpClick = async () => {
    if (!isButtonEnabled) return;

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }
    setError('');

    try {
      const signupResponse = await signup(name, email, password);
      if (!signupResponse.success) {
        setError(signupResponse.message || 'Sign up failed. Please try again.');
        return;
      }

      // Automatically log in the user after successful signup
      const loginResponse = await apiLogin(email, password);
      if (loginResponse.success) {
        login(loginResponse.user); // Update auth context

        if (loginResponse.user.matching_id) {
          navigate('/'); // Navigate to onboarding if matched
        } else {
          navigate('/signup/invitation'); // Navigate to invitation code step
        }
      } else {
        setError(loginResponse.message || 'Login failed after sign up.');
        // If auto-login fails, redirect to sign-in page so they can log in manually
        navigate('/signin');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Signup error:', err);
    }
  };

  const handleBackClick = () => {
    navigate('/signup');
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: 'white',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Top Bar & Header */}
      <div
        style={{
          alignSelf: 'stretch',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Status Bar */}
        <div
          data-back="False"
          data-call-in="False"
          data-notch="True"
          data-theme="Dark"
          data-wifi="True"
          style={{ alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden' }}
        >
          <div
            style={{
              width: 17.48,
              height: 12.62,
              left: 314.26,
              top: 17.48,
              position: 'absolute',
              background: 'var(--Light-Ink, black)',
            }}
          />
          <div
            style={{ width: 25.83, height: 12.14, left: 337.57, top: 17.48, position: 'absolute' }}
          >
            <div
              style={{
                width: 19.61,
                height: 8.4,
                left: 1.87,
                top: 1.87,
                position: 'absolute',
                background: 'var(--Light-Ink, black)',
              }}
            />
          </div>
          <div
            style={{
              left: 36.87,
              top: 15.54,
              position: 'absolute',
              textAlign: 'center',
              color: 'var(--Light-Ink, black)',
              fontSize: 17.48,
              fontFamily: 'SF Pro Display',
              fontWeight: '600',
              lineHeight: '17.48px',
              wordWrap: 'break-word',
            }}
          >
            19:02
          </div>
        </div>
        {/* Back button */}
        <div
          data-property-1="TopBar.x"
          style={{ alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden' }}
        >
          <div
            data-property-1="icon_arrow_left"
            style={{
              width: 24,
              height: 24,
              left: 20,
              top: 10.5,
              position: 'absolute',
              cursor: 'pointer',
            }}
            onClick={handleBackClick}
          >
            <div
              style={{
                width: 20,
                height: 13,
                left: 2,
                top: 5.5,
                position: 'absolute',
                background: 'var(--Grayscale-900, #1A1B1E)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          width: 350,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 48,
          paddingBottom: 100,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          <div
            style={{
              alignSelf: 'stretch',
              color: 'var(--Black, black)',
              fontSize: 24,
              fontFamily: 'Pretendard',
              fontWeight: '700',
            }}
          >
            Password
          </div>
          <div
            style={{
              color: 'var(--Gray-4, #9E9FAD)',
              fontSize: 16,
              fontFamily: 'Pretendard',
              fontWeight: '700',
            }}
          >
            Please set a password.
          </div>
        </div>
        <div
          style={{
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 24,
          }}
        >
          <div
            style={{
              width: 350,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 8,
            }}
          >
            <div
              style={{
                alignSelf: 'stretch',
                color: '#D58699',
                fontSize: 24,
                fontFamily: 'Pangolin',
                fontWeight: '400',
                paddingLeft: 18,
              }}
            >
              Password
            </div>
            <div
              data-property-1="input.default.eyes"
              style={{
                alignSelf: 'stretch',
                height: 56,
                padding: 18,
                background: 'white',
                borderRadius: 20,
                border: '1px #EAEAEA solid',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
                gap: 8,
              }}
            >
              <input
                type={passwordShown ? 'text' : 'password'}
                placeholder="Set a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  flex: '1 1 0',
                  border: 'none',
                  outline: 'none',
                  fontSize: 16,
                  fontFamily: 'Pretendard',
                  fontWeight: '400',
                }}
              />
              <img
                src={passwordShown ? EyeOpenIcon : EyeClosedIcon}
                alt="Toggle password visibility"
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          <div
            style={{
              width: 350,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 8,
            }}
          >
            <div
              style={{
                alignSelf: 'stretch',
                color: '#D58699',
                fontSize: 24,
                fontFamily: 'Pangolin',
                fontWeight: '400',
                paddingLeft: 18,
              }}
            >
              Password confirmation
            </div>
            <div
              data-property-1="input.default.eyes"
              style={{
                alignSelf: 'stretch',
                height: 56,
                padding: 18,
                background: 'white',
                borderRadius: 20,
                border: '1px #EAEAEA solid',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
                gap: 8,
              }}
            >
              <input
                type={confirmPasswordShown ? 'text' : 'password'}
                placeholder="Write the password again"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                style={{
                  flex: '1 1 0',
                  border: 'none',
                  outline: 'none',
                  fontSize: 16,
                  fontFamily: 'Pretendard',
                  fontWeight: '400',
                }}
              />
              <img
                src={confirmPasswordShown ? EyeOpenIcon : EyeClosedIcon}
                alt="Toggle password visibility"
                onClick={toggleConfirmPasswordVisibility}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          {error && (
            <div
              style={{
                color: 'red',
                fontSize: 14,
                fontFamily: 'Pretendard',
                marginTop: -10,
                marginBottom: 10,
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Sign up Button */}
      <div
        style={{
          width: '100%',
          paddingBottom: 60,
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={handleSignUpClick}
          disabled={!isButtonEnabled}
          style={{
            width: 350,
            paddingTop: 18,
            paddingBottom: 18,
            background: isButtonEnabled ? '#FF69B4' : '#D5D5D5',
            borderRadius: 28,
            border: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: 20,
            fontFamily: 'Pretendard',
            fontWeight: '700',
            cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
          }}
        >
          Sign up
        </button>
      </div>

      {/* Home Indicator */}
      <div style={{ width: 390, height: 36, position: 'relative' }}>
        <div
          style={{
            width: 134,
            height: 5,
            left: 128,
            top: 23,
            position: 'absolute',
            background: 'black',
            borderRadius: 100,
          }}
        />
      </div>
    </div>
  );
};

export default PasswordSignUpPage;
