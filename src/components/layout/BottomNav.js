import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/icons/Home.svg';
import { ReactComponent as LetterIcon } from '../../assets/icons/Component 44.svg';
import { ReactComponent as QuizIcon } from '../../assets/icons/Component 47.svg';
import { ReactComponent as DDayIcon } from '../../assets/icons/Component 43.svg';
import { ReactComponent as MyIcon } from '../../assets/icons/My.svg';

const navItems = [
  { to: '/', icon: HomeIcon, label: 'Home' },
  { to: '/slow-letter', icon: LetterIcon, label: 'Letter' },
  { to: '/daily-quiz', icon: QuizIcon, label: 'Quiz' },
  { to: '/dday', icon: DDayIcon, label: 'D-day' },
  { to: '/my-page', icon: MyIcon, label: 'My' },
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
    <div style={{
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
    }}>
        {navItems.map(item => {
          const isActive = location.pathname === item.to;
          const color = isActive ? '#F8DA72' : '#33363F';
          const Icon = item.icon;

          return (
            <Link to={item.to} key={item.label} style={{...navItemStyle, color}}>
              <Icon style={{ width: 24, height: 24, fill: color }} />
              <div style={{ textAlign: 'center', fontSize: 12, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: '12px', wordWrap: 'break-word' }}>{item.label}</div>
            </Link>
          );
        })}
      <div style={{width: 390, height: 36, left: 0, top: 52, position: 'absolute', pointerEvents: 'none'}}>
        <div style={{width: 134, height: 5, left: 128, top: 23, position: 'absolute', background: 'black', borderRadius: 100}} />
      </div>
    </div>
  );
};

export default BottomNav;
