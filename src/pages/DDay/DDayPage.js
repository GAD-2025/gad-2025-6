import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getDdaysByMatchingId } from '../../api/dday';
import { getBucketListsByMatchingId, updateBucketList } from '../../api/bucketlist';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import FloatingAddButton from '../../components/common/FloatingAddButton';
import chick from '../../assets/images/chick.png';

const DDayPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Use useAuth hook
  const [activeTab, setActiveTab] = useState('dday');
  const [bucketList, setBucketList] = useState([]);
  const [ddayList, setDdayList] = useState([]);

  const fetchData = useCallback(async () => {
    // const user = JSON.parse(localStorage.getItem('user')); // Removed direct localStorage access
    const matchingId = user?.matching_id; // Get matching_id from user context

    try {
      if (activeTab === 'dday') {
        if (!matchingId) {
          setDdayList([]);
          return;
        }
        const response = await getDdaysByMatchingId(matchingId);
        if (response.success) {
          setDdayList(response.dday);
        }
      } else if (activeTab === 'bucketList') {
        if (!matchingId) {
          setBucketList([]);
          return;
        }
        const response = await getBucketListsByMatchingId(matchingId);
        if (response.success) {
          setBucketList(response.bucketlist);
        }
      }
    } catch (error) {
      console.error(`Failed to fetch ${activeTab}:`, error);
    }
  }, [activeTab, user]); // Added user to dependencies

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddButtonClick = () => {
    if (activeTab === 'dday') {
      navigate('/dday/add');
    } else {
      navigate('/dday/add-bucket-list');
    }
  };

  const handleDDayItemClick = (item) => {
    navigate(`/dday/${item.id}`, { state: { item } });
  };

  const handleBucketListItemClick = (item) => {
    navigate(`/dday/bucket-list/${item.id}`, { state: { item } });
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await updateBucketList(id, { is_completed: !currentStatus }); // Pass an object
      fetchData(); // Re-fetch the list to update UI
    } catch (error) {
      console.error('Failed to update bucket list item status:', error);
    }
  };

  const calculateDday = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    // Reset time components to 00:00:00 to compare dates only
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'D-Day';
    } else if (diffDays > 0) {
      return `D-${diffDays}`;
    } else {
      return `D+${-diffDays}`;
    }
  };

  const renderDateFormat = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = String(date.getDate()).padStart(2, '0');
    return `${month} ${day}, ${year}`;
  };

  return (
    <PageWrapper>
      <Title>D-day & Bucket List</Title>
      <TabWrapper>
        <Tab active={activeTab === 'dday'} onClick={() => setActiveTab('dday')}>
          D-day
        </Tab>
        <Tab active={activeTab === 'bucketList'} onClick={() => setActiveTab('bucketList')}>
          Bucket List
        </Tab>
      </TabWrapper>
      <ContentWrapper>
        {activeTab === 'dday' ? (
          <>
            {ddayList.length === 0 ? (
              <EmptyContainer>
                <EmptyImg src={chick} alt="No D-days" />
                <EmptyText>Add your special day!</EmptyText>
              </EmptyContainer>
            ) : (
              <DDayList>
                {ddayList.map((item) => (
                  <DDayItem key={item.id} onClick={() => handleDDayItemClick(item)}>
                    <DDayContent>
                      <DDayItemInfo>
                        <DDayItemDate>{renderDateFormat(item.date)}</DDayItemDate>
                        <DDayItemTitle>{item.title}</DDayItemTitle>
                      </DDayItemInfo>
                      <DDayItemDDay>{calculateDday(item.date)}</DDayItemDDay>
                    </DDayContent>
                  </DDayItem>
                ))}
              </DDayList>
            )}
          </>
        ) : (
          <>
            {bucketList.length === 0 ? (
              <EmptyContainer>
                <EmptyImg src={chick} alt="No bucket list items" />
                <EmptyText>Add your bucket list!</EmptyText>
              </EmptyContainer>
            ) : (
              <BucketListContainer>
                {bucketList
                  .sort((a, b) => a.is_completed - b.is_completed)
                  .map((item) => (
                    <BucketListItem key={item.id} onClick={() => handleBucketListItemClick(item)}>
                      <BucketListContent completed={item.is_completed}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5.07px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleComplete(item.id, item.is_completed);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              width: '18px',
                              height: '18px',
                            }}
                          >
                            {item.is_completed ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                              >
                                <rect width="16" height="17" rx="1.26812" fill="#4E78D2" />
                                <path
                                  d="M13.8659 4.69244C13.523 4.3395 13.0088 4.3395 12.6659 4.69244L6.23733 11.3101L3.58019 8.57479C3.23733 8.22185 2.72305 8.22185 2.38019 8.57479C2.03733 8.92773 2.03733 9.45715 2.38019 9.81009L5.63733 13.163C5.80876 13.3395 5.98019 13.4277 6.23733 13.4277C6.49448 13.4277 6.6659 13.3395 6.83733 13.163L13.8659 5.92773C14.2088 5.57479 14.2088 5.04538 13.8659 4.69244Z"
                                  fill="white"
                                />
                              </svg>
                            ) : (
                              <EmptyCheckbox />
                            )}
                          </button>
                          <BucketListItemInfo>
                            <BucketListItemText completed={item.is_completed}>
                              {item.title}
                            </BucketListItemText>
                          </BucketListItemInfo>
                        </div>
                      </BucketListContent>
                    </BucketListItem>
                  ))}
              </BucketListContainer>
            )}
          </>
        )}
      </ContentWrapper>
      <FloatingAddButton onClick={handleAddButtonClick} />
    </PageWrapper>
  );
};
export default DDayPage;

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
  flex: 1;
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
  color: ${(props) => (props.active ? '#84AF25' : '#9E9FAD')};
  border-bottom: ${(props) => (props.active ? '3px #84AF25 solid' : 'none')};
`;

const DDayList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DDayItem = styled.div`
  width: 100%;
  height: 54px;
  position: relative;
  cursor: pointer;
  display: flex;

  &::before {
    content: '';
    width: 12px;
    height: calc(100% - 2px);
    margin-right: -8px;
    background: #9cb06e;
    border-radius: 5px;
  }
`;

const DDayContent = styled.div`
  width: 100%;
  padding: 12px 8px;
  background: #f4f8ea;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
`;

const DDayItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
`;

const DDayItemDate = styled.div`
  color: #52555d;
  font-size: 12px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;

const DDayItemTitle = styled.div`
  color: black;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const DDayItemDDay = styled.div`
  color: #768554;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const AddButton = styled.div`
  padding: 18px;
  background: #0c0c0c;
  border-radius: 100px;
  position: absolute;
  right: 20px;
  bottom: 120px;
  cursor: pointer;
`;

const BucketListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BucketListItem = styled.div`
  width: 100%;
  height: 54px;
  position: relative;
  cursor: pointer;
  display: flex;

  &::before {
    content: '';
    width: 12px;
    height: calc(100% - 2px);
    margin-right: -8px;
    background: #9cb06e;
    border-radius: 5px;
  }
`;

const BucketListContent = styled.div`
  width: 100%;
  padding: 12px 8px;
  background: #f4f8ea;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
`;

const EmptyCheckbox = styled.div`
  width: 16px;
  height: 16px;
  position: relative;
  background: white;
  border-radius: 2px;
  border: 1px #6f737d solid;
`;

const BucketListItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
`;

const BucketListItemText = styled.div`
  color: black;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  word-wrap: break-word;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const EmptyImg = styled.img``;

const EmptyText = styled.div`
  color: #d5d5d5;
  text-align: center;
  font-family: Pangolin;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;
