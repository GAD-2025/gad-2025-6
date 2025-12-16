/**
 * Parse timezone offset from format like "UTC+09:00" to minutes
 * @param {string} timezone - Timezone string in format "UTC+09:00"
 * @returns {number} - Offset in minutes
 */
export const parseTimezoneOffset = (timezone) => {
  if (!timezone) return 0;

  const timezoneMatch = timezone.match(/UTC([+-]\d{2}):(\d{2})/);
  if (!timezoneMatch) return 0;

  const offsetHours = parseInt(timezoneMatch[1]);
  const offsetMinutes = parseInt(timezoneMatch[2]);
  return offsetHours * 60 + (offsetHours >= 0 ? offsetMinutes : -offsetMinutes);
};

/**
 * Get current time in user's timezone
 * @param {string} timezone - Timezone string in format "UTC+09:00"
 * @returns {Date} - Current time adjusted to user's timezone
 */
export const getCurrentTimeInUserTimezone = (timezone) => {
  const now = new Date();
  const offsetMinutes = parseTimezoneOffset(timezone);
  return new Date(now.getTime() + offsetMinutes * 60 * 1000);
};

/**
 * Convert UTC date string to user's timezone
 * @param {string} dateString - UTC date string
 * @param {string} timezone - Timezone string in format "UTC+09:00"
 * @returns {Date|null} - Date adjusted to user's timezone, or null if dateString is invalid
 */
export const getDateInUserTimezone = (dateString, timezone) => {
  if (!dateString) return null;

  const date = new Date(dateString);
  const offsetMinutes = parseTimezoneOffset(timezone);
  return new Date(date.getTime() + offsetMinutes * 60 * 1000);
};

/**
 * Check if target date has been reached in given timezone
 * @param {string} targetDateString - Target date string
 * @param {string} timezone - Timezone string in format "UTC+09:00"
 * @returns {boolean} - True if target date has been reached
 */
export const hasReachedTargetDate = (targetDateString, timezone) => {
  if (!targetDateString) return false;

  const now = getCurrentTimeInUserTimezone(timezone);
  const targetDate = getDateInUserTimezone(targetDateString, timezone);

  return targetDate && now >= targetDate;
};

/**
 * Format date string in user's timezone to "YYYY. MM. DD HH:mm" format
 * @param {string} dateString - UTC date string
 * @param {string} timezone - Timezone string in format "UTC+09:00"
 * @returns {string} - Formatted date string
 */
export const formatDateTime = (dateString, timezone) => {
  if (!dateString || !timezone) return '';

  const localTime = getDateInUserTimezone(dateString, timezone);
  if (!localTime) return '';

  const year = localTime.getUTCFullYear();
  const month = String(localTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(localTime.getUTCDate()).padStart(2, '0');
  const hours = String(localTime.getUTCHours()).padStart(2, '0');
  const minutes = String(localTime.getUTCMinutes()).padStart(2, '0');

  return `${year}. ${month}. ${day} ${hours}:${minutes}`;
};

/**
 * Calculate remaining time until target date in user's timezone
 * @param {string} targetDateString - Target date string
 * @param {string} timezone - Timezone string in format "UTC+09:00"
 * @returns {{days: number, hours: number, minutes: number, isPast: boolean}} - Remaining time breakdown
 */
export const getRemainingTime = (targetDateString, timezone) => {
  if (!targetDateString || !timezone) {
    return { days: 0, hours: 0, minutes: 0, isPast: false };
  }

  const now = getCurrentTimeInUserTimezone(timezone);
  const targetDate = getDateInUserTimezone(targetDateString, timezone);

  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, isPast: false };
  }

  // Calculate difference in milliseconds
  const diffMs = targetDate - now;

  // Check if target date has passed
  if (diffMs < 0) {
    return { days: 0, hours: 0, minutes: 0, isPast: true };
  }

  // Convert to days, hours, minutes
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, isPast: false };
};
