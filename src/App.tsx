import React, { useState } from 'react';
import { ViewMode, UserRole, Project, Task, Issue, ChangeOrder, Material } from './types';
import {
  initialProjects,
  initialTasks,
  initialGanttPhases,
  initialRABItems,
  initialMaterials,
  initialSuppliers,
  initialTeamMembers,
  initialSiteLocations,
  initialSiteUpdates,
  initialSitePhotos,
  initialIssues,
  initialChangeOrders,
  initialPayments,
  initialDocuments,
  initialActivities,
} from './data/mockData';

// Layout Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ScreenJumpBar } from './components/common/ScreenJumpBar';

// Views
import { LoginView } from './components/views/LoginView';
import { DashboardView } from './components/views/DashboardView';
import { ProjectsView } from './components/views/ProjectsView';
import { ProjectDetailView } from './components/views/ProjectDetailView';
import { ScheduleView } from './components/views/ScheduleView';
import { TasksView } from './components/views/TasksView';
import { BudgetView } from './components/views/BudgetView';
import { MaterialsView } from './components/views/MaterialsView';
import { SuppliersView } from './components/views/SuppliersView';
import { TeamView } from './components/views/TeamView';
import { SiteMonitoringView } from './components/views/SiteMonitoringView';
import { SitePhotosView } from './components/views/SitePhotosView';
import { IssuesView } from './components/views/IssuesView';
import { ChangeOrdersView } from './components/views/ChangeOrdersView';
import { PaymentsView } from './components/views/PaymentsView';
import { DocumentsView } from './components/views/DocumentsView';
import { ReportsView } from './components/views/ReportsView';
import { ClientPortalView } from './components/views/ClientPortalView';
import { SettingsView } from './components/views/SettingsView';

// Action Modals
import {
  NewProjectModal,
  NewTaskModal,
  ReportIssueModal,
  NewChangeOrderModal,
  NewPaymentModal,
  NewMaterialModal,
  NewRABModal,
} from './components/modals/ActionModals';
import { RABItem } from './types';
import { sendDataToGoogleSheet } from './services/googleSheets';
import { FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation & Project Context State
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-1');
  const [userRole, setUserRole] = useState<UserRole>('Project Manager');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Entities Data State
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [changeOrders, setChangeOrders] = useState<ChangeOrder[]>(initialChangeOrders);
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [rabItems, setRabItems] = useState<RABItem[]>(initialRABItems);
  const [payments, setPayments] = useState(initialPayments);
  const [photos, setPhotos] = useState(initialSitePhotos);

  // Modals
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isReportIssueModalOpen, setIsReportIssueModalOpen] = useState(false);
  const [isNewCOModalOpen, setIsNewCOModalOpen] = useState(false);
  const [isNewPaymentModalOpen, setIsNewPaymentModalOpen] = useState(false);
  const [isNewMaterialModalOpen, setIsNewMaterialModalOpen] = useState(false);
  const [isNewRABModalOpen, setIsNewRABModalOpen] = useState(false);
  const [sheetNotification, setSheetNotification] = useState<{
    message: string;
    sheetName: string;
    type: 'success' | 'info' | 'error';
  } | null>(null);

  const triggerSheetNotification = (message: string, sheetName: string, type: 'success' | 'info' | 'error' = 'success') => {
    setSheetNotification({ message, sheetName, type });
    setTimeout(() => {
      setSheetNotification(null);
    }, 4500);
  };

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Handler functions
  const handleCreateProject = async (newProj: Project) => {
    setProjects((prev) => [newProj, ...prev]);
    setSelectedProjectId(newProj.id);

    // Auto sync to Sheet 1 (Master Data Proyek)
    const res = await sendDataToGoogleSheet('projects', {
      id: newProj.id,
      name: newProj.name,
      client: newProj.clientName,
      location: newProj.location,
      contractValue: newProj.contractValue,
      spent: newProj.actualCost,
      progress: newProj.progress,
      status: newProj.status,
      startDate: newProj.startDate,
      endDate: newProj.endDate,
    });
    triggerSheetNotification(res.message, 'Sheet 1 (Master Proyek)');
  };

  const handleCreateTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleCreateIssue = async (newIssue: Issue) => {
    setIssues((prev) => [newIssue, ...prev]);

    // Auto sync to Sheet 4 (Laporan Isu Lapangan)
    const res = await sendDataToGoogleSheet('issues', {
      code: newIssue.code,
      title: newIssue.title,
      project: newIssue.project,
      category: newIssue.category,
      priority: newIssue.priority,
      status: newIssue.status,
      assignee: newIssue.assignee,
      dueDate: newIssue.dueDate,
      description: newIssue.description,
    });
    triggerSheetNotification(res.message, 'Sheet 4 (Laporan Isu)');
  };

  const handleUpdateIssueStatus = (issueId: string, newStatus: Issue['status']) => {
    setIssues((prev) =>
      prev.map((i) => (i.id === issueId ? { ...i, status: newStatus } : i))
    );
  };

  const handleApproveChangeOrder = (id: string) => {
    setChangeOrders((prev) =>
      prev.map((co) => (co.id === id ? { ...co, status: 'Approved' } : co))
    );
  };

  const handleRejectChangeOrder = (id: string) => {
    setChangeOrders((prev) =>
      prev.map((co) => (co.id === id ? { ...co, status: 'Rejected' } : co))
    );
  };

  const handleCreateChangeOrder = (newCO: ChangeOrder) => {
    setChangeOrders((prev) => [newCO, ...prev]);
  };

  const handleCreatePayment = (newPay: any) => {
    setPayments((prev) => [newPay, ...prev]);
  };

  const handleCreateMaterial = async (newMat: Material) => {
    setMaterials((prev) => [newMat, ...prev]);

    // Auto sync to Sheet 2 (Logistik & Material)
    const res = await sendDataToGoogleSheet('materials', {
      id: newMat.id,
      name: newMat.name,
      category: newMat.category,
      quantity: newMat.quantity,
      unit: newMat.unit,
      price: newMat.standardPrice || 0,
      supplier: newMat.supplier,
      status: newMat.status,
      lastUpdated: newMat.lastUpdated,
    });
    triggerSheetNotification(res.message, 'Sheet 2 (Stok Material)');
  };

  const handleCreateRABItem = async (newItem: RABItem) => {
    setRabItems((prev) => [newItem, ...prev]);

    // Auto sync to Sheet 3 (RAB & BOQ)
    const res = await sendDataToGoogleSheet('rab', {
      no: newItem.no,
      item: newItem.workItem,
      category: newItem.category,
      volume: newItem.quantity,
      unit: newItem.unit,
      estCost: newItem.estimatedCost,
      actCost: newItem.actualCost,
      variance: newItem.variance,
      progress: newItem.progress,
    });
    triggerSheetNotification(res.message, 'Sheet 3 (RAB & BOQ)');
  };

  const handleQuickAdd = (type: string) => {
    if (type === 'project') setIsNewProjectModalOpen(true);
    else if (type === 'task') setIsNewTaskModalOpen(true);
    else if (type === 'issue') setIsReportIssueModalOpen(true);
    else if (type === 'photo') setCurrentView('site-photos');
    else if (type === 'changeOrder') setIsNewCOModalOpen(true);
  };

  // Standalone Login Screen (Screen 1)
  if (currentView === 'login') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900">
        <ScreenJumpBar currentView={currentView} onNavigate={setCurrentView} />
        <div className="flex-1">
          <LoginView onLoginSuccess={() => setCurrentView('dashboard')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 18-Screen Fast Selector Header */}
      <ScreenJumpBar currentView={currentView} onNavigate={setCurrentView} />

      {/* Main App Layout with Sidebar and Content */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Responsive Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            setIsSidebarOpen(false);
          }}
          isMobileOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-64">
          {/* Header */}
          <Header
            currentView={currentView}
            onNavigate={setCurrentView}
            userRole={userRole}
            onRoleChange={setUserRole}
            onOpenQuickAdd={handleQuickAdd}
            onLogout={() => setCurrentView('login')}
          />

          {/* Scrollable View Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto pb-12">
              {currentView === 'dashboard' && (
                <DashboardView
                  projects={projects}
                  onNavigate={setCurrentView}
                  onSelectProject={setSelectedProjectId}
                />
              )}

              {currentView === 'projects' && (
                <ProjectsView
                  projects={projects}
                  onSelectProject={setSelectedProjectId}
                  onNavigate={setCurrentView}
                  onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
                />
              )}

              {currentView === 'project-detail' && (
                <ProjectDetailView
                  project={selectedProject}
                  activities={initialActivities}
                  onBack={() => setCurrentView('projects')}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'schedule' && (
                <ScheduleView
                  phases={initialGanttPhases}
                  projects={projects}
                  selectedProjectId={selectedProjectId}
                  onSelectProject={setSelectedProjectId}
                  onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
                />
              )}

              {currentView === 'tasks' && (
                <TasksView
                  tasks={tasks}
                  onUpdateTaskStatus={handleUpdateTaskStatus}
                  onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'budget' && (
                <BudgetView
                  rabItems={rabItems}
                  onOpenAddRABModal={() => setIsNewRABModalOpen(true)}
                />
              )}

              {currentView === 'materials' && (
                <MaterialsView
                  materials={materials}
                  onOpenNewMaterialModal={() => setIsNewMaterialModalOpen(true)}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'suppliers' && (
                <SuppliersView
                  suppliers={initialSuppliers}
                  onOpenNewSupplierModal={() => alert('Register new vendor / supplier')}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'team' && (
                <TeamView
                  teamMembers={initialTeamMembers}
                  onOpenAddMemberModal={() => alert('Add member to team & projects')}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'site-monitoring' && (
                <SiteMonitoringView
                  locations={initialSiteLocations}
                  siteUpdates={initialSiteUpdates}
                  onOpenAddUpdateModal={() => alert('Submit daily site update')}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'site-photos' && (
                <SitePhotosView
                  photos={photos}
                  projects={projects}
                  selectedProjectId={selectedProjectId}
                  onOpenUploadPhotoModal={() => alert('Upload site progress photo with GPS tag')}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'issues' && (
                <IssuesView
                  issues={issues}
                  projects={projects}
                  onOpenReportIssueModal={() => setIsReportIssueModalOpen(true)}
                  onUpdateIssueStatus={handleUpdateIssueStatus}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'change-orders' && (
                <ChangeOrdersView
                  changeOrders={changeOrders}
                  projects={projects}
                  onOpenNewChangeOrderModal={() => setIsNewCOModalOpen(true)}
                  onApproveChangeOrder={handleApproveChangeOrder}
                  onRejectChangeOrder={handleRejectChangeOrder}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'payments' && (
                <PaymentsView
                  payments={payments}
                  onOpenNewInvoiceModal={() => setIsNewPaymentModalOpen(true)}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'documents' && (
                <DocumentsView
                  documents={initialDocuments}
                  projects={projects}
                  onOpenUploadModal={() => alert('Upload CAD DWG or PBG permit')}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'reports' && (
                <ReportsView
                  projects={projects}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'client-portal' && (
                <ClientPortalView
                  project={selectedProject}
                  photos={photos}
                  changeOrders={changeOrders}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'settings' && <SettingsView />}
            </div>
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreate={handleCreateProject}
      />

      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onCreate={handleCreateTask}
      />

      <ReportIssueModal
        isOpen={isReportIssueModalOpen}
        onClose={() => setIsReportIssueModalOpen(false)}
        onCreate={handleCreateIssue}
      />

      <NewChangeOrderModal
        isOpen={isNewCOModalOpen}
        onClose={() => setIsNewCOModalOpen(false)}
        onCreate={handleCreateChangeOrder}
        projects={projects}
      />

      <NewPaymentModal
        isOpen={isNewPaymentModalOpen}
        onClose={() => setIsNewPaymentModalOpen(false)}
        onCreate={handleCreatePayment}
        projects={projects}
      />

      <NewMaterialModal
        isOpen={isNewMaterialModalOpen}
        onClose={() => setIsNewMaterialModalOpen(false)}
        onCreate={handleCreateMaterial}
      />

      <NewRABModal
        isOpen={isNewRABModalOpen}
        onClose={() => setIsNewRABModalOpen(false)}
        onCreate={handleCreateRABItem}
      />

      {/* Floating Google Sheets Sync Notification */}
      {sheetNotification && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-sm">
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start space-x-3 text-xs">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
                  <span>Google Sheets Sync</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono">
                  {sheetNotification.sheetName}
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {sheetNotification.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
