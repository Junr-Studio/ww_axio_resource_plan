/**
 * Color Helpers - Generate unique colors for projects
 */

// Predefined color palette (vibrant, distinguishable colors)
const COLOR_PALETTE = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Amber
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#14b8a6', // Teal
  '#a855f7', // Violet
  '#f43f5e', // Rose
  '#0ea5e9', // Sky
  '#22c55e', // Green (lighter)
  '#eab308', // Yellow
  '#d946ef', // Fuchsia
  '#64748b', // Slate
];

/**
 * Generate a consistent color for a project ID using hash
 * @param {string} projectId - The project ID
 * @returns {string} Hex color code
 */
function hashStringToColor(projectId) {
  if (!projectId) return COLOR_PALETTE[0];

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < projectId.length; i++) {
    hash = projectId.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use hash to pick color from palette
  const index = Math.abs(hash) % COLOR_PALETTE.length;
  return COLOR_PALETTE[index];
}

/**
 * Assign colors to projects
 * Projects with existing colors keep them, null colors get unique colors
 * @param {Array} projects - Array of project objects
 * @returns {Map} Map of projectId -> color
 */
export function assignProjectColors(projects) {
  const colorMap = new Map();

  if (!Array.isArray(projects)) return colorMap;

  projects.forEach(project => {
    if (!project?.id) return;

    // Use existing color if present, otherwise generate one
    const color = project.color || hashStringToColor(project.id);
    colorMap.set(project.id, color);
  });

  return colorMap;
}

/**
 * Get color for a project ID
 * @param {string} projectId - The project ID
 * @param {Map} colorMap - Map of projectId -> color
 * @returns {string} Hex color code
 */
export function getProjectColor(projectId, colorMap) {
  return colorMap.get(projectId) || hashStringToColor(projectId) || COLOR_PALETTE[0];
}
