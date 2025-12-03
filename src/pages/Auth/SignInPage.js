import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    try {
      const result = await apiLogin(email, password);
      if (result.success) {
        login(result.user); // Update context state

        const matchingId = result.user.matching_id;

        if (matchingId) {
          navigate('/'); // Navigate to home page on successful login
        } else {
          console.log(matchingId);
          navigate('/signup/invitation');
        }
      } else {
        alert(`Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const isButtonEnabled = email.length > 0 && password.length > 0;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          width: 390,
          height: 844,
          background: 'white',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 390,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 40,
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
              style={{
                width: 25.83,
                height: 12.14,
                left: 337.56,
                top: 17.48,
                position: 'absolute',
              }}
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

          {/* Main Content */}
          <div
            style={{
              width: 350,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 44,
            }}
          >
            <div
              style={{
                alignSelf: 'stretch',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 40,
              }}
            >
              <div
                style={{
                  alignSelf: 'stretch',
                  textAlign: 'center',
                  color: '#292929',
                  fontSize: 57.74,
                  fontFamily: 'Pangolin',
                  fontWeight: '400',
                  wordWrap: 'break-word',
                }}
              >
                TODAK
              </div>
              <div
                style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                <div
                  style={{
                    alignSelf: 'stretch',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                  }}
                >
                  <input
                    type="email"
                    placeholder="Write your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: 350,
                      height: 56,
                      padding: 18,
                      background: 'white',
                      borderRadius: 20,
                      border: '1px #EAEAEA solid',
                      fontSize: 16,
                      fontFamily: 'Pretendard',
                      fontWeight: '400',
                      boxSizing: 'border-box',
                    }}
                  />
                  <div
                    style={{
                      width: 350,
                      height: 56,
                      background: 'white',
                      borderRadius: 20,
                      border: '1px #EAEAEA solid',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 18px',
                      boxSizing: 'border-box',
                      gap: 8,
                    }}
                  >
                    <input
                      type="password"
                      placeholder="Write your password"
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
                    <div
                      data-property-1="close"
                      style={{ width: 24, height: 24, position: 'relative' }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 10,
                          left: 2,
                          top: 8,
                          position: 'absolute',
                          background: 'var(--Gray-8, #28282E)',
                        }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogin}
                  disabled={!isButtonEnabled}
                  style={{
                    width: 350,
                    paddingTop: 18,
                    paddingBottom: 18,
                    background: isButtonEnabled ? '#FF69B4' : '#D5D5D5',
                    borderRadius: 28,
                    border: 'none',
                    color: 'white',
                    fontSize: 20,
                    fontFamily: 'Pretendard',
                    fontWeight: '700',
                    cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
                  }}
                >
                  Log In
                </button>
              </div>
            </div>
            <div
              onClick={handleSignUpClick}
              style={{
                alignSelf: 'stretch',
                textAlign: 'center',
                color: 'var(--gray8, #1E1E1E)',
                fontSize: 14,
                fontFamily: 'Pretendard',
                fontWeight: '700',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Sign up
            </div>
          </div>

          {/* Social Login */}
          <div
            style={{
              alignSelf: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              marginTop: 20,
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 125, height: 1, background: 'var(--Gray-4, #9E9FAD)' }} />
              <div
                style={{
                  color: 'var(--Gray-4, #9E9FAD)',
                  fontSize: 14,
                  fontFamily: 'Pretendard',
                  fontWeight: '700',
                }}
              >
                Social login
              </div>
              <div style={{ width: 125, height: 1, background: 'var(--Gray-4, #9E9FAD)' }} />
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 43,
                    height: 43,
                    left: 0.5,
                    top: 0.5,
                    position: 'absolute',
                    background: 'white',
                  }}
                />
                <div
                  style={{
                    width: 20,
                    height: 20,
                    left: 12,
                    top: 12,
                    position: 'absolute',
                    background: 'black',
                  }}
                />
                <div
                  style={{
                    width: 9.6,
                    height: 9.4,
                    left: 22,
                    top: 20.18,
                    position: 'absolute',
                    background: '#4285F4',
                  }}
                />
                <div
                  style={{
                    width: 15.55,
                    height: 8.1,
                    left: 13.06,
                    top: 23.9,
                    position: 'absolute',
                    background: '#34A853',
                  }}
                />
                <div
                  style={{
                    width: 4.4,
                    height: 8.98,
                    left: 12,
                    top: 17.51,
                    position: 'absolute',
                    background: '#FBBC04',
                  }}
                />
                <div
                  style={{
                    width: 15.63,
                    height: 8.1,
                    left: 13.06,
                    top: 12,
                    position: 'absolute',
                    background: '#E94235',
                  }}
                />
                <div
                  style={{
                    width: 43,
                    height: 43,
                    left: 0.5,
                    top: 0.5,
                    position: 'absolute',
                    border: '0.5px var(--Gray-1, #F3F4F6) solid',
                  }}
                />
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  position: 'relative',
                  background: '#FEE500',
                  borderRadius: 50,
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    left: 12,
                    top: 12,
                    position: 'absolute',
                    background: 'var(--kakao-logo, black)',
                  }}
                />
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default SignInPage;
