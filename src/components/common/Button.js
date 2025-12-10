import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  border-radius: 28px;
  padding: 18px;
  border: none;
  border-radius: 28px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;

  background: ${(props) =>
    ({
      signin: '#FF69B4',
      quiz: '#F8DA72',
      dday: '#B3CF74',
      letter: '#A17E66',
      defalt: '#ffffff',
    }[props.$variant || 'defalt'])};

  &:disabled {
    background: #d5d5d5;
    cursor: not-allowed;
  }
`;

const Button = ({ children, onClick, disabled, variant }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} $variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;
