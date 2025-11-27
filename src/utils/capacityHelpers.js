import {
  CAPACITY_FULL_THRESHOLD,
  CAPACITY_HIGH_THRESHOLD,
  CAPACITY_MEDIUM_THRESHOLD,
  CAPACITY_CLASS_FULL,
  CAPACITY_CLASS_HIGH,
  CAPACITY_CLASS_MEDIUM,
} from './constants';

/**
 * Get CSS class based on capacity percentage
 * @param {number} capacityPercentage - The capacity percentage (0-100+)
 * @returns {string} CSS class name
 */
export function getCapacityClass(capacityPercentage) {
  if (capacityPercentage >= CAPACITY_FULL_THRESHOLD) {
    return CAPACITY_CLASS_FULL;
  }
  if (capacityPercentage >= CAPACITY_HIGH_THRESHOLD) {
    return CAPACITY_CLASS_HIGH;
  }
  if (capacityPercentage >= CAPACITY_MEDIUM_THRESHOLD) {
    return CAPACITY_CLASS_MEDIUM;
  }
  return '';
}

/**
 * Get capacity info object with percentage and CSS class
 * @param {number} capacityPercentage - The capacity percentage (0-100+)
 * @returns {Object} Object with capacity and cssClass properties
 */
export function getCapacityInfo(capacityPercentage) {
  return {
    capacity: capacityPercentage,
    cssClass: getCapacityClass(capacityPercentage),
  };
}

/**
 * Check if a date falls within a date range [start, end)
 * End date is exclusive
 * @param {Date} date - The date to check
 * @param {Date} startDate - The start date of the range
 * @param {Date} endDate - The end date of the range (exclusive)
 * @returns {boolean} True if date is within range
 */
export function isDateInRange(date, startDate, endDate) {
  return date >= startDate && date < endDate;
}

/**
 * Check if two date ranges overlap
 * @param {Date} start1 - Start of first range
 * @param {Date} end1 - End of first range (exclusive)
 * @param {Date} start2 - Start of second range
 * @param {Date} end2 - End of second range (exclusive)
 * @returns {boolean} True if ranges overlap
 */
export function doRangesOverlap(start1, end1, start2, end2) {
  return (
    (start1 >= start2 && start1 < end2) ||
    (end1 > start2 && end1 <= end2) ||
    (start1 <= start2 && end1 >= end2)
  );
}
