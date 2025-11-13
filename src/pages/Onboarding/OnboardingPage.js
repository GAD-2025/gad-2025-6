import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const OnboardingPage = () => {
  return (
    <OnboardingWrapper>
      <Title>Onboarding</Title>
      <StyledLink to="/signup">Go to Sign Up</StyledLink>
    </OnboardingWrapper>
  );
};

export default OnboardingPage;

const OnboardingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
