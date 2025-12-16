import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLetters } from '../../api/letter';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import FloatingAddButton from '../../components/common/FloatingAddButton';
import ReceivedLetterList from './ReceivedLetterList';
import SentLetterList from './SentLetterList';

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
  color: ${(props) => (props.active ? '#A17E66' : '#9E9FAD')};
  border-bottom: ${(props) => (props.active ? '3px #A17E66 solid' : 'none')};
`;

const SlowLetterScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('received');
  const [allLetters, setAllLetters] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      const fetchLetters = async () => {
        const letters = await getLetters(user.id);
        setAllLetters(letters);
      };
      fetchLetters();
    }
  }, [user]);

  const sentLetters = useMemo(() => {
    if (!user || !user.id) return [];
    return allLetters.filter((letter) => letter.user_id === user.id);
  }, [allLetters, user]);

  const receivedLetters = useMemo(() => {
    if (!user || !user.id) return [];
    return allLetters.filter((letter) => letter.user_id !== user.id);
  }, [allLetters, user]);

  const handleWriteClick = () => {
    navigate('/slow-letter/write');
  };

  return (
    <PageWrapper>
      <Title>Slow Letter</Title>
      <TabWrapper>
        <Tab active={activeTab === 'received'} onClick={() => setActiveTab('received')}>
          Received
        </Tab>
        <Tab active={activeTab === 'sent'} onClick={() => setActiveTab('sent')}>
          Sent
        </Tab>
      </TabWrapper>
      {activeTab === 'received' ? (
        <ReceivedLetterList letterData={receivedLetters} />
      ) : (
        <SentLetterList letterData={sentLetters} />
      )}
      <FloatingAddButton onClick={handleWriteClick} />
    </PageWrapper>
  );
};

export default SlowLetterScreen;
