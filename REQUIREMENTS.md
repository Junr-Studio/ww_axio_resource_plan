# Sprint-Based Resource Capacity Planning Component

## Business Context

### Primary Objective
Create a high-level capacity planning timeline for agile teams to visualize resource availability and project assignments across multiple sprints. This component complements an existing sprint-by-sprint Kanban view by providing mid-term visibility (3+ months) of team member allocation across projects.

### Target Users
- **Product Owners**: Plan resource needs for upcoming projects
- **Team Leads**: Monitor team capacity and prevent overallocation
- **Project Managers**: Schedule project starts based on resource availability
- **Developers/Resources**: See their upcoming commitments across projects

### Key Problems to Solve
- Lack of high-level visibility beyond current sprint in Kanban view
- Difficulty seeing when team members will be available for new projects
- No clear view of capacity conflicts (resources allocated >100%)
- Manual tracking of multi-project assignments and capacity percentages
- Uncertainty about project timelines based on sprint estimates

---

## Core Concept

**NOT a task-by-task project management tool.** This is a high-level capacity planning view that shows:
- Which resources are assigned to which projects
- When resources are available or busy (at a glance)
- Resource capacity percentages per project (e.g., 50% on Project A, 30% on Project B)
- Warnings when resources are overallocated (>100% capacity in any week)
- Project durations calculated from sprint estimates

---

## User Stories

### Essential User Stories (MVP)
1. **As a team lead**, I want to see all my team members' project assignments in a week-by-week timeline so that I can identify capacity conflicts at a glance
2. **As a product owner**, I want to assign a developer to a project with a specific capacity percentage (e.g., 50%) so that I can balance resources across multiple projects
3. **As a project manager**, I want to see visual warnings when a resource is overallocated (>100%) so that I can rebalance assignments before conflicts occur
4. **As a developer**, I want to see my upcoming project commitments for the next 3 months so that I can plan my work accordingly
5. **As a team lead**, I want to drag assignment bars to reschedule or adjust time periods so that I can quickly adapt to changing priorities
6. **As a product owner**, I want to see project durations automatically calculated from sprint count and duration so that I don't have to manually track end dates

### Secondary User Stories
7. **As a user**, I want to filter the view by specific projects or resources so that I can focus on relevant information
8. **As a user**, I want to hover over assignment bars to see project details (name, capacity %, dates) without cluttering the view
9. **As a team lead**, I want assignment bars color-coded by project so that I can easily distinguish between different initiatives
10. **As a user**, I want capacity status visualized with border colors (green/yellow/red) so that I can quickly spot availability or conflicts

---

## Core Features (MVP)

### 1. Week-by-Week Timeline View
**Priority**: Must Have
**Description**: Calendar-based timeline showing weeks as columns, starting from today

**Functionality**:
- Timeline starts with current week (today's date) as the first week
- Default view shows 3 months ahead (~12 weeks)
- Week columns clearly labeled with week number or date range (e.g., "Week of Jan 15")
- Horizontal scrolling for longer time ranges
- Optional navigation controls (scroll to today, next/previous month)

**Acceptance Criteria**:
- [ ] Timeline displays weeks as columns starting from current date
- [ ] Default view shows 12 weeks (3 months)
- [ ] Week headers show clear date ranges
- [ ] Smooth horizontal scrolling
- [ ] Timeline auto-updates daily (today always starts the view)

---

### 2. Resource Rows
**Priority**: Must Have
**Description**: Each team member displayed as a row with profile information

**Functionality**:
- Resource name and avatar displayed on the left
- Optional role/team label
- Row height sufficient for stacked assignment bars
- Rows always visible (sticky left column when scrolling horizontally)

**Acceptance Criteria**:
- [ ] Each resource shows name and avatar clearly
- [ ] Role/team labels display when provided
- [ ] Rows are distinct and scannable
- [ ] Resource names remain visible during horizontal scroll

---

### 3. Project Assignment Bars
**Priority**: Must Have
**Description**: Colored bars representing project assignments with capacity percentages

**Visual Design**:
- **Bar color**: Matches project color (for easy project identification)
- **Border color**: Indicates capacity status
  - **Green border**: Resource has remaining capacity (<80% total allocated)
  - **Yellow border**: Near full capacity (80-100% total allocated)
  - **Red border**: Overallocated (>100% total allocated in any week this bar spans)
- **Bar width**: Spans from assignment start date to end date across week columns
- **Bar height**: Proportional to capacity percentage (50% assignment = half-height bar)
- **Bar label**: Shows project name and capacity percentage (e.g., "Project X - 50%")

**Stacking Behavior**:
- Multiple assignments for the same resource stack vertically within the row
- Total height of stacked bars visualizes total capacity usage
- When total capacity >100%, all bars in that week period show red borders

**Acceptance Criteria**:
- [ ] Bars span correct weeks based on assignment dates
- [ ] Bar color matches project color
- [ ] Border color reflects capacity status (green/yellow/red)
- [ ] Multiple assignments stack within the same resource row
- [ ] Bar height proportional to capacity percentage
- [ ] Project name and capacity % visible on bar (or on hover if too narrow)
- [ ] Over-capacity warnings (red borders) appear on all bars in affected weeks

---

### 4. Capacity Calculation & Warnings
**Priority**: Must Have
**Description**: Automatic calculation of resource capacity per week with visual warnings

**Business Logic**:
- Sum all assignment capacity percentages per resource per week
- Example: Developer A assigned to Project 1 (50%) and Project 2 (60%) = 110% for that week
- If total capacity >100% in any week:
  - All assignment bars spanning that week show **red borders**
  - Optional: Display capacity percentage indicator (e.g., "110%" badge on resource row)

**Capacity Status Thresholds**:
- **Green border**: <80% total capacity
- **Yellow border**: 80-100% total capacity
- **Red border**: >100% total capacity (overallocation)

**Acceptance Criteria**:
- [ ] Component calculates total capacity per resource per week
- [ ] Border colors update based on capacity thresholds
- [ ] Over-capacity warnings (red borders) appear immediately when capacity >100%
- [ ] Capacity calculations account for partial-week assignments (edge weeks)

---

### 5. Project Duration Calculation
**Priority**: Must Have
**Description**: Automatically calculate project end dates from sprint configuration

**Business Logic**:
```
Project End Date = Project Start Date + (Number of Sprints × Sprint Duration in Weeks)
```

**Project Start Date Logic**:
1. **Before first sprint starts**: Use `start_target_date` from projects table
2. **After first sprint starts**: Use first sprint's actual `start_date` from sprints table
3. Check condition: `IF first_sprint.start_date <= TODAY THEN use first_sprint.start_date ELSE use project.start_target_date`

**Data Requirements**:
- Projects table: `id`, `name`, `start_target_date`, `number_of_sprints`, `sprint_duration_weeks`, `status`, `color`
- Sprints table: `id`, `project_id`, `start_date`, `end_date`, `sprint_number`

**Acceptance Criteria**:
- [ ] Component calculates project end date from start date + (sprints × duration)
- [ ] Uses targeted start date until first sprint begins
- [ ] Switches to actual start date once first sprint starts
- [ ] Recalculates automatically if sprint count or duration changes

---

### 6. Drag-and-Drop Interactions
**Priority**: Must Have
**Description**: Interactive assignment management through drag-and-drop

#### 6.1. Create Assignment (Drag Resource to Timeline)
**Flow**:
1. User drags a resource name/avatar from the left
2. User drops onto a week in the timeline
3. **Modal opens** with:
   - Project selection dropdown (list of active projects)
   - Capacity percentage input (default: 100%)
   - Start date (pre-filled with dropped week's start date)
   - End date (pre-filled with selected project's calculated end date)
4. User confirms → Assignment created

**Alternative**: If you can implement drag-from-project-list, allow dragging project directly onto resource row, skipping project selection in modal.

#### 6.2. Reschedule Assignment (Drag Bar Horizontally)
**Flow**:
1. User clicks and drags an assignment bar left or right
2. Bar moves to new week(s) with visual feedback
3. On drop → Assignment start/end dates updated (maintaining duration)
4. Capacity calculations refresh, border colors update

#### 6.3. Adjust Time Period (Drag Bar Edges)
**Flow**:
1. User hovers over left or right edge of assignment bar
2. Cursor changes to resize indicator (↔)
3. User drags edge to expand or shrink time period
4. On drop → Assignment start or end date updated
5. Capacity calculations refresh

**Acceptance Criteria**:
- [ ] Can drag resource to timeline to create assignment
- [ ] Modal opens with project selection and capacity input
- [ ] Can drag assignment bar horizontally to reschedule
- [ ] Can drag bar edges to adjust start/end dates
- [ ] Visual feedback during drag (ghost bar, valid drop zones)
- [ ] Invalid drops prevented (e.g., dropping outside timeline)
- [ ] Capacity recalculates and border colors update after each interaction

---

### 7. Hover Tooltips
**Priority**: Must Have
**Description**: Display detailed information on hover without cluttering the view

**Tooltip Content** (when hovering over assignment bar):
- Project name
- Capacity percentage (e.g., "50%")
- Start date → End date (formatted: "Jan 15 - Feb 28")
- Project status (active, planned, completed)
- Optional: Total sprint count, sprint duration

**Acceptance Criteria**:
- [ ] Tooltips appear on hover over assignment bars
- [ ] Tooltip shows project name, capacity %, and dates
- [ ] Tooltip styled clearly and readable
- [ ] Tooltip positioning adjusts to avoid going off-screen

---

### 8. Click Events & Workflows
**Priority**: Must Have
**Description**: Emit events for WeWeb workflow integration

**Events to Emit**:
1. **assignment-created**: When new assignment is created
   - Data: `{ resourceId, projectId, startDate, endDate, capacityPercentage }`
2. **assignment-updated**: When assignment is rescheduled or adjusted
   - Data: `{ assignmentId, startDate, endDate, capacityPercentage }`
3. **assignment-clicked**: When user clicks an assignment bar
   - Data: `{ assignmentId, resourceId, projectId, assignment object }`
4. **resource-clicked**: When user clicks a resource row/name
   - Data: `{ resourceId, resource object }`

**Acceptance Criteria**:
- [ ] Events emitted correctly with complete data payloads
- [ ] Events can trigger WeWeb workflows
- [ ] Event data includes all necessary IDs for Supabase updates

---

### 9. Filtering (Optional but Recommended)
**Priority**: Should Have
**Description**: Filter view by projects or resources

**Filters**:
- **Show only specific projects**: Multi-select dropdown to filter visible assignments
- **Show only specific resources**: Multi-select dropdown to filter visible rows
- **Show only resources with availability**: Hide fully allocated resources

**Acceptance Criteria**:
- [ ] Can filter by projects (show only selected projects' assignments)
- [ ] Can filter by resources (show only selected resource rows)
- [ ] Filters persist during user session
- [ ] Clear filters button to reset view

---

## Data Structure Requirements

### Database Tables (Supabase)

#### 1. Projects Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  start_target_date DATE NOT NULL,
  number_of_sprints INTEGER NOT NULL,
  sprint_duration_weeks INTEGER NOT NULL,
  status TEXT DEFAULT 'planned', -- 'planned', 'active', 'completed'
  color TEXT DEFAULT '#3b82f6', -- Hex color for project bars
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. Sprints Table
```sql
CREATE TABLE sprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  sprint_number INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. Team Members Table (Resources)
```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  avatar TEXT, -- URL to avatar image
  role TEXT, -- Job title (e.g., "Frontend Developer")
  team TEXT, -- Team/department (e.g., "Product Team")
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 4. Resource Assignments Table (NEW - To Be Created)
```sql
CREATE TABLE resource_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  capacity_percentage INTEGER NOT NULL CHECK (capacity_percentage > 0 AND capacity_percentage <= 100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_assignments_resource ON resource_assignments(resource_id);
CREATE INDEX idx_assignments_project ON resource_assignments(project_id);
CREATE INDEX idx_assignments_dates ON resource_assignments(start_date, end_date);
```

---

### Component Props (WeWeb Data Binding)

#### Resources Array (from team_members table)
```javascript
[
  {
    id: "uuid",                 // Unique identifier
    name: "John Doe",           // Display name (required)
    role: "Frontend Developer", // Job title (optional)
    team: "Product Team",       // Team/department (optional)
    avatar: "https://...",      // Image URL (optional)
  }
]
```

#### Projects Array (from projects table)
```javascript
[
  {
    id: "uuid",                 // Unique identifier
    name: "Project Alpha",      // Display name (required)
    start_target_date: "2025-01-15", // ISO date string (required)
    number_of_sprints: 6,       // Sprint count (required)
    sprint_duration_weeks: 2,   // Weeks per sprint (required)
    status: "active",           // Status (required)
    color: "#3b82f6",           // Hex color for bars (required)
    sprints: [                  // Related sprints (optional, for start date logic)
      {
        sprint_number: 1,
        start_date: "2025-01-15",
        end_date: "2025-01-28"
      }
    ]
  }
]
```

#### Assignments Array (from resource_assignments table)
```javascript
[
  {
    id: "uuid",                 // Unique identifier
    resource_id: "uuid",        // Links to team_members.id (required)
    project_id: "uuid",         // Links to projects.id (required)
    start_date: "2025-01-15",   // ISO date string (required)
    end_date: "2025-03-31",     // ISO date string (required)
    capacity_percentage: 50,    // Integer 1-100 (required)
    project: {                  // Joined project data (for display)
      name: "Project Alpha",
      color: "#3b82f6"
    }
  }
]
```

---

## User Experience Requirements

### Visual Design Principles
- **High-level at-a-glance clarity**: Users should understand resource availability in <30 seconds
- **Color-coded projects**: Each project has distinct color for easy identification
- **Capacity status color system**:
  - Green borders = Available capacity
  - Yellow borders = Near full capacity
  - Red borders = Overallocated
- **Clean, minimal design**: Avoid clutter, focus on essential information
- **Responsive to container**: Adapt to different screen widths (horizontal scroll for narrow viewports)

### Interaction Patterns
- **Drag-and-drop feels natural**: Smooth animations, clear visual feedback
- **Hover reveals details**: Tooltips provide context without permanent clutter
- **Click triggers workflows**: Assignments/resources clickable for detailed views/editing in WeWeb
- **Edge resize is intuitive**: Clear cursor indicators, snap-to-week behavior

### Performance Expectations
- **Smooth scrolling**: No lag when scrolling horizontally through weeks
- **Instant feedback**: Drag-and-drop updates feel immediate (<100ms response)
- **Fast calculations**: Capacity calculations and border color updates happen in real-time
- **Optimized rendering**: Handle 10-15 resources, 10-15 projects, 50+ assignments without performance issues

---

## Technical Constraints

### Performance Targets
- Support 10-15 team members (will grow over time)
- Support 10-15 active projects (will grow over time)
- Display 3 months (12 weeks) by default
- Handle up to 100 assignments efficiently
- Component loads in <2 seconds
- Smooth interactions (60fps during drag-and-drop)

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge) last 2 versions
- No IE11 support required
- Desktop-first (mobile is secondary/optional)

### WeWeb Integration Requirements
- Must work as WeWeb custom element
- Props bound to WeWeb collections (Supabase data)
- Events emit to trigger WeWeb workflows
- Workflows handle Supabase CRUD operations (create, update, delete assignments)
- Component is stateless (data lives in Supabase, passed via WeWeb)

### Supabase Integration Pattern
1. WeWeb fetches data from Supabase (projects, team_members, resource_assignments, sprints)
2. WeWeb passes data to component via props
3. Component displays timeline and handles interactions
4. Component emits events (assignment-created, assignment-updated, etc.)
5. WeWeb workflows listen to events and update Supabase
6. WeWeb re-fetches updated data, component re-renders automatically

---

## Out of Scope (NOT in MVP)

### Explicitly NOT Building
- ❌ **Task-level management**: This is NOT a Kanban or task board replacement
- ❌ **Sprint planning**: Use existing sprint/Kanban views for sprint details
- ❌ **Time tracking**: No actual hours logged, only capacity planning
- ❌ **Resource capacity calculations from availability**: Capacity % must be manually set per assignment
- ❌ **Automatic conflict resolution**: Component warns about over-capacity but doesn't auto-fix
- ❌ **Multi-user real-time collaboration**: No live cursors or concurrent editing indicators
- ❌ **Built-in data storage**: All data lives in Supabase, managed via WeWeb
- ❌ **Email notifications**: Handled outside component
- ❌ **Export to PDF/Excel**: Use browser print or external tools
- ❌ **Mobile-optimized view**: Desktop-first, mobile is stretch goal
- ❌ **Day-by-day or month-by-month views**: Week-by-week only for MVP
- ❌ **Recurring assignments**: Each assignment is a one-time period
- ❌ **Dependencies between projects**: No Gantt-style dependencies

---

## Future Enhancements (Post-MVP)

### Phase 2 Priorities
1. **Capacity percentage indicators**: Show numeric "85%" or "110%" badge on resource rows
2. **View by project**: Alternative view grouping assignments by project instead of resource
3. **Month-by-month zoom level**: Higher-level view for longer-term planning (6-12 months)
4. **Quick-add assignment button**: Alternative to drag-and-drop for keyboard users
5. **Assignment notes/comments**: Optional text field per assignment for context
6. **Resource utilization chart**: Bar chart showing average capacity usage per resource

### Phase 3 Ideas
1. **Team/department grouping**: Collapsible sections grouping resources by team
2. **Sprint boundaries visualization**: Show sprint dividers within project bars
3. **Historical view**: View past assignments (completed projects)
4. **Forecasting mode**: Predict future capacity based on typical project durations
5. **Bulk operations**: Select multiple assignments to reschedule together
6. **Mobile-responsive layout**: Vertical timeline for mobile screens

---

## Success Metrics

### User Success Indicators
- Users can identify resource availability within 30 seconds of viewing
- 90% of users successfully create/adjust assignments without instructions
- Product owners report improved visibility into mid-term resource planning
- Reduction in over-capacity incidents due to early warnings

### Technical Success Indicators
- Component loads in <2 seconds with 15 resources and 50 assignments
- Zero console errors in production
- Drag-and-drop interactions feel smooth (60fps)
- Capacity calculations accurate 100% of the time
- Events integrate successfully with WeWeb workflows and Supabase updates

---

## Implementation Notes

### Design Decisions Made
1. **Week-by-week view only** (not day or month) - Best balance for 3-month sprint planning
2. **Timeline starts today** - Most relevant view for forward planning (caveat: may need "scroll to past" for historical review)
3. **Border colors for capacity status** - Keeps project colors clear while adding capacity context
4. **Modal for project selection** - Clearer UX than trying to infer project from drop location
5. **Stacked bars within rows** - Visualizes multi-project assignments effectively
6. **Calculate end dates from sprints** - Reduces data entry, keeps estimates consistent

### Open Questions & Considerations

#### Timeline Start Date
- **Decision**: Timeline starts with current week (today's date)
- **Caveat**: Users cannot see past assignments in initial MVP
- **Future**: Add "scroll to past" or date range picker if historical view is needed

#### Partial Week Assignments
- **Question**: How to handle assignments that start mid-week?
- **Proposed**: Assignments snap to week boundaries (start of Monday, end of Sunday)
- **Alternative**: Allow precise date selection, show partial weeks visually (may be complex)

#### Capacity Percentage Granularity
- **Question**: Allow any integer (1-100%) or limit to increments (e.g., 25%, 50%, 75%, 100%)?
- **Proposed**: Allow any integer for flexibility
- **UI**: Provide input field with optional preset buttons (25%, 50%, 75%, 100%)

#### Over-Capacity Behavior
- **Question**: Should component prevent assignments >100% capacity, or just warn?
- **Decision**: **Warn only** (red borders), don't block - users may intentionally overallocate temporarily

#### Mobile Support
- **Question**: Is mobile view required for MVP?
- **Decision**: **Desktop-first**, mobile is stretch goal or Phase 2
- **Reason**: Complex drag-and-drop interactions challenging on touch devices

#### Project Status Filtering
- **Question**: Should component auto-hide completed projects or show all?
- **Proposed**: Show active and planned projects by default, allow toggle to show completed

---

## Development Guidance

### Recommended Tech Stack
- **Vue 3 Composition API** (required for WeWeb components)
- **Date handling**: date-fns library (for week calculations, date arithmetic)
- **Drag-and-drop**: Native HTML5 drag-and-drop or Vue Draggable
- **Styling**: Scoped SCSS (per WeWeb component standards)

### Key Implementation Challenges

1. **Week-based date calculations**:
   - Calculate week start/end dates from today
   - Snap assignment dates to week boundaries
   - Handle partial weeks at assignment edges

2. **Capacity calculation per week**:
   - For each resource, iterate through weeks in view
   - Sum capacity percentages of all assignments spanning that week
   - Determine border color based on thresholds

3. **Drag-and-drop state management**:
   - Track dragged item (resource or assignment)
   - Calculate valid drop zones (weeks in timeline)
   - Update assignment dates based on drop location
   - Emit events to WeWeb workflows

4. **Performance optimization**:
   - Use computed properties for processed data (don't recalculate on every render)
   - Debounce drag events to avoid excessive re-renders
   - Virtual scrolling if assignment count exceeds 100

### WeWeb Integration Checklist
- [ ] Component props structured for WeWeb data binding
- [ ] All props use optional chaining for safety
- [ ] Events emitted with complete data payloads
- [ ] Component is stateless (no internal data storage)
- [ ] Reactivity: Changes to props immediately update view
- [ ] wwEditor blocks for editor-specific code

---

**Last Updated**: 2025-11-26
**Version**: 2.0 (Sprint-Based Capacity Planning)
**Status**: Ready for Development
