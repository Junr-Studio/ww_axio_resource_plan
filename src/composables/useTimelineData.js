import { computed } from 'vue';
import { addDays, format, getISOWeek, getYear, differenceInDays, parseISO, max } from 'date-fns';
import { DEFAULT_NUMBER_OF_DAYS } from '../utils/constants';
import { assignProjectColors, getProjectColor } from '../utils/colorHelpers';
import { useLocale } from './useLocale';

/**
 * Composable for timeline data management
 * Handles items data with nested row/category objects
 * Generic structure works for: resource planning, room booking, equipment scheduling, etc.
 */
export function useTimelineData(props) {
  // Get locale for internationalization
  const { dateFnsLocale } = useLocale();

  /**
   * Get items from bound data
   * Expects items with nested row and category objects
   */
  const activeItems = computed(() => {
    const boundItems = props.content?.items;

    if (!Array.isArray(boundItems) || boundItems.length === 0) {
      return [];
    }

    // Use formula mapping for dynamic field resolution
    const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

    return boundItems.map(item => {
      // Resolve item-level fields
      const itemId = resolveMappingFormula(props.content?.itemIdFormula, item) ?? item.id;
      const startDate = resolveMappingFormula(props.content?.itemStartDateFormula, item) ?? item.start_date ?? item.assignement_start_date ?? '';
      const endDate = resolveMappingFormula(props.content?.itemEndDateFormula, item) ?? item.end_date ?? item.assignement_end_date ?? '';
      const loadRaw = resolveMappingFormula(props.content?.itemLoadFormula, item) ?? item.load ?? item.assigned_capacity ?? item.capacity_percentage ?? item.capacity ?? 1;

      // Resolve row fields directly from item (formulas now contain full paths)
      const rowObj = item.row ?? item.resource ?? {};
      const rowId = resolveMappingFormula(props.content?.rowIdFormula, item) ?? rowObj.id ?? item.row_id ?? item.resource_id ?? `row-${Date.now()}-${Math.random()}`;

      // Title: try formula first, then fallback to name, title, or combine firstName + lastName for backwards compatibility
      const rowTitle = (resolveMappingFormula(props.content?.rowTitleFormula, item)
        ?? rowObj.name
        ?? rowObj.title
        ?? (rowObj.first_name || rowObj.firstName ? `${rowObj.first_name || rowObj.firstName} ${rowObj.last_name || rowObj.lastName || ''}`.trim() : ''))
        || 'Untitled Row';

      const rowSubtitle = resolveMappingFormula(props.content?.rowSubtitleFormula, item) ?? rowObj.subtitle ?? rowObj.position ?? '';
      const rowImage = resolveMappingFormula(props.content?.rowImageFormula, item) ?? rowObj.image ?? rowObj.avatar ?? '';

      // Resolve category fields directly from item (formulas now contain full paths)
      const categoryObj = item.category ?? item.project ?? {};
      const categoryId = resolveMappingFormula(props.content?.categoryIdFormula, item) ?? categoryObj.id ?? item.category_id ?? item.project_id ?? `category-${Date.now()}-${Math.random()}`;
      const categoryName = resolveMappingFormula(props.content?.categoryNameFormula, item) ?? categoryObj.name ?? categoryObj.title ?? 'Untitled Category';
      const categoryColor = resolveMappingFormula(props.content?.categoryColorFormula, item) ?? categoryObj.color;

      // Convert load: if decimal (0-1), multiply by 100; if already percentage (0-100), use as-is
      const loadNum = Number(loadRaw);
      const load = loadNum <= 1 ? loadNum * 100 : loadNum;

      return {
        id: itemId || `item-${Date.now()}-${Math.random()}`,
        row_id: rowId,
        category_id: categoryId,
        start_date: startDate,
        end_date: endDate,
        load_percentage: load || 100,
        // Legacy compatibility: keep as capacity_percentage and project_id/resource_id
        capacity_percentage: load || 100,
        project_id: categoryId,
        resource_id: rowId,
        // Keep category data for display (color will be assigned later)
        project: {
          id: categoryId,
          name: categoryName,
          color: categoryColor, // Can be null, will be assigned later
        },
        category: {
          id: categoryId,
          name: categoryName,
          color: categoryColor,
        },
        // Store resolved row data for extraction
        __resolvedRow: {
          id: rowId,
          name: rowTitle,
          subtitle: rowSubtitle,
          image: rowImage,
          // Legacy compatibility
          first_name: rowObj.first_name || rowObj.firstName || '',
          last_name: rowObj.last_name || rowObj.lastName || '',
          avatar: rowImage,
        },
        // Include original nested data for reference
        originalItem: item,
      };
    });
  });

  /**
   * Extract unique rows from items
   * Creates row entries for the timeline
   * Uses formula-resolved row data
   */
  const activeRows = computed(() => {
    const items = activeItems.value;
    if (!items || items.length === 0) return [];

    // Create a map to deduplicate rows
    const rowMap = new Map();

    items.forEach(item => {
      const row = item.__resolvedRow;
      if (!row?.id) return;

      // Only add if not already in map
      if (!rowMap.has(row.id)) {
        rowMap.set(row.id, {
          id: row.id,
          name: row.name || 'Untitled Row',
          position: row.subtitle || '',
          avatar: row.image || row.avatar || '', // Keep avatar for backwards compatibility
          originalItem: row,
        });
      }
    });

    return Array.from(rowMap.values());
  });

  /**
   * Extract unique categories from items and assign colors
   * Categories with null colors get unique generated colors
   * Uses formula-resolved category data
   */
  const activeCategories = computed(() => {
    const items = activeItems.value;
    if (!items || items.length === 0) return [];

    // Create a map to deduplicate categories
    const categoryMap = new Map();

    items.forEach(item => {
      const category = item.category ?? item.project; // Use formula-resolved category data
      if (!category?.id) return;

      // Only add if not already in map
      if (!categoryMap.has(category.id)) {
        categoryMap.set(category.id, {
          id: category.id,
          name: category.name || 'Untitled Category',
          color: category.color, // Can be null
          originalItem: item.originalItem?.category ?? item.originalItem?.project,
        });
      }
    });

    const categories = Array.from(categoryMap.values());

    // Assign colors to categories (null colors get generated colors)
    const colorMap = assignProjectColors(categories);

    // Update categories with assigned colors
    return categories.map(category => ({
      ...category,
      color: getProjectColor(category.id, colorMap),
    }));
  });

  /**
   * Get category color map for items
   */
  const categoryColorMap = computed(() => {
    const colorMap = new Map();
    activeCategories.value.forEach(category => {
      colorMap.set(category.id, category.color);
    });
    return colorMap;
  });

  /**
   * Update items with resolved category colors
   */
  const itemsWithColors = computed(() => {
    return activeItems.value.map(item => ({
      ...item,
      project: {
        ...item.project,
        color: getProjectColor(item.project_id, categoryColorMap.value),
      },
      category: {
        ...item.category,
        color: getProjectColor(item.category_id, categoryColorMap.value),
      },
    }));
  });

  /**
   * Calculate the number of days needed to show all items
   * Returns the number of days from today to the last item's end date
   */
  const calculateRequiredDays = () => {
    const items = activeItems.value;
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    console.log('📊 Calculating required days:', {
      itemCount: items?.length,
      startDate: format(startDate, 'yyyy-MM-dd')
    });

    if (!items || items.length === 0) {
      console.log('⚠️ No items found, using default:', DEFAULT_NUMBER_OF_DAYS);
      return DEFAULT_NUMBER_OF_DAYS;
    }

    // Find the latest end date from all items
    const endDates = items
      .map(a => {
        try {
          const date = typeof a.end_date === 'string' ? parseISO(a.end_date) : a.end_date;
          console.log(`  Item ${a.id}: ${a.end_date} → ${date ? format(date, 'yyyy-MM-dd') : 'INVALID'}`);
          return date;
        } catch (e) {
          console.log(`  Item ${a.id}: ${a.end_date} → ERROR: ${e.message}`);
          return null;
        }
      })
      .filter(date => date !== null && date instanceof Date && !isNaN(date));

    console.log(`📅 Valid end dates found: ${endDates.length}/${items.length}`);

    if (endDates.length === 0) {
      console.log('⚠️ No valid end dates, using default:', DEFAULT_NUMBER_OF_DAYS);
      return DEFAULT_NUMBER_OF_DAYS;
    }

    const latestEndDate = max(endDates);
    const daysDiff = differenceInDays(latestEndDate, startDate);
    const requiredDays = Math.max(daysDiff + 7, DEFAULT_NUMBER_OF_DAYS);

    console.log('✨ Calculation result:', {
      latestEndDate: format(latestEndDate, 'yyyy-MM-dd'),
      daysDiff,
      buffer: 7,
      requiredDays,
      usingDefault: requiredDays === DEFAULT_NUMBER_OF_DAYS
    });

    // Add a buffer of 7 days after the last item, and ensure minimum of DEFAULT_NUMBER_OF_DAYS
    return requiredDays;
  };

  /**
   * Generate array of timeline days based on configuration or item data
   */
  const timelineDays = computed(() => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Use manual numberOfDays if toggle enabled, otherwise calculate from items
    const numberOfDays = props.content?.useManualDays
      ? (props.content?.numberOfDays || 90)
      : calculateRequiredDays();

    console.log('🗓️ Timeline calculation:', {
      useManualDays: props.content?.useManualDays,
      numberOfDays,
      startDate: format(startDate, 'yyyy-MM-dd'),
      itemCount: activeItems.value?.length
    });

    const days = [];
    for (let i = 0; i < numberOfDays; i++) {
      const dayDate = addDays(startDate, i);
      days.push({
        dayKey: format(dayDate, 'yyyy-MM-dd'),
        dayOfWeek: format(dayDate, 'EEE', { locale: dateFnsLocale.value }),
        dayNumber: format(dayDate, 'd'),
        monthYear: format(dayDate, 'MMM yyyy', { locale: dateFnsLocale.value }),
        weekNumber: getISOWeek(dayDate),
        year: getYear(dayDate),
        date: dayDate,
      });
    }

    console.log(`✅ Generated ${days.length} days from ${days[0]?.dayKey} to ${days[days.length - 1]?.dayKey}`);

    return days;
  });

  /**
   * Group timeline days by week for week number headers
   * Returns array of week objects with start/end indices and day count
   */
  const timelineWeeks = computed(() => {
    const days = timelineDays.value;
    if (days.length === 0) return [];

    const weeks = [];
    let currentWeek = null;
    let startIndex = 0;

    days.forEach((day, index) => {
      const weekKey = `${day.year}-W${day.weekNumber}`;

      if (currentWeek !== weekKey) {
        // Start a new week
        if (currentWeek !== null) {
          // Close previous week
          weeks.push({
            weekNumber: days[startIndex].weekNumber,
            year: days[startIndex].year,
            startIndex: startIndex,
            endIndex: index - 1,
            dayCount: index - startIndex,
          });
        }
        currentWeek = weekKey;
        startIndex = index;
      }
    });

    // Close the last week
    if (currentWeek !== null) {
      weeks.push({
        weekNumber: days[startIndex].weekNumber,
        year: days[startIndex].year,
        startIndex: startIndex,
        endIndex: days.length - 1,
        dayCount: days.length - startIndex,
      });
    }

    return weeks;
  });

  return {
    timelineDays,
    timelineWeeks,
    activeRows, // New generic name
    activeCategories, // New generic name
    activeItems: itemsWithColors, // New generic name - items with resolved colors
    // Legacy exports for backwards compatibility
    activeResources: activeRows,
    activeProjects: activeCategories,
    activeAssignments: itemsWithColors,
  };
}
