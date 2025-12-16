import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Field from '../../components/common/Field';
import { ReactComponent as BackIcon } from '../../assets/icons/arrow-left.svg';

const PasswordSignUpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email } = location.state || {};
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const isButtonEnabled =
    password.length >= 0 && passwordConfirmation.length >= 0 && password === passwordConfirmation;

  const handleSignUpClick = () => {
    if (!isButtonEnabled) return;

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }
    setError('');

    // Navigate to country selection with user data
    navigate('/signup/country', {
      state: {
        name,
        email,
        password,
      },
    });
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        gap: 16,
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '10px 0',
        }}
      >
        <button
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </button>
      </div>

      <div
        style={{
          width: '100%',
          height: '100%',
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
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 40,
          }}
        >
          {/* Main Content */}
          <div
            style={{
              height: '100%',
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              gap: 44,
            }}
          >
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 40,
              }}
            >
              <div
                style={{
                  alignSelf: 'start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    alignSelf: 'start',
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
                    alignSelf: 'stretch',
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
                  gap: 24,
                  height: '100%',
                }}
              >
                <Field label="Password" variant="signin">
                  <Input
                    type="password"
                    placeholder="Set a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>

                <Field
                  label="Password confirmation"
                  variant="signin"
                  error={isButtonEnabled ? '' : 'Passwords do not match'}
                >
                  <Input
                    type="password"
                    placeholder="Write the password again"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </Field>

                <div
                  style={{
                    flex: 1,
                  }}
                />

                <Button disabled={!isButtonEnabled} variant="signin" onClick={handleSignUpClick}>
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSignUpPage;
