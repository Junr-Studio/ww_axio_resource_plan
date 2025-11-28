export default {
  editor: {
    label: {
      en: "Resource Planning Timeline",
    },
    icon: "calendar",
  },
  properties: {
    // Data Properties
    assignments: {
      label: { en: "Assignments (Joined Data)" },
      type: "Array",
      section: "settings",
      bindable: true,
      defaultValue: [],
      options: {
        expandable: true,
        getItemLabel(item) {
          const resourceName = item?.resource?.first_name && item?.resource?.last_name
            ? `${item?.resource?.first_name} ${item?.resource?.last_name}`
            : item?.resource?.name || 'Resource';
          const projectName = item?.project?.title || item?.project?.name || 'Project';
          return `${resourceName} → ${projectName}`;
        },
        item: {
          type: "Object",
          defaultValue: {
            id: "",
            assignement_start_date: "",
            assignement_end_date: "",
            assigned_capacity: "1",
            resource: {
              id: "",
              first_name: "",
              last_name: "",
              title: "",
              avatar: ""
            },
            project: {
              id: "",
              title: "",
              color: null,
              status: ""
            }
          },
        },
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "array",
        tooltip: "Array of assignments with nested resource and project objects",
      },
      propertyHelp: {
        en: "Bind your assignments data with nested resource and project objects. Each assignment should include full resource details (id, first_name, last_name, title, avatar) and project details (id, title, color, status). Colors are auto-generated for projects with null colors.",
      },
      /* wwEditor:end */
    },

    // Timeline Settings
    numberOfDays: {
      label: { en: "Number of Days (Optional)" },
      type: "Number",
      section: "settings",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "number",
        tooltip: "Override auto-calculation to set a fixed number of days. Leave empty for automatic calculation based on assignments.",
      },
      propertyHelp: {
        en: "Leave empty to automatically calculate timeline length based on your assignments. Set a value to manually override the timeline length.",
      },
      /* wwEditor:end */
    },

    useMockData: {
      label: { en: "Use Mock Data" },
      type: "OnOff",
      section: "settings",
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Enable to use built-in mock data for testing",
      },
      propertyHelp: {
        en: "Toggle ON to use built-in mock data while testing. Toggle OFF to use bound data from WeWeb.",
      },
      /* wwEditor:end */
    },

    // Visual Settings
    rowHeight: {
      label: { en: "Row Height" },
      type: "Length",
      section: "style",
      defaultValue: "80px",
      bindable: true,
    },

    dayColumnWidth: {
      label: { en: "Day Column Width" },
      type: "Length",
      section: "style",
      defaultValue: "40px",
      bindable: true,
    },

    // Capacity Status Colors
    colorAvailable: {
      label: { en: "Available Color (Green)" },
      type: "Color",
      section: "style",
      defaultValue: "#10b981",
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        en: "Border color for assignments when resource has <80% capacity",
      },
      /* wwEditor:end */
    },

    colorNearFull: {
      label: { en: "Near Full Color (Yellow)" },
      type: "Color",
      section: "style",
      defaultValue: "#f59e0b",
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        en: "Border color for assignments when resource has 80-100% capacity",
      },
      /* wwEditor:end */
    },

    colorOverCapacity: {
      label: { en: "Over Capacity Color (Red)" },
      type: "Color",
      section: "style",
      defaultValue: "#ef4444",
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        en: "Border color for assignments when resource has >100% capacity",
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
    },

    borderColor: {
      label: { en: "Grid Border Color" },
      type: "Color",
      section: "style",
      defaultValue: "#e5e7eb",
      bindable: true,
    },

    headerBackgroundColor: {
      label: { en: "Header Background" },
      type: "Color",
      section: "style",
      defaultValue: "#f9fafb",
      bindable: true,
    },

    textColor: {
      label: { en: "Text Color" },
      type: "Color",
      section: "style",
      defaultValue: "#1f2937",
      bindable: true,
    },
  },

  triggerEvents: [
    {
      name: "assignment-clicked",
      label: { en: "Assignment clicked" },
      event: {
        assignmentId: "",
        resourceId: "",
        projectId: "",
        assignment: {},
      },
    },
    {
      name: "resource-clicked",
      label: { en: "Resource clicked" },
      event: {
        resourceId: "",
        resource: {},
      },
    },
  ],
};
