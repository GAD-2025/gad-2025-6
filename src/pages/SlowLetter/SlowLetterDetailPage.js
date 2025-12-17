import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import styled from 'styled-components';
import { formatDate } from '../../utils/timezoneHelper';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const TopBarWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageTitle = styled.div`
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const LetterCard = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: #ead7c4;
  border-radius: 16px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.04);
  padding: 24px;
  box-sizing: border-box;
`;

const LetterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const LetterContent = styled.div`
  color: #444;

  /* pretendard/bold/20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
`;

const LetterDate = styled.div`
  width: 100%;
  color: #979797;
  text-align: right;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SlowLetterDetailPage = () => {
  const navigate = useNavigate();
  const { letterId } = useParams();
  const location = useLocation();
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // location.state에서 letter를 가져오거나, API에서 가져와야 함
    const letterFromState = location.state?.letter;

    if (letterFromState) {
      setLetter(letterFromState);
      setLoading(false);
    } else {
      // TODO: API에서 letter를 가져오는 로직 추가
      // 현재는 state로만 전달받는다고 가정
      setLoading(false);
    }
  }, [letterId, location.state]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading letter...</div>;
  }

  if (!letter) {
    return <div>Letter not found.</div>;
  }

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Slow Letter</PageTitle>
      </TopBarWrapper>
      <LetterCard>
        <LetterInfo>
          <LetterContent>{letter.content}</LetterContent>
        </LetterInfo>
        <LetterDate>{formatDate(letter.created_at)}</LetterDate>
      </LetterCard>
    </PageWrapper>
  );
};

export default SlowLetterDetailPage;
