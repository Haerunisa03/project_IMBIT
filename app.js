/* ─── JAVASCRIPT — BUDDY ONBOARDING SYSTEM ─────────────────── */

// ═══════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════
function navigateTo(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Show target page
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  const navItem = document.querySelector(`[data-page="${pageId}"]`);
  if (navItem) navItem.classList.add('active');

  // Close sidebar on mobile
  closeSidebar();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sidebar nav clicks
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(item.dataset.page);
  });
});

// Mobile sidebar toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar    = document.getElementById('sidebar');
const overlay    = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});
overlay.addEventListener('click', closeSidebar);

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}


// ═══════════════════════════════════════════════════════════
// CHATBOT — BUDDY AI
// ═══════════════════════════════════════════════════════════
const chatInput = document.getElementById('chatInput');
const chatWindow = document.getElementById('chatWindow');
const typingIndicator = document.getElementById('typingIndicator');
const chatSuggestions = document.getElementById('chatSuggestions');

// Send on Enter key
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  appendUserMessage(text);
  chatInput.value = '';
  chatSuggestions.style.display = 'none'; // hide quick chips after first msg

  // Show typing
  typingIndicator.style.display = 'flex';
  scrollChat();

  // Simulate AI response delay
  const delay = 600 + Math.random() * 800;
  setTimeout(() => {
    typingIndicator.style.display = 'none';
    const response = getBuddyResponse(text);
    appendBotMessage(response);
    scrollChat();
  }, delay);
}

function sendSuggestion(btn) {
  const text = btn.textContent.trim();
  chatInput.value = text;
  sendMessage();
}

function appendUserMessage(text) {
  const time = getTimeNow();
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.innerHTML = `
    <div class="msg-avatar"><i class="fas fa-user"></i></div>
    <div class="msg-content">
      <div class="msg-bubble">${escapeHtml(text)}</div>
      <span class="msg-time">${time}</span>
    </div>`;
  chatWindow.appendChild(div);
  scrollChat();
}

function appendBotMessage(html) {
  const time = getTimeNow();
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.innerHTML = `
    <div class="msg-avatar"><i class="fas fa-robot"></i></div>
    <div class="msg-content">
      <div class="msg-bubble">${html}</div>
      <span class="msg-time">${time}</span>
    </div>`;
  chatWindow.appendChild(div);
}

function scrollChat() {
  setTimeout(() => { chatWindow.scrollTop = chatWindow.scrollHeight; }, 50);
}

function getTimeNow() {
  const now = new Date();
  return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function toggleTopics() {
  const panel = document.getElementById('topicPanel');
  panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
}

// ─── KNOWLEDGE BASE ───────────────────────────────────────
const KB = [
  // SKS
  {
    keys: ['sks','satuan kredit','kredit semester'],
    ans: `📚 <strong>Satuan Kredit Semester (SKS)</strong><br/><br/>
SKS adalah satuan beban belajar dalam sistem pendidikan tinggi Indonesia.<br/><br/>
• 1 SKS = 1 jam kuliah + 1 jam tugas + 1 jam mandiri per minggu<br/>
• Beban normal per semester: <strong>18–24 SKS</strong><br/>
• Mahasiswa baru bisa ambil maksimal <strong>24 SKS</strong><br/>
• Semester berikutnya bergantung pada <strong>IP</strong> kamu<br/>
• Total SKS untuk lulus S1: <strong>144–160 SKS</strong><br/><br/>
💡 Tips: Jangan ambil terlalu banyak SKS di semester pertama — fokuslah beradaptasi dulu!`
  },
  // KRS
  {
    keys: ['krs','kartu rencana studi','daftar mata kuliah','daftar kuliah','ambil mata kuliah'],
    ans: `📋 <strong>Kartu Rencana Studi (KRS)</strong><br/><br/>
KRS adalah daftar mata kuliah yang kamu pilih untuk satu semester.<br/><br/>
• Diisi melalui <strong>Portal Akademik</strong> online tiap awal semester<br/>
• Wajib dikonsultasikan dengan <strong>Dosen Pembimbing Akademik (PA)</strong><br/>
• Perhatikan <strong>prasyarat</strong> setiap mata kuliah<br/>
• Periode pengisian: <strong>20–25 November 2024</strong><br/>
• KRS yang sudah dikunci PA tidak bisa diubah<br/><br/>
💡 Segera hubungi dosen PA kamu untuk jadwal konsultasi!`
  },
  // PKKMB
  {
    keys: ['pkkmb','orientasi','pengenalan kampus','mos','ospek'],
    ans: `🎓 <strong>PKKMB (Pengenalan Kehidupan Kampus Mahasiswa Baru)</strong><br/><br/>
PKKMB adalah kegiatan wajib untuk seluruh mahasiswa baru.<br/><br/>
• <strong>Hari 1</strong> (15 Nov): Pembukaan & Pengenalan Universitas<br/>
• <strong>Hari 2</strong> (16 Nov): Pengenalan Akademik & Fasilitas<br/>
• <strong>Hari 3</strong> (17 Nov): Kehidupan Kampus & Soft Skill<br/>
• <strong>Hari 4</strong> (18 Nov): Penutupan & Janji Mahasiswa<br/><br/>
📍 Lokasi: Auditorium Utama & Gedung Dekanat<br/>
⏰ Mulai pukul: 07:30 WIB<br/><br/>
⚠️ <strong>Wajib hadir!</strong> Ketidakhadiran dapat mempengaruhi status kemahasiswaanmu.`
  },
  // Perpustakaan
  {
    keys: ['perpustakaan','library','buku','koleksi buku','pinjam buku'],
    ans: `📚 <strong>Perpustakaan Pusat</strong><br/><br/>
• 📍 Lokasi: <strong>Gedung A, Lantai 1–3</strong><br/>
• ⏰ Jam buka: <strong>Senin–Sabtu, 07:30–21:00</strong><br/>
• 📖 Koleksi: <strong>50.000+ buku</strong> + jurnal & e-book<br/>
• 🗣️ Ada ruang diskusi & ruang baca nyaman<br/>
• 💻 Akses database ilmiah internasional<br/><br/>
<strong>Cara daftar kartu anggota:</strong><br/>
1. Bawa KTM aktif ke meja informasi perpustakaan<br/>
2. Isi formulir pendaftaran<br/>
3. Foto langsung di tempat<br/>
4. Kartu selesai dalam 1 hari kerja 📗`
  },
  // Kantin
  {
    keys: ['kantin','makan','makanan','food court','cafe','kafetaria'],
    ans: `🍽️ <strong>Kantin & Food Court Kampus</strong><br/><br/>
• 📍 Lokasi: <strong>Gedung C</strong> & Area Terbuka (dekat lapangan)<br/>
• ⏰ Buka: <strong>Senin–Sabtu, 07:00–20:00</strong><br/>
• 🏪 Tersedia <strong>20+ tenant</strong> makanan & minuman<br/>
• 💰 Harga terjangkau — mulai dari Rp 8.000<br/>
• 🌿 Dilengkapi area makan outdoor yang nyaman<br/><br/>
Menu populer: nasi padang, soto, mie ayam, bakso, minuman jus segar, dan banyak lagi! 😋`
  },
  // UKM / Organisasi
  {
    keys: ['ukm','unit kegiatan mahasiswa','organisasi','daftar ukm','bergabung','himpunan','bem','hima'],
    ans: `👥 <strong>Organisasi Mahasiswa</strong><br/><br/>
Ada 3 jenis organisasi utama:<br/><br/>
🔷 <strong>BEM/DPM</strong> — Badan Eksekutif & Legislatif Mahasiswa<br/>
🔷 <strong>Himpunan (HIMA)</strong> — per program studi/jurusan<br/>
🔷 <strong>UKM</strong> — minat & bakat (olahraga, seni, sosial, dll)<br/><br/>
<strong>Cara mendaftar UKM:</strong><br/>
1. Datang ke stan UKM saat Open Recruitment<br/>
2. Isi formulir pendaftaran<br/>
3. Ikuti seleksi (jika ada)<br/>
4. Hadiri rapat/latihan perdana<br/><br/>
📅 Open Recruitment biasanya diadakan minggu ke-2 setelah perkuliahan dimulai. Cek info di mading kampus! 📢`
  },
  // KTM
  {
    keys: ['ktm','kartu tanda mahasiswa','kartu mahasiswa','id card'],
    ans: `🪪 <strong>Kartu Tanda Mahasiswa (KTM)</strong><br/><br/>
KTM adalah identitas resmi kamu sebagai mahasiswa.<br/><br/>
<strong>Cara mengurus KTM baru:</strong><br/>
1. Datang ke <strong>Biro Administrasi Akademik (BAA)</strong><br/>
2. Bawa: foto formal 3x4, fotokopi KTP, bukti pembayaran UKT<br/>
3. Isi formulir permohonan KTM<br/>
4. Proses: <strong>3–5 hari kerja</strong><br/><br/>
📍 Lokasi BAA: <strong>Gedung Rektorat Lt. 2</strong><br/>
⏰ Jam layanan: <strong>Senin–Jumat, 08:00–15:00</strong><br/><br/>
🔧 Jika KTM hilang/rusak: lapor ke BAA dengan surat keterangan kehilangan dari polisi.`
  },
  // Beasiswa
  {
    keys: ['beasiswa','bantuan','kip','bidikmisi','ukt','biaya kuliah'],
    ans: `💰 <strong>Beasiswa & Bantuan Keuangan</strong><br/><br/>
Tersedia berbagai jenis beasiswa:<br/><br/>
🏛️ <strong>KIP Kuliah</strong> — beasiswa pemerintah untuk mahasiswa kurang mampu berprestasi<br/>
⭐ <strong>Beasiswa Prestasi</strong> — IPK ≥ 3.50, bebas biaya kuliah + uang saku<br/>
🎓 <strong>Beasiswa Internal</strong> — diberikan universitas setiap semester<br/>
💼 <strong>Beasiswa Eksternal</strong> — dari perusahaan/yayasan mitra kampus<br/><br/>
📍 Daftar di: <strong>Biro Kemahasiswaan, Gedung Rektorat Lt. 3</strong><br/>
💡 Tips: Pantau portal beasiswa di <em>beasiswa.kampus.ac.id</em> dan papan pengumuman!`
  },
  // Nilai / IPK
  {
    keys: ['nilai','ipk','ip','indeks prestasi','transkrip'],
    ans: `📊 <strong>Sistem Penilaian & IPK</strong><br/><br/>
Skala nilai yang digunakan:<br/><br/>
| Nilai | Huruf | Bobot |<br/>
|-------|-------|-------|<br/>
| 85-100 | A | 4.0 |<br/>
| 80-84 | A- | 3.7 |<br/>
| 75-79 | B+ | 3.3 |<br/>
| 70-74 | B | 3.0 |<br/>
| &lt;55 | D/E | 0-1.0 |<br/><br/>
<strong>IP Semester</strong> dihitung tiap akhir semester.<br/>
<strong>IPK</strong> adalah rata-rata keseluruhan IP dari semester 1 sampai sekarang.<br/><br/>
💡 IP minimal untuk tetap aktif kuliah: <strong>2.00</strong> — di bawah itu akan masuk monitoring akademik.`
  },
  // E-learning / Portal
  {
    keys: ['elearning','e-learning','portal','lms','sistem informasi','siakad','siak'],
    ans: `💻 <strong>Portal & E-Learning</strong><br/><br/>
Akses layanan digital kampus:<br/><br/>
🖥️ <strong>Portal Akademik:</strong> akademik.kampus.ac.id<br/>
→ Lihat nilai, KRS, transkrip, jadwal kuliah<br/><br/>
📚 <strong>E-Learning (LMS):</strong> elearning.kampus.ac.id<br/>
→ Unduh materi, kumpul tugas, ikuti kuis online<br/><br/>
📧 <strong>Email Kampus:</strong> nim@mahasiswa.kampus.ac.id<br/>
→ Gunakan untuk komunikasi resmi dengan dosen & kampus<br/><br/>
📶 <strong>WiFi Kampus:</strong> SSID <em>KampusNet</em><br/>
→ Login dengan NIM dan password awal (tanggal lahir: DDMMYYYY)<br/><br/>
⚠️ Aktifkan akun dalam 7 hari setelah registrasi!`
  },
  // Jadwal kuliah
  {
    keys: ['jadwal','jadwal kuliah','kapan kuliah','mulai kuliah'],
    ans: `📅 <strong>Jadwal Akademik Semester Ganjil 2024/2025</strong><br/><br/>
• 📋 Pengisian KRS: <strong>20–25 November 2024</strong><br/>
• 📚 Mulai perkuliahan: <strong>1 Desember 2024</strong><br/>
• 📝 Ujian Tengah Semester (UTS): <strong>3–7 Februari 2025</strong><br/>
• 📝 Ujian Akhir Semester (UAS): <strong>7–14 April 2025</strong><br/>
• 🏖️ Libur Semester: <strong>22 April – 1 Juni 2025</strong><br/><br/>
Jadwal kuliah harian sesuai dengan KRS yang kamu ambil — cek di portal akademik setelah KRS dikunci. 📆`
  },
  // Dosen PA
  {
    keys: ['dosen pa','pembimbing akademik','konsultasi dosen','pa'],
    ans: `👨‍🏫 <strong>Dosen Pembimbing Akademik (PA)</strong><br/><br/>
Dosen PA adalah pembimbing akademik pribadimu selama kuliah.<br/><br/>
<strong>Fungsi Dosen PA:</strong><br/>
• Membantu perencanaan studi & pemilihan mata kuliah<br/>
• Tanda tangan / approve KRS setiap semester<br/>
• Konsultasi masalah akademik & non-akademik<br/>
• Memberikan saran untuk peningkatan prestasi<br/><br/>
<strong>Cara menemui Dosen PA:</strong><br/>
1. Cek nama PA di portal akademik<br/>
2. Hubungi via email atau WA untuk buat janji<br/>
3. Datang ke ruang dosen sesuai jadwal konsultasi<br/><br/>
📍 Pertemuan perdana PA: <strong>25 November 2024</strong>`
  },
  // Fasilitas Kesehatan
  {
    keys: ['klinik','kesehatan','sakit','dokter','obat','kesehatan mahasiswa'],
    ans: `🏥 <strong>Klinik Kesehatan Mahasiswa</strong><br/><br/>
Tersedia layanan kesehatan <strong>GRATIS</strong> untuk mahasiswa aktif!<br/><br/>
• 📍 Lokasi: <strong>Gedung Rektorat, Lantai 1</strong><br/>
• ⏰ Jam buka: <strong>Senin–Jumat, 08:00–16:00</strong><br/>
• 👨‍⚕️ Layanan: konsultasi dokter, obat-obatan dasar, rujukan RS<br/><br/>
<strong>Cara menggunakan klinik:</strong><br/>
1. Bawa KTM aktif<br/>
2. Ambil nomor antrian di loket<br/>
3. Tunggu panggilan dokter<br/><br/>
🚨 Kondisi darurat: hubungi <strong>0800-XXX-XXXX</strong> (hotline kampus 24 jam)`
  },
  // Transportasi
  {
    keys: ['transportasi','shuttle','bus kampus','angkot','parkir'],
    ans: `🚌 <strong>Transportasi Kampus</strong><br/><br/>
Pilihan transportasi menuju dan di dalam kampus:<br/><br/>
🚌 <strong>Shuttle Bus Kampus:</strong><br/>
→ Rute: Stasiun Kota ↔ Kampus, setiap 30 menit<br/>
→ Jam: 06:00 – 22:00 (Senin–Sabtu)<br/>
→ Tarif: <strong>GRATIS</strong> dengan KTM aktif<br/><br/>
🛵 <strong>Parkir Motor:</strong> Area P1–P4, dekat tiap gedung utama<br/>
🚗 <strong>Parkir Mobil:</strong> Gedung Parkir 5 lantai, kapasitas 500 unit<br/>
🚲 <strong>Sepeda Kampus:</strong> Tersedia rental sepeda di 5 titik kampus<br/><br/>
💡 Kamu bisa daftar stiker parkir di Satpam Pos Utama dengan KTM.`
  },
  // Wisuda
  {
    keys: ['wisuda','lulus','sidang','skripsi','tugas akhir'],
    ans: `🎓 <strong>Info Wisuda & Kelulusan</strong><br/><br/>
Proses menuju kelulusan S1:<br/><br/>
1. 📚 Selesaikan semua mata kuliah (144–160 SKS)<br/>
2. ✅ Lulus ujian komprehensif / kualifikasi<br/>
3. 📝 Selesaikan Skripsi / Tugas Akhir<br/>
4. 🎤 Sidang Tugas Akhir di depan penguji<br/>
5. 📋 Lengkapi berkas administrasi wisuda<br/>
6. 🏛️ Upacara Wisuda<br/><br/>
⏰ <strong>Wisuda diadakan 2 kali setahun</strong> (Maret & September)<br/><br/>
Tenang, masih panjang perjalananmu! Fokus dulu di semester awal dan raih nilai terbaik 💪`
  },
  // Greeting
  {
    keys: ['halo','hai','hello','hi','selamat pagi','selamat siang','selamat malam','apa kabar'],
    ans: `Halo! 👋 Aku Buddy, asisten AI untuk mahasiswa baru.<br/><br/>
Aku siap bantu kamu dengan informasi seputar:<br/>
🎓 Akademik (SKS, KRS, nilai)<br/>
📅 Jadwal & kegiatan kampus<br/>
🏛️ Fasilitas & lokasi kampus<br/>
👥 Organisasi mahasiswa<br/>
📋 Administrasi & dokumen<br/><br/>
Ada yang bisa aku bantu? Ketik pertanyaanmu! 😊`
  },
  // Terima kasih
  {
    keys: ['terima kasih','makasih','thanks','thank you'],
    ans: `Sama-sama! 😊 Senang bisa membantu kamu.<br/><br/>
Jangan ragu untuk bertanya lagi kapanpun kamu butuh info seputar kampus. Semangat menjalani semester pertamamu! 🎓💪`
  },
  // Default tidak dikenal
];

function getBuddyResponse(input) {
  const lower = input.toLowerCase();

  for (const item of KB) {
    if (item.keys.some(k => lower.includes(k))) {
      return item.ans;
    }
  }

  // Fallback
  return `Hmm, aku belum punya jawaban pasti untuk "<em>${escapeHtml(input)}</em>" 🤔<br/><br/>
Coba tanyakan hal-hal ini:<br/>
• Informasi SKS atau KRS<br/>
• Jadwal PKKMB atau kalender akademik<br/>
• Lokasi fasilitas kampus (perpustakaan, kantin, dll)<br/>
• Cara daftar UKM atau organisasi<br/>
• Informasi beasiswa<br/>
• Cara mengurus KTM<br/><br/>
Atau kunjungi langsung <strong>Biro Informasi Mahasiswa</strong> di Gedung Rektorat Lt. 1 untuk bantuan lebih lanjut! 😊`;
}


// ═══════════════════════════════════════════════════════════
// ACCORDION
// ═══════════════════════════════════════════════════════════
function toggleAccordion(btn) {
  const body = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // Close all
  document.querySelectorAll('.accordion-btn.open').forEach(b => {
    b.classList.remove('open');
    b.nextElementSibling.classList.remove('show');
  });

  if (!isOpen) {
    btn.classList.add('open');
    body.classList.add('show');
  }
}


// ═══════════════════════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════════════════════
function switchTab(btn, tabId) {
  // Remove active from siblings
  btn.closest('.tab-bar').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Find tab contents (siblings of .tab-bar)
  const parent = btn.closest('.page');
  parent.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
}


// ═══════════════════════════════════════════════════════════
// ORGANISATION FILTER
// ═══════════════════════════════════════════════════════════
function filterOrg() {
  const query = document.getElementById('orgSearch').value.toLowerCase();
  document.querySelectorAll('.org-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.classList.toggle('hidden', !text.includes(query));
  });
}

function filterOrgCat(btn, cat) {
  btn.closest('.org-filter-tabs').querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.org-card').forEach(card => {
    if (cat === 'semua') {
      card.classList.remove('hidden');
    } else {
      card.classList.toggle('hidden', card.dataset.cat !== cat);
    }
  });

  // Also clear search
  document.getElementById('orgSearch').value = '';
}


// ═══════════════════════════════════════════════════════════
// ONBOARDING CHECKLIST PROGRESS
// ═══════════════════════════════════════════════════════════
const checkboxIds = ['ck4', 'ck5', 'ck6', 'ck7'];
const TOTAL_TASKS = 7;
const DONE_INITIAL = 3;

function updateProgress() {
  const checked = checkboxIds.filter(id => document.getElementById(id)?.checked).length;
  const total = DONE_INITIAL + checked;
  const pct = Math.round((total / TOTAL_TASKS) * 100);
  document.getElementById('onboardingBar').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${total} dari ${TOTAL_TASKS} tugas selesai`;
}

checkboxIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', updateProgress);
});


// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('dashboard');
  updateProgress();
});
