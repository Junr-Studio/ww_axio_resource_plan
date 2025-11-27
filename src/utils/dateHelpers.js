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
