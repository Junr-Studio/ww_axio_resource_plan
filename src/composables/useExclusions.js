import { computed } from 'vue';
import { parseISO, differenceInDays, format } from 'date-fns';

/**
 * Composable for processing exclusion periods (vacations, time off, etc.)
 * Maps exclusions to rows and prepares them for rendering
 */
export function useExclusions(props, timelineDays) {
  const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

  /**
   * Process raw exclusions data with formula mapping
   * @returns {Array} Processed exclusions with resolved fields
   */
  const activeExclusions = computed(() => {
    const exclusions = props.content?.exclusions || [];

    if (!Array.isArray(exclusions) || exclusions.length === 0) {
      return [];
    }

    const processed = exclusions.map((exclusion, index) => {
      // Resolve fields using formula mapping with comprehensive fallbacks (matching item pattern)
      const rowId = resolveMappingFormula(props.content?.exclusionRowIdFormula, exclusion)
        ?? exclusion?.resource
        ?? exclusion?.row_id
        ?? exclusion?.resource_id
        ?? exclusion?.row?.id
        ?? exclusion?.resource?.id;

      const startDate = resolveMappingFormula(props.content?.exclusionStartDateFormula, exclusion)
        ?? exclusion?.start_date
        ?? exclusion?.startDate;

      const endDate = resolveMappingFormula(props.content?.exclusionEndDateFormula, exclusion)
        ?? exclusion?.end_date
        ?? exclusion?.endDate;

      return {
        id: exclusion?.id || `exclusion-${index}`,
        row_id: rowId,
        resource_id: rowId, // Legacy compatibility
        start_date: startDate,
        end_date: endDate,
        label: exclusion?.label || exclusion?.reason || '',
        originalExclusion: exclusion,
      };
    }).filter(exclusion => {
      // Only include exclusions with valid row and dates
      return exclusion.row_id && exclusion.start_date && exclusion.end_date;
    });

    return processed;
  });

  /**
   * Get exclusions for a specific row
   * @param {string} rowId - The row ID
   * @returns {Array} Array of exclusions for this row
   */
  const getRowExclusions = (rowId) => {
    if (!rowId || !activeExclusions.value) {
      return [];
    }

    return activeExclusions.value.filter(
      exclusion => exclusion.row_id === rowId || exclusion.resource_id === rowId
    );
  };

  /**
   * Check if a specific date is within an exclusion period for a row
   * @param {string} rowId - The row ID
   * @param {Date} date - The date to check
   * @returns {boolean} True if date is excluded
   */
  const isDateExcluded = (rowId, date) => {
    const rowExclusions = getRowExclusions(rowId);

    return rowExclusions.some(exclusion => {
      try {
        const excludedStart = new Date(exclusion.start_date);
        const excludedEnd = new Date(exclusion.end_date);
        const checkDate = new Date(date);

        // Check if date falls within exclusion period [start, end]
        return checkDate >= excludedStart && checkDate <= excludedEnd;
      } catch (error) {
        // Invalid date format, skip
        return false;
      }
    });
  };

  /**
   * Calculate the visual position and size of an exclusion bar
   * @param {Object} exclusion - The exclusion object
   * @returns {Object} Style object with position and dimensions
   */
  const getExclusionBarStyle = (exclusion) => {
    if (!exclusion?.start_date || !exclusion?.end_date) {
      return {
        left: '0px',
        width: '0px',
        display: 'none',
      };
    }

    try {
      // Get dayWidth from timelineDays or props
      const dayWidth = parseFloat(timelineDays?.value?.[0]?.width || props.content?.dayColumnWidth || '40');

      // Handle multiple date formats (ISO, timestampz, etc.)
      const startDate = typeof exclusion.start_date === 'number'
        ? new Date(exclusion.start_date)
        : typeof exclusion.start_date === 'string' && (exclusion.start_date.includes('T') || exclusion.start_date.includes(' '))
          ? new Date(exclusion.start_date)
          : parseISO(exclusion.start_date);

      const endDate = typeof exclusion.end_date === 'number'
        ? new Date(exclusion.end_date)
        : typeof exclusion.end_date === 'string' && (exclusion.end_date.includes('T') || exclusion.end_date.includes(' '))
          ? new Date(exclusion.end_date)
          : parseISO(exclusion.end_date);

      // Validate parsed dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return {
          left: '0px',
          width: '0px',
          display: 'none',
        };
      }

      // Find the start and end positions in the visible timeline array
      // This automatically handles weekend filtering
      const days = timelineDays?.value || [];

      // Normalize to start of day for comparison
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      // Format dates for comparison with timeline dayKeys
      const exclusionStartStr = format(startDate, 'yyyy-MM-dd');
      const exclusionEndStr = format(endDate, 'yyyy-MM-dd');

      // Find indices in the visible timeline
      let startIndex = days.findIndex(day => day.dayKey === exclusionStartStr);
      let endIndex = days.findIndex(day => day.dayKey === exclusionEndStr);

      // Handle exclusions that extend beyond visible timeline range
      if (startIndex === -1 && endIndex === -1) {
        // Both dates outside timeline - check if exclusion overlaps with visible range
        const firstDay = days[0]?.date;
        const lastDay = days[days.length - 1]?.date;

        if (firstDay && lastDay) {
          // Ensure dates are Date objects for comparison
          const firstDayDate = typeof firstDay === 'string' ? new Date(firstDay) : new Date(firstDay);
          const lastDayDate = typeof lastDay === 'string' ? new Date(lastDay) : new Date(lastDay);

          // Normalize all to midnight
          firstDayDate.setHours(0, 0, 0, 0);
          lastDayDate.setHours(0, 0, 0, 0);
          const startDateNorm = new Date(startDate);
          const endDateNorm = new Date(endDate);
          startDateNorm.setHours(0, 0, 0, 0);
          endDateNorm.setHours(0, 0, 0, 0);

          const isBeforeTimeline = endDateNorm < firstDayDate;
          const isAfterTimeline = startDateNorm > lastDayDate;

          if (isBeforeTimeline || isAfterTimeline) {
            // Exclusion completely outside visible range - hide it
            return {
              left: '0px',
              width: '0px',
              display: 'none',
            };
          }

          // Exclusion spans entire visible timeline
          startIndex = 0;
          endIndex = days.length - 1;
        }
      } else {
        // Clip to visible timeline boundaries
        if (startIndex === -1) {
          // Starts before timeline - clip to start
          startIndex = 0;
        }
        if (endIndex === -1) {
          // Ends after timeline - clip to end
          endIndex = days.length - 1;
        }
      }

      // Calculate position and width based on visible timeline indices
      const leftPosition = startIndex * dayWidth;
      const width = (endIndex - startIndex + 1) * dayWidth;

      return {
        left: `${leftPosition}px`,
        width: `${width}px`,
        display: width > 0 ? 'flex' : 'none',
      };
    } catch (error) {
      // Return safe default for invalid dates
      return {
        left: '0px',
        width: '0px',
        display: 'none',
      };
    }
  };

  return {
    activeExclusions,
    getRowExclusions,
    isDateExcluded,
    getExclusionBarStyle,
  };
}
