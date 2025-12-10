import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 18px;
  border: 1px solid #eaeaea;
  outline: none;
  font-size: 16px;
  font-weight: 700;
  color: #2c2c2c;
  background: transparent;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
  border-radius: 20px;
  resize: none;

  &::placeholder {
    color: #dbdbdb;
    font-weight: 500;
  }
`;

const Textarea = (props) => {
  return <StyledTextarea {...props} />;
};

export default Textarea;
