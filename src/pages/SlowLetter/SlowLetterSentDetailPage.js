import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { ReactComponent as BadeCheckIcon } from '../../assets/icons/badge-check.svg';
import LetterStatus from '../../components/common/LetterStatus';
import { formatDateTime, getRemainingTime } from '../../utils/timezoneHelper';

const SlowLetterSentDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const getPartnerName = () => {
    try {
      const partnerData = localStorage.getItem('partner');
      if (partnerData) {
        const partner = JSON.parse(partnerData);
        return partner.name || 'partner';
      }
    } catch (error) {
      console.error('Error parsing partner data:', error);
    }
    return 'partner';
  };

  const partnerName = getPartnerName();

  const userCountry = user?.country;
  const partnerCountry = (() => {
    try {
      const partnerData = localStorage.getItem('partner');
      if (partnerData) {
        const partner = JSON.parse(partnerData);
        return partner.country || '';
      }
    } catch (error) {
      console.error('Error parsing partner data:', error);
    }
    return '';
  })();

  const letter = location.state?.letter;
  const remaining = getRemainingTime(letter?.target_date, user?.timezone);

  return (
    <PageWrapper>
      <ContentContainer>
        {letter && (
          <>
            <BadeCheckIcon />
            <Title>Letter Sent!</Title>
            <Description>It's on its way to {partnerName}</Description>
            <InfoWrapper>
              <InfoColumn>
                <InfoText>Sent</InfoText>
                <InfoText>Est. Arrival</InfoText>
              </InfoColumn>
              <InfoColumn>
                <InfoText>{formatDateTime(letter.created_at, user?.timezone)}</InfoText>
                <InfoText>{formatDateTime(letter.target_date, user?.timezone)}</InfoText>
              </InfoColumn>
            </InfoWrapper>
            {!remaining.isPast && (
              <RemainTimeText>
                {remaining.days > 0 && (
                  <>
                    <b>{remaining.days}</b> days
                  </>
                )}{' '}
                {remaining.hours > 0 && (
                  <>
                    <b>{remaining.hours}</b> hours
                  </>
                )}{' '}
                {remaining.minutes > 0 && (
                  <>
                    <b>{remaining.minutes}</b> minutes
                  </>
                )}{' '}
                <br />
                Until Arrival
              </RemainTimeText>
            )}
            <LetterStatusWrapper>
              <LetterStatus letter={letter} />
            </LetterStatusWrapper>
          </>
        )}
      </ContentContainer>
      <Button variant="letter" onClick={() => navigate('/')}>
        Go home
      </Button>
    </PageWrapper>
  );
};

export default SlowLetterSentDetailPage;

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
  box-sizing: border-box;
`;

const Title = styled.h1`
  color: var(--gray8, #1e1e1e);
  text-align: center;
  font-family: Gaegu;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  margin-top: 16px;
`;

const Description = styled.h2`
  color: var(--gray8, #1e1e1e);
  text-align: center;
  font-family: Gaegu;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 60px;
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
  font-weight: 400;
  line-height: normal;
  margin: 0;
  text-align: left;
`;

const RemainTimeText = styled.div`
  color: var(--gray8, #1e1e1e);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 24px;

  > b {
    color: #7b344b;
  }
`;

const LetterStatusWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;
