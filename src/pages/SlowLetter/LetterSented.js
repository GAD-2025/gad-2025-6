import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { ReactComponent as LetterCheck } from '../../assets/icons/letter-check.svg';
import LetterStatus from '../../components/common/LetterStatus';
import { formatDateTime } from '../../utils/timezoneHelper';

const LetterSented = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const letter = location.state?.letter;

  return (
    <PageWrapper>
      <ContentContainer>
        {letter && (
          <>
            <LetterCheck />
            <Title>Letter Sent!</Title>
            <InfoWrapper>
              <InfoColumn>
                <InfoText>Sent</InfoText>
                <InfoText>Est. Arrival</InfoText>
              </InfoColumn>
              <InfoColumn>
                <InfoText>{formatDateTime(letter.created_at)}</InfoText>
                <InfoText>{formatDateTime(letter.target_date)}</InfoText>
              </InfoColumn>
            </InfoWrapper>
            <LetterStatus letter={letter} />
          </>
        )}
      </ContentContainer>
      <Button variant="letter" onClick={() => navigate('/')}>
        Go home
      </Button>
    </PageWrapper>
  );
};

export default LetterSented;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  color: var(--gray8, #1e1e1e);
  text-align: center;
  font-family: Pangolin;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
  margin-bottom: 16px;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 80px;
  margin-bottom: 40px;
  padding: 0 12px;
  box-sizing: border-box;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InfoText = styled.p`
  color: var(--gray8, #1e1e1e);
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  text-align: left;
`;
