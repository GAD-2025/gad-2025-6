import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const InvitationCodePage = () => {
  const navigate = useNavigate();
  const [opponentCode, setOpponentCode] = useState('');

  const myCode = JSON.parse(localStorage.getItem('user')).user_code || '...';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myCode);
    alert('Your code has been copied!');
    // The user might want to navigate to a waiting screen here, keeping original logic
    // navigate('/signup/waiting', { state: { myCode } });
  };

  const handleConnectClick = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).id;

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
        navigate('/onboarding');
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

  return (
    <PageWrapper>
      <Header>Invitation code</Header>
      <Subtitle>Please connect by entering each other's invitation codes.</Subtitle>

      <CodeContainer>
        <CodeSection>
          <InputLabel>My code</InputLabel>
          <MyCodeDisplay>
            <span>{myCode}</span>
            <CopyButton onClick={handleCopyCode}>Copy</CopyButton>
          </MyCodeDisplay>
        </CodeSection>

        <CodeSection>
          <InputLabel>Opponent's code</InputLabel>
          <StyledInput
            type="text"
            placeholder="Enter opponent's code"
            value={opponentCode}
            onChange={(e) => setOpponentCode(e.target.value)}
          />
        </CodeSection>
      </CodeContainer>

      <ConnectButton onClick={handleConnectClick}>Complete</ConnectButton>
    </PageWrapper>
  );
};

export default InvitationCodePage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  height: 100vh;
  background-color: white;
  position: relative;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #292929;
  margin-bottom: 10px;
  font-family: 'Pretendard', sans-serif;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #9e9fad;
  margin-bottom: 40px;
  font-family: 'Pretendard', sans-serif;
  text-align: center;
`;

const CodeContainer = styled.div`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
`;

const CodeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: #292929;
  font-weight: 600;
  font-family: 'Pretendard', sans-serif;
`;

const MyCodeDisplay = styled.div`
  width: 100%;
  padding: 15px;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
`;

const CopyButton = styled.button`
  padding: 8px 12px;
  background-color: #ffc90f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #e6b800;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;

  &:focus {
    outline: none;
    border-color: #ffc90f;
  }
`;

const ConnectButton = styled.button`
  width: 100%;
  max-width: 350px;
  padding: 18px;
  background-color: #ffc90f;
  color: white;
  border: none;
  border-radius: 28px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  bottom: 40px;
  font-family: 'Pretendard', sans-serif;

  &:hover {
    background-color: #e6b800;
  }
`;
