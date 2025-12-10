import React from 'react';
import QuizCard from '../../components/common/QuizCard';
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
  line-height: 100%; /* 24px */
`;

const EmptyImg = styled.img``;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

// Helper to split data into two columns
const splitIntoColumns = (data) => {
  const column1 = data.filter((_, index) => index % 2 === 0);
  const column2 = data.filter((_, index) => index % 2 !== 0);
  return [column1, column2];
};

const ReceivedQuizList = ({ quizData, obscureTitles }) => {
  if (!quizData || quizData.length === 0) {
    return (
      <EmptyContainer>
        <EmptyImg src={chick} alt="No quizzes available" />
        <EmptyText>Create a new quiz!</EmptyText>
      </EmptyContainer>
    );
  }

  const [column1, column2] = splitIntoColumns(quizData);

  return (
    <GridContainer>
      {quizData?.map((item, index) => (
        <QuizCard
          key={item.id}
          quiz={item}
          isHighlighted={index % 4 === 0 || index % 4 === 3}
          obscureTitle={obscureTitles}
        />
      ))}
    </GridContainer>
  );
};

export default ReceivedQuizList;
