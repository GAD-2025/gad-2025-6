import { useMemo } from 'react';
import LetterCard from '../../components/common/LetterCard';
import styled from 'styled-components';
import chick from '../../assets/images/chick.png';
import { hasReachedTargetDate } from '../../utils/timezoneHelper';

const EmptyContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const EmptyText = styled.div`
  color: #d5d5d5;
  text-align: center;
  font-family: Pangolin;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const EmptyImg = styled.img``;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const ReceivedLetterList = ({ letterData }) => {
  const getPartnerTimezone = () => {
    try {
      const partnerData = localStorage.getItem('partner');
      if (partnerData) {
        const partner = JSON.parse(partnerData);
        return partner.timezone;
      }
    } catch (error) {
      console.error('Error parsing partner data:', error);
    }
    return null;
  };

  const partnerTimezone = getPartnerTimezone();

  // Filter letters that have reached their target_date based on partner's timezone
  const filteredLetters = useMemo(() => {
    if (!letterData) return [];

    return letterData.filter((letter) => {
      // Only show letters where target_date has been reached in partner's timezone
      return hasReachedTargetDate(letter.target_date, partnerTimezone);
    });
  }, [letterData, partnerTimezone]);

  if (!filteredLetters || filteredLetters.length === 0) {
    return (
      <EmptyContainer>
        <EmptyImg src={chick} alt="No letters received" />
        <EmptyText>No letters yet!</EmptyText>
      </EmptyContainer>
    );
  }

  return (
    <GridContainer>
      {filteredLetters.map((item, index) => (
        <LetterCard
          key={item.id}
          letter={item}
          isHighlighted={index % 4 === 0 || index % 4 === 3}
        />
      ))}
    </GridContainer>
  );
};

export default ReceivedLetterList;
