import { useState, FormEvent } from 'react';
import { Copy, Check, Mail, ArrowUpRight } from 'lucide-react';
import { APP_INFO } from '../data/privacyContent';

export function DeletionRequestForm() {
  const [identifier, setIdentifier] = useState('');
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const trimmedIdentifier = identifier.trim();
  const displayIdentifier = trimmedIdentifier || '[Email/No HP]';
  const subjectLine = `${APP_INFO.deletionSubjectPrefix}${displayIdentifier}`;

  const buildEmailBody = () => {
    const noteLine = reason.trim()
      ? `\nCatatan Tambahan: ${reason.trim()}`
      : '';
    return [
      'Halo Tim Pengembang Berduit Plus (DPO),',
      '',
      'Saya mengajukan permohonan penghapusan akun dan seluruh data pribadi saya di aplikasi Berduit Plus secara permanen karena aplikasi sudah tidak terpasang di perangkat saya.',
      '',
      `Email / Nomor HP Terdaftar: ${displayIdentifier}${noteLine}`,
      '',
      'Saya memahami bahwa penghapusan ini bersifat permanen dan seluruh data transaksi, kategori, batas anggaran (budget), akun Firebase Authentication, serta dokumen Cloud Firestore akan dihapus sepenuhnya dan tidak dapat dipulihkan kembali.',
      '',
      'Terima kasih.',
    ].join('\n');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!trimmedIdentifier) {
      setErrorMessage('Mohon masukkan alamat email atau nomor HP yang terdaftar pada akun Berduit Plus Anda.');
      return;
    }
    if (!confirmed) {
      setErrorMessage('Mohon centang pernyataan persetujuan bahwa penghapusan data bersifat permanen.');
      return;
    }
    setErrorMessage('');
    const mailtoUrl = `mailto:${APP_INFO.contactEmail}?subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(buildEmailBody())}`;
    window.location.href = mailtoUrl;
    setSubmittedNotice(true);
  };

  const handleCopyTemplate = async () => {
    const fullText = `Kepada: ${APP_INFO.contactEmail}\nSubjek: ${subjectLine}\n\n${buildEmailBody()}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setErrorMessage('Gagal menyalin otomatis. Silakan salin alamat email dan subjek secara manual.');
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-1 pb-6 border-b border-slate-200">
        <h4 className="text-base font-semibold text-[#15233E]">
          Formulir Permohonan Penghapusan Tanpa Aplikasi (Web Deletion Request)
        </h4>
        <p className="text-sm leading-relaxed text-slate-600">
          Sudah menghapus instalasi aplikasi Berduit Plus? Lengkapi identitas akun di bawah ini untuk membuat email permohonan resmi secara otomatis ke{' '}
          <a
            href={`mailto:${APP_INFO.contactEmail}`}
            className="font-medium text-[#15233E] underline decoration-slate-300 underline-offset-4 hover:decoration-[#15233E] transition-colors"
          >
            {APP_INFO.contactEmail}
          </a>
          .
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div>
          <label
            htmlFor="account-identifier"
            className="block text-sm font-medium text-[#15233E] mb-2"
          >
            Alamat Email atau Nomor HP Terdaftar <span className="text-red-700">*</span>
          </label>
          <input
            id="account-identifier"
            type="text"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (errorMessage) setErrorMessage('');
              if (submittedNotice) setSubmittedNotice(false);
            }}
            placeholder="Contoh: nama@email.com atau 081234567890"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#15233E] placeholder:text-slate-400 focus:border-[#15233E] focus:outline-none focus:ring-2 focus:ring-[#15233E]/15 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="deletion-note"
            className="block text-sm font-medium text-[#15233E] mb-2"
          >
            Catatan Tambahan <span className="text-slate-400 font-normal">(Opsional)</span>
          </label>
          <textarea
            id="deletion-note"
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Misalnya: Perangkat lama sudah tidak digunakan atau aplikasi sudah di-uninstall."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#15233E] placeholder:text-slate-400 focus:border-[#15233E] focus:outline-none focus:ring-2 focus:ring-[#15233E]/15 transition-colors resize-none"
          />
        </div>

        <div className="rounded-lg border border-slate-200 bg-[#F4F7FB] p-4">
          <div className="text-xs font-medium text-slate-500 mb-1.5">
            Format Subjek Email Resmi (Otomatis Terisi)
          </div>
          <div className="font-mono text-xs sm:text-sm text-[#15233E] break-all select-all">
            {subjectLine}
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => {
              setConfirmed(e.target.checked);
              if (errorMessage) setErrorMessage('');
            }}
            className="mt-1 h-4 w-4 rounded border-slate-300 accent-[#15233E] cursor-pointer"
          />
          <span className="text-sm leading-relaxed text-slate-600">
            Saya memahami bahwa penghapusan akun bersifat permanen. Seluruh catatan transaksi, kategori, batas anggaran, akun Firebase Authentication, dan dokumen Cloud Firestore tidak dapat dipulihkan setelah diproses.
          </span>
        </label>

        {errorMessage && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {errorMessage}
          </div>
        )}

        {submittedNotice && (
          <div
            role="status"
            className="rounded-lg border border-slate-200 bg-[#F4F7FB] px-4 py-3 text-sm text-[#15233E]"
          >
            Aplikasi email Anda telah dipicu dengan format subjek resmi. Jika jendela email tidak terbuka otomatis, gunakan tombol <strong>Salin Format Email</strong> dan kirimkan ke{' '}
            <span className="font-mono">{APP_INFO.contactEmail}</span>.
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#15233E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0C1526] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15233E] focus-visible:ring-offset-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Kirim Permohonan via Email</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleCopyTemplate}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-[#15233E] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15233E] focus-visible:ring-offset-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span>Format Email Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Salin Format Email</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs leading-relaxed text-slate-500">
          Tim Pengembang Berduit Plus akan memverifikasi kepemilikan akun Anda melalui email atau nomor HP terdaftar dan menyelesaikan penghapusan permanen dalam waktu maksimal 7 hari kerja.
        </p>
      </form>
    </div>
  );
}
