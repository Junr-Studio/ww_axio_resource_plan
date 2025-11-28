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
          defaultValue: { id: "", name: "", position: "", avatar: "" },
          options: {
            item: {
              id: { label: { en: "ID" }, type: "Text" },
              name: { label: { en: "Name" }, type: "Text" },
              position: { label: { en: "Position" }, type: "Text" },
              avatar: { label: { en: "Avatar URL" }, type: "Text" },
            },
          },
        },
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "array",
        tooltip: "Array of resource objects with id, name, position, avatar",
      },
      /* wwEditor:end */
    },

    // Formula properties for Resources field mapping
    resourcesIdFormula: {
      label: { en: 'Resource ID Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.resources) && content.resources.length > 0 ? content.resources[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['id']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.resources) || !content.resources?.length || !boundProps.resources,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as resource unique identifier',
      },
      /* wwEditor:end */
    },

    resourcesNameFormula: {
      label: { en: 'Resource Name Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.resources) && content.resources.length > 0 ? content.resources[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['first_name'] && context.mapping?.['last_name'] ? `${context.mapping['first_name']} ${context.mapping['last_name']}` : context.mapping?.['name']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.resources) || !content.resources?.length || !boundProps.resources,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as resource name (can combine first_name + last_name)',
      },
      /* wwEditor:end */
    },

    resourcesPositionFormula: {
      label: { en: 'Resource Position Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.resources) && content.resources.length > 0 ? content.resources[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['title'] || context.mapping?.['position']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.resources) || !content.resources?.length || !boundProps.resources,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as resource position/title',
      },
      /* wwEditor:end */
    },

    resourcesAvatarFormula: {
      label: { en: 'Resource Avatar Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.resources) && content.resources.length > 0 ? content.resources[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['avatar']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.resources) || !content.resources?.length || !boundProps.resources,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as resource avatar URL',
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

    // Formula properties for Projects field mapping
    projectsIdFormula: {
      label: { en: 'Project ID Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.projects) && content.projects.length > 0 ? content.projects[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['id']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.projects) || !content.projects?.length || !boundProps.projects,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as project unique identifier',
      },
      /* wwEditor:end */
    },

    projectsNameFormula: {
      label: { en: 'Project Name Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.projects) && content.projects.length > 0 ? content.projects[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['name']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.projects) || !content.projects?.length || !boundProps.projects,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as project name',
      },
      /* wwEditor:end */
    },

    projectsColorFormula: {
      label: { en: 'Project Color Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.projects) && content.projects.length > 0 ? content.projects[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['color'] || '#3b82f6'",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.projects) || !content.projects?.length || !boundProps.projects,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as project color (hex code)',
      },
      /* wwEditor:end */
    },

    projectsStartDateFormula: {
      label: { en: 'Project Start Date Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.projects) && content.projects.length > 0 ? content.projects[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['start_target_date'] || context.mapping?.['start_date']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.projects) || !content.projects?.length || !boundProps.projects,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as project start date',
      },
      /* wwEditor:end */
    },

    projectsStatusFormula: {
      label: { en: 'Project Status Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.projects) && content.projects.length > 0 ? content.projects[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['status'] || 'planned'",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.projects) || !content.projects?.length || !boundProps.projects,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as project status',
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

    // Formula properties for Assignments field mapping
    assignmentsIdFormula: {
      label: { en: 'Assignment ID Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.assignments) && content.assignments.length > 0 ? content.assignments[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['id']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.assignments) || !content.assignments?.length || !boundProps.assignments,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as assignment unique identifier',
      },
      /* wwEditor:end */
    },

    assignmentsResourceIdFormula: {
      label: { en: 'Assignment Resource ID Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.assignments) && content.assignments.length > 0 ? content.assignments[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['resource_id']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.assignments) || !content.assignments?.length || !boundProps.assignments,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field linking assignment to resource',
      },
      /* wwEditor:end */
    },

    assignmentsProjectIdFormula: {
      label: { en: 'Assignment Project ID Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.assignments) && content.assignments.length > 0 ? content.assignments[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['project_id']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.assignments) || !content.assignments?.length || !boundProps.assignments,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field linking assignment to project',
      },
      /* wwEditor:end */
    },

    assignmentsStartDateFormula: {
      label: { en: 'Assignment Start Date Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.assignments) && content.assignments.length > 0 ? content.assignments[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['start_date']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.assignments) || !content.assignments?.length || !boundProps.assignments,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as assignment start date',
      },
      /* wwEditor:end */
    },

    assignmentsEndDateFormula: {
      label: { en: 'Assignment End Date Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.assignments) && content.assignments.length > 0 ? content.assignments[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['end_date']",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.assignments) || !content.assignments?.length || !boundProps.assignments,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Field to use as assignment end date',
      },
      /* wwEditor:end */
    },

    assignmentsCapacityFormula: {
      label: { en: 'Assignment Capacity % Field' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.assignments) && content.assignments.length > 0 ? content.assignments[0] : null,
      }),
      defaultValue: {
        type: 'f',
        code: "context.mapping?.['capacity_percentage'] || context.mapping?.['capacity'] || 100",
      },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.assignments) || !content.assignments?.length || !boundProps.assignments,
      /* wwEditor:start */
      bindingValidation: {
        type: 'number',
        tooltip: 'Field to use as assignment capacity percentage (0-100)',
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
