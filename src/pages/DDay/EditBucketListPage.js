import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getBucketListById, updateBucketList } from '../../api/bucketlist';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import Field from '../../components/common/Field';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';

function EditBucketListPage() {
  const navigate = useNavigate();
  const { bucketListId } = useParams();
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSaveButtonActive = title.trim() !== '' && content.trim() !== '';

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
        setContent(itemToEdit.content || '');
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
    if (!isSaveButtonActive) {
      return;
    }

    const bucketListUpdateData = {
      title,
      content,
    };

    try {
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

  if (!title && !content && !loading) {
    return <div>Bucket List not found for editing.</div>;
  }

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Edit Bucket List</PageTitle>
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

export default EditBucketListPage;

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
