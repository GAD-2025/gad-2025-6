import { useMemo } from 'react';
import { styled } from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { ReactComponent as ActiveIcon } from '../../assets/icons/letter-status-active.svg';
import { ReactComponent as FocusedIcon } from '../../assets/icons/letter-status-focus.svg';
import { ReactComponent as InactiveIcon } from '../../assets/icons/letter-status-inactive.svg';
import { getCurrentTimeInUserTimezone, getDateInUserTimezone } from '../../utils/timezoneHelper';

const StatusItem = ({
  hasLeftLine = true,
  hasRightLine = true,
  prevActive = false,
  nextActive = false,
  status,
  text,
}) => {
  return (
    <ItemWrapper $status={status}>
      <StatusLineContainer>
        {hasLeftLine && <LeftLine $active={prevActive} />}
        {hasRightLine && <RightLine $active={nextActive} />}
        <ItemIconWrapper $focused={status === 'focused'}>
          {{ active: <ActiveIcon />, focused: <FocusedIcon />, inactive: <InactiveIcon /> }[status]}
        </ItemIconWrapper>
      </StatusLineContainer>
      {status === 'active' && <ActiveText>{text}</ActiveText>}
      {status === 'focused' && <FocusingText>{text}</FocusingText>}
      {status === 'inactive' && <InactiveText>{text}</InactiveText>}
    </ItemWrapper>
  );
};

// Calculate letter status based on target_date and is_read
const calculateLetterStatus = (letter, userTimezone) => {
  if (!letter) return 'delivering';

  const now = getCurrentTimeInUserTimezone(userTimezone);
  const targetDate = getDateInUserTimezone(letter.target_date, userTimezone);

  // Read 상태: is_read가 1
  if (letter.is_read === 1) {
    return 'read';
  }

  // Delivered 상태: target_date에 도달했고 is_read가 0
  if (targetDate && now >= targetDate) {
    return 'delivered';
  }

  // Delivering 상태: target_date에 도달하지 않음
  return 'delivering';
};

// Get status configuration for each StatusItem
const getStatusConfig = (currentStatus) => {
  const statusOrder = ['sent', 'delivering', 'delivered', 'read'];
  const currentIndex = statusOrder.indexOf(currentStatus);

  return {
    sent: {
      status: 'active', // Sent는 항상 active
      hasLeftLine: false,
      nextActive: currentIndex >= 0, // 다음 단계가 시작되었으면 선 활성화
    },
    delivering: {
      status: currentStatus === 'delivering' ? 'focused' :
              currentIndex > statusOrder.indexOf('delivering') ? 'active' : 'inactive',
      prevActive: true, // Sent는 항상 완료되었으므로
      nextActive: currentIndex > statusOrder.indexOf('delivering'),
    },
    delivered: {
      status: currentStatus === 'delivered' ? 'focused' :
              currentIndex > statusOrder.indexOf('delivered') ? 'active' : 'inactive',
      prevActive: currentIndex > statusOrder.indexOf('delivering'),
      nextActive: currentIndex > statusOrder.indexOf('delivered'),
    },
    read: {
      status: currentStatus === 'read' ? 'focused' : 'inactive',
      hasRightLine: false,
      prevActive: currentIndex > statusOrder.indexOf('delivered'),
    },
  };
};

const LetterStatus = ({ letter }) => {
  const { user } = useAuth();

  // Calculate current letter status
  const currentStatus = useMemo(
    () => calculateLetterStatus(letter, user?.timezone),
    [letter, user?.timezone]
  );

  // Get status configuration for all items
  const statusConfig = useMemo(
    () => getStatusConfig(currentStatus),
    [currentStatus]
  );

  return (
    <StatusWrapper>
      <StatusItem
        hasLeftLine={statusConfig.sent.hasLeftLine}
        nextActive={statusConfig.sent.nextActive}
        status={statusConfig.sent.status}
        text="Sent"
      />
      <StatusItem
        prevActive={statusConfig.delivering.prevActive}
        nextActive={statusConfig.delivering.nextActive}
        status={statusConfig.delivering.status}
        text="Delivering"
      />
      <StatusItem
        prevActive={statusConfig.delivered.prevActive}
        nextActive={statusConfig.delivered.nextActive}
        status={statusConfig.delivered.status}
        text="Delivered"
      />
      <StatusItem
        hasRightLine={statusConfig.read.hasRightLine}
        prevActive={statusConfig.read.prevActive}
        status={statusConfig.read.status}
        text="Read"
      />
    </StatusWrapper>
  );
};

export default LetterStatus;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $status }) => ($status === 'focused' ? '4px' : '6px')};
  flex: 1 0 0;
`;

const StatusLineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  position: relative;
`;

const LeftLine = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  height: ${({ $active }) => ($active ? '2px' : '1px')};
  background-color: ${({ $active }) => ($active ? '#A17E66' : '#E0E0E0')};
  z-index: 0;
`;

const RightLine = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  height: ${({ $active }) => ($active ? '2px' : '1px')};
  background-color: ${({ $active }) => ($active ? '#A17E66' : '#E0E0E0')};
`;

const ItemIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 1;
  background: ${({ $focused }) => ($focused ? '#A17E66' : 'transparent')};
`;

const ActiveText = styled.div`
  color: #a17e66;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const FocusingText = styled.div`
  display: flex;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #a17e66;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const InactiveText = styled.div`
  color: var(--gray-5, #878787);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StatusWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 0;
  align-items: flex-start;
  border-radius: 30px;
  background: #fff7ef;
`;
