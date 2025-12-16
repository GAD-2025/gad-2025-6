import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
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

const NavContainer = styled.div`
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 20px;
  box-sizing: border-box;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  flex: 1;
  color: #2a343d;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

const NavLabel = styled.div`
  text-align: center;
  font-size: 12px;
  font-family: 'Pangolin';
  font-weight: 400;
  line-height: 12px;
  word-wrap: break-word;
  color: #000;
`;

const navItems = [
  { to: '/home', icon: HomeDefault, activeIcon: HomeActive, label: 'Home' },
  { to: '/slow-letter', icon: LetterDefault, activeIcon: LetterActive, label: 'Letter' },
  { to: '/daily-quiz', icon: QuizDefault, activeIcon: QuizActive, label: 'Quiz' },
  { to: '/dday', icon: DayDefault, activeIcon: DayActive, label: 'D-day' },
  { to: '/my-page', icon: UserDefault, activeIcon: UserActive, label: 'My' },
];

const BottomNav = () => {
  const location = useLocation();

  if (
    [
      '/signin',
      '/signup',
      '/signup/password',
      '/signup/invitation',
      '/registration',
      '/signup/country',
    ].includes(location.pathname)
  ) {
    return null;
  }

  return (
    <NavContainer>
      {navItems.map((item) => {
        const isActive =
          item.to === '/' ? location.pathname === item.to : location.pathname.startsWith(item.to);

        const Icon = isActive ? item?.activeIcon : item.icon;

        return (
          <NavLink to={item.to} key={item.label}>
            <IconWrapper>
              <Icon style={{ width: '100%', height: '100%' }} />
            </IconWrapper>
            <NavLabel>{item.label}</NavLabel>
          </NavLink>
        );
      })}
    </NavContainer>
  );
};

export default BottomNav;
