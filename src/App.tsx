import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Printer } from 'lucide-react';
import {
  APP_INFO,
  DATA_CATEGORIES,
  DELETION_IMPACTS,
  IN_APP_DELETION_STEPS,
  SECURITY_PILLARS,
  THIRD_PARTY_SERVICES,
  TOC_ITEMS,
  USER_RIGHTS,
} from './data/privacyContent';
import { DeletionRequestForm } from './components/DeletionRequestForm';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('pendahuluan');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollTop / docHeight)));
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = TOC_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div id="top" className="min-h-screen bg-white text-[#15233E]">
      {/* Top Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm no-print">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-8 px-6">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-[#15233E] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15233E] rounded-sm"
          >
            {APP_INFO.appName}
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav
            aria-label="Navigasi bagian utama"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a
              href="#pendahuluan"
              className="hover:text-[#15233E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Pendahuluan
            </a>
            <a
              href="#data-dikumpulkan"
              className="hover:text-[#15233E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Data
            </a>
            <a
              href="#penyimpanan-keamanan"
              className="hover:text-[#15233E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Keamanan
            </a>
            <a
              href="#pihak-ketiga"
              className="hover:text-[#15233E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Pihak Ketiga
            </a>
            <a
              href="#hak-pengguna"
              className="hover:text-[#15233E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Hak Pengguna
            </a>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="shrink-0">
            <a
              href="#penghapusan-akun"
              className="inline-flex items-center gap-2 rounded-lg bg-[#15233E] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#0C1526] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15233E] focus-visible:ring-offset-2 transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
            >
              <span>Hapus Akun &amp; Data</span>
            </a>
          </div>
        </div>

        {/* Hairline Reading Depth Progress Indicator */}
        <div className="h-[2px] w-full bg-transparent overflow-hidden" aria-hidden="true">
          <div
            className="h-full w-full origin-left bg-[#15233E] transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </header>

      {/* Institutional Dark Navy Masthead */}
      <section className="bg-[#15233E] text-white">
        <div className="mx-auto max-w-[1180px] px-6 py-14 sm:py-16 lg:py-20">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-slate-300 tracking-[0.01em]">
            <span>Kebijakan Privasi Resmi</span>
            <span aria-hidden="true">·</span>
            <span>Berlaku sejak {APP_INFO.effectiveDate}</span>
            <span aria-hidden="true">·</span>
            <span>Platform {APP_INFO.platforms}</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-4xl sm:text-5xl font-semibold leading-[1.14] tracking-tight text-white">
            Kebijakan Privasi {APP_INFO.appName}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 tracking-[0.01em]">
            Dokumen ini menguraikan secara transparan bagaimana {APP_INFO.developer} mengumpulkan, menyimpan, melindungi, dan menghapus data pribadi serta catatan keuangan Anda saat menggunakan aplikasi {APP_INFO.appName}.
          </p>

          {/* Institutional Accession / Identity Grid */}
          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs text-slate-400">Nama Aplikasi</dt>
              <dd className="mt-1 text-sm font-medium text-white">{APP_INFO.appName}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Pengembang / Entitas</dt>
              <dd className="mt-1 text-sm font-medium text-white">{APP_INFO.developer}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Jenis Aplikasi</dt>
              <dd className="mt-1 text-sm font-medium text-white">{APP_INFO.category}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Email Bantuan &amp; DPO</dt>
              <dd className="mt-1 text-sm font-medium text-white">
                <a
                  href={`mailto:${APP_INFO.contactEmail}`}
                  className="underline decoration-white/35 underline-offset-4 hover:decoration-white transition-colors"
                >
                  {APP_INFO.contactEmail}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Quick Table of Contents Band — Direct Jump to Account Deletion */}
      <nav
        aria-label="Navigasi cepat daftar isi"
        className="border-b border-slate-200 bg-[#F4F7FB] no-print"
      >
        <div className="mx-auto max-w-[1180px] px-6 py-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#15233E]">
                Navigasi Cepat (Daftar Isi)
              </h2>
              <p className="mt-0.5 text-xs text-slate-600">
                Lompat langsung ke bagian kebijakan atau panduan penghapusan akun &amp; data permanen.
              </p>
            </div>
            <a
              href="#penghapusan-akun"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#15233E] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#0C1526] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15233E] focus-visible:ring-offset-2 transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
            >
              <span>Lompat ke Penghapusan Akun</span>
              <ArrowDownRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {TOC_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition-colors min-h-[44px] ${
                  item.featured
                    ? 'border-[#15233E] bg-[#15233E] text-white hover:bg-[#0C1526]'
                    : 'border-slate-200 bg-white text-[#15233E] hover:border-[#15233E]'
                }`}
              >
                <span
                  className={`font-mono text-xs tabular-nums ${
                    item.featured ? 'text-slate-300' : 'text-slate-400 group-hover:text-[#15233E]'
                  }`}
                >
                  {item.number}
                </span>
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Asymmetric Editorial Layout */}
      <main className="mx-auto max-w-[1180px] px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16 items-start">
          {/* Desktop Sticky Sidebar TOC */}
          <aside className="hidden lg:block sticky top-24 no-print" aria-label="Daftar bagian">
            <div className="text-xs font-semibold text-slate-500 mb-3">
              Struktur Dokumen
            </div>
            <ul className="border-t border-slate-200">
              {TOC_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="border-b border-slate-200">
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex items-center gap-3 py-3 text-sm transition-colors ${
                        isActive
                          ? 'font-semibold text-[#15233E]'
                          : 'text-slate-600 hover:text-[#15233E]'
                      }`}
                    >
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          isActive ? 'text-[#15233E]' : 'text-slate-400'
                        }`}
                      >
                        {item.number}
                      </span>
                      <span className="leading-snug">{item.shortLabel}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-700 hover:border-[#15233E] hover:text-[#15233E] transition-colors cursor-pointer min-h-[40px]"
              >
                <Printer className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>
          </aside>

          {/* Editorial Reading Column (65–75ch optimal measure) */}
          <article className="max-w-[740px] space-y-14">
            {/* 01. Pendahuluan */}
            <section id="pendahuluan" className="border-b border-slate-200 pb-12">
              <div className="font-mono text-xs text-slate-500 tabular-nums">
                01 / Pendahuluan
              </div>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#15233E]">
                Komitmen Privasi &amp; Kepatuhan Regulasi
              </h2>
              <div className="mt-5 space-y-4 text-[15px] sm:text-base leading-[1.78] text-slate-700">
                <p>
                  {APP_INFO.developer} berkomitmen penuh melindungi privasi dan keamanan data pribadi seluruh pengguna aplikasi{' '}
                  <strong className="font-semibold text-[#15233E]">{APP_INFO.appName}</strong>. Sebagai aplikasi pencatatan dan manajemen keuangan pribadi, kami memahami bahwa setiap rincian pemasukan, pengeluaran, dan perencanaan anggaran bersifat sangat pribadi dan hanya Anda yang berhak mengendalikannya.
                </p>
                <p>
                  Pengelolaan data pribadi dalam aplikasi ini diselenggarakan berdasarkan prinsip transparansi, pembatasan tujuan, dan minimalisasi data sesuai dengan peraturan perlindungan data yang berlaku, termasuk Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP), kebijakan{' '}
                  <em>Google Play User Data Policy</em>, serta <em>Apple App Store Privacy Guidelines</em>.
                </p>
                <p>
                  Dengan mengakses atau menggunakan {APP_INFO.appName}, Anda menyatakan telah membaca dan menyetujui praktik pengelolaan data sebagaimana dijelaskan dalam Kebijakan Privasi ini.
                </p>
              </div>
            </section>

            {/* 02. Data yang Kami Kumpulkan */}
            <section id="data-dikumpulkan" className="border-b border-slate-200 pb-12">
              <div className="font-mono text-xs text-slate-500 tabular-nums">
                02 / Data yang Kami Kumpulkan
              </div>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#15233E]">
                Kategori Data yang Diproses
              </h2>
              <p className="mt-4 text-[15px] sm:text-base leading-[1.78] text-slate-700">
                Kami hanya mengumpulkan data yang relevan dan esensial untuk menjalankan fungsi utama pencatatan keuangan pribadi, sinkronisasi lintas perangkat, dan keandalan teknis aplikasi:
              </p>

              <div className="mt-6 divide-y divide-slate-200 border-t border-slate-200">
                {DATA_CATEGORIES.map((category) => (
                  <div key={category.title} className="py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-[#15233E]">
                        {category.title}
                      </h3>
                      <span className="text-xs font-medium text-slate-500">
                        {category.scope}
                      </span>
                    </div>
                    <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-700">
                      {category.purpose}
                    </p>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
                      {category.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 03. Penyimpanan & Keamanan Data */}
            <section id="penyimpanan-keamanan" className="border-b border-slate-200 pb-12">
              <div className="font-mono text-xs text-slate-500 tabular-nums">
                03 / Penyimpanan &amp; Keamanan Data
              </div>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#15233E]">
                Arsitektur Penyimpanan &amp; Perlindungan Enkripsi
              </h2>
              <p className="mt-4 text-[15px] sm:text-base leading-[1.78] text-slate-700">
                Kami menerapkan langkah pengamanan teknis dan organisatoris berstandar industri untuk menjaga kerahasiaan, keutuhan, dan ketersediaan catatan keuangan Anda:
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {SECURITY_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-xl border border-slate-200 bg-[#F4F7FB] p-6"
                  >
                    <div className="text-xs font-semibold text-slate-500">
                      {pillar.technology}
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-[#15233E]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Zero Commercialization Commitment */}
              <div className="mt-6 rounded-xl bg-[#15233E] p-6 sm:p-7 text-white">
                <h3 className="text-base font-semibold text-white">
                  Komitmen Tegas: Tidak Ada Penjualan Data untuk Iklan
                </h3>
                <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-200">
                  Kami <strong className="font-semibold text-white">TIDAK MENJUAL</strong>, menyewakan, memperdagangkan, atau membagikan data keuangan pribadi pengguna kepada pihak ketiga mana pun untuk tujuan periklanan, profil konsumen, maupun pemasaran komersial.
                </p>
              </div>
            </section>

            {/* 04. Pihak Ketiga yang Digunakan */}
            <section id="pihak-ketiga" className="border-b border-slate-200 pb-12">
              <div className="font-mono text-xs text-slate-500 tabular-nums">
                04 / Pihak Ketiga yang Digunakan
              </div>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#15233E]">
                Infrastruktur Layanan Pihak Ketiga
              </h2>
              <p className="mt-4 text-[15px] sm:text-base leading-[1.78] text-slate-700">
                {APP_INFO.appName} hanya bekerja sama dengan penyedia infrastruktur cloud bereputasi tinggi untuk menunjang otentikasi akun dan pencadangan data yang terenkripsi:
              </p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-[#F4F7FB]">
                      <th className="px-4 py-3.5 font-semibold text-[#15233E]">Layanan</th>
                      <th className="px-4 py-3.5 font-semibold text-[#15233E]">Tujuan Penggunaan</th>
                      <th className="px-4 py-3.5 font-semibold text-[#15233E]">Data yang Diproses</th>
                      <th className="px-4 py-3.5 font-semibold text-[#15233E]">Kebijakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {THIRD_PARTY_SERVICES.map((service) => (
                      <tr key={service.name} className="align-top">
                        <td className="px-4 py-4">
                          <div className="font-semibold text-[#15233E]">{service.name}</div>
                          <div className="mt-0.5 text-xs text-slate-500">{service.provider}</div>
                        </td>
                        <td className="px-4 py-4 leading-relaxed text-slate-700">
                          {service.purpose}
                        </td>
                        <td className="px-4 py-4 leading-relaxed text-slate-600">
                          {service.dataProcessed}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <a
                            href={service.policyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-[#15233E] underline decoration-slate-300 underline-offset-4 hover:decoration-[#15233E] transition-colors"
                          >
                            <span>Lihat</span>
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 05. Hak-Hak Pengguna */}
            <section id="hak-pengguna" className="border-b border-slate-200 pb-12">
              <div className="font-mono text-xs text-slate-500 tabular-nums">
                05 / Hak-Hak Pengguna
              </div>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#15233E]">
                Kendali Penuh Atas Data Pribadi Anda
              </h2>
              <p className="mt-4 text-[15px] sm:text-base leading-[1.78] text-slate-700">
                Anda memegang kedaulatan penuh atas seluruh catatan keuangan dan informasi akun Anda di {APP_INFO.appName}, meliputi hak-hak berikut:
              </p>

              <div className="mt-6 divide-y divide-slate-200 border-t border-slate-200">
                {USER_RIGHTS.map((right) => (
                  <div
                    key={right.number}
                    className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 py-5"
                  >
                    <span className="font-mono text-sm font-medium text-slate-400 tabular-nums pt-0.5">
                      {right.number}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-[#15233E]">
                        {right.title}
                      </h3>
                      <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-slate-700">
                        {right.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 06. BAGIAN KHUSUS: Penghapusan Akun & Data Pengguna (Google Play Policy Compliance) */}
            <section
              id="penghapusan-akun"
              aria-labelledby="heading-penghapusan-akun"
              className="overflow-hidden rounded-2xl border border-[#15233E] bg-white"
            >
              <div className="bg-[#15233E] px-6 py-8 sm:px-8 sm:py-9 text-white">
                <div className="font-mono text-xs text-slate-300 tabular-nums">
                  06 / Google Play Policy Compliance
                </div>
                <h2
                  id="heading-penghapusan-akun"
                  className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-white"
                >
                  Penghapusan Akun &amp; Data Pengguna (Account Deletion)
                </h2>
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-200">
                  Kami menyediakan mekanisme penghapusan akun dan data pribadi yang mudah, transparan, dan menyeluruh—baik langsung dari dalam aplikasi maupun melalui permohonan web apabila aplikasi sudah tidak terpasang di perangkat Anda.
                </p>
              </div>

              <div className="divide-y divide-slate-200 px-6 py-8 sm:px-8 sm:py-9">
                {/* Sub-section A: In-App Deletion */}
                <div className="pb-9">
                  <h3 className="text-lg font-bold text-[#15233E]">
                    A. Cara Menghapus Akun Langsung Lewat Aplikasi (In-App Deletion)
                  </h3>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-700">
                    Anda dapat menghapus akun secara mandiri dan instan langsung dari aplikasi {APP_INFO.appName} dengan mengikuti lima langkah berikut:
                  </p>

                  <ol className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                    {IN_APP_DELETION_STEPS.map((item) => (
                      <li
                        key={item.step}
                        className="grid grid-cols-1 gap-1.5 py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-4"
                      >
                        <span className="font-mono text-xs sm:text-sm font-medium text-[#15233E] tabular-nums sm:pt-0.5">
                          Langkah {item.step}
                        </span>
                        <div>
                          <div className="text-sm sm:text-[15px] font-semibold text-[#15233E]">
                            {item.title}
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-slate-600">
                            {item.instruction}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Sub-section B: Dampak Penghapusan Data */}
                <div className="py-9">
                  <h3 className="text-lg font-bold text-[#15233E]">
                    B. Dampak Penghapusan Data
                  </h3>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-700">
                    Sebelum menekan tombol konfirmasi akhir, harap perhatikan konsekuensi penghapusan permanen berikut:
                  </p>

                  <div
                    role="note"
                    className="mt-4 rounded-xl border border-red-200 bg-red-50 p-5 sm:p-6"
                  >
                    <div className="text-sm font-bold text-red-900">
                      Peringatan: Penghapusan Bersifat Permanen &amp; Tidak Dapat Dipulihkan
                    </div>
                    <ul className="mt-3 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-red-950">
                      {DELETION_IMPACTS.map((impact) => (
                        <li key={impact}>{impact}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sub-section C: Web Deletion Request */}
                <div className="pt-9">
                  <h3 className="text-lg font-bold text-[#15233E]">
                    C. Opsi Penghapusan Tanpa Aplikasi (Web Deletion Request)
                  </h3>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-700">
                    Apabila Anda sudah menghapus instalasi (<em>uninstall</em>) aplikasi {APP_INFO.appName} dari ponsel Anda atau tidak lagi memiliki akses ke perangkat sebelumnya, Anda tetap dapat meminta penghapusan akun secara manual dengan mengirimkan email ke{' '}
                    <a
                      href={`mailto:${APP_INFO.contactEmail}?subject=${encodeURIComponent(
                        `${APP_INFO.deletionSubjectPrefix}[Email/No HP]`
                      )}`}
                      className="font-semibold text-[#15233E] underline decoration-slate-300 underline-offset-4 hover:decoration-[#15233E]"
                    >
                      {APP_INFO.contactEmail}
                    </a>{' '}
                    menggunakan format subjek wajib{' '}
                    <span className="font-mono text-xs sm:text-sm font-medium text-[#15233E] bg-[#F4F7FB] px-1.5 py-0.5 rounded">
                      {APP_INFO.deletionSubjectPrefix}[Email/No HP]
                    </span>
                    .
                  </p>

                  <DeletionRequestForm />
                </div>
              </div>
            </section>

            {/* 07. Perubahan Kebijakan & Kontak */}
            <section id="kontak-perubahan" className="pb-4">
              <div className="font-mono text-xs text-slate-500 tabular-nums">
                07 / Perubahan Kebijakan &amp; Kontak Resmi
              </div>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#15233E]">
                Pembaruan Kebijakan &amp; Hubungi Petugas Privasi (DPO)
              </h2>
              <div className="mt-5 space-y-4 text-[15px] sm:text-base leading-[1.78] text-slate-700">
                <p>
                  {APP_INFO.developer} dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk menyesuaikan peningkatan fitur layanan atau perubahan regulasi perlindungan data pribadi. Tanggal berlaku terbaru akan selalu dicantumkan secara jelas pada bagian atas dokumen ini.
                </p>
                <p>
                  Apabila Anda memiliki pertanyaan terkait Kebijakan Privasi, permintaan ekspor data, atau memerlukan pendampingan penghapusan akun, silakan hubungi Petugas Pelindungan Data / Tim Bantuan kami:
                </p>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-[#F4F7FB] p-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium text-slate-500">Pengembang / Pengendali Data</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#15233E]">{APP_INFO.developer}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-slate-500">Email Resmi Bantuan &amp; DPO</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#15233E]">
                    <a
                      href={`mailto:${APP_INFO.contactEmail}`}
                      className="underline decoration-slate-400 underline-offset-4 hover:decoration-[#15233E] transition-colors"
                    >
                      {APP_INFO.contactEmail}
                    </a>
                  </dd>
                </div>
              </dl>
            </section>
          </article>
        </div>
      </main>

      {/* Clean Institutional Footer */}
      <footer className="border-t border-slate-200 bg-[#0C1526] text-slate-300">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm">
          <div>
            <span>&copy; {currentYear} {APP_INFO.developer}</span>
            <span className="mx-2 text-slate-600" aria-hidden="true">·</span>
            <span>{APP_INFO.appName}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 no-print">
            <a
              href={`mailto:${APP_INFO.contactEmail}`}
              className="text-slate-200 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors"
            >
              {APP_INFO.contactEmail}
            </a>
            <a
              href="#penghapusan-akun"
              className="text-slate-200 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors"
            >
              Penghapusan Akun
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
