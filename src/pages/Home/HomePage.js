import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom'; // Import Link
import { ReactComponent as LetterIcon } from '../../assets/icons/letter.svg';
import { useAuth } from '../../context/AuthContext';
import { getDdaysByMatchingId } from '../../api/dday';
import { getQuizzes } from '../../api/quiz';

const HomePage = () => {
  const [ddays, setDdays] = React.useState([]);
  const [quizzes, setQuizzes] = React.useState([]);
  console.log(quizzes);
  const navigate = useNavigate(); // Initialize useNavigate
  const { user } = useAuth(); // Use useAuth hook instead of localStorage

  // const dday = ddays?.at(Math.floor(Math.random() * ddays.length));
  const dday = ddays.at(-1);
  const quiz = quizzes.at(-1);

  useEffect(() => {
    if (!user) {
      navigate('/signin'); // Redirect to sign-in page if not authenticated
      return;
    }

    // Fetch D-Days based on matching_id
    const fetchDdays = async () => {
      try {
        const matchingId = user?.matching_id;
        if (!matchingId) {
          setDdays([]);
          return;
        }
        const response = await getDdaysByMatchingId(matchingId);
        if (response.success) {
          setDdays(response.dday);
        } else {
          console.error('Failed to fetch D-Days');
        }
      } catch (error) {
        console.error('Error fetching D-Days:', error);
      }
    };

    const fetchQuizzes = async () => {
      try {
        const userId = user?.id;
        if (!userId) {
          setQuizzes([]);
          return;
        }
        const quizzes = await getQuizzes(userId);
        setQuizzes(quizzes?.filter((quiz) => quiz.creator_id !== userId && !quiz.is_solve) || []);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchDdays();
    fetchQuizzes();
  }, [user, navigate]);

  const calculateDDay = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (isNaN(diffDays)) {
      return '';
    }

    if (diffDays === 0) {
      return 'D-Day';
    }

    return diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
  };

  return (
    <ContentWrapper>
      <CardsWrapper>
        <CardRow>
          <DDayCard onClick={() => navigate(`/dday/${dday?.id}`)} style={{ cursor: 'pointer' }}>
            <DDayValue>{calculateDDay(dday?.date)}</DDayValue>
            <DDayText>
              {dday?.title ?? (
                <span
                  style={{
                    color: '#9E9FAD',
                  }}
                >
                  Add a new D-Day
                </span>
              )}
            </DDayText>
          </DDayCard>
          <NewLetterCard onClick={() => navigate('/slow-letter')} style={{ cursor: 'pointer' }}>
            <NewLetterText>New!</NewLetterText>
            <LetterIcon />
            <NewLetterCount>2</NewLetterCount>
          </NewLetterCard>
        </CardRow>
        <Link to={`/daily-quiz/${quiz?.id}`} style={{ textDecoration: 'none' }}>
          <QuizCard>
            <QuizTitle>Daily Quiz</QuizTitle>
            <QuizQuestion>{quiz?.hint ?? 'Create a new quiz!'}</QuizQuestion>
          </QuizCard>
        </Link>
      </CardsWrapper>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const CardsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 11px;
  z-index: 10;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 11px;
`;

const DDayCard = styled.div`
  width: 100%;
  background: #f4f8ea;
  border-radius: 16px;
  padding: 16px 19px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const DDayValue = styled.div`
  color: #84af25;
  font-size: 20px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
  line-height: 20px;
`;

const DDayText = styled.div`
  width: 140px;
  height: 39px;
  color: black;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
`;

const NewLetterCard = styled.div`
  width: 110px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: stretch;
  background: #a17e66;
  border-radius: 5px;
  position: relative;
  color: white;
  align-items: center;
  justify-content: center;
`;

const NewLetterText = styled.div`
  font-size: 20px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
  line-height: 20px;
`;

const NewLetterCount = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 27px;
  height: 27px;
  background: #d83f3f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 17.61px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
`;

const QuizCard = styled.div`
  height: 94px;
  background: #fff8e2;
  border-radius: 16px;
  padding: 20px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const QuizTitle = styled.div`
  color: #ffc90f;
  font-size: 20px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
  line-height: 20px;
`;

const QuizQuestion = styled.div`
  color: #979797;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

export default HomePage;
