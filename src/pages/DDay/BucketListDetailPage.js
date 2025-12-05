import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBucketListById, deleteBucketList } from '../../api/bucketlist';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg'; // Assuming this is the arrow left icon

const BucketListDetailPage = () => {
  const navigate = useNavigate();
  const { bucketListId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBucketList = async () => {
      if (!bucketListId) {
        setError("Bucket List ID is missing.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getBucketListById(bucketListId);
        if (response.success) {
          setItem(response.bucketlist);
        } else {
          setError(response.message || 'Failed to fetch Bucket List details.');
        }
      } catch (err) {
        setError('An error occurred while fetching Bucket List details.');
        console.error("Error fetching Bucket List:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBucketList();
  }, [bucketListId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate(`/dday/bucket-list/edit/${item.id}`, { state: { item } });
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this Bucket List item?')) {
      try {
        const response = await deleteBucketList(item.id);
        if (response.success) {
          alert('Bucket List item deleted successfully!');
          navigate('/dday'); // Navigate back to the list
        } else {
          alert(`Failed to delete Bucket List item: ${response.message}`);
        }
      } catch (err) {
        console.error("Error deleting Bucket List:", err);
        alert('An error occurred while deleting the Bucket List item.');
      }
    }
  };

  if (loading) {
    return <div>Loading Bucket List details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Bucket List item not found.</div>;
  }

  const renderDateFormat = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div style={{width: 390, height: 844, background: '#F9F9F9', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
      <div style={{width: 390, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 274, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 24, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {/* Status Bar */}
            <div data-back="False" data-call-in="False" data-notch="True" data-theme="Dark" data-wifi="True" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 17.48, height: 12.62, left: 314.26, top: 17.48, position: 'absolute', background: 'var(--Light-Ink, black)'}} />
              <div style={{width: 25.83, height: 12.14, left: 337.56, top: 17.48, position: 'absolute'}}>
                <div style={{width: 19.61, height: 8.40, left: 1.87, top: 1.87, position: 'absolute', background: 'var(--Light-Ink, black)'}} />
              </div>
              <div style={{left: 36.87, top: 15.54, position: 'absolute', textAlign: 'center', color: 'var(--Light-Ink, black)', fontSize: 17.48, fontFamily: 'SF Pro Display', fontWeight: '600', lineHeight: 17.48, wordWrap: 'break-word'}}>19:02</div>
            </div>
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
                {/* ArrowLeftIcon needs to be imported as a component or replaced with a div */}
                <ArrowLeftIcon />
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontFamily: 'Pretendard',
                  fontWeight: '700',
                }}
              >
                Bucket List
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
          {/* Bucket List Item Detail */}
          <div data-property-1="Default" style={{height: 422, padding: 24, background: '#F4F8EA', boxShadow: '0px 4px 10px 4px rgba(0, 0, 0, 0.04)', overflow: 'hidden', borderRadius: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
            <div style={{width: 302, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', display: 'inline-flex'}}>
              <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                <div style={{alignSelf: 'stretch', color: '#444444', fontSize: 36, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{item.title}</div>
                <div style={{alignSelf: 'stretch', color: '#979797', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>{item.content}</div>
              </div>
              <div style={{alignSelf: 'stretch', textAlign: 'right', color: '#979797', fontSize: 19.93, fontFamily: 'Pretendard Variable', fontWeight: '700', wordWrap: 'break-word'}}>Created Date: {renderDateFormat(item.created_at)}</div>
            </div>
          </div>
        </div>
        {/* Home Indicator */}
        <div style={{alignSelf: 'stretch', height: 36, position: 'relative'}}>
          <div style={{width: 134, height: 5, left: 128, top: 23, position: 'absolute', background: 'black', borderRadius: 100}} />
        </div>
      </div>
    </div>
  );
};

export default BucketListDetailPage;
