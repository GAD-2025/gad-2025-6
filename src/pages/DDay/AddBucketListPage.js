import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createBucketList } from '../../api/bucketlist';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

function AddBucketListPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Use useAuth hook
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isSaveButtonActive = title.trim() !== '' && content.trim() !== '';

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    if (!user || !user.id || !user.matching_id) {
      alert('User not authenticated or not matched.');
      return;
    }

    const bucketListData = {
      userId: user.id,
      matchingId: user.matching_id,
      title,
      content,
    };

    try {
      await createBucketList(bucketListData);
      navigate('/dday');
    } catch (error) {
      console.error('Failed to create Bucket List item:', error);
      alert(`Failed to save Bucket List: ${error.message}`);
    }
  };

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Add New Bucket List</PageTitle>
      </TopBarWrapper>

      <ContentContainer>
        <InputGroup>
          <Label>Name of Bucket Goal</Label>
          <StyledInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name of the bucket goal"
          />
        </InputGroup>
        <InputGroup>
          <Label>Details</Label>
          <StyledTextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Details of the event"
          />
        </InputGroup>

        <SaveButtonWrapper>
          <SaveButton active={isSaveButtonActive} onClick={handleSave}>
            Save
          </SaveButton>
        </SaveButtonWrapper>
      </ContentContainer>
    </PageWrapper>
  );
}

export default AddBucketListPage;

// Styled components copied and adapted from AddDDayPage for consistency

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopBarWrapper = styled.div`
  width: 100%;
  height: 44px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 44px; /* Space for status bar */
`;

const BackButton = styled.div`
  position: absolute;
  left: 20px;
  top: 10.5px;
  cursor: pointer;
  width: 24px;
  height: 24px;
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

const ContentContainer = styled.div`
  width: 350px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 16px;
  padding-bottom: 20px;
  overflow-y: auto;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  color: #84af25;
  font-size: 24px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
  text-align: left;
`;

const StyledInput = styled.input`
  flex: 1;
  align-self: stretch;
  height: 56px;
  padding: 18px;
  background: white;
  border-radius: 20px;
  outline: 1px #eaeaea solid;
  border: none;
  color: #2c2c2c;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  background: transparent;
  box-sizing: border-box;
`;

const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 56px;
  padding: 0 18px;
  background: white;
  border-radius: 20px;
  outline: 1px #eaeaea solid;
  box-sizing: border-box;
`;

const HiddenDateInput = styled.input`
  display: none;
`;

const CalendarButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SaveButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const SaveButton = styled.div`
  width: 350px;
  padding: 18px 74px;
  background: ${(props) => (props.active ? '#84AF25' : '#D5D5D5')};
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: ${(props) => (props.active ? 'pointer' : 'default')};
  color: #f1f1f1;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  word-wrap: break-word;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 236px;
  padding: 18px 24px;
  background: white;
  border-radius: 20px;
  outline: 1px #eaeaea solid;
  border: none;
  resize: none;
  color: #2c2c2c;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  background: transparent;
  box-sizing: border-box;
`;
