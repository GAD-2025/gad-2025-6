import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ddayData } from '../../data/ddayData';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';

const DDayDetailPage = () => {
  const navigate = useNavigate();
  const { ddayId } = useParams();
  const location = useLocation();
  const itemFromState = location.state?.item;

  const item = itemFromState || ddayData.find((d) => d.id === parseInt(ddayId));

  if (!item) {
    return <div>D-day not found!</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate(`/dday/edit/${item.id}`, { state: { item } });
  };

  const renderDDay = (day) => {
    const today = new Date();
    const targetDate = new Date(day.date);
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

  return (
    <div
      style={{
        width: 390,
        height: 844,
        background: '#F9F9F9',
        overflow: 'hidden',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        display: 'inline-flex',
      }}
    >
      <div
        style={{
          width: 390,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 274,
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            alignSelf: 'stretch',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 24,
            display: 'flex',
          }}
        >
          <div
            style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {/* Header with Back Button and Edit Button */}
            <div
              data-property-1="Variant4"
              style={{
                alignSelf: 'stretch',
                height: 44,
                position: 'relative',
                overflow: 'hidden',
                marginTop: 24,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                data-property-1="icon_arrow_left"
                onClick={handleBackClick}
                style={{
                  position: 'absolute',
                  left: '24px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <ArrowLeftIcon />
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontFamily: 'Pretendard',
                  fontWeight: '700',
                }}
              >
                D-Day
              </div>
              <div
                onClick={handleEditClick}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#84AF25',
                  fontSize: 16,
                  fontFamily: 'Pretendard',
                  fontWeight: '700',
                }}
              >
                Edit
              </div>
            </div>
          </div>
          {/* D-Day Item Detail */}
          <div
            data-property-1="Default"
            style={{
              height: 422,
              padding: 24,
              background: '#F4F8EA',
              boxShadow: '0px 4px 10px 4px rgba(0, 0, 0, 0.04)',
              overflow: 'hidden',
              borderRadius: 16,
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
            }}
          >
            <div
              style={{
                width: 302,
                alignSelf: 'stretch',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                display: 'inline-flex',
              }}
            >
              <div
                style={{
                  alignSelf: 'stretch',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 24,
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    alignSelf: 'stretch',
                    color: '#444444',
                    fontSize: 36,
                    fontFamily: 'Pretendard',
                    fontWeight: '700',
                    wordWrap: 'break-word',
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    color: '#979797',
                    fontSize: 20,
                    fontFamily: 'Pretendard',
                    fontWeight: '400',
                    wordWrap: 'break-word',
                  }}
                >
                  {item.content}
                </div>
              </div>
              <div
                style={{
                  alignSelf: 'stretch',
                  textAlign: 'right',
                  color: '#979797',
                  fontSize: 19.93,
                  fontFamily: 'Pretendard Variable',
                  fontWeight: '700',
                  wordWrap: 'break-word',
                }}
              >
                {renderDDay(item)}
              </div>
            </div>
          </div>
        </div>
        {/* Home Indicator */}
        <div style={{ alignSelf: 'stretch', height: 36, position: 'relative' }}>
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
      </div>
    </div>
  );
};

export default DDayDetailPage;
