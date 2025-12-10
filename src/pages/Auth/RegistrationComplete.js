import React from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 16px;
`;

const DisplayText = styled.div`
  text-align: center;
  font-family: Pangolin;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Blank = styled.div`
  flex: 1;
`;

const RegistrationComplete = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Blank />
      <DisplayText>Your registration is complete!</DisplayText>
      <Blank />
      <Button variant="signin" onClick={() => navigate('/')}>
        Go to home
      </Button>
    </Wrapper>
  );
};

export default RegistrationComplete;
