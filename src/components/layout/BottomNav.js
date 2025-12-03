import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as HomeDefault } from '../../assets/icons/home-default.svg';
import { ReactComponent as HomeActive } from '../../assets/icons/home-active.svg';
import { ReactComponent as LetterDefault } from '../../assets/icons/letter-default.svg';
import { ReactComponent as LetterActive } from '../../assets/icons/letter-active.svg';
import { ReactComponent as QuizDefault } from '../../assets/icons/quiz-default.svg';
import { ReactComponent as QuizActive } from '../../assets/icons/quiz-active.svg';
import { ReactComponent as DayDefault } from '../../assets/icons/day-default.svg';
import { ReactComponent as DayActive } from '../../assets/icons/day-active.svg';
import { ReactComponent as UserDefault } from '../../assets/icons/user-default.svg';
import { ReactComponent as UserActive } from '../../assets/icons/user-active.svg';

const navItems = [
  { to: '/home', icon: HomeDefault, activeIcon: HomeActive, label: 'Home' },
  { to: '/slow-letter', icon: LetterDefault, activeIcon: LetterActive, label: 'Letter' },
  { to: '/daily-quiz', icon: QuizDefault, activeIcon: QuizActive, label: 'Quiz' },
  { to: '/dday', icon: DayDefault, activeIcon: DayActive, label: 'D-day' },
  { to: '/my-page', icon: UserDefault, activeIcon: UserActive, label: 'My' },
];

const BottomNav = () => {
  const location = useLocation();

  const navItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    flex: 1,
  };

  return (
    <div
      style={{
        width: '100%',
        height: 88,
        position: 'absolute',
        left: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.90)',
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.10)',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backdropFilter: 'blur(15px)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 12,
        boxSizing: 'border-box',
      }}
    >
      {navItems.map((item) => {
        const isActive =
          item.to === '/' ? location.pathname === item.to : location.pathname.startsWith(item.to);

        const Icon = isActive ? item?.activeIcon : item.icon;

        return (
          <Link to={item.to} key={item.label} style={{ ...navItemStyle }}>
            <Icon style={{ width: 24, height: 24 }} />
            <div
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontFamily: 'Pangolin',
                fontWeight: '400',
                lineHeight: '12px',
                wordWrap: 'break-word',
              }}
            >
              {item.label}
            </div>
          </Link>
        );
      })}
      <div
        style={{
          width: 390,
          height: 36,
          left: 0,
          top: 52,
          position: 'absolute',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: 134,
            height: 5,
            left: 128,
            top: 23,
            position: 'absolute',
            background: 'white',
            borderRadius: 100,
          }}
        />
      </div>
    </div>
  );
};

export default BottomNav;
