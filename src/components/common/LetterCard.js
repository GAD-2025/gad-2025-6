import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { markLetterAsRead } from '../../api/letter';

const CardWrapper = styled.div`
  width: 100%;
  height: 190px;
  background: ${(props) => (props.isHighlighted ? '#EAD7C4' : '#FAFAFA')};
  border-radius: 16px;
  padding: 22px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
  text-align: left;
`;

const ContentText = styled.p`
  color: #444;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  margin: 0;
`;

const DateText = styled.p`
  color: #979797;
  font-size: 10px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 700;
  text-align: right;
  width: 100%;
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
};

const LetterCard = ({ letter, isHighlighted, type }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (type === 'sent') {
      navigate(`/slow-letter/sent/${letter.id}`, { state: { letter } });
      return;
    }

    // received letter인 경우 읽음 처리
    try {
      await markLetterAsRead(letter.id);
    } catch (error) {
      console.error('Failed to mark letter as read:', error);
    }

    navigate(`/slow-letter/${letter.id}`, { state: { letter } });
  };

  return (
    <CardWrapper isHighlighted={isHighlighted} onClick={handleClick}>
      <ContentText>{letter.content}</ContentText>
      <DateText>{formatDate(letter.created_at)}</DateText>
    </CardWrapper>
  );
};

export default LetterCard;
