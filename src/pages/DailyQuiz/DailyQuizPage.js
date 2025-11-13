import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../../components/common/QuizCard';
import { ReactComponent as PencilIcon } from '../../assets/icons/li_pencil-line.svg';

// Mock data for the quiz cards (isHighlighted removed)
const quizData = [
  { id: 1, title: 'Camisa', description: 'The blue shirt I often wear in Portuguese', date: '2025. Oct. 20' },
  { id: 2, title: 'Borracha', description: 'An eraser for my mistakes', date: '2025. Oct. 19' },
  { id: 3, title: 'Tenedor', description: 'A fork to eat my lunch', date: '2025. Oct. 18' },
  { id: 4, title: 'Libro', description: 'A book I read yesterday', date: '2025. Oct. 17' },
  { id: 5, title: 'Ventana', description: 'A window with a view', date: '2025. Oct. 16' },
  { id: 6, title: 'Sol', description: 'The sun is shining bright', date: '2025. Oct. 15' },
  { id: 7, title: 'Agua', description: 'Water is essential for life', date: '2025. Oct. 14' },
  { id: 8, title: 'Fuego', description: 'Fire can be dangerous', date: '2025. Oct. 13' },
];

// Helper to split data into two columns
const splitIntoColumns = (data) => {
  const column1 = data.filter((_, index) => index % 2 === 0);
  const column2 = data.filter((_, index) => index % 2 !== 0);
  return [column1, column2];
};


const DailyQuizPage = () => {
  const navigate = useNavigate();
  const [column1, column2] = splitIntoColumns(quizData);

  const handleCreateQuizClick = () => {
    navigate('/create-quiz');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'white',
      padding: '0 20px',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{ paddingTop: '60px', color: 'black', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400' }}>Daily Quiz</div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '72px', marginTop: '11px' }}>
        <div style={{width: 106, paddingTop: 14, paddingBottom: 14, borderBottom: '3px #FFC90F solid', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <div style={{textAlign: 'center', color: '#FFC90F', fontSize: 16, fontWeight: '700'}}>Received</div>
        </div>
        <div style={{width: 106, paddingTop: 14, paddingBottom: 14, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <div style={{textAlign: 'center', color: '#9E9FAD', fontSize: 16, fontWeight: '700'}}>Created</div>
        </div>
      </div>

      {/* Quiz Card List */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px', overflowY: 'auto' }}>
        {/* Column 1 */}
        <div style={{width: 169, display: 'flex', flexDirection: 'column', gap: '8px'}}>
          {column1.map((item, index) => (
            <QuizCard key={item.id} title={item.title} description={item.description} date={item.date} isHighlighted={index % 2 === 0} />
          ))}
        </div>
        {/* Column 2 */}
        <div style={{width: 169, display: 'flex', flexDirection: 'column', gap: '8px'}}>
          {column2.map((item, index) => (
            <QuizCard key={item.id} title={item.title} description={item.description} date={item.date} isHighlighted={index % 2 !== 0} />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div onClick={handleCreateQuizClick} style={{padding: 18, position: 'absolute', right: 20, bottom: 100, background: '#0C0C0C', borderRadius: 100, cursor: 'pointer'}}>
        <PencilIcon style={{width: 24, height: 24}} />
      </div>
    </div>
  );
};

export default DailyQuizPage;