import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as EyeOpenIcon } from '../../assets/icons/eye-open.svg';
import { ReactComponent as EyeClosedIcon } from '../../assets/icons/eye-closed.svg';

const InputWrapper = styled.div`
  width: 100%;
  height: 56px;
  padding: 18px;
  background: white;
  border-radius: 20px;
  border: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 8px;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 700;
  color: #2c2c2c;
  background: transparent;

  &::placeholder {
    color: #dbdbdb;
    font-weight: 500;
  }
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
`;

const Input = ({ icon: Icon, onIconClick, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';

  if (isPasswordType) {
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <InputWrapper>
        <StyledInput {...props} type={showPassword ? 'text' : 'password'} />
        <IconButton onClick={togglePasswordVisibility}>
          {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </IconButton>
      </InputWrapper>
    );
  }

  if (Icon) {
    return (
      <InputWrapper>
        <StyledInput {...props} type={type} />
        <IconButton onClick={onIconClick}>
          <Icon />
        </IconButton>
      </InputWrapper>
    );
  }

  return (
    <StyledInput
      style={{
        width: '100%',
        padding: '18px',
        border: '1px solid #eaeaea',
        borderRadius: '20px',
        boxSizing: 'border-box',
      }}
      type={type}
      {...props}
    />
  );
};

export default Input;
