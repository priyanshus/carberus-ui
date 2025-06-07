// sidebar/constants/menuItems.ts
import { MenuItem } from './sidebar-menu-item';

export const sidebarMenuItems: MenuItem[] = [
  {
    id: 'quickSummary',
    displayText: 'Quick Summary',
    href: '/quick-summary',
    isHeader: true
  },

  {
    id: 'testCases',
    displayText: 'Test Cases',
    href: '/test-cases',
    isHeader: true,
    subMenu: [
      {
        id: 'add-test-case',
        displayText: 'Add',
        href: '/test-cases/add'
      },
      {
        id: 'view-test-cases',
        displayText: 'View',
        href: '/test-cases/view'
      }
    ]
  },
  {
    id: 'runs',
    displayText: 'Runs',
    href: '/runs',
    isHeader: true,
    subMenu: [
      {
        id: 'recent-run',
        displayText: 'Recent Runs',
        href: '/runs/recent-runs'
      },
      {
        id: 'plan-a-run',
        displayText: 'Plan',
        href: '/runs/plan'
      }
    ]
  },
  {
    id: 'reports',
    displayText: 'Reports',
    href: '/reports',
    isHeader: true
  },
  {
    id: 'admin',
    displayText: 'Admin',
    href: '/admin',
    isHeader: true,
    subMenu: [
      {
        id: 'field-mapping',
        displayText: 'Field Mapping',
        href: '/admin/field-mapping'
      },
      {
        id: 'user',
        displayText: 'User',
        href: '/admin/user'
      },
      {
        id: 'project',
        displayText: 'Project',
        href: '/admin/project'
      }
    ]
  }
];
