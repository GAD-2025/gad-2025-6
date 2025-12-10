import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDdayById, deleteDday } from '../../api/dday'; // Import real API calls
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import styled from 'styled-components';
import Button from '../../components/common/Button';

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

const DDayCard = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: #f4f8ea;
  border-radius: 16px;
  background: #f4f8ea;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.04);
  padding: 24px;
  box-sizing: border-box;
`;

const DDayInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DDayTitle = styled.div`
  text-align: left;
  color: #444;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
`;

const DDayContent = styled.div`
  color: #979797;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
`;

const DDayDate = styled.div`
  width: 100%;
  color: #979797;
  text-align: right;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 32px;
`;

const DDayDetailPage = () => {
  const navigate = useNavigate();
  const { ddayId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDday = async () => {
      if (!ddayId) {
        setError('D-day ID is missing.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getDdayById(ddayId);
        if (response.success) {
          setItem(response.dday);
        } else {
          setError(response.message || 'Failed to fetch D-day details.');
        }
      } catch (err) {
        setError('An error occurred while fetching D-day details.');
        console.error('Error fetching D-day:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDday();
  }, [ddayId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate(`/dday/edit/${item.id}`, { state: { item } });
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this D-day event?')) {
      try {
        const response = await deleteDday(item.id);
        if (response.success) {
          alert('D-day event deleted successfully!');
          navigate('/dday'); // Navigate back to the list
        } else {
          alert(`Failed to delete D-day event: ${response.message}`);
        }
      } catch (err) {
        console.error('Error deleting D-day:', err);
        alert('An error occurred while deleting the D-day event.');
      }
    }
  };

  const renderDDay = (day) => {
    const today = new Date();
    const targetDate = new Date(day.date);
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    const timeDiff = targetDate - today;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (dayDiff > 0) {
      return `D-${dayDiff}`;
    } else if (dayDiff < 0) {
      return `D+${Math.abs(dayDiff)}`;
    } else {
      return 'D-Day';
    }
  };

  if (loading) {
    return <div>Loading D-day details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>D-day not found.</div>;
  }

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>D-day</PageTitle>
      </TopBarWrapper>
      <DDayCard>
        <DDayInfo>
          <DDayTitle>{item.title}</DDayTitle>
          <DDayContent>{item.content}</DDayContent>
        </DDayInfo>
        <DDayDate>{renderDDay(item)}</DDayDate>
      </DDayCard>
      <ButtonWrapper>
        <Button variant="dday" onClick={handleDeleteClick}>
          Delete
        </Button>
        <Button variant="dday" onClick={handleEditClick}>
          Edit
        </Button>
      </ButtonWrapper>
    </PageWrapper>
  );
};

export default DDayDetailPage;
