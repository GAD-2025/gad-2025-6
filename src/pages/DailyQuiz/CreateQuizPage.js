import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createQuiz } from '../../api/quiz';
import { useAuth } from '../../context/AuthContext';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import Field from '../../components/common/Field';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';

function CreateQuizPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hint, setHint] = useState('');
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleCreateQuiz = async () => {
    if (!isSaveButtonActive) {
      return;
    }

    if (!user || !user.id) {
      alert('Please log in to create a quiz.');
      return;
    }

    try {
      const response = await createQuiz({ hint, answer, image }, user.id);
      if (response.success) {
        navigate('/daily-quiz');
      } else {
        alert(`Failed to create quiz: ${response.message}`);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('An error occurred while creating the quiz.');
    }
  };

  const isSaveButtonActive = hint.trim() !== '' && answer.trim() !== '';

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Create Quiz</PageTitle>
      </TopBarWrapper>

      <ContentContainer>
        <Field label="What's the answer?" variant="quiz">
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write the answer"
          />
        </Field>

        <Field
          label="Give your hint"
          variant="quiz"
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Textarea
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            placeholder="Write your hint"
            style={{
              flex: 1,
            }}
          />
        </Field>

        <Field label="Add an image (optional)" variant="quiz">
          {imagePreview ? (
            <ImagePreviewContainer>
              <ImagePreview src={imagePreview} alt="Quiz preview" />
              <RemoveImageButton onClick={handleRemoveImage}>✕</RemoveImageButton>
            </ImagePreviewContainer>
          ) : (
            <ImageUploadLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <ImageUploadText>📷 Click to upload an image</ImageUploadText>
            </ImageUploadLabel>
          )}
        </Field>

        <Button disabled={!isSaveButtonActive} onClick={handleCreateQuiz} variant="quiz">
          Send
        </Button>
      </ContentContainer>
    </PageWrapper>
  );
}

export default CreateQuizPage;

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

const ImageUploadLabel = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border: 2px dashed #d5d5d5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;

  &:hover {
    border-color: #ffc90f;
    background-color: #fff8e2;
  }
`;

const ImageUploadText = styled.div`
  color: #979797;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: contain;
  background-color: #fafafa;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
