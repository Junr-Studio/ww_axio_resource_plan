// Timeline defaults
export const DEFAULT_NUMBER_OF_DAYS = 84; // ~12 weeks
export const DEFAULT_DAY_WIDTH = '40px';
export const DEFAULT_RESOURCE_WIDTH = '200px';

// Row and lane sizing
export const LANE_HEIGHT = 28; // Height of each assignment lane
export const ROW_FOOTER_HEIGHT = 18; // Height of capacity footer
export const MIN_ROW_HEIGHT = 60; // Minimum height for a resource row
export const ROW_PADDING = 16; // Padding for row calculations

// Assignment bar styling
export const ASSIGNMENT_BAR_HEIGHT = 24; // Height of assignment bars
export const ASSIGNMENT_LABEL_MAX_OFFSET = 150; // Max offset for sticky labels

// Capacity thresholds (percentages)
export const CAPACITY_FULL_THRESHOLD = 100; // 100% or more
export const CAPACITY_HIGH_THRESHOLD = 80; // 80-99%
export const CAPACITY_MEDIUM_THRESHOLD = 50; // 50-79%

// Capacity CSS classes
export const CAPACITY_CLASS_FULL = 'capacity-full';
export const CAPACITY_CLASS_HIGH = 'capacity-high';
export const CAPACITY_CLASS_MEDIUM = 'capacity-medium';

// Z-index layers
export const Z_INDEX_RESOURCE_COLUMN = 100;
export const Z_INDEX_HEADER = 11;
export const Z_INDEX_HEADER_CONTAINER = 10;
export const Z_INDEX_ASSIGNMENT_BAR = 1;
export const Z_INDEX_ASSIGNMENT_BAR_HOVER = 5;
export const Z_INDEX_TOOLTIP = 1000;

// Colors
export const DEFAULT_BG_COLOR = '#ffffff';
export const DEFAULT_HEADER_BG_COLOR = '#f9fafb';
export const DEFAULT_BORDER_COLOR = '#e5e7eb';
export const DEFAULT_TEXT_COLOR = '#111827';

// Project colors (for mock data and defaults)
export const PROJECT_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
];
