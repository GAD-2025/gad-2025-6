import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import backgroundDay from '../../assets/images/background-day.png';
import backgroundNight from '../../assets/images/background-night.png';
import { useAuth } from '../../context/AuthContext';
import { getPartnerByMatchingId } from '../../api/auth';

const MainLayout = () => {
  const [partnerTimezone, setPartnerTimezone] = React.useState('');
  const location = useLocation();
  const { user } = useAuth();

  const isHomePage = location.pathname === '/home';

  useEffect(() => {
    const fetchPartnerInfo = async () => {
      try {
        const userId = user?.id;
        const matchingId = user?.matching_id;

        const result = await getPartnerByMatchingId(matchingId, userId);
        if (result.success) {
          setPartnerTimezone(result.partner.timezone);
          localStorage.setItem('partner', JSON.stringify(result.partner));
        } else {
          console.error('Failed to fetch partner info');
        }
      } catch (error) {
        console.error('Error fetching partner info:', error);
      }
    };

    if (!user) {
      return;
    }

    const storedPartner = localStorage.getItem('partner');

    if (storedPartner) {
      try {
        const partner = JSON.parse(storedPartner);
        setPartnerTimezone(partner.timezone);
      } catch (error) {
        console.error('Error parsing partner data:', error);
        fetchPartnerInfo();
      }
    } else {
      fetchPartnerInfo();
    }
  }, [user]);

  const isPartnerDaytime = () => {
    if (!partnerTimezone) return true;

    try {
      // UTC 오프셋 형식(예: "UTC+09:00")을 파싱
      const utcOffsetMatch = partnerTimezone.match(/UTC([+-]\d{2}):(\d{2})/);

      if (utcOffsetMatch) {
        // UTC 오프셋으로 시간 계산
        const offsetHours = parseInt(utcOffsetMatch[1]);
        const offsetMinutes = parseInt(utcOffsetMatch[2]);
        const totalOffsetMinutes =
          offsetHours * 60 + (offsetHours >= 0 ? offsetMinutes : -offsetMinutes);

        const now = new Date();
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
        const partnerTime = new Date(utcTime + totalOffsetMinutes * 60000);
        const hour = partnerTime.getUTCHours();

        // 6시부터 18시까지를 낮으로 판단
        return hour >= 6 && hour < 18;
      } else {
        // IANA 타임존 형식(예: "Asia/Seoul")인 경우
        const partnerTime = new Date().toLocaleString('en-US', { timeZone: partnerTimezone });
        const partnerDate = new Date(partnerTime);
        const hour = partnerDate.getHours();
        // 6시부터 18시까지를 낮으로 판단
        return hour >= 6 && hour < 18;
      }
    } catch (error) {
      console.error('Error calculating partner time:', error);
      return true;
    }
  };

  const getBackgroundImage = () => {
    if (!isHomePage || !partnerTimezone) return 'none';
    return isPartnerDaytime() ? `url(${backgroundDay})` : `url(${backgroundNight})`;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 600,
        width: '100vw',
        height: '100dvh',
        position: 'relative',
        backgroundImage: getBackgroundImage(),
        backgroundSize: isHomePage ? 'cover' : 'auto',
        backgroundPosition: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px 20px',
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
