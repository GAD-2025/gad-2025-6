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
  // Filter letters that have reached their target_date with partner's timezone offset
  const filteredLetters = useMemo(() => {
    if (!letterData) return [];

    return letterData.filter((letter) => {
      // Use partner's timezone for received letters to determine if they can be read
      return hasReachedTargetDate(letter.target_date, true);
    });
  }, [letterData]);

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
