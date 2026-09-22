import React, { useState } from 'react';
import { X, Plus, Upload, AlertCircle, Check } from 'lucide-react';
import { Project, Task, Issue, SitePhoto, ChangeOrder, Material, RABItem } from '../../types';
import { NumberInput } from '../common/NumberInput';

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalBase: React.FC<ModalBaseProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        <div className="p-4 px-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto space-y-4 text-xs">{children}</div>
      </div>
    </div>
  );
};

// 1. New Project Modal
export const NewProjectModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: Project) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Residential');
  const [location, setLocation] = useState('Lombok, NTB');
  const [contractValue, setContractValue] = useState(2500000000);
  const [clientName, setClientName] = useState('');
  const [endDate, setEndDate] = useState('31 Dec 2025');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      code: `PRJ-00${Math.floor(Math.random() * 90 + 10)}`,
      name,
      type,
      location,
      progress: 0,
      status: 'On Track',
      startDate: 'Today',
      endDate,
      durationDays: 180,
      clientName: clientName || 'Private Investor',
      projectManager: 'Robald S. Wuisan',
      contractValue: Number(contractValue),
      actualCost: 0,
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      description: 'Newly initialized construction project scope with complete BIM and RAB integration.',
      phases: [
        { name: 'Preparation', progress: 0 },
        { name: 'Foundation', progress: 0 },
        { name: 'Structure', progress: 0 },
        { name: 'Finishing', progress: 0 },
      ],
    };
    onCreate(newProj);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Create New Construction Project">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold text-slate-700 block mb-1">Project Name</label>
          <input
            type="text"
            required
            placeholder="e.g., Beachfront Resort Lombok"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Education">Education</option>
              <option value="Industrial">Industrial</option>
              <option value="Hospitality">Hospitality</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Contract Value (IDR)</label>
            <NumberInput
              value={contractValue}
              onChange={(val) => setContractValue(val)}
              prefix={<span className="text-slate-400 font-semibold text-xs">Rp</span>}
              placeholder="0"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Client Name</label>
            <input
              type="text"
              placeholder="e.g., Hendra Wijaya"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            Save Project
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

// 2. New Task Modal
export const NewTaskModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Task) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('Medium');
  const [dueDate, setDueDate] = useState('28 Apr 2025');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description: 'Scheduled site milestone task with quality assurance inspection checklist.',
      status: 'To Do',
      priority,
      dueDate,
      assignee: {
        name: 'Ahmad Fauzi',
        role: 'Site Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      },
    };
    onCreate(newTask);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Create Construction Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold text-slate-700 block mb-1">Task Title</label>
          <input
            type="text"
            required
            placeholder="e.g., Steel reinforcement for 2nd floor slab"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Due Date</label>
            <input
              type="text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            Add Task
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

// 3. Report Issue Modal
export const ReportIssueModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (issue: Issue) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Issue['priority']>('High');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newIssue: Issue = {
      id: `iss-${Date.now()}`,
      title,
      description,
      projectName: 'Villa Taman Ayu',
      priority,
      status: 'Open',
      assignee: {
        name: 'Robald S. Wuisan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      },
      dueDate: 'May 25, 2025',
    };
    onCreate(newIssue);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Report Site Issue or Defect">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold text-slate-700 block mb-1">Issue Title</label>
          <input
            type="text"
            required
            placeholder="e.g., Honeycombing defect observed on column C-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">Description & Location Details</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Specify exact location, root cause, and immediate safety measures taken..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">Severity / Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          >
            <option value="Critical">Critical (Immediate Stop Work)</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl"
          >
            Submit Issue
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

// 4. New Change Order Modal
export const NewChangeOrderModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (changeOrder: ChangeOrder) => void;
  projects: Project[];
}> = ({ isOpen, onClose, onCreate, projects }) => {
  const [title, setTitle] = useState('');
  const [project, setProject] = useState(projects[0]?.name || 'Villa Taman Ayu');
  const [type, setType] = useState<ChangeOrder['type']>('Add');
  const [costImpact, setCostImpact] = useState(50000000);
  const [scheduleImpactDays, setScheduleImpactDays] = useState(5);
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newCO: ChangeOrder = {
      id: `CO-${Math.floor(Math.random() * 900 + 100)}`,
      coNumber: `CO-00${Math.floor(Math.random() * 90 + 10)}`,
      title,
      project,
      projectName: project,
      type,
      costImpact,
      amount: costImpact,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      reason,
      description: reason,
      scheduleImpactDays,
      requestedBy: 'Site Engineer',
    };
    onCreate(newCO);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Request New Change Order (VO)">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold text-slate-700 block mb-1">Change Order Title</label>
          <input
            type="text"
            required
            placeholder="e.g., Upgraded marble finish in foyer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Project</label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="Add">Add (Penambahan)</option>
              <option value="Deduct">Deduct (Pengurangan)</option>
              <option value="Substitute">Substitute (Substitusi)</option>
              <option value="Upgrade">Upgrade (Peningkatan Mutu)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Cost Impact (IDR)</label>
            <NumberInput
              value={costImpact}
              onChange={(val) => setCostImpact(val)}
              prefix={<span className="text-slate-400 font-semibold text-xs">Rp</span>}
              placeholder="0"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Schedule Impact</label>
            <NumberInput
              value={scheduleImpactDays}
              onChange={(val) => setScheduleImpactDays(val)}
              suffix={<span className="text-slate-400 text-xs font-semibold">hari</span>}
              placeholder="0"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">Technical Justification</label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain architectural, structural, or client reasons for this change..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            Submit Change Order
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

// 5. New Invoice / Payment Modal
export const NewPaymentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payment: any) => void;
  projects: Project[];
}> = ({ isOpen, onClose, onCreate, projects }) => {
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-2025-${Math.floor(Math.random() * 900 + 100)}`);
  const [projectName, setProjectName] = useState(projects[0]?.name || 'Villa Taman Ayu');
  const [termDescription, setTermDescription] = useState('Term 5: MEP & Finishing Milestone (20%)');
  const [party, setParty] = useState('Budi Santoso (Owner)');
  const [type, setType] = useState<'Client' | 'Vendor'>('Client');
  const [amount, setAmount] = useState(380000000);
  const [dueDate, setDueDate] = useState('25 Jun 2025');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPay = {
      id: `pay-${Date.now()}`,
      invoiceNumber,
      projectName,
      termDescription,
      party,
      type,
      amount,
      dueDate,
      status: 'Pending' as const,
    };
    onCreate(newPay);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Create Milestone Billing Invoice">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Invoice Number</label>
            <input
              type="text"
              required
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Project</label>
            <select
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">Milestone / Term Description</label>
          <input
            type="text"
            required
            value={termDescription}
            onChange={(e) => setTermDescription(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Payment Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="Client">Client Billing</option>
              <option value="Vendor">Vendor / Subcontractor PO</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Recipient / Client</label>
            <input
              type="text"
              required
              value={party}
              onChange={(e) => setParty(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Invoice Amount (IDR)</label>
            <NumberInput
              value={amount}
              onChange={(val) => setAmount(val)}
              prefix={<span className="text-slate-400 font-semibold text-xs">Rp</span>}
              placeholder="0"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Due Date</label>
            <input
              type="text"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            Generate Invoice
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

// 6. New Material Modal
export const NewMaterialModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (material: Material) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Structural');
  const [quantity, setQuantity] = useState(500);
  const [unit, setUnit] = useState('m³');
  const [unitPrice, setUnitPrice] = useState(950000);
  const [supplier, setSupplier] = useState('PT. Pionirbeton Industri');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newMat: Material = {
      id: Date.now(),
      name,
      category,
      quantity,
      unit,
      status: quantity > 100 ? 'Available' : 'Low Stock',
      lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      supplier,
      standardPrice: unitPrice,
    };
    onCreate(newMat);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Register Inventory Material">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold text-slate-700 block mb-1">Material Name</label>
          <input
            type="text"
            required
            placeholder="e.g., Readymix Concrete K-350"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="Structural">Structural (Semen, Besi, Beton)</option>
              <option value="Finishing">Finishing (Keramik, Cat, Kayu)</option>
              <option value="MEP">MEP (Kabel, Pipa, Lampu)</option>
              <option value="Site Work">Site Work (Batu Kali, Pasir)</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Unit of Measure</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="m³">m³ (Cubic meter)</option>
              <option value="m²">m² (Square meter)</option>
              <option value="m'">m' (Linear meter)</option>
              <option value="kg">kg (Kilogram)</option>
              <option value="ton">ton (Metric ton)</option>
              <option value="batang">batang</option>
              <option value="sak">sak</option>
              <option value="unit">unit / pcs</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Initial Stock Quantity</label>
            <NumberInput
              value={quantity}
              onChange={(val) => setQuantity(val)}
              suffix={<span className="text-slate-400 text-xs font-semibold">{unit}</span>}
              placeholder="0"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Unit Price (IDR)</label>
            <NumberInput
              value={unitPrice}
              onChange={(val) => setUnitPrice(val)}
              prefix={<span className="text-slate-400 font-semibold text-xs">Rp</span>}
              placeholder="0"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">Vendor / Supplier</label>
          <input
            type="text"
            required
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            Add to Inventory
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

// 7. New RAB / BOQ Item Modal
export const NewRABModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (item: RABItem) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [code, setCode] = useState(`RAB-0${Math.floor(Math.random() * 90 + 10)}`);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Pekerjaan Struktur');
  const [volume, setVolume] = useState(120);
  const [unit, setUnit] = useState('m³');
  const [unitPrice, setUnitPrice] = useState(1150000);
  const [estimatedCost, setEstimatedCost] = useState(138000000);

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    setEstimatedCost(v * unitPrice);
  };

  const handleUnitPriceChange = (p: number) => {
    setUnitPrice(p);
    setEstimatedCost(volume * p);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    const newItem: RABItem = {
      no: Math.floor(Math.random() * 900 + 100),
      workItem: description,
      category,
      estimatedCost,
      actualCost: 0,
      variance: estimatedCost,
      progress: 0,
      unit,
      quantity: volume,
    };
    onCreate(newItem);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Add RAB / BOQ Item">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Item Code</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>
          <div className="col-span-2">
            <label className="font-semibold text-slate-700 block mb-1">Cost Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="Pekerjaan Persiapan">Pekerjaan Persiapan</option>
              <option value="Pekerjaan Tanah & Pondasi">Pekerjaan Tanah & Pondasi</option>
              <option value="Pekerjaan Struktur">Pekerjaan Struktur</option>
              <option value="Pekerjaan Arsitektur">Pekerjaan Arsitektur</option>
              <option value="Pekerjaan MEP">Pekerjaan MEP (Mekanikal, Elektrikal, Plumbing)</option>
              <option value="Pekerjaan Luar / Landscape">Pekerjaan Luar / Landscape</option>
            </select>
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">Item Description</label>
          <input
            type="text"
            required
            placeholder="e.g., Pengecoran Kolom Struktur Lt 2 Beton K-350"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Volume</label>
            <NumberInput
              value={volume}
              onChange={handleVolumeChange}
              placeholder="0"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="m³">m³</option>
              <option value="m²">m²</option>
              <option value="m'">m'</option>
              <option value="kg">kg</option>
              <option value="ls">ls (lumpsum)</option>
              <option value="titik">titik</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Unit Price (IDR)</label>
            <NumberInput
              value={unitPrice}
              onChange={handleUnitPriceChange}
              prefix={<span className="text-slate-400 font-semibold text-xs">Rp</span>}
              placeholder="0"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">Total Estimated Cost (IDR)</label>
          <NumberInput
            value={estimatedCost}
            onChange={(val) => setEstimatedCost(val)}
            prefix={<span className="text-slate-400 font-semibold text-xs">Rp</span>}
            placeholder="0"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            Save to RAB
          </button>
        </div>
      </form>
    </ModalBase>
  );
};
