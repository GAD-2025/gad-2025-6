import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PencilIcon } from '../../assets/icons/li_pencil-line.svg';

const StyledButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
  padding: 18px;
  border-radius: 50%;
  background-color: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const FloatingAddButton = (props) => {
  return (
    <StyledButton {...props}>
      <PencilIcon style={{ width: 24, height: 24, fill: 'white' }} />
    </StyledButton>
  );
};

export default FloatingAddButton;
