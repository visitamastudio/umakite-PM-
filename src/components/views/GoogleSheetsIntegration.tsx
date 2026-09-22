import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Send,
  RefreshCw,
  HelpCircle,
  Code2,
  AlertTriangle,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  SheetConfig,
  loadSheetConfigs,
  saveSheetConfigs,
  sendDataToGoogleSheet,
  SAMPLE_APPS_SCRIPT_CODE,
} from '../../services/googleSheets';

interface GoogleSheetsIntegrationProps {
  onNotify?: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const GoogleSheetsIntegration: React.FC<GoogleSheetsIntegrationProps> = ({ onNotify }) => {
  const [configs, setConfigs] = useState<SheetConfig[]>(loadSheetConfigs());
  const [activeSheetId, setActiveSheetId] = useState<SheetConfig['id']>('projects');
  const [copiedScript, setCopiedScript] = useState(false);
  const [testStatus, setTestStatus] = useState<{ [key: string]: { loading: boolean; message?: string; success?: boolean } }>({});
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setConfigs(loadSheetConfigs());
  }, []);

  const handleUpdateConfig = (id: SheetConfig['id'], field: keyof SheetConfig, value: any) => {
    setConfigs((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, [field]: value } : item));
      saveSheetConfigs(updated);
      return updated;
    });
  };

  const handleSaveAll = () => {
    saveSheetConfigs(configs);
    setSaveSuccess(true);
    if (onNotify) onNotify('Pengaturan 4 Google Sheet berhasil disimpan!', 'success');
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(SAMPLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleTestSend = async (sheetId: SheetConfig['id']) => {
    setTestStatus((prev) => ({ ...prev, [sheetId]: { loading: true } }));
    
    // Sample test data sesuai jenis sheet
    let sampleData: Record<string, any> = {};
    if (sheetId === 'projects') {
      sampleData = {
        id: 'PRJ-TEST',
        name: 'Proyek Uji Koneksi Google Sheet',
        client: 'PT. Visita Media Tama',
        location: 'Jakarta Selatan',
        contractValue: 1250000000,
        actualSpent: 250000000,
        progress: 20,
        status: 'Ongoing',
        startDate: new Date().toLocaleDateString('id-ID'),
        endDate: '31 Des 2026',
      };
    } else if (sheetId === 'materials') {
      sampleData = {
        id: 'MAT-TEST',
        name: 'Semen Portland Tiga Roda (Test Input)',
        category: 'Structural',
        quantity: 100,
        unit: 'sak',
        price: 68000,
        supplier: 'PT. Material Jaya Abadi',
        status: 'Available',
        updated: new Date().toLocaleDateString('id-ID'),
      };
    } else if (sheetId === 'rab') {
      sampleData = {
        no: 99,
        item: 'Uji Coba Input RAB dari Web Projeezy',
        category: 'Pekerjaan Struktur',
        volume: 50,
        unit: 'm³',
        estCost: 57500000,
        actCost: 0,
        variance: 57500000,
        progress: 0,
      };
    } else {
      sampleData = {
        code: 'ISSUE-TEST',
        title: 'Verifikasi Pengiriman Form Isu ke Google Sheet',
        project: 'Villa Taman Ayu',
        category: 'Quality',
        priority: 'Normal',
        status: 'Open',
        reportedBy: 'Site Engineer Test',
        deadline: 'Besok',
        description: 'Uji coba transmisi data live dari website ke Google Sheet 4',
      };
    }

    const res = await sendDataToGoogleSheet(sheetId, sampleData);

    setTestStatus((prev) => ({
      ...prev,
      [sheetId]: { loading: false, message: res.message, success: res.success },
    }));

    if (res.success) {
      handleUpdateConfig(sheetId, 'status', 'connected');
      handleUpdateConfig(sheetId, 'lastSync', res.timestamp);
    }
  };

  const currentConfig = configs.find((c) => c.id === activeSheetId) || configs[0];

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-6 shadow-sm border border-emerald-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg">
                <FileSpreadsheet className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold">Multi Google Sheets Integration (4 File Terpisah)</h2>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed max-w-2xl">
              Hubungkan web ini dengan 4 file Google Spreadsheet berbeda untuk mencatat data secara otomatis.
              File dapat dibuka secara publik (Public Viewer) untuk dilihat tim/klien, sementara input data masuk aman via Webhook Apps Script.
            </p>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setShowScriptModal(true)}
              className="px-3.5 py-2 bg-emerald-700/60 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 border border-emerald-600/50 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Lihat Kode Webhook</span>
            </button>
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              {saveSuccess ? <Check className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              <span>{saveSuccess ? 'Tersimpan!' : 'Simpan Konfigurasi'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid 4 Google Sheets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {configs.map((sheet, index) => {
          const isSelected = sheet.id === activeSheetId;
          return (
            <button
              key={sheet.id}
              onClick={() => setActiveSheetId(sheet.id)}
              className={`text-left p-4 rounded-xl border transition-all relative ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  File #{index + 1}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    sheet.status === 'connected' ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                  title={sheet.status === 'connected' ? 'Tersambung' : 'Siap dikonfigurasi'}
                />
              </div>
              <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{sheet.title.replace(/^Sheet \d+: /, '')}</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">{sheet.description}</p>
              
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="font-mono text-slate-400 truncate max-w-[110px]">Tab: {sheet.sheetName}</span>
                <span className="text-blue-600 font-semibold flex items-center space-x-0.5">
                  <span>Atur</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Sheet Detail & Setup Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">
                Detail Konfigurasi
              </span>
              <h3 className="text-base font-bold text-slate-900">{currentConfig.title}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{currentConfig.description}</p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {currentConfig.sheetUrl && (
              <a
                href={currentConfig.sheetUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                <span>Buka Google Sheet</span>
              </a>
            )}
            <button
              onClick={() => handleTestSend(currentConfig.id)}
              disabled={testStatus[currentConfig.id]?.loading}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{testStatus[currentConfig.id]?.loading ? 'Mengirim Data...' : 'Kirim Baris Uji Coba'}</span>
            </button>
          </div>
        </div>

        {/* Status Alert if test run */}
        {testStatus[currentConfig.id]?.message && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-start space-x-2.5 ${
              testStatus[currentConfig.id]?.success
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
            <div className="space-y-0.5 flex-1">
              <p className="font-semibold">{testStatus[currentConfig.id]?.message}</p>
              {currentConfig.lastSync && (
                <p className="text-[11px] opacity-75">Waktu respons: {currentConfig.lastSync}</p>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Public View Google Sheet URL */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 flex items-center justify-between">
              <span>URL File Google Sheet (Public View / Share Link)</span>
              <span className="text-slate-400 font-normal text-[11px]">Dapat diakses tim</span>
            </label>
            <input
              type="url"
              value={currentConfig.sheetUrl}
              onChange={(e) => handleUpdateConfig(currentConfig.id, 'sheetUrl', e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/your-sheet-id/edit?usp=sharing"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 text-xs focus:bg-white focus:border-blue-500 transition-colors"
            />
            <p className="text-[11px] text-slate-500">
              Salin tautan dari tombol <b>Bagikan (Share) &rarr; Siapa saja yang memiliki link (Viewer)</b>.
            </p>
          </div>

          {/* Target Tab Name */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 flex items-center justify-between">
              <span>Nama Tab / Sheet Tujuan</span>
              <span className="text-slate-400 font-normal text-[11px]">Contoh: Data_Proyek</span>
            </label>
            <input
              type="text"
              value={currentConfig.sheetName}
              onChange={(e) => handleUpdateConfig(currentConfig.id, 'sheetName', e.target.value)}
              placeholder="Data_Proyek"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 text-xs focus:bg-white focus:border-blue-500 transition-colors"
            />
            <p className="text-[11px] text-slate-500">
              Nama sheet tab di bagian bawah spreadsheet Anda. Jika belum ada, script akan membuatnya secara otomatis.
            </p>
          </div>

          {/* Webhook Apps Script URL for Writing Data */}
          <div className="space-y-1.5 md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700 flex items-center space-x-1.5">
                <span>URL Webhook Google Apps Script (Untuk Izin Input/Write Data)</span>
              </label>
              <button
                type="button"
                onClick={() => setShowScriptModal(true)}
                className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Panduan 3 Langkah Mendapatkan URL ini</span>
              </button>
            </div>
            <input
              type="url"
              value={currentConfig.webhookUrl}
              onChange={(e) => handleUpdateConfig(currentConfig.id, 'webhookUrl', e.target.value)}
              placeholder="https://script.google.com/macros/s/AKfycb.../exec"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 text-xs focus:bg-white focus:border-blue-500 transition-colors"
            />
            <p className="text-[11px] text-slate-500">
              Didapatkan dari menu <i>Ekstensi &rarr; Apps Script &rarr; Terapkan (Deploy) sebagai Aplikasi Web</i> pada Google Sheet terkait.
            </p>
          </div>
        </div>

        {/* Struktur Kolom yang Dikirimkan */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Format Kolom Otomatis yang Dikirim ke Sheet Ini ({currentConfig.columns.length} Kolom):</span>
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentConfig.columns.map((col, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-1 bg-slate-100 border border-slate-200 rounded-md text-[11px] font-medium text-slate-700 font-mono"
              >
                <span className="text-slate-400 mr-1.5 text-[9px]">{String.fromCharCode(65 + idx)}</span>
                {col}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Petunjuk Penggunaan Singkat */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs space-y-3">
        <h4 className="font-bold text-slate-800 flex items-center space-x-1.5">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Bagaimana Cara Kerja 4 Google Sheet Ini?</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-600 leading-relaxed text-[11px]">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="font-bold text-slate-800 text-xs mb-1">1. Buat / Siapkan 4 Spreadsheet</div>
            Buat 4 file spreadsheet di Google Drive Anda (Proyek, Material, RAB, dan Laporan Kendala Lapangan). Atur izin berbagi sebagai <i>"Viewer (Siapa saja yang memiliki link)"</i>.
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="font-bold text-slate-800 text-xs mb-1">2. Pasang Script Webhook</div>
            Buka menu <b>Ekstensi &rarr; Apps Script</b> di spreadsheet Anda. Tempelkan kode skrip (klik tombol "Lihat Kode Webhook" di atas) lalu klik <b>Deploy as Web App</b> dengan akses: <i>"Anyone"</i>.
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="font-bold text-slate-800 text-xs mb-1">3. Otomatis Input dari Website</div>
            Setiap kali tim membuat proyek baru, mencatat material datang, menyusun RAB, atau melaporkan kendala di web ini, baris baru langsung terisi di Google Sheet yang bersangkutan.
          </div>
        </div>
      </div>

      {/* Modal Kode Google Apps Script */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-800 text-sm">Kode Webhook Google Apps Script</h3>
              </div>
              <button
                onClick={() => setShowScriptModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                &times;
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto text-xs text-slate-700">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 leading-relaxed text-[11px]">
                <p className="font-semibold mb-1">Cara Pasang di Google Sheet Anda:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Buka file Google Sheet Anda &rarr; Klik menu <b>Ekstensi (Extensions) &rarr; Apps Script</b>.</li>
                  <li>Hapus kode bawaan, lalu paste kode di bawah ini.</li>
                  <li>Klik tombol <b>Terapkan (Deploy) &rarr; Deployment baru (New deployment)</b>.</li>
                  <li>Pilih jenis <b>Aplikasi Web (Web App)</b>.</li>
                  <li>Setel <b>Siapa saja yang memiliki akses (Who has access)</b> menjadi: <b>"Siapa saja" (Anyone)</b>.</li>
                  <li>Salin URL Web App yang muncul dan tempelkan ke kolom Webhook di form pengaturan website ini.</li>
                </ol>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[11px] text-slate-500 font-semibold">Code.gs</span>
                  <button
                    onClick={handleCopyScript}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold flex items-center space-x-1 transition-colors"
                  >
                    {copiedScript ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedScript ? 'Tersalin!' : 'Salin Kode'}</span>
                  </button>
                </div>
                <pre className="p-3.5 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                  {SAMPLE_APPS_SCRIPT_CODE}
                </pre>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setShowScriptModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl text-xs"
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
