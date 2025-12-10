import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBucketListById, deleteBucketList } from '../../api/bucketlist';
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

const BucketListCard = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: #f4f8ea;
  border-radius: 16px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.04);
  padding: 24px;
  box-sizing: border-box;
`;

const BucketListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const BucketListTitle = styled.div`
  text-align: left;
  color: #444;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BucketListContent = styled.div`
  color: #979797;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;

const BucketListDate = styled.div`
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

const BucketListDetailPage = () => {
  const navigate = useNavigate();
  const { bucketListId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBucketList = async () => {
      if (!bucketListId) {
        setError('Bucket List ID is missing.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getBucketListById(bucketListId);
        if (response.success) {
          setItem(response.bucketlist);
        } else {
          setError(response.message || 'Failed to fetch Bucket List details.');
        }
      } catch (err) {
        setError('An error occurred while fetching Bucket List details.');
        console.error('Error fetching Bucket List:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBucketList();
  }, [bucketListId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate(`/dday/bucket-list/edit/${item.id}`, { state: { item } });
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this Bucket List item?')) {
      try {
        const response = await deleteBucketList(item.id);
        if (response.success) {
          alert('Bucket List item deleted successfully!');
          navigate('/dday');
        } else {
          alert(`Failed to delete Bucket List item: ${response.message}`);
        }
      } catch (err) {
        console.error('Error deleting Bucket List:', err);
        alert('An error occurred while deleting the Bucket List item.');
      }
    }
  };

  const renderDateFormat = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (loading) {
    return <div>Loading Bucket List details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Bucket List item not found.</div>;
  }

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Bucket List</PageTitle>
      </TopBarWrapper>
      <BucketListCard>
        <BucketListInfo>
          <BucketListTitle>{item.title}</BucketListTitle>
          <BucketListContent>{item.content}</BucketListContent>
        </BucketListInfo>
        <BucketListDate>{renderDateFormat(item.created_at)}</BucketListDate>
      </BucketListCard>
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

export default BucketListDetailPage;
