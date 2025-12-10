import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Field from '../../components/common/Field';
import { ReactComponent as BackIcon } from '../../assets/icons/arrow-left.svg';
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg';
import Modal from '../../components/common/Modal';

const InvitationCodePage = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth(); // Get refreshUser function from AuthContext
  const [opponentCode, setOpponentCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const myCode = storedUser.user_code || '...';

  const isButtonEnabled = opponentCode.length > 0;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myCode);
    setIsModalOpen(true);
  };

  const handleConnectClick = async () => {
    if (!isButtonEnabled) return;

    const userId = storedUser.id;

    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/api/matching`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          partnerCode: opponentCode,
        }),
      });

      if (result.ok) {
        await refreshUser(userId);
        navigate('/registration');
      } else {
        const errorData = await result.json();
        alert(`Connection failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during matching:', error);
      alert('An error occurred while trying to connect. Please try again.');
      return;
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = storedUser.id;
      const result = await refreshUser(userId);
      if (result.matching_id) {
        navigate('/registration');
      }
    };

    const pollingInterval = setInterval(fetchUserData, 10000);

    return () => clearInterval(pollingInterval);
  }, []);

  return (
    <>
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
            // onClick={() => navigate(-1)}
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
                    Invitation code
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
                    Please connect by entering each other's invitation codes.
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
                  <Field label="My code" variant="signin">
                    <Input
                      type="text"
                      value={myCode}
                      readOnly
                      icon={CopyIcon}
                      onIconClick={handleCopyCode}
                    />
                  </Field>

                  <Field label="Opponent's code" variant="signin">
                    <Input
                      type="text"
                      placeholder="Enter opponent's code"
                      value={opponentCode}
                      onChange={(e) => setOpponentCode(e.target.value)}
                    />
                  </Field>

                  <div
                    style={{
                      flex: 1,
                    }}
                  />

                  <Button disabled={!isButtonEnabled} variant="signin" onClick={handleConnectClick}>
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            alignItems: 'center',
            width: 300,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: '#28282E',
            }}
          >
            Copy Completed
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#9E9FAD',
            }}
          >
            My code has been copied.
            <br />
            Send it to your partner!
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InvitationCodePage;
