export default {
  editor: {
    label: {
      en: "Timeline Planning Component",
    },
    icon: "calendar",
  },
  properties: {
    // ========================================
    // DATA SOURCE (Main Timeline Items)
    // ========================================

    items: {
      label: { en: "Timeline Items" },
      type: "Array",
      section: "settings",
      bindable: true,
      defaultValue: [],
      options: {
        expandable: true,
        getItemLabel(item) {
          const rowName = item?.row?.first_name && item?.row?.last_name
            ? `${item?.row?.first_name} ${item?.row?.last_name}`
            : item?.row?.name || 'Row';
          const categoryName = item?.category?.title || item?.category?.name || 'Category';
          return `${rowName} → ${categoryName}`;
        },
        item: {
          type: "Object",
          defaultValue: {
            id: "",
            start_date: "",
            end_date: "",
            load: "1",
            row: {
              id: "",
              first_name: "",
              last_name: "",
              subtitle: "",
              avatar: ""
            },
            category: {
              id: "",
              name: "",
              color: null,
              metadata: ""
            }
          },
        },
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "array",
        tooltip: "Array of timeline items with nested row and category objects",
      },
      propertyHelp: {
        en: "Bind your timeline items with nested row and category objects. Each item should include row details (id, first_name, last_name, subtitle, avatar) and category details (id, name, color, metadata). Colors are auto-generated for categories with null colors. Use cases: resource planning (rows=people, categories=projects), room booking (rows=rooms, categories=events), equipment schedule (rows=machines, categories=jobs), etc.",
      },
      /* wwEditor:end */
    },

    // ========================================
    // ITEM FIELD MAPPINGS (Basic Fields)
    // ========================================

    itemIdFormula: {
      label: { en: 'Item ID Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.items) && content.items.length > 0 ? content.items[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['id']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as item ID',
      },
      /* wwEditor:end */
    },

    itemStartDateFormula: {
      label: { en: 'Start Date Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.items) && content.items.length > 0 ? content.items[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['start_date'] || context.mapping?.['assignement_start_date']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field containing item start date',
      },
      /* wwEditor:end */
    },

    itemEndDateFormula: {
      label: { en: 'End Date Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.items) && content.items.length > 0 ? content.items[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['end_date'] || context.mapping?.['assignement_end_date']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field containing item end date',
      },
      /* wwEditor:end */
    },

    showLoadPercentage: {
      label: { en: "Show Load/Utilization Text" },
      type: "OnOff",
      section: "item-mapping",
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Show or hide load/utilization percentage text",
      },
      propertyHelp: {
        en: "Toggle ON to display load percentage numbers in item bars and tooltips. Toggle OFF to hide the text while keeping visual capacity indicators (colored footers and lane usage).",
      },
      /* wwEditor:end */
    },

    // ========================================
    // ITEM FIELD MAPPINGS
    // ========================================

    itemLoadFormula: {
      label: { en: 'Load/Utilization Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.items) && content.items.length > 0 ? content.items[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['assigned_capacity'] || context.mapping?.['load'] || context.mapping?.['capacity_percentage'] || context.mapping?.['capacity'] || 1",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.items) || !content.items?.length || !boundProps.items || !content?.showLoadPercentage,
      /* wwEditor:start */
      bindingValidation: {
        type: 'number',
        tooltip: 'Field containing load/utilization (decimal 0-1 or percentage 0-100)',
      },
      /* wwEditor:end */
    },

    // ========================================
    // ROW FIELD MAPPINGS (Resources/People)
    // ========================================
    rowIdFormula: {
      label: { en: 'Row ID Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.items) && content.items.length > 0 ? content.items[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['resource'] || context.mapping?.['row']?.['id'] || context.mapping?.['resource']?.['id']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
    },

    rowTitleFormula: {
      label: { en: 'Row Title Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.items) && content.items.length > 0 ? content.items[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['resource_details']?.['title'] || context.mapping?.['row']?.['name'] || context.mapping?.['resource']?.['name'] || context.mapping?.['row']?.['title'] || context.mapping?.['resource']?.['title']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
    },

    rowSubtitleFormula: {
      label: { en: 'Row Subtitle Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.items) && content.items.length > 0 ? content.items[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['row']?.['subtitle'] || context.mapping?.['resource']?.['subtitle'] || context.mapping?.['row']?.['position'] || context.mapping?.['resource']?.['position']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
    },

    rowImageFormula: {
      label: { en: 'Row Image Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.items) && content.items.length > 0 ? content.items[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['row']?.['image'] || context.mapping?.['resource']?.['image'] || context.mapping?.['row']?.['avatar'] || context.mapping?.['resource']?.['avatar']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
    },

    // ========================================
    // CATEGORY FIELD MAPPINGS (Projects/Types)
    // ========================================
    categoryIdFormula: {
      label: { en: 'Category ID Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.items) && content.items.length > 0 ? content.items[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['project'] || context.mapping?.['category']?.['id'] || context.mapping?.['project']?.['id']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
    },

    categoryNameFormula: {
      label: { en: 'Category Name Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.items) && content.items.length > 0 ? content.items[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['project_details']?.['title'] || context.mapping?.['category']?.['name'] || context.mapping?.['project']?.['name'] || context.mapping?.['category']?.['title'] || context.mapping?.['project']?.['title']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
    },

    categoryColorFormula: {
      label: { en: 'Category Color Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.items) && content.items.length > 0 ? content.items[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['category']?.['color'] || context.mapping?.['project']?.['color']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
    },

    // ========================================
    // EXCLUSION PERIODS (Vacations/Time Off)
    // ========================================
    exclusions: {
      label: { en: "Exclusion Periods" },
      type: "Array",
      section: "settings",
      bindable: true,
      defaultValue: [],
      options: {
        expandable: true,
        getItemLabel(exclusion) {
          const rowId = exclusion?.row_id || exclusion?.resource_id || exclusion?.row?.id || 'Unknown';
          const startDate = exclusion?.start_date ? new Date(exclusion.start_date).toLocaleDateString() : 'Start';
          const endDate = exclusion?.end_date ? new Date(exclusion.end_date).toLocaleDateString() : 'End';
          return `Row ${rowId}: ${startDate} → ${endDate}`;
        },
        item: {
          type: "Object",
          defaultValue: {
            id: "",
            row_id: "",
            start_date: "",
            end_date: "",
            label: ""
          },
        },
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "array",
        tooltip: "Array of exclusion periods with row and date range",
      },
      propertyHelp: {
        en: "Define exclusion periods (vacations, time off, unavailability) for rows. Each exclusion shows as a grayed-out period on the timeline for the specified row and date range.",
      },
      /* wwEditor:end */
    },

    // --- Exclusion Field Mappings ---
    exclusionRowIdFormula: {
      label: { en: 'Exclusion Row/Resource ID Field' },
      type: 'Formula',
      section: 'exclusion-mapping',
      options: content => ({
        template: Array.isArray(content.exclusions) && content.exclusions.length > 0 ? content.exclusions[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['resource'] || context.mapping?.['row_id'] || context.mapping?.['resource_id'] || context.mapping?.['row']?.['id']",
      },
      hidden: (content, sidepanelContent, boundProps) => !boundProps.exclusions,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field containing the row/resource ID that this exclusion applies to',
      },
      propertyHelp: {
        en: "Map the field that contains the row/resource ID. This determines which row in the timeline will show the exclusion period.",
      },
      /* wwEditor:end */
    },

    exclusionStartDateFormula: {
      label: { en: 'Exclusion Start Date Field' },
      type: 'Formula',
      section: 'exclusion-mapping',
      options: content => ({
        template: Array.isArray(content.exclusions) && content.exclusions.length > 0 ? content.exclusions[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['start_date']",
      },
      hidden: (content, sidepanelContent, boundProps) => !boundProps.exclusions,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field containing exclusion start date',
      },
      /* wwEditor:end */
    },

    exclusionEndDateFormula: {
      label: { en: 'Exclusion End Date Field' },
      type: 'Formula',
      section: 'exclusion-mapping',
      options: content => ({
        template: Array.isArray(content.exclusions) && content.exclusions.length > 0 ? content.exclusions[0] : {},
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['end_date']",
      },
      hidden: (content, sidepanelContent, boundProps) => !boundProps.exclusions,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field containing exclusion end date',
      },
      /* wwEditor:end */
    },

    // ========================================
    // TIMELINE CONFIGURATION
    // ========================================

    useManualDays: {
      label: { en: "Override Timeline Length" },
      type: "OnOff",
      section: "settings",
      defaultValue: false,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Enable to manually set the number of days. Disable for automatic calculation based on items.",
      },
      propertyHelp: {
        en: "Toggle ON to manually set the timeline length. Toggle OFF to automatically calculate based on your items (latest end date + 7 days buffer).",
      },
      /* wwEditor:end */
    },

    numberOfDays: {
      label: { en: "Number of Days" },
      type: "Number",
      section: "settings",
      defaultValue: 90,
      bindable: true,
      hidden: (content) => !content?.useManualDays,
      /* wwEditor:start */
      bindingValidation: {
        type: "number",
        tooltip: "Number of days to display in the timeline",
      },
      propertyHelp: {
        en: "Set the number of days to display in the timeline from today's date.",
      },
      /* wwEditor:end */
    },

    showWeekends: {
      label: { en: "Show Weekends" },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Show or hide weekends (Saturday and Sunday) in the timeline",
      },
      propertyHelp: {
        en: "Toggle to show or hide weekends (Saturday and Sunday) in the timeline. When disabled, the timeline will only display weekdays (Monday-Friday).",
      },
      /* wwEditor:end */
    },

    // ========================================
    // VISUAL STYLING
    // ========================================

    rowHeight: {
      label: { en: "Row Height" },
      type: "Length",
      section: "style",
      defaultValue: "80px",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "CSS length value for row height",
      },
      propertyHelp: {
        en: "Set the height of each row in the timeline.",
      },
      /* wwEditor:end */
    },

    dayColumnWidth: {
      label: { en: "Day Column Width" },
      type: "Length",
      section: "style",
      defaultValue: "40px",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "CSS length value for day column width",
      },
      propertyHelp: {
        en: "Set the width of each day column in the timeline grid.",
      },
      /* wwEditor:end */
    },

    resourceColumnWidth: {
      label: { en: "Row Column Width" },
      type: "Length",
      section: "style",
      defaultValue: "200px",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "CSS length value for row information column width",
      },
      propertyHelp: {
        en: "Set the width of the left sticky column showing row information (avatar, name, subtitle).",
      },
      /* wwEditor:end */
    },

    // Load Status Colors
    colorLowLoad: {
      label: { en: "Low Load Color (Green)" },
      type: "Color",
      section: "style",
      defaultValue: "#10b981",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Valid CSS color value",
      },
      propertyHelp: {
        en: "Border color for items when row has <80% load",
      },
      /* wwEditor:end */
    },

    colorMediumLoad: {
      label: { en: "Medium Load Color (Yellow)" },
      type: "Color",
      section: "style",
      defaultValue: "#f59e0b",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Valid CSS color value",
      },
      propertyHelp: {
        en: "Border color for items when row has 80-100% load",
      },
      /* wwEditor:end */
    },

    colorHighLoad: {
      label: { en: "High Load Color (Red)" },
      type: "Color",
      section: "style",
      defaultValue: "#ef4444",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Valid CSS color value",
      },
      propertyHelp: {
        en: "Border color for items when row has >100% load",
      },
      /* wwEditor:end */
    },

    // General Styling
    backgroundColor: {
      label: { en: "Background Color" },
      type: "Color",
      section: "style",
      defaultValue: "#ffffff",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Valid CSS color value",
      },
      propertyHelp: {
        en: "Set the background color of the timeline component.",
      },
      /* wwEditor:end */
    },

    borderColor: {
      label: { en: "Grid Border Color" },
      type: "Color",
      section: "style",
      defaultValue: "#e5e7eb",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Valid CSS color value",
      },
      propertyHelp: {
        en: "Set the color of the grid borders in the timeline.",
      },
      /* wwEditor:end */
    },

    headerBackgroundColor: {
      label: { en: "Header Background" },
      type: "Color",
      section: "style",
      defaultValue: "#f9fafb",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Valid CSS color value",
      },
      propertyHelp: {
        en: "Set the background color of the timeline header (weeks and days).",
      },
      /* wwEditor:end */
    },

    textColor: {
      label: { en: "Text Color" },
      type: "Color",
      section: "style",
      defaultValue: "#1f2937",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Valid CSS color value",
      },
      propertyHelp: {
        en: "Set the color of text throughout the timeline component.",
      },
      /* wwEditor:end */
    },
  },

  customSettingsPropertiesOrder: [
    // Data Source
    'items',

    // Item Mappings - Collapsible Group
    {
      label: 'Item Field Mappings',
      isCollapsible: true,
      properties: [
        'itemIdFormula',
        'itemStartDateFormula',
        'itemEndDateFormula',
        'showLoadPercentage',
        'itemLoadFormula',
      ],
    },

    // Row Mappings - Collapsible Group
    {
      label: 'Row Field Mappings',
      isCollapsible: true,
      properties: [
        'rowIdFormula',
        'rowTitleFormula',
        'rowSubtitleFormula',
        'rowImageFormula',
      ],
    },

    // Category Mappings - Collapsible Group
    {
      label: 'Category Field Mappings',
      isCollapsible: true,
      properties: [
        'categoryIdFormula',
        'categoryNameFormula',
        'categoryColorFormula',
      ],
    },

    // Exclusion Mappings - Collapsible Group
    {
      label: 'Exclusion Period Mappings',
      isCollapsible: true,
      properties: [
        'exclusions',
        'exclusionRowIdFormula',
        'exclusionStartDateFormula',
        'exclusionEndDateFormula',
      ],
    },

    // Timeline Configuration
    'useManualDays',
    'numberOfDays',
    'showWeekends',
  ],

  customStylePropertiesOrder: [
    // Dimensions
    {
      label: 'Grid Dimensions',
      isCollapsible: true,
      properties: [
        'rowHeight',
        'dayColumnWidth',
        'resourceColumnWidth',
      ],
    },

    // Load Status Colors
    {
      label: 'Load Status Colors',
      isCollapsible: true,
      properties: [
        'colorLowLoad',
        'colorMediumLoad',
        'colorHighLoad',
      ],
    },

    // General Colors
    {
      label: 'General Colors',
      isCollapsible: true,
      properties: [
        'backgroundColor',
        'borderColor',
        'headerBackgroundColor',
        'textColor',
      ],
    },
  ],

  triggerEvents: [
    {
      name: "item-clicked",
      label: { en: "Item clicked" },
      event: {
        itemId: "",
        rowId: "",
        categoryId: "",
        item: {},
      },
    },
    {
      name: "item-hovered",
      label: { en: "Item hovered" },
      event: {
        itemId: "",
        rowId: "",
        categoryId: "",
        item: {},
      },
    },
    {
      name: "row-clicked",
      label: { en: "Row clicked" },
      event: {
        rowId: "",
        row: {},
      },
    },
    {
      name: "row-hovered",
      label: { en: "Row hovered" },
      event: {
        rowId: "",
        row: {},
      },
    },
    {
      name: "day-clicked",
      label: { en: "Day clicked" },
      event: {
        date: "",
        dayKey: "",
        rowId: "",
        load: 0,
      },
    },
    {
      name: "timeline-scrolled",
      label: { en: "Timeline scrolled" },
      event: {
        scrollLeft: 0,
        scrollTop: 0,
        visibleStartDate: "",
        visibleEndDate: "",
      },
    },
    {
      name: "capacity-exceeded",
      label: { en: "Capacity exceeded" },
      event: {
        rowId: "",
        date: "",
        load: 0,
        threshold: 100,
      },
    },
  ],
};
