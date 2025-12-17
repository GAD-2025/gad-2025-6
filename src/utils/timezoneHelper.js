/**
 * Get user timezone from localStorage
 * @returns {string|null} - Timezone string in format "UTC+09:00" or null
 */
export const getUserTimezone = () => {
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.timezone;
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
  return null;
};

/**
 * Get partner timezone from localStorage
 * @returns {string|null} - Timezone string in format "UTC+09:00" or null
 */
export const getPartnerTimezone = () => {
  try {
    const partnerData = localStorage.getItem('partner');
    if (partnerData) {
      const partner = JSON.parse(partnerData);
      return partner.timezone;
    }
  } catch (error) {
    console.error('Error parsing partner data:', error);
  }
  return null;
};

/**
 * Parse timezone offset from format like "UTC+09:00" to milliseconds
 * @param {string} timezone - Timezone string in format "UTC+09:00"
 * @returns {number} - Offset in milliseconds
 */
export const parseTimezoneOffset = (timezone) => {
  if (!timezone) return 0;

  const timezoneMatch = timezone.match(/UTC([+-]\d{2}):(\d{2})/);
  if (!timezoneMatch) return 0;

  const offsetHours = parseInt(timezoneMatch[1]);
  const offsetMinutes = parseInt(timezoneMatch[2]);
  const totalMinutes = offsetHours * 60 + (offsetHours >= 0 ? offsetMinutes : -offsetMinutes);
  return totalMinutes * 60 * 1000; // Convert to milliseconds
};

/**
 * Convert date string to Date object with timezone offset applied
 * @param {string} dateString - Date string from server (UTC time)
 * @param {string|null} timezone - Optional timezone string (if null, uses user's timezone)
 * @returns {Date|null} - Date object with timezone offset applied
 */
export const toLocalDate = (dateString, timezone = null) => {
  if (!dateString) return null;

  // Use provided timezone or default to user's timezone
  const tz = timezone || getUserTimezone();
  if (!tz) return new Date(dateString);

  // Parse the UTC date string
  // Format: "2025-12-17 09:40:57" -> treat as UTC by appending 'Z'
  const utcDateString = dateString.replace(' ', 'T') + 'Z';
  const utcDate = new Date(utcDateString);

  // Get timezone offset in milliseconds
  const offset = parseTimezoneOffset(tz);

  // Apply timezone offset to UTC time
  return new Date(utcDate.getTime() + offset);
};

/**
 * Format date string to "YYYY. MM. DD HH:mm" format with user's timezone
 * @param {string} dateString - Date string from server (UTC time)
 * @returns {string} - Formatted date string in user's timezone
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';

  // Convert UTC time to user's local time
  const localDate = toLocalDate(dateString);
  if (!localDate) return '';

  // Extract date parts in UTC (because toLocalDate already added the offset)
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(localDate.getUTCDate()).padStart(2, '0');
  const hours = String(localDate.getUTCHours()).padStart(2, '0');
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');

  return `${year}. ${month}. ${day} ${hours}:${minutes}`;
};

/**
 * Format date string to "YYYY. MMM. DD" format with user's timezone
 * @param {string} dateString - Date string from server (UTC time)
 * @returns {string} - Formatted date string in user's timezone
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';

  // Convert UTC time to user's local time
  const localDate = toLocalDate(dateString);
  if (!localDate) return '';

  // Extract date parts in UTC (because toLocalDate already added the offset)
  const year = localDate.getUTCFullYear();
  const monthIndex = localDate.getUTCMonth();
  const day = String(localDate.getUTCDate()).padStart(2, '0');

  // Get month abbreviation
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[monthIndex];

  return `${year}. ${month}. ${day}`;
};

/**
 * Calculate remaining time until target date with timezone offset
 * @param {string} targetDateString - Target date string from server
 * @param {boolean} usePartnerTimezone - If true, uses partner's timezone instead of user's
 * @returns {{days: number, hours: number, minutes: number, isPast: boolean}} - Remaining time breakdown
 */
export const getRemainingTime = (targetDateString, usePartnerTimezone = false) => {
  if (!targetDateString) {
    return { days: 0, hours: 0, minutes: 0, isPast: false };
  }

  // Get appropriate timezone
  const timezone = usePartnerTimezone ? getPartnerTimezone() : getUserTimezone();

  // Convert target date from UTC to specified timezone
  const targetDate = toLocalDate(targetDateString, timezone);

  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, isPast: false };
  }

  // Get current time in UTC and apply the same timezone offset
  const now = new Date();
  const offset = parseTimezoneOffset(timezone);
  const nowWithOffset = new Date(now.getTime() + offset);

  const diffMs = targetDate - nowWithOffset;

  if (diffMs < 0) {
    return { days: 0, hours: 0, minutes: 0, isPast: true };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, isPast: false };
};

/**
 * Check if target date has been reached with timezone offset
 * @param {string} targetDateString - Target date string from server
 * @param {boolean} usePartnerTimezone - If true, uses partner's timezone instead of user's
 * @returns {boolean} - True if target date has been reached
 */
export const hasReachedTargetDate = (targetDateString, usePartnerTimezone = false) => {
  if (!targetDateString) return false;

  // Get appropriate timezone
  const timezone = usePartnerTimezone ? getPartnerTimezone() : getUserTimezone();

  // Convert target date from UTC to specified timezone
  const targetDate = toLocalDate(targetDateString, timezone);

  // Get current time in UTC and apply the same timezone offset
  const now = new Date();
  const offset = parseTimezoneOffset(timezone);
  const nowWithOffset = new Date(now.getTime() + offset);

  return targetDate && nowWithOffset >= targetDate;
};
