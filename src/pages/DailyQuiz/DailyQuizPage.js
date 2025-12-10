import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PencilIcon } from '../../assets/icons/li_pencil-line.svg';
import ReceivedQuizList from './ReceivedQuizList';
import CreatedQuizList from './CreatedQuizList';
import { getQuizzes } from '../../api/quiz'; // Import real API
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import styled from 'styled-components';
import FloatingAddButton from '../../components/common/FloatingAddButton';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.div`
  color: #000;
  font-family: Pangolin;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 4px;
`;

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const Tab = styled.div`
  flex: 1;
  padding: 14px 0;
  text-align: center;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => (props.active ? '#FFC90F' : '#9E9FAD')};
  border-bottom: ${(props) => (props.active ? '3px #FFC90F solid' : 'none')};
`;

const DailyQuizPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('received');
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
    return allQuizzes.filter((quiz) => quiz.creator_id === user.id);
  }, [allQuizzes, user]);

  const receivedQuizzes = useMemo(() => {
    if (!user || !user.id) return [];

    return allQuizzes.filter((quiz) => quiz.creator_id !== user.id);
  }, [allQuizzes, user]);
  const handleCreateQuizClick = () => {
    navigate('/create-quiz');
  };

  return (
    <PageWrapper>
      <Title>Daily Quiz</Title>
      <TabWrapper>
        <Tab active={activeTab === 'received'} onClick={() => setActiveTab('received')}>
          Received
        </Tab>
        <Tab active={activeTab === 'created'} onClick={() => setActiveTab('created')}>
          Created
        </Tab>
      </TabWrapper>
      {activeTab === 'received' ? (
        <ReceivedQuizList quizData={receivedQuizzes} />
      ) : (
        <CreatedQuizList quizData={createdQuizzes} onCreateQuiz={handleCreateQuizClick} />
      )}
      <FloatingAddButton onClick={handleCreateQuizClick} />
    </PageWrapper>
  );
};

export default DailyQuizPage;
