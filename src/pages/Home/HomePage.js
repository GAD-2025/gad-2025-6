import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { Link } from 'react-router-dom'; // Import Link
import homeBackgroundImage from '../../assets/images/home_background.jpeg'; // Import the background image

const HomePage = () => {
  const [ddays, setDdays] = React.useState([]);

  const navigate = useNavigate(); // Initialize useNavigate
  const user = JSON.parse(localStorage.getItem('user')); // Example of getting user data

  const dday = ddays?.at(Math.floor(Math.random() * ddays.length));

  useEffect(() => {
    if (!user) {
      navigate('/signin'); // Redirect to sign-in page if not authenticated
    }

    // fetch GET /api/ddays/user/{userId}
    const fetchDdays = async () => {
      try {
        console.log(process.env.REACT_APP_API_URL);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/dday/user/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setDdays(data.dday);
        } else {
          console.error('Failed to fetch D-Days');
        }
      } catch (error) {
        console.error('Error fetching D-Days:', error);
      }
    };

    fetchDdays();
  }, []);

  const calculateDDay = (targetDate) => {
    console.log(targetDate);
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
  };

  return (
    <PageWrapper>
      <BackgroundImage src={homeBackgroundImage} alt="Background" />
      <ContentWrapper>
        <CardsWrapper>
          <CardRow>
            <DDayCard onClick={() => navigate('/dday')} style={{ cursor: 'pointer' }}>
              <DDayValue>{calculateDDay(dday?.date)}</DDayValue>
              <DDayText>{dday?.title}</DDayText>
            </DDayCard>
            <NewLetterCard onClick={() => navigate('/slow-letter')} style={{ cursor: 'pointer' }}>
              <NewLetterText>New!</NewLetterText>
              <NewLetterCount>2</NewLetterCount>
            </NewLetterCard>
          </CardRow>
          <Link to="/daily-quiz" style={{ textDecoration: 'none' }}>
            <QuizCard>
              <QuizTitle>Daily Quiz</QuizTitle>
              <QuizQuestion>What is "I miss you." in Korean?</QuizQuestion>
            </QuizCard>
          </Link>
        </CardsWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: white;
  overflow: hidden;
  padding-top: 14px;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  object-position: center;
  inset: 0;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const CardsWrapper = styled.div`
  width: 350px;
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
  width: 229px;
  height: 71px;
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
  height: 71px;
  background: #a17e66;
  border-radius: 5px;
  position: relative;
  color: white;
  display: flex;
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
