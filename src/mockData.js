/**
 * Mock data for Timeline Planning Component
 * EXPANDED VERSION - Testing scalability with many rows and categories
 * Generic structure: rows (people/rooms/equipment), categories (projects/events/jobs), items (timeline entries)
 */

// Timeline Rows (could be people, rooms, equipment, etc.) - 35 rows across different types
export const mockRows = [
  // Product Team (8 members) - Example: people
  { id: 'row-1', name: 'Alice Johnson', position: 'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'row-2', name: 'Bob Smith', position:'Backend Developer', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 'row-3', name: 'Carol Davis', position:'Product Owner', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 'row-4', name: 'David Lee', position:'Full Stack Developer', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 'row-5', name: 'Emma Wilson', position:'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 'row-6', name: 'Frank Martinez', position:'Backend Developer', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: 'row-7', name: 'Grace Chen', position:'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: 'row-8', name: 'Henry Taylor', position:'QA Engineer', avatar: 'https://i.pravatar.cc/150?img=8' },

  // Engineering Team (10 members)
  { id: 'row-9', name: 'Isabella Garcia', position:'Senior Backend Developer', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 'row-10', name: 'Jack Robinson', position:'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=10' },
  { id: 'row-11', name: 'Katherine Moore', position:'Full Stack Developer', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 'row-12', name: 'Liam Anderson', position:'Backend Developer', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'row-13', name: 'Maya Thompson', position:'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=13' },
  { id: 'row-14', name: 'Noah White', position:'Senior Full Stack Developer', avatar: 'https://i.pravatar.cc/150?img=14' },
  { id: 'row-15', name: 'Olivia Harris', position:'Backend Developer', avatar: 'https://i.pravatar.cc/150?img=15' },
  { id: 'row-16', name: 'Peter Clark', position:'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=16' },
  { id: 'row-17', name: 'Quinn Lewis', position:'Full Stack Developer', avatar: 'https://i.pravatar.cc/150?img=17' },
  { id: 'row-18', name: 'Rachel Walker', position:'QA Engineer', avatar: 'https://i.pravatar.cc/150?img=18' },

  // Design Team (5 members)
  { id: 'row-19', name: 'Samuel Hall', position:'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?img=19' },
  { id: 'row-20', name: 'Tina Young', position:'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?img=20' },
  { id: 'row-21', name: 'Uma Patel', position:'Senior UI/UX Designer', avatar: 'https://i.pravatar.cc/150?img=21' },
  { id: 'row-22', name: 'Victor King', position:'Graphic Designer', avatar: 'https://i.pravatar.cc/150?img=22' },
  { id: 'row-23', name: 'Wendy Scott', position:'Product Designer', avatar: 'https://i.pravatar.cc/150?img=23' },

  // Infrastructure Team (6 members)
  { id: 'row-24', name: 'Xavier Green', position:'DevOps Engineer', avatar: 'https://i.pravatar.cc/150?img=24' },
  { id: 'row-25', name: 'Yolanda Baker', position:'Cloud Engineer', avatar: 'https://i.pravatar.cc/150?img=25' },
  { id: 'row-26', name: 'Zachary Adams', position:'DevOps Engineer', avatar: 'https://i.pravatar.cc/150?img=26' },
  { id: 'row-27', name: 'Aria Nelson', position:'Site Reliability Engineer', avatar: 'https://i.pravatar.cc/150?img=27' },
  { id: 'row-28', name: 'Blake Carter', position:'Cloud Architect', avatar: 'https://i.pravatar.cc/150?img=28' },
  { id: 'row-29', name: 'Chloe Mitchell', position:'DevOps Engineer', avatar: 'https://i.pravatar.cc/150?img=29' },

  // Data Team (6 members)
  { id: 'row-30', name: 'Dylan Perez', position:'Data Engineer', avatar: 'https://i.pravatar.cc/150?img=30' },
  { id: 'row-31', name: 'Elena Roberts', position:'Data Analyst', avatar: 'https://i.pravatar.cc/150?img=31' },
  { id: 'row-32', name: 'Felix Turner', position:'ML Engineer', avatar: 'https://i.pravatar.cc/150?img=32' },
  { id: 'row-33', name: 'Gabriella Phillips', position:'Data Scientist', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 'row-34', name: 'Hudson Campbell', position:'Senior Data Engineer', avatar: 'https://i.pravatar.cc/150?img=34' },
  { id: 'row-35', name: 'Iris Parker', position:'Data Analyst', avatar: 'https://i.pravatar.cc/150?img=35' },
];

// Legacy export for backwards compatibility
export const mockResources = mockRows;

// Categories (could be projects, event types, job types, etc.) - 18 categories with various durations and statuses
export const mockCategories = [
  { id: 'cat-1', name: 'E-commerce Redesign', start_target_date: '2025-11-17', number_of_sprints: 6, sprint_duration_weeks: 2, status: 'active', color: '#3b82f6' },
  { id: 'cat-2', name: 'Mobile App V2', start_target_date: '2025-11-25', number_of_sprints: 8, sprint_duration_weeks: 2, status: 'active', color: '#10b981' },
  { id: 'cat-3', name: 'API Migration', start_target_date: '2025-12-16', number_of_sprints: 4, sprint_duration_weeks: 2, status: 'planned', color: '#f59e0b' },
  { id: 'cat-4', name: 'Analytics Dashboard', start_target_date: '2025-11-11', number_of_sprints: 5, sprint_duration_weeks: 1, status: 'active', color: '#8b5cf6' },
  { id: 'cat-5', name: 'Customer Portal', start_target_date: '2026-01-06', number_of_sprints: 6, sprint_duration_weeks: 2, status: 'planned', color: '#ec4899' },
  { id: 'cat-6', name: 'Infrastructure Upgrade', start_target_date: '2025-12-09', number_of_sprints: 3, sprint_duration_weeks: 2, status: 'planned', color: '#06b6d4' },
  { id: 'cat-7', name: 'Payment Gateway Integration', start_target_date: '2025-11-20', number_of_sprints: 4, sprint_duration_weeks: 2, status: 'active', color: '#f43f5e' },
  { id: 'cat-8', name: 'Machine Learning Pipeline', start_target_date: '2025-12-02', number_of_sprints: 10, sprint_duration_weeks: 1, status: 'active', color: '#14b8a6' },
  { id: 'cat-9', name: 'Security Audit & Fixes', start_target_date: '2025-11-27', number_of_sprints: 3, sprint_duration_weeks: 1, status: 'active', color: '#ef4444' },
  { id: 'cat-10', name: 'Design System V2', start_target_date: '2025-12-01', number_of_sprints: 6, sprint_duration_weeks: 2, status: 'active', color: '#a855f7' },
  { id: 'cat-11', name: 'Microservices Migration', start_target_date: '2025-12-20', number_of_sprints: 8, sprint_duration_weeks: 2, status: 'planned', color: '#6366f1' },
  { id: 'cat-12', name: 'Marketing Automation', start_target_date: '2026-01-13', number_of_sprints: 5, sprint_duration_weeks: 2, status: 'planned', color: '#f97316' },
  { id: 'cat-13', name: 'CI/CD Pipeline', start_target_date: '2025-11-18', number_of_sprints: 3, sprint_duration_weeks: 1, status: 'active', color: '#84cc16' },
  { id: 'cat-14', name: 'Mobile Responsive Fix', start_target_date: '2025-12-05', number_of_sprints: 2, sprint_duration_weeks: 1, status: 'active', color: '#22d3ee' },
  { id: 'cat-15', name: 'Search Optimization', start_target_date: '2025-12-11', number_of_sprints: 4, sprint_duration_weeks: 2, status: 'planned', color: '#eab308' },
  { id: 'cat-16', name: 'Notification System', start_target_date: '2025-11-29', number_of_sprints: 3, sprint_duration_weeks: 2, status: 'active', color: '#fb923c' },
  { id: 'cat-17', name: 'Admin Panel Redesign', start_target_date: '2026-01-20', number_of_sprints: 5, sprint_duration_weeks: 2, status: 'planned', color: '#c084fc' },
  { id: 'cat-18', name: 'Performance Monitoring', start_target_date: '2025-12-15', number_of_sprints: 4, sprint_duration_weeks: 1, status: 'planned', color: '#4ade80' },
];

// Legacy export for backwards compatibility
export const mockProjects = mockCategories;

// Timeline Items - Many items with varied overlaps and load scenarios
export const mockItems = [
  // Product Team items
  { id: 'item-1', row_id: 'row-1', category_id: 'cat-1', start_date: '2025-11-17', end_date: '2025-12-28', load_percentage: 50, category: mockCategories[0] },
  { id: 'item-2', row_id: 'row-1', category_id: 'cat-2', start_date: '2025-11-25', end_date: '2026-01-19', load_percentage: 50, category: mockCategories[1] },

  { id: 'item-3', row_id: 'row-2', category_id: 'cat-1', start_date: '2025-11-17', end_date: '2025-12-28', load_percentage: 70, category: mockCategories[0] },
  { id: 'item-4', row_id: 'row-2', category_id: 'cat-7', start_date: '2025-11-20', end_date: '2025-12-17', load_percentage: 30, category: mockCategories[6] },

  { id: 'item-5', row_id: 'row-3', category_id: 'cat-1', start_date: '2025-11-17', end_date: '2025-12-28', load_percentage: 25, category: mockCategories[0] },
  { id: 'item-6', row_id: 'row-3', category_id: 'cat-2', start_date: '2025-11-25', end_date: '2026-01-19', load_percentage: 25, category: mockCategories[1] },
  { id: 'item-7', row_id: 'row-3', category_id: 'cat-4', start_date: '2025-11-11', end_date: '2025-12-15', load_percentage: 30, category: mockCategories[3] },
  { id: 'item-8', row_id: 'row-3', category_id: 'cat-10', start_date: '2025-12-01', end_date: '2026-01-11', load_percentage: 20, category: mockCategories[9] },

  { id: 'item-9', row_id: 'row-4', category_id: 'cat-2', start_date: '2025-11-25', end_date: '2026-01-19', load_percentage: 60, category: mockCategories[1] },
  { id: 'item-10', row_id: 'row-4', category_id: 'cat-4', start_date: '2025-11-11', end_date: '2025-12-15', load_percentage: 40, category: mockCategories[3] },
  { id: 'item-11', row_id: 'row-4', category_id: 'cat-9', start_date: '2025-11-27', end_date: '2025-12-17', load_percentage: 30, category: mockCategories[8] },

  { id: 'item-12', row_id: 'row-5', category_id: 'cat-1', start_date: '2025-11-17', end_date: '2025-12-14', load_percentage: 60, category: mockCategories[0] },
  { id: 'item-13', row_id: 'row-5', category_id: 'cat-10', start_date: '2025-12-01', end_date: '2026-01-11', load_percentage: 40, category: mockCategories[9] },
  { id: 'item-14', row_id: 'row-5', category_id: 'cat-5', start_date: '2026-01-06', end_date: '2026-02-16', load_percentage: 80, category: mockCategories[4] },

  { id: 'item-15', row_id: 'row-6', category_id: 'cat-3', start_date: '2025-12-16', end_date: '2026-01-12', load_percentage: 100, category: mockCategories[2] },

  { id: 'item-16', row_id: 'row-7', category_id: 'cat-2', start_date: '2025-11-25', end_date: '2026-01-19', load_percentage: 50, category: mockCategories[1] },
  { id: 'item-17', row_id: 'row-7', category_id: 'cat-3', start_date: '2025-12-16', end_date: '2026-01-12', load_percentage: 40, category: mockCategories[2] },
  { id: 'item-18', row_id: 'row-7', category_id: 'cat-14', start_date: '2025-12-05', end_date: '2025-12-18', load_percentage: 30, category: mockCategories[13] },

  { id: 'item-19', row_id: 'row-8', category_id: 'cat-1', start_date: '2025-11-20', end_date: '2025-12-28', load_percentage: 40, category: mockCategories[0] },
  { id: 'item-20', row_id: 'row-8', category_id: 'cat-2', start_date: '2025-11-28', end_date: '2026-01-19', load_percentage: 40, category: mockCategories[1] },
  { id: 'item-21', row_id: 'row-8', category_id: 'cat-9', start_date: '2025-11-27', end_date: '2025-12-17', load_percentage: 20, category: mockCategories[8] },

  // Engineering Team items
  { id: 'item-22', row_id: 'row-9', category_id: 'cat-7', start_date: '2025-11-20', end_date: '2025-12-17', load_percentage: 80, category: mockCategories[6] },
  { id: 'item-23', row_id: 'row-9', category_id: 'cat-11', start_date: '2025-12-20', end_date: '2026-02-13', load_percentage: 20, category: mockCategories[10] },

  { id: 'item-24', row_id: 'row-10', category_id: 'cat-1', start_date: '2025-11-17', end_date: '2025-12-28', load_percentage: 100, category: mockCategories[0] },

  { id: 'item-25', row_id: 'row-11', category_id: 'cat-2', start_date: '2025-11-25', end_date: '2026-01-19', load_percentage: 50, category: mockCategories[1] },
  { id: 'item-26', row_id: 'row-11', category_id: 'cat-16', start_date: '2025-11-29', end_date: '2026-01-09', load_percentage: 50, category: mockCategories[15] },

  { id: 'item-27', row_id: 'row-12', category_id: 'cat-3', start_date: '2025-12-16', end_date: '2026-01-12', load_percentage: 70, category: mockCategories[2] },
  { id: 'item-28', row_id: 'row-12', category_id: 'cat-11', start_date: '2025-12-20', end_date: '2026-02-13', load_percentage: 30, category: mockCategories[10] },

  { id: 'item-29', row_id: 'row-13', category_id: 'cat-2', start_date: '2025-11-25', end_date: '2026-01-19', load_percentage: 60, category: mockCategories[1] },
  { id: 'item-30', row_id: 'row-13', category_id: 'cat-14', start_date: '2025-12-05', end_date: '2025-12-18', load_percentage: 40, category: mockCategories[13] },

  { id: 'item-31', row_id: 'row-14', category_id: 'cat-7', start_date: '2025-11-20', end_date: '2025-12-17', load_percentage: 50, category: mockCategories[6] },
  { id: 'item-32', row_id: 'row-14', category_id: 'cat-11', start_date: '2025-12-20', end_date: '2026-02-13', load_percentage: 50, category: mockCategories[10] },

  { id: 'item-33', row_id: 'row-15', category_id: 'cat-3', start_date: '2025-12-16', end_date: '2026-01-12', load_percentage: 80, category: mockCategories[2] },
  { id: 'item-34', row_id: 'row-15', category_id: 'cat-15', start_date: '2025-12-11', end_date: '2026-01-07', load_percentage: 30, category: mockCategories[14] },

  { id: 'item-35', row_id: 'row-16', category_id: 'cat-1', start_date: '2025-11-17', end_date: '2025-12-28', load_percentage: 70, category: mockCategories[0] },
  { id: 'item-36', row_id: 'row-16', category_id: 'cat-10', start_date: '2025-12-01', end_date: '2026-01-11', load_percentage: 30, category: mockCategories[9] },

  { id: 'item-37', row_id: 'row-17', category_id: 'cat-2', start_date: '2025-11-25', end_date: '2026-01-19', load_percentage: 100, category: mockCategories[1] },

  { id: 'item-38', row_id: 'row-18', category_id: 'cat-1', start_date: '2025-11-22', end_date: '2025-12-28', load_percentage: 30, category: mockCategories[0] },
  { id: 'item-39', row_id: 'row-18', category_id: 'cat-2', start_date: '2025-12-01', end_date: '2026-01-19', load_percentage: 30, category: mockCategories[1] },
  { id: 'item-40', row_id: 'row-18', category_id: 'cat-9', start_date: '2025-11-27', end_date: '2025-12-17', load_percentage: 40, category: mockCategories[8] },

  // Design Team items
  { id: 'item-41', row_id: 'row-19', category_id: 'cat-10', start_date: '2025-12-01', end_date: '2026-01-11', load_percentage: 80, category: mockCategories[9] },
  { id: 'item-42', row_id: 'row-19', category_id: 'cat-17', start_date: '2026-01-20', end_date: '2026-03-02', load_percentage: 20, category: mockCategories[16] },

  { id: 'item-43', row_id: 'row-20', category_id: 'cat-1', start_date: '2025-11-17', end_date: '2025-12-14', load_percentage: 50, category: mockCategories[0] },
  { id: 'item-44', row_id: 'row-20', category_id: 'cat-5', start_date: '2026-01-06', end_date: '2026-02-16', load_percentage: 50, category: mockCategories[4] },

  { id: 'item-45', row_id: 'row-21', category_id: 'cat-10', start_date: '2025-12-01', end_date: '2026-01-11', load_percentage: 60, category: mockCategories[9] },
  { id: 'item-46', row_id: 'row-21', category_id: 'cat-2', start_date: '2025-11-25', end_date: '2025-12-08', load_percentage: 40, category: mockCategories[1] },

  { id: 'item-47', row_id: 'row-22', category_id: 'cat-1', start_date: '2025-11-17', end_date: '2025-12-14', load_percentage: 40, category: mockCategories[0] },
  { id: 'item-48', row_id: 'row-22', category_id: 'cat-10', start_date: '2025-12-01', end_date: '2026-01-11', load_percentage: 60, category: mockCategories[9] },

  { id: 'item-49', row_id: 'row-23', category_id: 'cat-5', start_date: '2026-01-06', end_date: '2026-02-16', load_percentage: 70, category: mockCategories[4] },
  { id: 'item-50', row_id: 'row-23', category_id: 'cat-17', start_date: '2026-01-20', end_date: '2026-03-02', load_percentage: 30, category: mockCategories[16] },

  // Infrastructure Team items
  { id: 'item-51', row_id: 'row-24', category_id: 'cat-6', start_date: '2025-12-09', end_date: '2025-12-29', load_percentage: 60, category: mockCategories[5] },
  { id: 'item-52', row_id: 'row-24', category_id: 'cat-13', start_date: '2025-11-18', end_date: '2025-12-08', load_percentage: 40, category: mockCategories[12] },

  { id: 'item-53', row_id: 'row-25', category_id: 'cat-6', start_date: '2025-12-09', end_date: '2025-12-29', load_percentage: 80, category: mockCategories[5] },
  { id: 'item-54', row_id: 'row-25', category_id: 'cat-18', start_date: '2025-12-15', end_date: '2026-01-11', load_percentage: 20, category: mockCategories[17] },

  { id: 'item-55', row_id: 'row-26', category_id: 'cat-13', start_date: '2025-11-18', end_date: '2025-12-08', load_percentage: 100, category: mockCategories[12] },

  { id: 'item-56', row_id: 'row-27', category_id: 'cat-6', start_date: '2025-12-09', end_date: '2025-12-29', load_percentage: 50, category: mockCategories[5] },
  { id: 'item-57', row_id: 'row-27', category_id: 'cat-18', start_date: '2025-12-15', end_date: '2026-01-11', load_percentage: 50, category: mockCategories[17] },

  { id: 'item-58', row_id: 'row-28', category_id: 'cat-11', start_date: '2025-12-20', end_date: '2026-02-13', load_percentage: 70, category: mockCategories[10] },
  { id: 'item-59', row_id: 'row-28', category_id: 'cat-6', start_date: '2025-12-09', end_date: '2025-12-29', load_percentage: 30, category: mockCategories[5] },

  { id: 'item-60', row_id: 'row-29', category_id: 'cat-13', start_date: '2025-11-18', end_date: '2025-12-08', load_percentage: 60, category: mockCategories[12] },
  { id: 'item-61', row_id: 'row-29', category_id: 'cat-18', start_date: '2025-12-15', end_date: '2026-01-11', load_percentage: 40, category: mockCategories[17] },

  // Data Team items
  { id: 'item-62', row_id: 'row-30', category_id: 'cat-8', start_date: '2025-12-02', end_date: '2026-02-09', load_percentage: 80, category: mockCategories[7] },
  { id: 'item-63', row_id: 'row-30', category_id: 'cat-4', start_date: '2025-11-11', end_date: '2025-12-15', load_percentage: 20, category: mockCategories[3] },

  { id: 'item-64', row_id: 'row-31', category_id: 'cat-4', start_date: '2025-11-11', end_date: '2025-12-15', load_percentage: 60, category: mockCategories[3] },
  { id: 'item-65', row_id: 'row-31', category_id: 'cat-8', start_date: '2025-12-02', end_date: '2026-02-09', load_percentage: 40, category: mockCategories[7] },

  { id: 'item-66', row_id: 'row-32', category_id: 'cat-8', start_date: '2025-12-02', end_date: '2026-02-09', load_percentage: 100, category: mockCategories[7] },

  { id: 'item-67', row_id: 'row-33', category_id: 'cat-8', start_date: '2025-12-02', end_date: '2026-02-09', load_percentage: 70, category: mockCategories[7] },
  { id: 'item-68', row_id: 'row-33', category_id: 'cat-15', start_date: '2025-12-11', end_date: '2026-01-07', load_percentage: 30, category: mockCategories[14] },

  { id: 'item-69', row_id: 'row-34', category_id: 'cat-8', start_date: '2025-12-02', end_date: '2026-02-09', load_percentage: 60, category: mockCategories[7] },
  { id: 'item-70', row_id: 'row-34', category_id: 'cat-4', start_date: '2025-11-11', end_date: '2025-12-15', load_percentage: 40, category: mockCategories[3] },

  { id: 'item-71', row_id: 'row-35', category_id: 'cat-4', start_date: '2025-11-11', end_date: '2025-12-15', load_percentage: 50, category: mockCategories[3] },
  { id: 'item-72', row_id: 'row-35', category_id: 'cat-12', start_date: '2026-01-13', end_date: '2026-02-23', load_percentage: 50, category: mockCategories[11] },

  // Add some HIGH LOAD scenarios (>100%)
  { id: 'item-73', row_id: 'row-9', category_id: 'cat-13', start_date: '2025-11-25', end_date: '2025-12-08', load_percentage: 30, category: mockCategories[12] }, // Total: 110% during overlap
  { id: 'item-74', row_id: 'row-15', category_id: 'cat-18', start_date: '2025-12-20', end_date: '2026-01-11', load_percentage: 20, category: mockCategories[17] }, // Total: 110% during overlap
  { id: 'item-75', row_id: 'row-30', category_id: 'cat-15', start_date: '2025-12-11', end_date: '2025-12-18', load_percentage: 30, category: mockCategories[14] }, // Total: 110% during overlap

  // Extended items to cover full 84-day timeline (through Feb 20, 2026)
  { id: 'item-76', row_id: 'row-1', category_id: 'cat-5', start_date: '2026-01-20', end_date: '2026-02-20', load_percentage: 60, category: mockCategories[4] },
  { id: 'item-77', row_id: 'row-2', category_id: 'cat-17', start_date: '2026-01-20', end_date: '2026-02-20', load_percentage: 50, category: mockCategories[16] },
  { id: 'item-78', row_id: 'row-3', category_id: 'cat-12', start_date: '2026-01-20', end_date: '2026-02-20', load_percentage: 30, category: mockCategories[11] },
  { id: 'item-79', row_id: 'row-4', category_id: 'cat-17', start_date: '2026-01-20', end_date: '2026-02-20', load_percentage: 70, category: mockCategories[16] },
  { id: 'item-80', row_id: 'row-6', category_id: 'cat-15', start_date: '2026-01-13', end_date: '2026-02-20', load_percentage: 80, category: mockCategories[14] },
  { id: 'item-81', row_id: 'row-7', category_id: 'cat-5', start_date: '2026-01-20', end_date: '2026-02-20', load_percentage: 60, category: mockCategories[4] },
  { id: 'item-82', row_id: 'row-9', category_id: 'cat-18', start_date: '2026-01-20', end_date: '2026-02-20', load_percentage: 50, category: mockCategories[17] },
  { id: 'item-83', row_id: 'row-10', category_id: 'cat-17', start_date: '2026-01-20', end_date: '2026-02-20', load_percentage: 100, category: mockCategories[16] },
  { id: 'item-84', row_id: 'row-12', category_id: 'cat-15', start_date: '2026-01-13', end_date: '2026-02-20', load_percentage: 50, category: mockCategories[14] },
  { id: 'item-85', row_id: 'row-13', category_id: 'cat-17', start_date: '2026-01-20', end_date: '2026-02-20', load_percentage: 40, category: mockCategories[16] },
  { id: 'item-86', row_id: 'row-16', category_id: 'cat-12', start_date: '2026-01-13', end_date: '2026-02-20', load_percentage: 60, category: mockCategories[11] },
  { id: 'item-87', row_id: 'row-19', category_id: 'cat-5', start_date: '2026-01-13', end_date: '2026-02-20', load_percentage: 70, category: mockCategories[4] },
  { id: 'item-88', row_id: 'row-24', category_id: 'cat-11', start_date: '2026-01-20', end_date: '2026-02-20', load_percentage: 50, category: mockCategories[10] },
  { id: 'item-89', row_id: 'row-28', category_id: 'cat-18', start_date: '2026-01-13', end_date: '2026-02-20', load_percentage: 40, category: mockCategories[17] },
  { id: 'item-90', row_id: 'row-32', category_id: 'cat-15', start_date: '2026-01-20', end_date: '2026-02-20', load_percentage: 80, category: mockCategories[14] },
];

// Legacy export for backwards compatibility (maps to new structure)
export const mockAssignments = mockItems.map(item => ({
  id: item.id,
  resource_id: item.row_id,
  project_id: item.category_id,
  start_date: item.start_date,
  end_date: item.end_date,
  capacity_percentage: item.load_percentage,
  project: item.category
}));
