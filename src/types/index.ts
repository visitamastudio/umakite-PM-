export type ViewMode =
  | 'login'
  | 'dashboard'
  | 'projects'
  | 'project-detail'
  | 'schedule'
  | 'tasks'
  | 'budget'
  | 'materials'
  | 'suppliers'
  | 'team'
  | 'site-monitoring'
  | 'site-photos'
  | 'issues'
  | 'change-orders'
  | 'payments'
  | 'documents'
  | 'reports'
  | 'client-portal'
  | 'settings';

export type UserRole =
  | 'Project Manager'
  | 'Admin'
  | 'Site Engineer'
  | 'Architect'
  | 'Procurement'
  | 'Finance'
  | 'Client';

export interface ProjectPhase {
  name: string;
  progress: number;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  type: string;
  location: string;
  clientName: string;
  projectManager: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  contractValue: number;
  actualCost: number;
  progress: number;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed' | 'On Hold';
  coverImage: string;
  description: string;
  phases: ProjectPhase[];
}

export interface TaskChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  code?: string;
  title: string;
  description?: string;
  projectId?: string;
  projectName?: string;
  phase?: string;
  assignee: {
    name: string;
    avatar: string;
    role: string;
  };
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Done';
  startDate?: string;
  dueDate: string;
  progress?: number;
  checklist?: TaskChecklistItem[];
  commentsCount?: number;
}

export interface GanttSubTask {
  id: string;
  name: string;
  startMonth: number; // 0: Jan, 1: Feb, 2: Mar, 3: Apr, 4: May, 5: Jun
  durationMonths: number;
  progress: number;
  status: 'Completed' | 'In Progress' | 'Planned' | 'Delayed';
  color: string;
  assignee?: string;
}

export interface GanttPhase {
  id: string;
  name: string;
  tasks: GanttSubTask[];
}

export interface RABItem {
  no: number;
  workItem: string;
  category: string;
  estimatedCost: number;
  actualCost: number;
  variance: number;
  progress: number;
  unit?: string;
  quantity?: number;
}

export interface Material {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: 'Available' | 'In Stock' | 'Low Stock' | 'Out of Stock';
  supplier: string;
  standardPrice: number;
  lastUpdated: string;
}

export interface Supplier {
  id: number;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  rating: number;
  status: 'Active' | 'Inactive';
  address: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  type: 'Internal' | 'External';
  project: string;
  phone: string;
  email: string;
  status: 'Active' | 'On Leave';
  avatar: string;
  workloadPercentage: number;
}

export interface SiteLocation {
  id: string;
  name: string;
  type: string;
  city: string;
  island: string;
  lat: number; // Geographic coordinates for Leaflet / OpenStreetMap
  lng: number;
  xPercent: number; // For fallback SVG map coordinates
  yPercent: number;
  progress: number;
  status: 'On Progress' | 'Delayed' | 'Completed';
  activeWorkers: number;
  projectManager: string;
}

export interface SiteUpdate {
  id: string;
  projectName: string;
  location: string;
  date: string;
  time: string;
  workers: number;
  weather: 'Clear' | 'Sunny' | 'Partly Cloudy' | 'Rain';
  progressDesc: string;
  workCompleted: string[];
  issues: string[];
  thumbnail: string;
  photos?: string[];
}

export interface SitePhoto {
  id: string;
  title: string;
  category?: 'Progress' | 'Before & After' | 'Site Condition';
  project?: string;
  projectName?: string;
  phase?: string;
  date: string;
  timestamp?: string;
  imageUrl?: string;
  url: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  photographer?: string;
  uploadedBy: string;
  phaseTag?: string;
  description?: string;
}

export interface Issue {
  id: string;
  code?: string;
  title: string;
  project?: string;
  projectName: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  reportedBy?: string;
  date?: string;
  category?: string;
  description: string;
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate?: string;
}

export interface ChangeOrder {
  id: string;
  code?: string;
  coNumber: string;
  title: string;
  project?: string;
  projectName: string;
  type?: 'Add' | 'Substitute' | 'Deduct' | 'Upgrade';
  amount?: number;
  costImpact: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  date: string;
  reason?: string;
  description: string;
  scheduleImpactDays: number;
  requestedBy: string;
}

export interface PaymentRecord {
  id: string;
  invoiceNumber: string;
  projectName: string;
  termDescription: string;
  party: string;
  type: 'Client' | 'Vendor';
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  project: string;
  date: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  clientName: string;
}

export interface ProjectExpense {
  id: string;
  date: string;
  category: string;
  vendor: string;
  description: string;
  amount: number;
  project: string;
  status: 'Approved' | 'Pending';
}

export interface DocumentItem {
  id: string;
  title: string;
  projectName: string;
  category: string;
  version: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  fileType: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  category: 'Contract' | 'Drawing' | 'RAB / BOQ' | 'PO' | 'Report' | 'Handover' | 'Delivery';
  project: string;
  modifiedBy: string;
  date: string;
  size: string;
  version: string;
  fileType: 'pdf' | 'xlsx' | 'docx' | 'dwg';
}

export interface ActivityItem {
  id: string;
  title: string;
  timeAgo: string;
  date: string;
  type: 'photo' | 'delivery' | 'task' | 'issue' | 'payment' | 'approval';
  user: string;
  project: string;
}
