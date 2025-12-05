import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDdayById, deleteDday } from '../../api/dday'; // Import real API calls
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';

const DDayDetailPage = () => {
  const navigate = useNavigate();
  const { ddayId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDday = async () => {
      if (!ddayId) {
        setError("D-day ID is missing.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getDdayById(ddayId);
        if (response.success) {
          setItem(response.dday);
        } else {
          setError(response.message || 'Failed to fetch D-day details.');
        }
      } catch (err) {
        setError('An error occurred while fetching D-day details.');
        console.error("Error fetching D-day:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDday();
  }, [ddayId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate(`/dday/edit/${item.id}`, { state: { item } });
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this D-day event?')) {
      try {
        const response = await deleteDday(item.id);
        if (response.success) {
          alert('D-day event deleted successfully!');
          navigate('/dday'); // Navigate back to the list
        } else {
          alert(`Failed to delete D-day event: ${response.message}`);
        }
      } catch (err) {
        console.error("Error deleting D-day:", err);
        alert('An error occurred while deleting the D-day event.');
      }
    }
  };

  const renderDDay = (day) => {
    const today = new Date();
    const targetDate = new Date(day.date);
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
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

  if (loading) {
    return <div>Loading D-day details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>D-day not found.</div>;
  }

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
            {/* Header with Back Button, Edit Button and Delete Button */}
            <div
              data-property-1="Variant4"
              style={{
                alignSelf: 'stretch',
                height: 44,
                position: 'relative',
                overflow: 'hidden',
                marginTop: 24,
                display: 'flex',
                justifyContent: 'space-between', // Changed to space-between
                alignItems: 'center',
                padding: '0 20px', // Added padding
              }}
            >
              <div
                data-property-1="icon_arrow_left"
                onClick={handleBackClick}
                style={{
                  cursor: 'pointer',
                  position: 'absolute', // Make it absolute
                  left: '20px', // Position from left
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
              <div style={{ display: 'flex', gap: '15px' }}> {/* Container for Edit and Delete */}
                <div
                  onClick={handleEditClick}
                  style={{
                    cursor: 'pointer',
                    color: '#84AF25',
                    fontSize: 16,
                    fontFamily: 'Pretendard',
                    fontWeight: '700',
                  }}
                >
                  Edit
                </div>
                <div
                  onClick={handleDeleteClick}
                  style={{
                    cursor: 'pointer',
                    color: '#FF4D4D', // Red color for delete
                    fontSize: 16,
                    fontFamily: 'Pretendard',
                    fontWeight: '700',
                  }}
                >
                  Delete
                </div>
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
