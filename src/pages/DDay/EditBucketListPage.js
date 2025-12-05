import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getBucketListById, updateBucketList } from '../../api/bucketlist'; // Import getBucketListById and updateBucketList
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg'; // Assuming this is the arrow left icon

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  width: 390px;
  left: 0px;
  top: 0px;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 408px;
  display: inline-flex;
`;

const HeaderSection = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
`;

const StatusBar = styled.div`
  align-self: stretch;
  height: 44px;
  position: relative;
  overflow: hidden;
`;

const WifiIcon = styled.div`
  width: 17.48px;
  height: 12.62px;
  left: 314.26px;
  top: 17.48px;
  position: absolute;
  background: var(--Light-Ink, black);
`;

const BatteryIcon = styled.div`
  width: 25.83px;
  height: 12.14px;
  left: 337.56px;
  top: 17.48px;
  position: absolute;
  & > div {
    width: 19.61px;
    height: 8.40px;
    left: 1.87px;
    top: 1.87px;
    position: absolute;
    background: var(--Light-Ink, black);
  }
`;

const TimeText = styled.div`
  left: 36.87px;
  top: 15.54px;
  position: absolute;
  text-align: center;
  color: var(--Light-Ink, black);
  font-size: 17.48px;
  font-family: SF Pro Display;
  font-weight: 600;
  line-height: 17.48px;
  word-wrap: break-word;
`;

const TopBar = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  display: flex;
`;

const TopBarDefault = styled.div`
  align-self: stretch;
  height: 44px;
  position: relative;
  overflow: hidden;
`;

const StyledArrowLeftIcon = styled(ArrowLeftIcon)` // Use StyledArrowLeftIcon as a component
  width: 24px;
  height: 24px;
  left: 20px;
  top: 10.50px;
  position: absolute;
  cursor: pointer;
  path {
    fill: var(--Grayscale-900, #1A1B1E); // Ensure the icon color is correct
  }
`;

const PageTitle = styled.div`
  left: 122px;
  top: 10px;
  position: absolute;
  text-align: center;
  color: var(--Black, black);
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
`;

const FormSection = styled.div`
  width: 350px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  display: flex;
`;

const InputGroup = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  display: flex;
`;

const InputLabel = styled.div`
  align-self: stretch;
  color: #84AF25;
  font-size: 24px;
  font-family: Pangolin;
  font-weight: 400;
  word-wrap: break-word;
`;

const InputField = styled.div`
  width: 350px;
  height: 56px;
  padding: 18px;
  background: white;
  overflow: hidden;
  border-radius: 20px;
  outline: 1px #EAEAEA solid;
  outline-offset: -1px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
`;

const StyledInput = styled.input`
  flex: 1 1 0;
  align-self: stretch;
  color: #2C2C2C;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
  border: none;
  outline: none;
  background: transparent;
  box-sizing: border-box;
  &::placeholder {
    color: #DBDBDB;
    font-weight: 400;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  min-height: 100px;
  color: #2C2C2C;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
  border: none;
  outline: none;
  resize: vertical;
  background: transparent;
  box-sizing: border-box;
  overflow-y: auto;
  &::placeholder {
    color: #DBDBDB;
    font-weight: 400;
  }
`;

const CalendarIcon = styled.div`
  width: 20px;
  height: 22px;
  background: #404048;
`;

const SaveButton = styled.div`
  width: 350px;
  padding-left: 74px;
  padding-right: 74px;
  padding-top: 18px;
  padding-bottom: 18px;
  background: ${(props) => (props.active ? '#84AF25' : '#D5D5D5')};
  overflow: hidden;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
  cursor: ${(props) => (props.active ? 'pointer' : 'default')};
`;

const SaveButtonText = styled.div`
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: #F1F1F1;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
`;

const BottomBar = styled.div`
  align-self: stretch;
  height: 36px;
  position: relative;
`;

const BottomBarIndicator = styled.div`
  width: 134px;
  height: 5px;
  left: 128px;
  top: 23px;
  position: absolute;
  background: black;
  border-radius: 100px;
`;

function EditBucketListPage() {
  const navigate = useNavigate();
  const { bucketListId } = useParams();
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // Changed from targetDate to description
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSetBucketList = async () => {
      let itemToEdit = location.state?.item;

      if (!itemToEdit && bucketListId) {
        try {
          const response = await getBucketListById(bucketListId);
          if (response.success) {
            itemToEdit = response.bucketlist;
          } else {
            setError(response.message || 'Failed to fetch Bucket List for editing.');
          }
        } catch (err) {
          setError('An error occurred while fetching Bucket List for editing.');
          console.error("Error fetching Bucket List for edit:", err);
        }
      }

      if (itemToEdit) {
        setTitle(itemToEdit.title);
        setDescription(itemToEdit.content || ''); // Use content for description
      } else if (!error) {
        setError("Bucket List not found for editing.");
      }
      setLoading(false);
    };
    fetchAndSetBucketList();
  }, [bucketListId, location.state, error]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
        alert('Title and description cannot be empty.');
        return;
    }
    try {
      const bucketListUpdateData = {
        title,
        content: description,
      };

      const response = await updateBucketList(bucketListId, bucketListUpdateData);
      if (response.success) {
        navigate('/dday');
      } else {
        alert(`Failed to update Bucket List: ${response.message}`);
      }
    } catch (error) {
      console.error('Failed to update Bucket List:', error);
      alert('An error occurred while updating Bucket List. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading Bucket List for edit...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!title && !description && !loading) { // Check if no data and not loading
    return <div>Bucket List not found for editing.</div>;
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <HeaderSection>
          <StatusBar>
            <WifiIcon />
            <BatteryIcon>
              <div />
            </BatteryIcon>
            <TimeText>19:02</TimeText>
          </StatusBar>
          <TopBar>
            <TopBarDefault>
              <StyledArrowLeftIcon onClick={handleBackClick} /> {/* Use the styled component */}
              <PageTitle>Edit Bucket List Item</PageTitle>
            </TopBarDefault>
          </TopBar>
        </HeaderSection>
        <FormSection style={{ paddingLeft: 20, paddingRight: 20 }}>
          <InputGroup>
            <InputLabel>Bucket List Item</InputLabel>
            <InputField>
              <StyledInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of your bucket list item"
              />
            </InputField>
          </InputGroup>
          <InputGroup>
            <InputLabel>Description</InputLabel>
            <div style={{
                width: 350,
                paddingTop: 18,
                paddingBottom: 18,
                paddingLeft: 24,
                paddingRight: 24,
                background: 'white',
                overflow: 'hidden',
                borderRadius: 20,
                outline: '1px #EAEAEA solid',
                outlineOffset: '-1px',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
            }}>
              <StyledTextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description of your bucket list item"
              />
            </div>
          </InputGroup>
          {/* Removed Target Date Input Group as it's not supported by API */}

          <SaveButton active onClick={handleSave}>
            <SaveButtonText>Save</SaveButtonText>
          </SaveButton>
        </FormSection>
        <BottomBar>
          <BottomBarIndicator />
        </BottomBar>
      </ContentWrapper>
    </PageContainer>
  );
}

export default EditBucketListPage;
