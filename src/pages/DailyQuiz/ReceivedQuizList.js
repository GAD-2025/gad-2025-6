import React from 'react';
import QuizCard from '../../components/common/QuizCard';

// Helper to split data into two columns
const splitIntoColumns = (data) => {
  const column1 = data.filter((_, index) => index % 2 === 0);
  const column2 = data.filter((_, index) => index % 2 !== 0);
  return [column1, column2];
};

const ReceivedQuizList = ({ quizData }) => {
  const [column1, column2] = splitIntoColumns(quizData);

  return (
    <div style={{left: 22, top: 158, position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
      {/* Column 1 */}
      <div style={{width: 169, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        {column1.map((item, index) => (
          <QuizCard key={item.id} quiz={item} isHighlighted={index % 2 === 0} />
        ))}
      </div>
      {/* Column 2 */}
      <div style={{width: 169, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        {column2.map((item, index) => (
          <QuizCard key={item.id} quiz={item} isHighlighted={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
};

export default ReceivedQuizList;
