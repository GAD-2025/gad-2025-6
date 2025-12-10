import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Field from '../../components/common/Field';
import { ReactComponent as BackIcon } from '../../assets/icons/arrow-left.svg';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const isButtonEnabled = name.length > 0 && email.length > 0;

  const handleNextClick = () => {
    if (isButtonEnabled) {
      navigate('/signup/password', { state: { name, email } });
    }
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
                  Sign up
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
                  Welcome to TODAK!
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
                <Field label="Name" variant="signin">
                  <Input
                    type="text"
                    placeholder="Write your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>

                <Field label="E-mail" variant="signin">
                  <Input
                    type="email"
                    placeholder="Write your e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>

                <div
                  style={{
                    flex: 1,
                  }}
                />

                <Button disabled={!isButtonEnabled} variant="signin" onClick={handleNextClick}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
