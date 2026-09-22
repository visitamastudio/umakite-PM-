export interface SheetConfig {
  id: 'projects' | 'materials' | 'rab' | 'issues';
  title: string;
  description: string;
  iconName: string;
  sheetUrl: string; // e.g. https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit...
  webhookUrl: string; // Google Apps Script web app URL (doPost) for writing/inputting data
  sheetName: string; // Target sheet tab name (e.g. Sheet1, Proyek, Material)
  lastSync?: string;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  columns: string[];
}

export const DEFAULT_SHEET_CONFIGS: SheetConfig[] = [
  {
    id: 'projects',
    title: 'Sheet 1: Master Data Proyek & Klien',
    description: 'Menyimpan daftar proyek, klien, lokasi, nilai kontrak, durasi, dan status progres fisik.',
    iconName: 'Building',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1example_master_proyek_kontraktor/edit?usp=sharing',
    webhookUrl: '',
    sheetName: 'Data_Proyek',
    status: 'disconnected',
    columns: ['ID Proyek', 'Nama Proyek', 'Klien', 'Lokasi', 'Nilai Kontrak (Rp)', 'Realisasi (Rp)', 'Progres (%)', 'Status', 'Tanggal Mulai', 'Target Selesai'],
  },
  {
    id: 'materials',
    title: 'Sheet 2: Logistik & Stok Material Lapangan',
    description: 'Menyimpan inventaris material gudang, penerimaan surat jalan (DO), kuantitas, dan vendor.',
    iconName: 'Package',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1example_logistik_material_gudang/edit?usp=sharing',
    webhookUrl: '',
    sheetName: 'Stok_Material',
    status: 'disconnected',
    columns: ['ID Material', 'Nama Material', 'Kategori', 'Kuantitas', 'Satuan', 'Harga Satuan (Rp)', 'Supplier/Vendor', 'Status Stok', 'Terakhir Update'],
  },
  {
    id: 'rab',
    title: 'Sheet 3: Rencana Anggaran Biaya (RAB / BOQ)',
    description: 'Menyimpan rincian item pekerjaan, volume, estimasi biaya rencana, dan realisasi aktual.',
    iconName: 'Calculator',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1example_rab_boq_cost_control/edit?usp=sharing',
    webhookUrl: '',
    sheetName: 'RAB_Proyek',
    status: 'disconnected',
    columns: ['No', 'Item Pekerjaan', 'Kategori', 'Volume', 'Satuan', 'Estimasi Biaya (Rp)', 'Realisasi (Rp)', 'Deviasi/Varians (Rp)', 'Progres (%)'],
  },
  {
    id: 'issues',
    title: 'Sheet 4: Laporan Harian & Temuan Kendala Lapangan',
    description: 'Menyimpan catatan kendala lapangan, defek mutu pekerjaan, isu K3/safety, dan assignee.',
    iconName: 'AlertCircle',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1example_laporan_isu_lapangan/edit?usp=sharing',
    webhookUrl: '',
    sheetName: 'Isu_Lapangan',
    status: 'disconnected',
    columns: ['Kode Isu', 'Judul Kendala', 'Proyek', 'Kategori', 'Prioritas', 'Status', 'Pelapor', 'Tenggat Waktu', 'Deskripsi'],
  },
];

const STORAGE_KEY = 'projeezy_google_sheets_config';

export function loadSheetConfigs(): SheetConfig[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return DEFAULT_SHEET_CONFIGS.map((def) => {
        const found = parsed.find((p: SheetConfig) => p.id === def.id);
        return found ? { ...def, ...found } : def;
      });
    }
  } catch (e) {
    console.error('Failed to load sheet configs from localStorage', e);
  }
  return DEFAULT_SHEET_CONFIGS;
}

export function saveSheetConfigs(configs: SheetConfig[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
  } catch (e) {
    console.error('Failed to save sheet configs to localStorage', e);
  }
}

/**
 * Kirim data ke Google Sheets melalui Google Apps Script Webhook
 */
export async function sendDataToGoogleSheet(
  sheetId: 'projects' | 'materials' | 'rab' | 'issues',
  payload: Record<string, any>
): Promise<{ success: boolean; message: string; timestamp: string }> {
  const configs = loadSheetConfigs();
  const config = configs.find((c) => c.id === sheetId);

  const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  if (!config || !config.webhookUrl) {
    // Simulasi kirim bila belum ada URL webhook asli
    return {
      success: true,
      message: `[Mode Simulasi / Siap Integrasi] Data ${config?.title || sheetId} siap dikirim. Hubungkan URL Google Apps Script Webhook untuk sinkronisasi live.`,
      timestamp: nowStr,
    };
  }

  try {
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      mode: 'no-cors', // standard for Google Apps Script Web Apps to avoid CORS blocks
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sheetName: config.sheetName,
        action: 'append_row',
        data: payload,
        timestamp: new Date().toISOString(),
      }),
    });

    return {
      success: true,
      message: `Berhasil menginput data ke "${config.title}" (${config.sheetName})!`,
      timestamp: nowStr,
    };
  } catch (error: any) {
    console.error('Error sending data to Google Sheet:', error);
    return {
      success: false,
      message: `Gagal mengirim ke Google Sheet: ${error?.message || 'Koneksi terputus'}`,
      timestamp: nowStr,
    };
  }
}

/**
 * Contoh template kode Google Apps Script yang dapat di-copy paste oleh pengguna ke Google Sheet mereka
 */
export const SAMPLE_APPS_SCRIPT_CODE = `function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var sheetName = contents.sheetName || "Sheet1";
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    
    // Jika sheet tab belum ada, buat otomatis
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    var data = contents.data;
    var rowData = [];
    
    // Konversi object data menjadi array baris sesuai urutan kolom
    if (Array.isArray(data)) {
      rowData = data;
    } else {
      // Ambil seluruh nilai properti object
      rowData = Object.keys(data).map(function(key) {
        return data[key];
      });
      // Tambahkan timestamp input
      rowData.push(new Date());
    }
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data berhasil ditambahkan ke baris baru",
      row: sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;
