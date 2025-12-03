/**
 * Date Helper Utilities
 * Pure functions for date formatting and manipulation
 */

import { format, parseISO } from 'date-fns';

/**
 * Format a date for week header display
 * @param {Date} date - The date to format
 * @returns {string} Formatted date (e.g., "Jan 15")
 */
export function formatWeekDate(date) {
  return format(date, 'MMM d');
}

/**
 * Format an ISO date string for display
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date (e.g., "Jan 15, 2025")
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  return format(parseISO(dateString), 'MMM d, yyyy');
}

/**
 * Get initials from a name
 * @param {string} name - Full name
 * @returns {string} Initials (e.g., "JD" from "John Doe")
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Count weekdays between two dates (excluding weekends)
 * @param {Date} startDate - Start date (inclusive)
 * @param {Date} endDate - End date (inclusive)
 * @param {boolean} includeWeekends - Whether to include weekends in count
 * @returns {number} Number of days (weekdays only if includeWeekends is false)
 */
export function countDaysBetween(startDate, endDate, includeWeekends = true) {
  if (includeWeekends) {
    // Simple calendar day difference
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Count only weekdays (Monday-Friday)
  let count = 0;
  const current = new Date(startDate);
  const end = new Date(endDate);

  current.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  while (current <= end) {
    const dayOfWeek = current.getDay();
    // 0 = Sunday, 6 = Saturday - skip these
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}
