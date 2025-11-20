import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const InvitationCodePage = () => {
  const navigate = useNavigate();
  const [myCode, setMyCode] = useState('');
  const [opponentCode, setOpponentCode] = useState('');

  const hasOpponentCode = opponentCode.length > 0;

  useEffect(() => {
    // Generate a random 6-character code when the component mounts
    const generateRandomCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };
    setMyCode(generateRandomCode());
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myCode);
    alert('Your code has been copied!');
    navigate('/signup/waiting', { state: { myCode } });
  };

  const handleConnectClick = () => {
    if (hasOpponentCode) {
      console.log("Connecting with opponent's code:", opponentCode);
      navigate('/onboarding');
    } else {
      // Logic for when there's no opponent code (maybe show an error)
      console.log("No opponent code entered.");
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

      <ConnectButton onClick={handleConnectClick}>
        {hasOpponentCode ? 'Complete' : 'Connect'}
      </ConnectButton>
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
  color: #9E9FAD;
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
  border: 1px solid #EAEAEA;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FAFAFA;
`;

const CopyButton = styled.button`
  padding: 8px 12px;
  background-color: #FFC90F;
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
  border: 1px solid #EAEAEA;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;

  &:focus {
    outline: none;
    border-color: #FFC90F;
  }
`;

const ConnectButton = styled.button`
  width: 100%;
  max-width: 350px;
  padding: 18px;
  background-color: #FFC90F;
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
