import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { ReactComponent as GoogleIcon } from '../../assets/icons/google.svg';
import { ReactComponent as KakaoIcon } from '../../assets/icons/kakao.svg';

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
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 40,
          }}
        >
          {/* Main Content */}
          <div
            style={{
              alignSelf: 'stretch',
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
                  <Input
                    type="email"
                    placeholder="Write your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                    type="password"
                    placeholder="Write your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button disabled={!isButtonEnabled} variant="signin" onClick={handleLogin}>
                  Log In
                </Button>
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
          {/* <div
            style={{
              width: '100%',
              alignSelf: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              marginTop: 20,
            }}
          >
            <div
              style={{
                width: '100%',
                justifyContent: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ flex: 1, height: 1, background: 'var(--Gray-4, #9E9FAD)' }} />
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
              <div style={{ flex: 1, height: 1, background: 'var(--Gray-4, #9E9FAD)' }} />
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
              <GoogleIcon />
              <KakaoIcon />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
