export interface TocItem {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
  featured?: boolean;
}

export interface DataCategory {
  title: string;
  scope: string;
  purpose: string;
  examples: string[];
}

export interface SecurityPillar {
  title: string;
  technology: string;
  description: string;
}

export interface ThirdPartyService {
  name: string;
  provider: string;
  purpose: string;
  dataProcessed: string;
  policyUrl: string;
}

export interface UserRight {
  number: string;
  title: string;
  description: string;
}

export interface DeletionStep {
  step: number;
  title: string;
  instruction: string;
}

export const APP_INFO = {
  appName: 'Berduit Plus',
  developer: 'Tim Pengembang Berduit Plus',
  category: 'Aplikasi Pencatatan & Manajemen Keuangan Pribadi',
  platforms: 'Android & iOS',
  contactEmail: 'wijaykl00@gmail.com',
  effectiveDate: '21 November 2026',
  deletionSubjectPrefix: 'Permohonan Penghapusan Akun Berduit Plus - ',
} as const;

export const TOC_ITEMS: TocItem[] = [
  { id: 'pendahuluan', number: '01', label: 'Pendahuluan', shortLabel: 'Pendahuluan' },
  { id: 'data-dikumpulkan', number: '02', label: 'Data yang Kami Kumpulkan', shortLabel: 'Data' },
  { id: 'penyimpanan-keamanan', number: '03', label: 'Penyimpanan & Keamanan Data', shortLabel: 'Keamanan' },
  { id: 'pihak-ketiga', number: '04', label: 'Layanan Pihak Ketiga', shortLabel: 'Pihak Ketiga' },
  { id: 'hak-pengguna', number: '05', label: 'Hak-Hak Pengguna', shortLabel: 'Hak Pengguna' },
  {
    id: 'penghapusan-akun',
    number: '06',
    label: 'Penghapusan Akun & Data Pengguna',
    shortLabel: 'Penghapusan Akun',
    featured: true,
  },
  { id: 'kontak-perubahan', number: '07', label: 'Perubahan Kebijakan & Kontak', shortLabel: 'Kontak' },
];

export const DATA_CATEGORIES: DataCategory[] = [
  {
    title: 'Data Akun & Identitas',
    scope: 'Alamat Email atau Nomor HP',
    purpose: 'Digunakan secara eksklusif untuk proses registrasi, otentikasi masuk (login), verifikasi kepemilikan akun, dan pemulihan akses akun Anda.',
    examples: [
      'Alamat email aktif yang Anda daftarkan',
      'Nomor telepon seluler (jika memilih metode login via nomor HP)',
      'Pengenal unik akun internal (User ID) dari sistem otentikasi',
    ],
  },
  {
    title: 'Data Finansial Pengguna',
    scope: 'Catatan Keuangan Pribadi',
    purpose: 'Digunakan sepenuhnya untuk menyajikan ringkasan arus kas, laporan keuangan pribadi, pengelolaan kategori, serta pengingat batas anggaran Anda.',
    examples: [
      'Catatan transaksi harian berupa pemasukan dan pengeluaran',
      'Kategori transaksi, nominal angka, tanggal, dan catatan deskripsi',
      'Pengaturan batas anggaran (budget) bulanan atau per kategori',
    ],
  },
  {
    title: 'Data Teknis & Diagnostik',
    scope: 'Log Performa Non-Pribadi',
    purpose: 'Digunakan untuk mendeteksi kendala teknis, memperbaiki bug, dan menjaga kestabilan performa aplikasi di berbagai perangkat Android maupun iOS.',
    examples: [
      'Informasi perangkat dasar (model perangkat, versi sistem operasi, versi aplikasi)',
      'Log performa dan laporan kerusakan (crash reporting) yang bersifat anonim dan non-pribadi',
    ],
  },
];

export const SECURITY_PILLARS: SecurityPillar[] = [
  {
    title: 'Penyimpanan Lokal Terenkripsi',
    technology: 'SQLite Terenkripsi di Perangkat',
    description:
      'Seluruh catatan keuangan yang tersimpan langsung di memori perangkat Anda dikelola menggunakan basis data lokal SQLite yang terenkripsi, memastikan akses cepat sekaligus melindungi data dari pembacaan tidak sah di perangkat.',
  },
  {
    title: 'Sinkronisasi Cloud & Enkripsi Menyeluruh',
    technology: 'Google Cloud Firestore & Firebase Authentication',
    description:
      'Pencadangan dan sinkronisasi data antarperangkat dilindungi dengan enkripsi saat pengiriman data (in-transit menggunakan protokol HTTPS/TLS) serta enkripsi saat tersimpan di server (at-rest) pada infrastruktur Google Cloud.',
  },
];

export const THIRD_PARTY_SERVICES: ThirdPartyService[] = [
  {
    name: 'Google Firebase Authentication',
    provider: 'Google LLC',
    purpose: 'Manajemen otentikasi aman, verifikasi identitas saat login, serta perlindungan kredensial sesi pengguna.',
    dataProcessed: 'Alamat email atau nomor HP, pengenal akun terenkripsi, dan token sesi.',
    policyUrl: 'https://firebase.google.com/support/privacy',
  },
  {
    name: 'Google Cloud Firestore',
    provider: 'Google LLC',
    purpose: 'Penyimpanan cloud cadangan (cloud backup & sync) untuk menyinkronkan catatan keuangan Anda secara aman.',
    dataProcessed: 'Dokumen transaksi, kategori, dan batas anggaran yang terikat pada akun Anda.',
    policyUrl: 'https://cloud.google.com/terms/cloud-privacy-notice',
  },
];

export const USER_RIGHTS: UserRight[] = [
  {
    number: '01',
    title: 'Hak untuk Melihat & Mengakses Data',
    description:
      'Anda memiliki kendali penuh untuk mengakses dan meninjau seluruh informasi profil akun serta riwayat pencatatan transaksi Anda kapan saja melalui aplikasi Berduit Plus.',
  },
  {
    number: '02',
    title: 'Hak untuk Mengedit & Memperbarui Data',
    description:
      'Anda berhak mengubah, memperbarui, atau mengoreksi data akun, nominal transaksi, kategori, catatan, maupun batas anggaran Anda secara langsung di dalam aplikasi.',
  },
  {
    number: '03',
    title: 'Hak untuk Mengekspor Data (Portabilitas)',
    description:
      'Anda berhak memperoleh salinan dan mengekspor seluruh catatan keuangan pribadi Anda ke format yang dapat dibaca guna keperluan arsip atau pemindahan mandiri.',
  },
  {
    number: '04',
    title: 'Hak untuk Menghapus Seluruh Data Pribadi',
    description:
      'Anda berhak menghapus akun beserta seluruh data pribadi dan catatan keuangan secara permanen, baik langsung dari dalam aplikasi maupun melalui permohonan web/email kepada tim kami.',
  },
];

export const IN_APP_DELETION_STEPS: DeletionStep[] = [
  {
    step: 1,
    title: 'Buka Aplikasi dan Masuk',
    instruction: 'Buka aplikasi Berduit Plus di perangkat Android atau iOS Anda, lalu masuk ke akun yang ingin dihapus.',
  },
  {
    step: 2,
    title: 'Akses Menu Pengaturan / Profil',
    instruction: 'Ketuk menu Pengaturan / Profil (ditandai dengan ikon gerigi) pada bilah navigasi aplikasi.',
  },
  {
    step: 3,
    title: 'Pilih Menu Hapus Akun Permanen',
    instruction: 'Gulir ke bagian Keamanan Akun, kemudian pilih menu "Hapus Akun Permanen".',
  },
  {
    step: 4,
    title: 'Verifikasi Kepemilikan Akun',
    instruction: 'Masukkan konfirmasi PIN atau kata sandi akun Anda untuk memastikan permintaan dilakukan oleh pemilik sah.',
  },
  {
    step: 5,
    title: 'Konfirmasi Penghapusan Akhir',
    instruction: 'Tinjau ringkasan penghapusan, lalu tekan tombol konfirmasi akhir "Hapus Selamanya" untuk menyelesaikan proses.',
  },
];

export const DELETION_IMPACTS: string[] = [
  'Seluruh data transaksi harian, kategori, catatan, batas anggaran (budget), akun Google Firebase Authentication, serta seluruh dokumen di Google Cloud Firestore akan dihapus secara seketika dan tidak dapat dipulihkan kembali.',
  'Basis data SQLite yang tersimpan pada memori lokal ponsel Anda akan otomatis dibersihkan seluruhnya sehingga tidak meninggalkan sisa catatan keuangan di perangkat.',
  'Setelah proses selesai, tidak ada salinan cadangan data finansial pribadi yang dipertahankan oleh Tim Pengembang Berduit Plus.',
];
