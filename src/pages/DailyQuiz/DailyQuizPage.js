import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PencilIcon } from '../../assets/icons/li_pencil-line.svg';
import ReceivedQuizList from './ReceivedQuizList';
import CreatedQuizList from './CreatedQuizList';
import { getQuizzes } from '../../api/quiz'; // Import real API
import { useAuth } from '../../context/AuthContext'; // Import useAuth

const DailyQuizPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('received');
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      const fetchQuizzes = async () => {
        const quizzes = await getQuizzes(user.id);
        setAllQuizzes(quizzes);
      };
      // Fetch all quizzes for the matching when the component mounts or user changes
      fetchQuizzes();
    }
  }, [user]);

  const createdQuizzes = useMemo(() => {
    if (!user || !user.id) return [];
    return allQuizzes.filter(quiz => quiz.creator_id === user.id);
  }, [allQuizzes, user]);

  const receivedQuizzes = useMemo(() => {
    if (!user || !user.id) return [];
    return allQuizzes.filter(quiz => quiz.creator_id !== user.id);
  }, [allQuizzes, user]);

  const hasNewQuiz = useMemo(() => receivedQuizzes.some(quiz => quiz.isNew), [receivedQuizzes]);

  const handleCreateQuizClick = () => {
    navigate('/create-quiz');
  };

  const handleReceivedClick = () => {
    setActiveTab('received');
    setShowOnlyNew(false);
  };

  const handleReceivedDoubleClick = () => {
    setActiveTab('received');
    setShowOnlyNew(true);
  };

  const displayedReceivedQuizzes = useMemo(() => {
    if (showOnlyNew) {
      const firstNewQuiz = receivedQuizzes.find(q => q.isNew);
      return firstNewQuiz ? [firstNewQuiz] : [];
    }
    return receivedQuizzes;
  }, [showOnlyNew, receivedQuizzes]);

  return (
    <div style={{height: 844, position: 'relative', background: 'white', display: 'flex', flexDirection: 'column'}}>
      {/* Header */}
      <div style={{left: 20, top: 60, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400'}}>Daily Quiz</div>

      {/* Tabs */}
      <div style={{left: 52, top: 95, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 72, display: 'inline-flex'}}>
        <div
          style={{
            width: 106,
            paddingTop: 14,
            paddingBottom: 14,
            borderBottom: activeTab === 'received' ? '3px #FFC90F solid' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            cursor: 'pointer'
          }}
          onClick={handleReceivedClick}
          onDoubleClick={handleReceivedDoubleClick}
        >
          <div style={{textAlign: 'center', color: activeTab === 'received' ? '#FFC90F' : '#9E9FAD', fontSize: 16, fontWeight: '700'}}>
            Received
            {hasNewQuiz && showOnlyNew && <span style={{color: 'red', marginLeft: 4}}>New!</span>}
          </div>
        </div>
        <div
          style={{
            width: 106,
            paddingTop: 14,
            paddingBottom: 14,
            borderBottom: activeTab === 'created' ? '3px #FFC90F solid' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('created')}
        >
          <div style={{textAlign: 'center', color: activeTab === 'created' ? '#FFC90F' : '#9E9FAD', fontSize: 16, fontWeight: '700'}}>Created</div>
        </div>
      </div>

      {/* Quiz Card List */}
      {activeTab === 'received' ? (
        <ReceivedQuizList quizData={displayedReceivedQuizzes} obscureTitles={showOnlyNew} />
      ) : (
        <CreatedQuizList quizData={createdQuizzes} />
      )}

      {/* Floating Action Button */}
      <div onClick={handleCreateQuizClick} style={{padding: 18, left: 310, top: 680, position: 'absolute', background: '#0C0C0C', borderRadius: 100, justifyContent: 'center', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
        <PencilIcon style={{width: 24, height: 24}} />
      </div>
    </div>
  );
};

export default DailyQuizPage;