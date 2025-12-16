import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signup, login as apiLogin } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Field from '../../components/common/Field';
import { ReactComponent as BackIcon } from '../../assets/icons/arrow-left.svg';
import styled from 'styled-components';

const SelectWrapper = styled.div`
  width: 100%;
  height: 56px;
  padding: 18px;
  background: white;
  border-radius: 20px;
  border: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
`;

const StyledSelect = styled.select`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  color: ${(props) => (props.value ? '#2c2c2c' : '#dbdbdb')};
  font-weight: ${(props) => (props.value ? '700' : '400')};

  &::placeholder {
    color: #dbdbdb;
    font-weight: 400;
  }

  option {
    color: #2c2c2c;
  }

  option:disabled {
    color: #dbdbdb;
  }
`;

const DropdownIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  pointer-events: none;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const CountrySelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { name, email, password } = location.state || {};
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isButtonEnabled = selectedCountry.length > 0 && !loading;

  const handleSignUpClick = async () => {
    if (!isButtonEnabled) return;

    setLoading(true);
    setError('');

    const country = countries.find((c) => c.cca === selectedCountry);
    const countryName = country?.name || '';
    const countryTimezone = country?.timezones?.[0] || '';

    try {
      // Call signup API with country information
      const signupResponse = await signup(name, email, password, countryName, countryTimezone);
      if (!signupResponse.success) {
        setError(signupResponse.message || 'Sign up failed. Please try again.');
        setLoading(false);
        return;
      }

      // Automatically log in the user after successful signup
      const loginResponse = await apiLogin(email, password);
      if (loginResponse.success) {
        login(loginResponse.user); // Update auth context

        if (loginResponse.user.matching_id) {
          navigate('/'); // Navigate to home if already matched
        } else {
          navigate('/signup/invitation'); // Navigate to invitation code step
        }
      } else {
        setError(loginResponse.message || 'Login failed after sign up.');
        setLoading(false);
        // If auto-login fails, redirect to sign-in page so they can log in manually
        navigate('/signin');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Signup error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=cca2,name,timezones')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data
          .map((country) => ({
            cca: country.cca2,
            name: country.name.common,
            timezones: country.timezones,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(formatted);
      });
  }, []);

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
                  Where are you in?
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    color: 'var(--Gray-4, #9E9FAD)',
                    fontSize: 16,
                    fontFamily: 'Pretendard',
                    fontWeight: '700',
                    textAlign: 'left',
                  }}
                >
                  Please select the country where you are in now
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
                <Field label="Country" variant="signin" error={error}>
                  <SelectWrapper>
                    <StyledSelect
                      disabled={countries.length === 0}
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <option value="" disabled>
                        Select your country
                      </option>
                      {countries.map((country) => (
                        <option key={country.cca} value={country.cca}>
                          {country.name}
                        </option>
                      ))}
                    </StyledSelect>
                    <DropdownIcon>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="#2C2C2C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </DropdownIcon>
                  </SelectWrapper>
                </Field>

                <div
                  style={{
                    flex: 1,
                  }}
                />

                <Button disabled={!isButtonEnabled} variant="signin" onClick={handleSignUpClick}>
                  {loading ? 'Signing up...' : 'Sign up'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySelect;
