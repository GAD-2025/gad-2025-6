import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/layout/BottomNav';
import { ReactComponent as PencilIcon } from '../../assets/icons/li_pencil-line.svg';
import { getDdaysByMatchingId } from '../../api/dday';
import { getBucketListsByMatchingId, updateBucketList } from '../../api/bucketlist';

const DDayPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dday');
  const [bucketList, setBucketList] = useState([]);
  const [ddayList, setDdayList] = useState([]);

  const fetchData = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const matchingId = user.matching_id;

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
  }, [activeTab]);

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
      await updateBucketList(id, !currentStatus);
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

  const renderDateFormat = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <PageWrapper>
      <TopNav>
        <Time>19:02</Time>
        <StatusBar>
          <WifiIcon />
          <BatteryIcon>
            <BatteryFill />
          </BatteryIcon>
        </StatusBar>
      </TopNav>
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
            {/* <DDayCard>
              <DDayText>Time Remaining Until Reunion</DDayText>
              <DDayValue>Set D-day</DDayValue>
              <DDaySubText>Enter the date to start the excitement!</DDaySubText>
            </DDayCard> */}
            <DDayList>
              {ddayList.map((item) => (
                <DDayItem key={item.id} onClick={() => handleDDayItemClick(item)}>
                  <DDayItemBar />
                  <DDayItemContent>
                    <DDayItemInfo>
                      <DDayItemDate>{renderDateFormat(item.date)}</DDayItemDate>
                      <DDayItemTitle>{item.title}</DDayItemTitle>
                    </DDayItemInfo>
                    <DDayItemDDay>{calculateDday(item.date)}</DDayItemDDay>
                  </DDayItemContent>
                </DDayItem>
              ))}
            </DDayList>
          </>
        ) : (
          <BucketListContainer>
            {bucketList.map((item) => (
              <BucketListItemWrapper key={item.id}>
                <BucketListItemBar completed={item.is_completed} />
                <BucketListItemContent completed={item.is_completed}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5.07px' }}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleComplete(item.id, item.is_completed);
                      }}
                    >
                      {item.is_completed ? (
                        <CompletedCheckbox>
                          <CheckedIcon viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </CheckedIcon>
                        </CompletedCheckbox>
                      ) : (
                        <EmptyCheckbox />
                      )}
                    </div>
                    <BucketListItemInfo onClick={() => handleBucketListItemClick(item)}>
                      <BucketListItemText completed={item.is_completed}>
                        {item.title}
                      </BucketListItemText>
                    </BucketListItemInfo>
                  </div>
                </BucketListItemContent>
              </BucketListItemWrapper>
            ))}
          </BucketListContainer>
        )}
      </ContentWrapper>
      <AddButton onClick={handleAddButtonClick}>
        <PencilIcon style={{ width: 24, height: 24, fill: 'white' }} />
      </AddButton>
      <BottomNav />
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
  align-items: center;
`;

const TopNav = styled.div`
  width: 390px;
  height: 44px;
  position: relative;
  overflow: hidden;
`;

const Time = styled.div`
  position: absolute;
  left: 36.87px;
  top: 15.54px;
  text-align: center;
  color: black;
  font-size: 17.48px;
  font-family: SF Pro Display, sans-serif;
  font-weight: 600;
  line-height: 17.48px;
`;

const StatusBar = styled.div`
  position: absolute;
  right: 14.5px;
  top: 17.48px;
  display: flex;
  gap: 5px;
`;

const WifiIcon = styled.div`
  width: 17.48px;
  height: 12.62px;
  background: black;
`;

const BatteryIcon = styled.div`
  width: 25.83px;
  height: 12.14px;
  position: relative;
`;

const BatteryFill = styled.div`
  width: 19.61px;
  height: 8.4px;
  left: 1.87px;
  top: 1.87px;
  position: absolute;
  background: black;
`;

const ContentWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 150px;
`;

const Title = styled.div`
  position: absolute;
  left: 20px;
  top: 60px;
  color: black;
  font-size: 24px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
`;

const TabWrapper = styled.div`
  position: absolute;
  left: 52px;
  top: 95px;
  display: flex;
  gap: 72px;
`;

const Tab = styled.div`
  width: 106px;
  padding: 14px 0;
  text-align: center;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => (props.active ? '#84AF25' : '#9E9FAD')};
  border-bottom: ${(props) => (props.active ? '3px #84AF25 solid' : 'none')};
`;

const DDayCard = styled.div`
  width: 350px;
  padding: 24px 54px;
  background: white;
  border-radius: 10px;
  outline: 1px #f0f0f0 solid;
  outline-offset: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
`;

const DDayText = styled.div`
  text-align: center;
  color: black;
  font-size: 12px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;

const DDayValue = styled.div`
  text-align: center;
  color: #84af25;
  font-size: 24px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const DDaySubText = styled.div`
  color: #404048;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const DDayList = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DDayItem = styled.div`
  width: 350px;
  height: 54px;
  position: relative;
`;

const DDayItemBar = styled.div`
  width: 12.68px;
  height: 51.69px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: #9cb06e;
  border-radius: 5.07px;
`;

const DDayItemContent = styled.div`
  width: 347.46px;
  height: 54px;
  padding: 8.24px 6.34px;
  left: 2.54px;
  top: 0px;
  position: absolute;
  background: #f4f8ea;
  border-radius: 5.07px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const DDayItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BucketListItemWrapper = styled.div`
  width: 350px;
  height: 54px;
  position: relative;
  cursor: pointer;
`;

const BucketListItemBar = styled.div`
  width: 12.68px;
  height: 51.69px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: ${(props) => (props.completed ? '#4E78D2' : '#9CB06E')};
  border-radius: 5.07px;
`;

const BucketListItemContent = styled.div`
  width: 347.46px;
  height: 54px;
  padding: 8.24px 12px; /* Adjusted padding */
  left: 2.54px;
  top: 0px;
  position: absolute;
  background: #f4f8ea;
  border-radius: 5.07px;
  display: flex;
  justify-content: space-between; /* Use space-between */
  align-items: center;
  gap: 5.07px;
  box-sizing: border-box;
`;

const EmptyCheckbox = styled.div`
  width: 16px;
  height: 17px;
  position: relative;
  background: white;
  border-radius: 1.27px;
  border: 0.63px #6f737d solid;
`;

const CompletedCheckbox = styled.div`
  width: 16px;
  height: 17px;
  position: relative;
  background: #4e78d2;
  overflow: hidden;
  border-radius: 1.27px;
`;

const CheckedIcon = styled.svg`
  width: 12px;
  height: 9px;
  left: 2.12px;
  top: 4.43px;
  position: absolute;
  fill: white;
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
