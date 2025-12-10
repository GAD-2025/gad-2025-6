import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AlertIcon } from '../../assets/icons/alert.svg';

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 24px;
  font-family: 'Pangolin', cursive;
  font-weight: 400;

  color: ${(props) =>
    ({
      signin: '#D58699',
      quiz: '#FFC90F',
      dday: '#84AF25',
      letter: '#A17E66',
      defalt: '#000000',
    }[props.$variant || 'defalt'])};
`;

const ErrorMessage = styled.div`
  color: #eb003b;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Field = ({ label, error, variant, children, style }) => {
  return (
    <FieldContainer style={style}>
      {label && <Label $variant={variant}>{label}</Label>}
      {children}
      {error && (
        <ErrorMessage>
          <AlertIcon />
          {error}
        </ErrorMessage>
      )}
    </FieldContainer>
  );
};

export default Field;
