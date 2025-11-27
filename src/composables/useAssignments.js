import { parseISO, differenceInDays } from 'date-fns';
import { doRangesOverlap } from '../utils/capacityHelpers';
import { ASSIGNMENT_BAR_HEIGHT, LANE_HEIGHT } from '../utils/constants';

/**
 * Composable for assignment processing
 * Handles lane calculation and assignment layout
 */
export function useAssignments(activeAssignments, activeProjects, timelineDays, getCapacityStatusInfo) {
  /**
   * Get all assignments for a specific resource with lane assignments
   * Uses a greedy algorithm to pack assignments into lanes without overlap
   * @param {string} resourceId - The resource ID
   * @returns {Array} Sorted assignments with lane property
   */
  const getResourceAssignments = (resourceId) => {
    const assignments = activeAssignments.value.filter((a) => a.resource_id === resourceId);

    // Sort by start date for consistent lane assignment
    const sortedAssignments = [...assignments].sort((a, b) => {
      return new Date(a.start_date) - new Date(b.start_date);
    });

    // Assign lanes using greedy algorithm
    const lanes = [];

    sortedAssignments.forEach((assignment) => {
      const assignmentStart = parseISO(assignment.start_date);
      const assignmentEnd = parseISO(assignment.end_date);

      let laneIndex = 0;
      let laneFound = false;

      // Try to find a lane where this assignment doesn't overlap
      while (!laneFound) {
        if (!lanes[laneIndex]) {
          lanes[laneIndex] = [];
        }

        const hasOverlap = lanes[laneIndex].some((existingAssignment) => {
          const existingStart = parseISO(existingAssignment.start_date);
          const existingEnd = parseISO(existingAssignment.end_date);
          return doRangesOverlap(assignmentStart, assignmentEnd, existingStart, existingEnd);
        });

        if (!hasOverlap) {
          lanes[laneIndex].push(assignment);
          assignment.lane = laneIndex;
          laneFound = true;
        } else {
          laneIndex++;
        }
      }
    });

    return sortedAssignments;
  };

  /**
   * Get the number of lanes needed for a resource
   * @param {string} resourceId - The resource ID
   * @returns {number} Number of lanes
   */
  const getResourceLaneCount = (resourceId) => {
    const assignments = getResourceAssignments(resourceId);
    if (assignments.length === 0) return 1;

    const maxLane = Math.max(...assignments.map((a) => a.lane || 0));
    return maxLane + 1;
  };

  /**
   * Calculate the visual position and size of an assignment bar
   * @param {Object} assignment - The assignment object
   * @param {string} resourceId - The resource ID
   * @returns {Object} Style object with position and dimensions
   */
  const getAssignmentBarStyle = (assignment, resourceId) => {
    const project = activeProjects.value.find((p) => p.id === assignment.project_id);
    const dayWidth = parseFloat(timelineDays.value[0]?.date ? '40' : '40'); // Default 40px

    const startDate = parseISO(assignment.start_date);
    const endDate = parseISO(assignment.end_date);
    const today = new Date();
    const timelineStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Calculate position from timeline start
    const daysFromStart = differenceInDays(startDate, timelineStart);
    const duration = differenceInDays(endDate, startDate);

    const leftPosition = daysFromStart * dayWidth;
    const width = duration * dayWidth;

    // Lane positioning
    const lane = assignment.lane || 0;
    const topPosition = lane * LANE_HEIGHT + 8;

    // Get capacity status for border styling
    const capacityInfo = getCapacityStatusInfo(resourceId, assignment);

    // Styling
    const backgroundColor = project?.color || '#3b82f6';

    return {
      left: `${leftPosition}px`,
      width: `${width}px`,
      top: `${topPosition}px`,
      height: `${ASSIGNMENT_BAR_HEIGHT}px`,
      backgroundColor,
      borderColor: capacityInfo.color,
      borderWidth: capacityInfo.borderWidth,
    };
  };

  return {
    getResourceAssignments,
    getResourceLaneCount,
    getAssignmentBarStyle,
  };
}
