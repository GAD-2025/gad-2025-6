import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createBucketList } from '../../api/bucketlist';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import { useAuth } from '../../context/AuthContext';
import Field from '../../components/common/Field';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';

function AddBucketListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isSaveButtonActive = title.trim() !== '' && content.trim() !== '';

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    if (!isSaveButtonActive) {
      return;
    }

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
        <Field label="Goal Name" variant="dday">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name of the bucket goal"
          />
        </Field>

        <Field
          label="Details"
          variant="dday"
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Details of the goal"
            style={{
              flex: 1,
            }}
          />
        </Field>

        <Button disabled={!isSaveButtonActive} onClick={handleSave} variant="dday">
          Save
        </Button>
      </ContentContainer>
    </PageWrapper>
  );
}

export default AddBucketListPage;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TopBarWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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

const PageTitle = styled.div`
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
