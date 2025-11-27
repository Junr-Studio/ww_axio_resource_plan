/**
 * Mock data for Sprint-Based Resource Capacity Planning Component
 * EXPANDED VERSION - Testing scalability with many resources and projects
 */

// Team Members (Resources) - 35 resources across different teams
export const mockResources = [
  // Product Team (8 members)
  { id: 'res-1', name: 'Alice Johnson', role: 'Frontend Developer', team: 'Product Team', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'res-2', name: 'Bob Smith', role: 'Backend Developer', team: 'Product Team', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 'res-3', name: 'Carol Davis', role: 'Product Owner', team: 'Product Team', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 'res-4', name: 'David Lee', role: 'Full Stack Developer', team: 'Product Team', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 'res-5', name: 'Emma Wilson', role: 'UI/UX Designer', team: 'Product Team', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 'res-6', name: 'Frank Martinez', role: 'Backend Developer', team: 'Product Team', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: 'res-7', name: 'Grace Chen', role: 'Frontend Developer', team: 'Product Team', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: 'res-8', name: 'Henry Taylor', role: 'QA Engineer', team: 'Product Team', avatar: 'https://i.pravatar.cc/150?img=8' },

  // Engineering Team (10 members)
  { id: 'res-9', name: 'Isabella Garcia', role: 'Senior Backend Developer', team: 'Engineering Team', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 'res-10', name: 'Jack Robinson', role: 'Frontend Developer', team: 'Engineering Team', avatar: 'https://i.pravatar.cc/150?img=10' },
  { id: 'res-11', name: 'Katherine Moore', role: 'Full Stack Developer', team: 'Engineering Team', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 'res-12', name: 'Liam Anderson', role: 'Backend Developer', team: 'Engineering Team', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'res-13', name: 'Maya Thompson', role: 'Frontend Developer', team: 'Engineering Team', avatar: 'https://i.pravatar.cc/150?img=13' },
  { id: 'res-14', name: 'Noah White', role: 'Senior Full Stack Developer', team: 'Engineering Team', avatar: 'https://i.pravatar.cc/150?img=14' },
  { id: 'res-15', name: 'Olivia Harris', role: 'Backend Developer', team: 'Engineering Team', avatar: 'https://i.pravatar.cc/150?img=15' },
  { id: 'res-16', name: 'Peter Clark', role: 'Frontend Developer', team: 'Engineering Team', avatar: 'https://i.pravatar.cc/150?img=16' },
  { id: 'res-17', name: 'Quinn Lewis', role: 'Full Stack Developer', team: 'Engineering Team', avatar: 'https://i.pravatar.cc/150?img=17' },
  { id: 'res-18', name: 'Rachel Walker', role: 'QA Engineer', team: 'Engineering Team', avatar: 'https://i.pravatar.cc/150?img=18' },

  // Design Team (5 members)
  { id: 'res-19', name: 'Samuel Hall', role: 'UI/UX Designer', team: 'Design Team', avatar: 'https://i.pravatar.cc/150?img=19' },
  { id: 'res-20', name: 'Tina Young', role: 'UI/UX Designer', team: 'Design Team', avatar: 'https://i.pravatar.cc/150?img=20' },
  { id: 'res-21', name: 'Uma Patel', role: 'Senior UI/UX Designer', team: 'Design Team', avatar: 'https://i.pravatar.cc/150?img=21' },
  { id: 'res-22', name: 'Victor King', role: 'Graphic Designer', team: 'Design Team', avatar: 'https://i.pravatar.cc/150?img=22' },
  { id: 'res-23', name: 'Wendy Scott', role: 'Product Designer', team: 'Design Team', avatar: 'https://i.pravatar.cc/150?img=23' },

  // Infrastructure Team (6 members)
  { id: 'res-24', name: 'Xavier Green', role: 'DevOps Engineer', team: 'Infrastructure Team', avatar: 'https://i.pravatar.cc/150?img=24' },
  { id: 'res-25', name: 'Yolanda Baker', role: 'Cloud Engineer', team: 'Infrastructure Team', avatar: 'https://i.pravatar.cc/150?img=25' },
  { id: 'res-26', name: 'Zachary Adams', role: 'DevOps Engineer', team: 'Infrastructure Team', avatar: 'https://i.pravatar.cc/150?img=26' },
  { id: 'res-27', name: 'Aria Nelson', role: 'Site Reliability Engineer', team: 'Infrastructure Team', avatar: 'https://i.pravatar.cc/150?img=27' },
  { id: 'res-28', name: 'Blake Carter', role: 'Cloud Architect', team: 'Infrastructure Team', avatar: 'https://i.pravatar.cc/150?img=28' },
  { id: 'res-29', name: 'Chloe Mitchell', role: 'DevOps Engineer', team: 'Infrastructure Team', avatar: 'https://i.pravatar.cc/150?img=29' },

  // Data Team (6 members)
  { id: 'res-30', name: 'Dylan Perez', role: 'Data Engineer', team: 'Data Team', avatar: 'https://i.pravatar.cc/150?img=30' },
  { id: 'res-31', name: 'Elena Roberts', role: 'Data Analyst', team: 'Data Team', avatar: 'https://i.pravatar.cc/150?img=31' },
  { id: 'res-32', name: 'Felix Turner', role: 'ML Engineer', team: 'Data Team', avatar: 'https://i.pravatar.cc/150?img=32' },
  { id: 'res-33', name: 'Gabriella Phillips', role: 'Data Scientist', team: 'Data Team', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 'res-34', name: 'Hudson Campbell', role: 'Senior Data Engineer', team: 'Data Team', avatar: 'https://i.pravatar.cc/150?img=34' },
  { id: 'res-35', name: 'Iris Parker', role: 'Data Analyst', team: 'Data Team', avatar: 'https://i.pravatar.cc/150?img=35' },
];

// Projects - 18 projects with various durations and statuses
export const mockProjects = [
  { id: 'proj-1', name: 'E-commerce Redesign', start_target_date: '2025-11-17', number_of_sprints: 6, sprint_duration_weeks: 2, status: 'active', color: '#3b82f6' },
  { id: 'proj-2', name: 'Mobile App V2', start_target_date: '2025-11-25', number_of_sprints: 8, sprint_duration_weeks: 2, status: 'active', color: '#10b981' },
  { id: 'proj-3', name: 'API Migration', start_target_date: '2025-12-16', number_of_sprints: 4, sprint_duration_weeks: 2, status: 'planned', color: '#f59e0b' },
  { id: 'proj-4', name: 'Analytics Dashboard', start_target_date: '2025-11-11', number_of_sprints: 5, sprint_duration_weeks: 1, status: 'active', color: '#8b5cf6' },
  { id: 'proj-5', name: 'Customer Portal', start_target_date: '2026-01-06', number_of_sprints: 6, sprint_duration_weeks: 2, status: 'planned', color: '#ec4899' },
  { id: 'proj-6', name: 'Infrastructure Upgrade', start_target_date: '2025-12-09', number_of_sprints: 3, sprint_duration_weeks: 2, status: 'planned', color: '#06b6d4' },
  { id: 'proj-7', name: 'Payment Gateway Integration', start_target_date: '2025-11-20', number_of_sprints: 4, sprint_duration_weeks: 2, status: 'active', color: '#f43f5e' },
  { id: 'proj-8', name: 'Machine Learning Pipeline', start_target_date: '2025-12-02', number_of_sprints: 10, sprint_duration_weeks: 1, status: 'active', color: '#14b8a6' },
  { id: 'proj-9', name: 'Security Audit & Fixes', start_target_date: '2025-11-27', number_of_sprints: 3, sprint_duration_weeks: 1, status: 'active', color: '#ef4444' },
  { id: 'proj-10', name: 'Design System V2', start_target_date: '2025-12-01', number_of_sprints: 6, sprint_duration_weeks: 2, status: 'active', color: '#a855f7' },
  { id: 'proj-11', name: 'Microservices Migration', start_target_date: '2025-12-20', number_of_sprints: 8, sprint_duration_weeks: 2, status: 'planned', color: '#6366f1' },
  { id: 'proj-12', name: 'Marketing Automation', start_target_date: '2026-01-13', number_of_sprints: 5, sprint_duration_weeks: 2, status: 'planned', color: '#f97316' },
  { id: 'proj-13', name: 'CI/CD Pipeline', start_target_date: '2025-11-18', number_of_sprints: 3, sprint_duration_weeks: 1, status: 'active', color: '#84cc16' },
  { id: 'proj-14', name: 'Mobile Responsive Fix', start_target_date: '2025-12-05', number_of_sprints: 2, sprint_duration_weeks: 1, status: 'active', color: '#22d3ee' },
  { id: 'proj-15', name: 'Search Optimization', start_target_date: '2025-12-11', number_of_sprints: 4, sprint_duration_weeks: 2, status: 'planned', color: '#eab308' },
  { id: 'proj-16', name: 'Notification System', start_target_date: '2025-11-29', number_of_sprints: 3, sprint_duration_weeks: 2, status: 'active', color: '#fb923c' },
  { id: 'proj-17', name: 'Admin Panel Redesign', start_target_date: '2026-01-20', number_of_sprints: 5, sprint_duration_weeks: 2, status: 'planned', color: '#c084fc' },
  { id: 'proj-18', name: 'Performance Monitoring', start_target_date: '2025-12-15', number_of_sprints: 4, sprint_duration_weeks: 1, status: 'planned', color: '#4ade80' },
];

// Resource Assignments - Many assignments with varied overlaps and capacity scenarios
export const mockAssignments = [
  // Product Team assignments
  { id: 'a1', resource_id: 'res-1', project_id: 'proj-1', start_date: '2025-11-17', end_date: '2025-12-28', capacity_percentage: 50, project: mockProjects[0] },
  { id: 'a2', resource_id: 'res-1', project_id: 'proj-2', start_date: '2025-11-25', end_date: '2026-01-19', capacity_percentage: 50, project: mockProjects[1] },

  { id: 'a3', resource_id: 'res-2', project_id: 'proj-1', start_date: '2025-11-17', end_date: '2025-12-28', capacity_percentage: 70, project: mockProjects[0] },
  { id: 'a4', resource_id: 'res-2', project_id: 'proj-7', start_date: '2025-11-20', end_date: '2025-12-17', capacity_percentage: 30, project: mockProjects[6] },

  { id: 'a5', resource_id: 'res-3', project_id: 'proj-1', start_date: '2025-11-17', end_date: '2025-12-28', capacity_percentage: 25, project: mockProjects[0] },
  { id: 'a6', resource_id: 'res-3', project_id: 'proj-2', start_date: '2025-11-25', end_date: '2026-01-19', capacity_percentage: 25, project: mockProjects[1] },
  { id: 'a7', resource_id: 'res-3', project_id: 'proj-4', start_date: '2025-11-11', end_date: '2025-12-15', capacity_percentage: 30, project: mockProjects[3] },
  { id: 'a8', resource_id: 'res-3', project_id: 'proj-10', start_date: '2025-12-01', end_date: '2026-01-11', capacity_percentage: 20, project: mockProjects[9] },

  { id: 'a9', resource_id: 'res-4', project_id: 'proj-2', start_date: '2025-11-25', end_date: '2026-01-19', capacity_percentage: 60, project: mockProjects[1] },
  { id: 'a10', resource_id: 'res-4', project_id: 'proj-4', start_date: '2025-11-11', end_date: '2025-12-15', capacity_percentage: 40, project: mockProjects[3] },
  { id: 'a11', resource_id: 'res-4', project_id: 'proj-9', start_date: '2025-11-27', end_date: '2025-12-17', capacity_percentage: 30, project: mockProjects[8] },

  { id: 'a12', resource_id: 'res-5', project_id: 'proj-1', start_date: '2025-11-17', end_date: '2025-12-14', capacity_percentage: 60, project: mockProjects[0] },
  { id: 'a13', resource_id: 'res-5', project_id: 'proj-10', start_date: '2025-12-01', end_date: '2026-01-11', capacity_percentage: 40, project: mockProjects[9] },
  { id: 'a14', resource_id: 'res-5', project_id: 'proj-5', start_date: '2026-01-06', end_date: '2026-02-16', capacity_percentage: 80, project: mockProjects[4] },

  { id: 'a15', resource_id: 'res-6', project_id: 'proj-3', start_date: '2025-12-16', end_date: '2026-01-12', capacity_percentage: 100, project: mockProjects[2] },

  { id: 'a16', resource_id: 'res-7', project_id: 'proj-2', start_date: '2025-11-25', end_date: '2026-01-19', capacity_percentage: 50, project: mockProjects[1] },
  { id: 'a17', resource_id: 'res-7', project_id: 'proj-3', start_date: '2025-12-16', end_date: '2026-01-12', capacity_percentage: 40, project: mockProjects[2] },
  { id: 'a18', resource_id: 'res-7', project_id: 'proj-14', start_date: '2025-12-05', end_date: '2025-12-18', capacity_percentage: 30, project: mockProjects[13] },

  { id: 'a19', resource_id: 'res-8', project_id: 'proj-1', start_date: '2025-11-20', end_date: '2025-12-28', capacity_percentage: 40, project: mockProjects[0] },
  { id: 'a20', resource_id: 'res-8', project_id: 'proj-2', start_date: '2025-11-28', end_date: '2026-01-19', capacity_percentage: 40, project: mockProjects[1] },
  { id: 'a21', resource_id: 'res-8', project_id: 'proj-9', start_date: '2025-11-27', end_date: '2025-12-17', capacity_percentage: 20, project: mockProjects[8] },

  // Engineering Team assignments
  { id: 'a22', resource_id: 'res-9', project_id: 'proj-7', start_date: '2025-11-20', end_date: '2025-12-17', capacity_percentage: 80, project: mockProjects[6] },
  { id: 'a23', resource_id: 'res-9', project_id: 'proj-11', start_date: '2025-12-20', end_date: '2026-02-13', capacity_percentage: 20, project: mockProjects[10] },

  { id: 'a24', resource_id: 'res-10', project_id: 'proj-1', start_date: '2025-11-17', end_date: '2025-12-28', capacity_percentage: 100, project: mockProjects[0] },

  { id: 'a25', resource_id: 'res-11', project_id: 'proj-2', start_date: '2025-11-25', end_date: '2026-01-19', capacity_percentage: 50, project: mockProjects[1] },
  { id: 'a26', resource_id: 'res-11', project_id: 'proj-16', start_date: '2025-11-29', end_date: '2026-01-09', capacity_percentage: 50, project: mockProjects[15] },

  { id: 'a27', resource_id: 'res-12', project_id: 'proj-3', start_date: '2025-12-16', end_date: '2026-01-12', capacity_percentage: 70, project: mockProjects[2] },
  { id: 'a28', resource_id: 'res-12', project_id: 'proj-11', start_date: '2025-12-20', end_date: '2026-02-13', capacity_percentage: 30, project: mockProjects[10] },

  { id: 'a29', resource_id: 'res-13', project_id: 'proj-2', start_date: '2025-11-25', end_date: '2026-01-19', capacity_percentage: 60, project: mockProjects[1] },
  { id: 'a30', resource_id: 'res-13', project_id: 'proj-14', start_date: '2025-12-05', end_date: '2025-12-18', capacity_percentage: 40, project: mockProjects[13] },

  { id: 'a31', resource_id: 'res-14', project_id: 'proj-7', start_date: '2025-11-20', end_date: '2025-12-17', capacity_percentage: 50, project: mockProjects[6] },
  { id: 'a32', resource_id: 'res-14', project_id: 'proj-11', start_date: '2025-12-20', end_date: '2026-02-13', capacity_percentage: 50, project: mockProjects[10] },

  { id: 'a33', resource_id: 'res-15', project_id: 'proj-3', start_date: '2025-12-16', end_date: '2026-01-12', capacity_percentage: 80, project: mockProjects[2] },
  { id: 'a34', resource_id: 'res-15', project_id: 'proj-15', start_date: '2025-12-11', end_date: '2026-01-07', capacity_percentage: 30, project: mockProjects[14] },

  { id: 'a35', resource_id: 'res-16', project_id: 'proj-1', start_date: '2025-11-17', end_date: '2025-12-28', capacity_percentage: 70, project: mockProjects[0] },
  { id: 'a36', resource_id: 'res-16', project_id: 'proj-10', start_date: '2025-12-01', end_date: '2026-01-11', capacity_percentage: 30, project: mockProjects[9] },

  { id: 'a37', resource_id: 'res-17', project_id: 'proj-2', start_date: '2025-11-25', end_date: '2026-01-19', capacity_percentage: 100, project: mockProjects[1] },

  { id: 'a38', resource_id: 'res-18', project_id: 'proj-1', start_date: '2025-11-22', end_date: '2025-12-28', capacity_percentage: 30, project: mockProjects[0] },
  { id: 'a39', resource_id: 'res-18', project_id: 'proj-2', start_date: '2025-12-01', end_date: '2026-01-19', capacity_percentage: 30, project: mockProjects[1] },
  { id: 'a40', resource_id: 'res-18', project_id: 'proj-9', start_date: '2025-11-27', end_date: '2025-12-17', capacity_percentage: 40, project: mockProjects[8] },

  // Design Team assignments
  { id: 'a41', resource_id: 'res-19', project_id: 'proj-10', start_date: '2025-12-01', end_date: '2026-01-11', capacity_percentage: 80, project: mockProjects[9] },
  { id: 'a42', resource_id: 'res-19', project_id: 'proj-17', start_date: '2026-01-20', end_date: '2026-03-02', capacity_percentage: 20, project: mockProjects[16] },

  { id: 'a43', resource_id: 'res-20', project_id: 'proj-1', start_date: '2025-11-17', end_date: '2025-12-14', capacity_percentage: 50, project: mockProjects[0] },
  { id: 'a44', resource_id: 'res-20', project_id: 'proj-5', start_date: '2026-01-06', end_date: '2026-02-16', capacity_percentage: 50, project: mockProjects[4] },

  { id: 'a45', resource_id: 'res-21', project_id: 'proj-10', start_date: '2025-12-01', end_date: '2026-01-11', capacity_percentage: 60, project: mockProjects[9] },
  { id: 'a46', resource_id: 'res-21', project_id: 'proj-2', start_date: '2025-11-25', end_date: '2025-12-08', capacity_percentage: 40, project: mockProjects[1] },

  { id: 'a47', resource_id: 'res-22', project_id: 'proj-1', start_date: '2025-11-17', end_date: '2025-12-14', capacity_percentage: 40, project: mockProjects[0] },
  { id: 'a48', resource_id: 'res-22', project_id: 'proj-10', start_date: '2025-12-01', end_date: '2026-01-11', capacity_percentage: 60, project: mockProjects[9] },

  { id: 'a49', resource_id: 'res-23', project_id: 'proj-5', start_date: '2026-01-06', end_date: '2026-02-16', capacity_percentage: 70, project: mockProjects[4] },
  { id: 'a50', resource_id: 'res-23', project_id: 'proj-17', start_date: '2026-01-20', end_date: '2026-03-02', capacity_percentage: 30, project: mockProjects[16] },

  // Infrastructure Team assignments
  { id: 'a51', resource_id: 'res-24', project_id: 'proj-6', start_date: '2025-12-09', end_date: '2025-12-29', capacity_percentage: 60, project: mockProjects[5] },
  { id: 'a52', resource_id: 'res-24', project_id: 'proj-13', start_date: '2025-11-18', end_date: '2025-12-08', capacity_percentage: 40, project: mockProjects[12] },

  { id: 'a53', resource_id: 'res-25', project_id: 'proj-6', start_date: '2025-12-09', end_date: '2025-12-29', capacity_percentage: 80, project: mockProjects[5] },
  { id: 'a54', resource_id: 'res-25', project_id: 'proj-18', start_date: '2025-12-15', end_date: '2026-01-11', capacity_percentage: 20, project: mockProjects[17] },

  { id: 'a55', resource_id: 'res-26', project_id: 'proj-13', start_date: '2025-11-18', end_date: '2025-12-08', capacity_percentage: 100, project: mockProjects[12] },

  { id: 'a56', resource_id: 'res-27', project_id: 'proj-6', start_date: '2025-12-09', end_date: '2025-12-29', capacity_percentage: 50, project: mockProjects[5] },
  { id: 'a57', resource_id: 'res-27', project_id: 'proj-18', start_date: '2025-12-15', end_date: '2026-01-11', capacity_percentage: 50, project: mockProjects[17] },

  { id: 'a58', resource_id: 'res-28', project_id: 'proj-11', start_date: '2025-12-20', end_date: '2026-02-13', capacity_percentage: 70, project: mockProjects[10] },
  { id: 'a59', resource_id: 'res-28', project_id: 'proj-6', start_date: '2025-12-09', end_date: '2025-12-29', capacity_percentage: 30, project: mockProjects[5] },

  { id: 'a60', resource_id: 'res-29', project_id: 'proj-13', start_date: '2025-11-18', end_date: '2025-12-08', capacity_percentage: 60, project: mockProjects[12] },
  { id: 'a61', resource_id: 'res-29', project_id: 'proj-18', start_date: '2025-12-15', end_date: '2026-01-11', capacity_percentage: 40, project: mockProjects[17] },

  // Data Team assignments
  { id: 'a62', resource_id: 'res-30', project_id: 'proj-8', start_date: '2025-12-02', end_date: '2026-02-09', capacity_percentage: 80, project: mockProjects[7] },
  { id: 'a63', resource_id: 'res-30', project_id: 'proj-4', start_date: '2025-11-11', end_date: '2025-12-15', capacity_percentage: 20, project: mockProjects[3] },

  { id: 'a64', resource_id: 'res-31', project_id: 'proj-4', start_date: '2025-11-11', end_date: '2025-12-15', capacity_percentage: 60, project: mockProjects[3] },
  { id: 'a65', resource_id: 'res-31', project_id: 'proj-8', start_date: '2025-12-02', end_date: '2026-02-09', capacity_percentage: 40, project: mockProjects[7] },

  { id: 'a66', resource_id: 'res-32', project_id: 'proj-8', start_date: '2025-12-02', end_date: '2026-02-09', capacity_percentage: 100, project: mockProjects[7] },

  { id: 'a67', resource_id: 'res-33', project_id: 'proj-8', start_date: '2025-12-02', end_date: '2026-02-09', capacity_percentage: 70, project: mockProjects[7] },
  { id: 'a68', resource_id: 'res-33', project_id: 'proj-15', start_date: '2025-12-11', end_date: '2026-01-07', capacity_percentage: 30, project: mockProjects[14] },

  { id: 'a69', resource_id: 'res-34', project_id: 'proj-8', start_date: '2025-12-02', end_date: '2026-02-09', capacity_percentage: 60, project: mockProjects[7] },
  { id: 'a70', resource_id: 'res-34', project_id: 'proj-4', start_date: '2025-11-11', end_date: '2025-12-15', capacity_percentage: 40, project: mockProjects[3] },

  { id: 'a71', resource_id: 'res-35', project_id: 'proj-4', start_date: '2025-11-11', end_date: '2025-12-15', capacity_percentage: 50, project: mockProjects[3] },
  { id: 'a72', resource_id: 'res-35', project_id: 'proj-12', start_date: '2026-01-13', end_date: '2026-02-23', capacity_percentage: 50, project: mockProjects[11] },

  // Add some OVER-CAPACITY scenarios (>100%)
  { id: 'a73', resource_id: 'res-9', project_id: 'proj-13', start_date: '2025-11-25', end_date: '2025-12-08', capacity_percentage: 30, project: mockProjects[12] }, // Total: 110% during overlap
  { id: 'a74', resource_id: 'res-15', project_id: 'proj-18', start_date: '2025-12-20', end_date: '2026-01-11', capacity_percentage: 20, project: mockProjects[17] }, // Total: 110% during overlap
  { id: 'a75', resource_id: 'res-30', project_id: 'proj-15', start_date: '2025-12-11', end_date: '2025-12-18', capacity_percentage: 30, project: mockProjects[14] }, // Total: 110% during overlap

  // Extended assignments to cover full 84-day timeline (through Feb 20, 2026)
  { id: 'a76', resource_id: 'res-1', project_id: 'proj-5', start_date: '2026-01-20', end_date: '2026-02-20', capacity_percentage: 60, project: mockProjects[4] },
  { id: 'a77', resource_id: 'res-2', project_id: 'proj-17', start_date: '2026-01-20', end_date: '2026-02-20', capacity_percentage: 50, project: mockProjects[16] },
  { id: 'a78', resource_id: 'res-3', project_id: 'proj-12', start_date: '2026-01-20', end_date: '2026-02-20', capacity_percentage: 30, project: mockProjects[11] },
  { id: 'a79', resource_id: 'res-4', project_id: 'proj-17', start_date: '2026-01-20', end_date: '2026-02-20', capacity_percentage: 70, project: mockProjects[16] },
  { id: 'a80', resource_id: 'res-6', project_id: 'proj-15', start_date: '2026-01-13', end_date: '2026-02-20', capacity_percentage: 80, project: mockProjects[14] },
  { id: 'a81', resource_id: 'res-7', project_id: 'proj-5', start_date: '2026-01-20', end_date: '2026-02-20', capacity_percentage: 60, project: mockProjects[4] },
  { id: 'a82', resource_id: 'res-9', project_id: 'proj-18', start_date: '2026-01-20', end_date: '2026-02-20', capacity_percentage: 50, project: mockProjects[17] },
  { id: 'a83', resource_id: 'res-10', project_id: 'proj-17', start_date: '2026-01-20', end_date: '2026-02-20', capacity_percentage: 100, project: mockProjects[16] },
  { id: 'a84', resource_id: 'res-12', project_id: 'proj-15', start_date: '2026-01-13', end_date: '2026-02-20', capacity_percentage: 50, project: mockProjects[14] },
  { id: 'a85', resource_id: 'res-13', project_id: 'proj-17', start_date: '2026-01-20', end_date: '2026-02-20', capacity_percentage: 40, project: mockProjects[16] },
  { id: 'a86', resource_id: 'res-16', project_id: 'proj-12', start_date: '2026-01-13', end_date: '2026-02-20', capacity_percentage: 60, project: mockProjects[11] },
  { id: 'a87', resource_id: 'res-19', project_id: 'proj-5', start_date: '2026-01-13', end_date: '2026-02-20', capacity_percentage: 70, project: mockProjects[4] },
  { id: 'a88', resource_id: 'res-24', project_id: 'proj-11', start_date: '2026-01-20', end_date: '2026-02-20', capacity_percentage: 50, project: mockProjects[10] },
  { id: 'a89', resource_id: 'res-28', project_id: 'proj-18', start_date: '2026-01-13', end_date: '2026-02-20', capacity_percentage: 40, project: mockProjects[17] },
  { id: 'a90', resource_id: 'res-32', project_id: 'proj-15', start_date: '2026-01-20', end_date: '2026-02-20', capacity_percentage: 80, project: mockProjects[14] },
];
