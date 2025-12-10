import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import Field from '../../components/common/Field';
import Input from '../../components/common/Input';

function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Setting</PageTitle>
      </TopBarWrapper>

      <ContentContainer>
        <Field label="Name" variant="signin">
          <Input type="text" value={user?.name || ''} readOnly placeholder="Name" />
        </Field>

        <Field label="E-mail" variant="signin">
          <Input type="email" value={user?.email || ''} readOnly placeholder="Email" />
        </Field>

        <Field label="My Invitation Code" variant="signin">
          <Input type="text" value={user?.user_code || ''} readOnly placeholder="Invitation Code" />
        </Field>
      </ContentContainer>
    </PageWrapper>
  );
}

export default SettingsPage;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TopBarWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageTitle = styled.div`
  text-align: center;
  color: black;
  font-size: 24px;
  font-family: 'Pangolin', cursive;
  font-weight: 400;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
