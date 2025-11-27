export default {
  editor: {
    label: {
      en: "Resource Planning Timeline",
    },
    icon: "calendar",
  },
  properties: {
    // Data Properties
    resources: {
      label: { en: "Resources" },
      type: "Array",
      section: "settings",
      bindable: true,
      defaultValue: [],
      options: {
        expandable: true,
        getItemLabel(item) {
          return item?.name || item?.id || "Resource";
        },
        item: {
          type: "Object",
          defaultValue: { id: "", name: "", role: "", team: "", avatar: "" },
          options: {
            item: {
              id: { label: { en: "ID" }, type: "Text" },
              name: { label: { en: "Name" }, type: "Text" },
              role: { label: { en: "Role" }, type: "Text" },
              team: { label: { en: "Team" }, type: "Text" },
              avatar: { label: { en: "Avatar URL" }, type: "Text" },
            },
          },
        },
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "array",
        tooltip: "Array of resource objects with id, name, role, team, avatar",
      },
      /* wwEditor:end */
    },

    projects: {
      label: { en: "Projects" },
      type: "Array",
      section: "settings",
      bindable: true,
      defaultValue: [],
      options: {
        expandable: true,
        getItemLabel(item) {
          return item?.name || item?.id || "Project";
        },
        item: {
          type: "Object",
          defaultValue: {
            id: "",
            name: "",
            start_target_date: "",
            number_of_sprints: 6,
            sprint_duration_weeks: 2,
            status: "planned",
            color: "#3b82f6",
            sprints: [],
          },
          options: {
            item: {
              id: { label: { en: "ID" }, type: "Text" },
              name: { label: { en: "Name" }, type: "Text" },
              start_target_date: { label: { en: "Target Start Date" }, type: "Text" },
              number_of_sprints: { label: { en: "Number of Sprints" }, type: "Number" },
              sprint_duration_weeks: { label: { en: "Sprint Duration (weeks)" }, type: "Number" },
              status: { label: { en: "Status" }, type: "Text" },
              color: { label: { en: "Color" }, type: "Color" },
            },
          },
        },
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "array",
        tooltip:
          "Array of project objects with id, name, start_target_date, number_of_sprints, sprint_duration_weeks, status, color, sprints",
      },
      /* wwEditor:end */
    },

    assignments: {
      label: { en: "Assignments" },
      type: "Array",
      section: "settings",
      bindable: true,
      defaultValue: [],
      options: {
        expandable: true,
        getItemLabel(item) {
          return `${item?.project?.name || "Assignment"} - ${item?.capacity_percentage || 0}%`;
        },
        item: {
          type: "Object",
          defaultValue: {
            id: "",
            resource_id: "",
            project_id: "",
            start_date: "",
            end_date: "",
            capacity_percentage: 100,
            project: { name: "", color: "" },
          },
          options: {
            item: {
              id: { label: { en: "ID" }, type: "Text" },
              resource_id: { label: { en: "Resource ID" }, type: "Text" },
              project_id: { label: { en: "Project ID" }, type: "Text" },
              start_date: { label: { en: "Start Date" }, type: "Text" },
              end_date: { label: { en: "End Date" }, type: "Text" },
              capacity_percentage: { label: { en: "Capacity %" }, type: "Number" },
            },
          },
        },
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "array",
        tooltip:
          "Array of assignment objects with id, resource_id, project_id, start_date, end_date, capacity_percentage, project",
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
      defaultValue: true,
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
