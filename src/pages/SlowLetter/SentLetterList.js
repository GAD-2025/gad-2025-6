import React from 'react';
import LetterCard from '../../components/common/LetterCard';
import styled from 'styled-components';
import chick from '../../assets/images/chick.png';

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

const SentLetterList = ({ letterData }) => {
  if (!letterData || letterData.length === 0) {
    return (
      <EmptyContainer>
        <EmptyImg src={chick} alt="No letters sent" />
        <EmptyText>Write a new letter!</EmptyText>
      </EmptyContainer>
    );
  }

  return (
    <GridContainer>
      {letterData?.map((item, index) => (
        <LetterCard
          key={item.id}
          type="sent"
          letter={item}
          isHighlighted={index % 4 === 0 || index % 4 === 3}
        />
      ))}
    </GridContainer>
  );
};

export default SentLetterList;
