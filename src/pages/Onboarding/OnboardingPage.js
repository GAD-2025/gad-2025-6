import React from 'react';
import on1 from '../../assets/images/onboarding1.png';
import on2 from '../../assets/images/onboarding2.png';
import on3 from '../../assets/images/onboarding3.png';

const onBoardingData = [
  {
    imgSrc: on1,
    title: 'Send a “Slow Letter”',
    subtitle1: 'Delayed Delivery:',
    description1:
      'Write a letter now, schedule the delivery for later. Turn waiting into exciting anticipation.',
    subtitle2: 'Deepen Emotions:',
    description2:
      'Skip instant replies. Deliver your true feelings when they matter most, bridging the emotional distance.',
  },
  {
    imgSrc: on2,
    title: 'Learn your partner’s word',
    subtitle1: 'Learn from Each Other:',
    description1:
      "Exchange fun, personalized quizzes daily. Learn your partner's language and culture naturally.",
    subtitle2: 'Bridge the Gap:',
    description2:
      'Overcome language and cultural differences. Deepen mutual understanding beyond simple translation.',
  },
  {
    imgSrc: on3,
    title: 'Your D-day & Bucket List',
    subtitle1: 'Visualize the Future:',
    description1:
      'Set your next meeting date (D-day). Watch the countdown and reduce relationship uncertainty.',
    subtitle2: 'Dream Together:',
    description2:
      "Co-create a Bucket List of activities. Turn the 'waiting period' into time spent preparing for shared goals.",
  },
];

const OnboardingPage = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    if (currentIndex < onBoardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const currentOnboarding = onBoardingData[currentIndex];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'var(--ivory, #FCF4EC)',
        overflow: 'hidden',
      }}
    >
      <div
        data-property-1="Variant2"
        onClick={handleNext}
        style={{
          width: 112,
          height: 42,
          paddingLeft: 74,
          paddingRight: 74,
          paddingTop: 18,
          paddingBottom: 18,
          left: 72,
          top: 755,
          position: 'absolute',
          background: 'var(--ivory, #FCF4EC)',
          overflow: 'hidden',
          borderRadius: 28,
          outline: '1px #D5D5D5 solid',
          outlineOffset: '-1px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            color: '#D5D5D5',
            fontSize: 20,
            fontFamily: 'Pretendard',
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          {currentIndex === onBoardingData.length - 1 ? '시작하기' : '옆으로'}
        </div>
      </div>
      <div style={{ width: 390, height: 36, left: 0, top: 808, position: 'absolute' }}>
        <div
          style={{
            width: 134,
            height: 5,
            left: 128,
            top: 23,
            position: 'absolute',
            background: 'black',
            borderRadius: 100,
          }}
        />
      </div>
      <div
        style={{
          left: 77,
          top: 463,
          position: 'absolute',
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: 'black',
          fontSize: 24,
          fontFamily: 'Pretendard',
          fontWeight: '700',
          wordWrap: 'break-word',
        }}
      >
          {currentOnboarding.title}
      </div>
      <div style={{ width: 350, left: 20, top: 522, position: 'absolute' }}>
        <span
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'Pretendard',
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          {currentOnboarding.subtitle1} <br />
        </span>
        <span
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'Pretendard',
            fontWeight: '400',
            wordWrap: 'break-word',
          }}
        >
          {currentOnboarding.description1}
          <br />
          <br />
        </span>
        <span
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'Pretendard',
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          {currentOnboarding.subtitle2} <br />
        </span>
        <span
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'Pretendard',
            fontWeight: '400',
            wordWrap: 'break-word',
          }}
        >
          {currentOnboarding.description2}
        </span>
      </div>
      <div
        style={{
          left: 153,
          top: 702,
          position: 'absolute',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 8,
          display: 'inline-flex',
        }}
      >
        {onBoardingData.map((_, index) => (
          <div
            key={index}
            style={{
              width: currentIndex === index ? 25 : 12,
              height: 12,
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                position: 'absolute',
                background: currentIndex === index ? '#D58699' : '#E3E3E3',
                borderRadius: 24,
              }}
            />
          </div>
        ))}
      </div>
      <img
        style={{
          width: 390,
          height: 270,
          left: 0,
          top: 153,
          position: 'absolute',
        }}
        src={currentOnboarding.imgSrc}
      />
    </div>
  );
};

export default OnboardingScreen;