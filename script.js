// CONFIG DATABASE - URL WEB APP TERBARU
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyCk61qRinMV13RGNA1nSJR8sjiMyEU6Kd7aId1k4wKqJ2oC8Nf6bF2OFBuZtrPe5yF/exec";

// GLOBAL STATE
let currentQuestion = 0;
let userAnswers = [];
let userInfo = { name: "", phone: "" };
let finalWinner = "";

// DATABASE PERTANYAAN (25 SOAL ORIGINAL BUKU TAJIR MELINTIR)
const questions = [
    { q: "Pilih satu dari kata berikut ini yang mencerminkan diri Anda dibanding yang lain!", a: "Kreatif", b: "Penuh cinta", c: "Berhati-hati", d: "Detail", map: ["Creator", "Supporter", "Accumulator", "Lord"] },
    { q: "Bagaimana Anda ingin dilihat oleh orang lain?", a: "Bersahabat", b: "Dapat diandalkan", c: "Bisa memutuskan", d: "Dinamis", map: ["Supporter", "Accumulator", "Lord", "Star"] },
    { q: "Apa yang bisa membuat Anda merasa nyaman?", a: "Memegang kendali", b: "Kreatif", c: "Dikagumi", d: "Punya prinsip", map: ["Lord", "Creator", "Star", "Accumulator"] },
    { q: "Ketika memulai sebuah proyek, hal manakah yang paling Anda nikmati?", a: "Perencanaan strategis", b: "Membangun jaringan", c: "Perencanaan tim", d: "Perencanaan sistem", map: ["Lord", "Dealmaker", "Supporter", "Mechanic"] },
    { q: "Bagaimana orang lain mendeskripsikan Anda dalam sebuah pesta?", a: "Berlebihan", b: "Bersosialisasi", c: "Berjarak", d: "Percaya diri", map: ["Star", "Dealmaker", "Lord", "Creator"] },
    { q: "Ketika menyelesaikan masalah di bawah tekanan, mana hal yang paling Anda andalkan?", a: "Kerja keras", b: "Bakat", c: "Kenalan", d: "Efisiensi", map: ["Accumulator", "Star", "Dealmaker", "Mechanic"] },
    { q: "Manakah salah satu dari kata-kata berikut yang mendeskripsikan Anda lebih dari yang lain?", a: "Introvert", b: "Tidak fokus", c: "Tidak bisa membuat keputusan", d: "Tidak sabar", map: ["Lord", "Star", "Accumulator", "Creator"] },
    { q: "Bagaimana Anda memilih untuk membuat keputusan penting?", a: "Meminta nasihat dari teman", b: "Melihat bagaimana orang lain memutuskan", c: "Menimbang semua sudut dengan hati-hati", d: "Berjalan dengan insting", map: ["Supporter", "Accumulator", "Lord", "Creator"] },
    { q: "Bagaimana Anda tidak ingin orang lain melihat Anda?", a: "Lemah", b: "Membosankan", c: "Kesepian", d: "Tidak dapat diandalkan", map: ["Lord", "Star", "Dealmaker", "Accumulator"] },
    { q: "Proyek apa yang Anda benar-benar nikmati?", a: "Trading business", b: "Operational multi-chain", c: "Fast-growth start-up", d: "People-based business", map: ["Trader", "Mechanic", "Creator", "Supporter"] },
    { q: "Ketika memulai sebuah proyek, hal apakah yang paling Anda tidak nikmati?", a: "Perencanaan strategis", b: "Membangun jaringan", c: "Perencanaan tim", d: "Perencanaan sistem", map: ["Star", "Mechanic", "Creator", "Dealmaker"] },
    { q: "Dalam sebuah tim, hal apa yang paling sering menjadi bagian Anda?", a: "Penganalisis", b: "Input kreatif", c: "Pembangun jaringan", d: "Pekerja yang bisa diandalkan", map: ["Lord", "Creator", "Dealmaker", "Accumulator"] },
    { q: "Apa hal yang biasanya paling buruk Anda lakukan?", a: "Membangun hubungan", b: "Negosiasi harga", c: "Menciptakan ide baru", d: "Menyelesaikan proyek berjalan", map: ["Lord", "Accumulator", "Mechanic", "Creator"] },
    { q: "Apakah bakat terbesar Anda (menurut Anda)?", a: "Menemukan cara mengembangkan sesuatu", b: "Menemukan orang yang tepat", c: "Memperoleh harga yang tepat", d: "Mengikuti proses yang tepat", map: ["Creator", "Dealmaker", "Trader", "Mechanic"] },
    { q: "Apakah biasanya penyebab umum stres pada Anda tentang bekerja tim?", a: "Kurangnya harmoni", b: "Kurangnya struktur", c: "Kurangnya kemajuan", d: "Kurangnya semangat", map: ["Supporter", "Mechanic", "Lord", "Star"] },
    { q: "Apa yang dapat paling membuat Anda tidak merasa nyaman?", a: "Tamu yang tidak diundang", b: "Hal yang reguler dan terstruktur", c: "Orang yang tidak fleksibel", d: "Kebingungan dan ketidakteraturan", map: ["Accumulator", "Creator", "Star", "Mechanic"] },
    { q: "Apa hal yang paling baik Anda bisa lakukan (menurut Anda)?", a: "Berpromosi", b: "Negosiasi", c: "Menyelesaikan", d: "Menciptakan", map: ["Star", "Dealmaker", "Mechanic", "Creator"] },
    { q: "Apakah hal yang menurut Anda, paling lemah dari diri Anda?", a: "Menciptakan sistem untuk meningkatkan kualitas", b: "Menganalisis tren dan menemukan peluang", c: "Berkreasi dan menciptakan ide baru", d: "Berjalan dengan dan berhubungan dengan orang-orang", map: ["Dealmaker", "Accumulator", "Mechanic", "Lord"] },
    { q: "Apa yang bisa memberikan sensasi bagi Anda, untuk sebuah pencapaian yang besar?", a: "Melihat ciptaan Anda berhasil jalan", b: "Bertemu dengan kontak baru yang luar biasa", c: "Menemukan penawaran yang fantastis", d: "Melihat sistem Anda berjalan secara otomatis", map: ["Creator", "Dealmaker", "Trader", "Mechanic"] },
    { q: "Apa yang paling mengganggu Anda tentang orang lain?", a: "Pelanggar peraturan", b: "Kurangnya inisiatif", c: "Tidak bersahabat", d: "Tidak perhatian pada orang lain", map: ["Mechanic", "Creator", "Supporter", "Dealmaker"] },
    { q: "Di tempat kerja, bagaimana orang lain biasanya mendeskripsikan Anda?", a: "Dapat diandalkan", b: "Terstruktur", c: "Inovatif", d: "Mudah bergaul", map: ["Accumulator", "Mechanic", "Creator", "Dealmaker"] },
    { q: "Di tempat kerja, bagaimana orang lain biasanya TIDAK mendeskripsikan Anda?", a: "Dapat diandalkan", b: "Terstruktur", c: "Inovatif", d: "Mudah bergaul", map: ["Creator", "Dealmaker", "Lord", "Accumulator"] },
    { q: "Apa sisi terkuat diri Anda?", a: "Menciptakan sistem untuk meningkatkan kualitas", b: "Menganalisis tren dan menemukan peluang", c: "Berkreasi dan menciptakan ide baru", d: "Berjalan dengan dan berhubungan dengan orang-orang", map: ["Mechanic", "Trader", "Creator", "Dealmaker"] },
    { q: "Di bawah tekanan, apa yang paling Anda andalkan untuk bisa belajar?", a: "Kerja keras", b: "Bakat", c: "Kenalan", d: "Efisiensi", map: ["Accumulator", "Creator", "Dealmaker", "Lord"] },
    { q: "Ketika menyelesaikan sebuah proyek, apa yang paling Anda nikmati?", a: "Merayakan keberhasilan", b: "Memberi selamat pada tim", c: "Menyelesaikan laporan", d: "Memulai proyek berikutnya", map: ["Star", "Supporter", "Lord", "Creator"] }
];

const shioDatabase = {
    "Creator": { 
        slogan: "Inovasi Strategis Melalui Visi Disrupsi Masa Depan", 
        desc: "Anda memiliki profil 'disruptor' yang mampu melihat celah pasar sebelum orang lain menyadarinya. Kekuatan Anda bukan pada manajemen, melainkan pada penciptaan nilai (Value Creation). Kelemahan utama Anda adalah 'Shiny Object Syndrome'—terlalu cepat berpindah ide sebelum ide sebelumnya matang. Strategi sukses Anda adalah fokus pada R&D dan desain produk, namun Anda wajib memiliki operasional yang ketat di bawah kendali seorang Mechanic.",
        kekuatan: "High-level vision, inovasi radikal, kemampuan memecahkan masalah kompleks.",
        kelemahan: "Buruk dalam rutinitas, mudah bosan, seringkali mengabaikan profitabilitas jangka pendek.",
        gayaKerja: "Visioner-Strategis. Membutuhkan ruang kreatif tanpa gangguan administratif.",
        action: "Segera bangun sistem delegasi total untuk urusan teknis dan admin. Fokuslah menjadi 'Arsitek' bisnis, bukan 'Kuli' bisnis.",
        pasangan: "Mechanic (untuk standarisasi) & Supporter (untuk manajemen manusia)."
    },
    "Star": { 
        slogan: "Akselerasi Bisnis Melalui Otoritas dan Personal Branding", 
        desc: "Kekuatan ekonomi Anda terletak pada persona dan kepercayaan publik. Anda sukses dengan cara 'menjadi wajah' dari bisnis Anda. Kelemahan terbesar Anda adalah ketergantungan pada ego dan kelelahan jika harus mengurus detail teknis sendirian. Strategi Anda adalah membangun ekosistem di mana orang lain mengelola produk, sementara Anda fokus menjadi magnet peluang dan pembuka pintu-pintu kerja sama besar.",
        kekuatan: "Otoritas publik, karisma persuasif, kemampuan negosiasi panggung.",
        kelemahan: "Kurang fokus pada detail internal, sangat terpengaruh oleh opini publik.",
        gayaKerja: "Promotor-Magnetis. Unggul dalam membangun jaringan dan memengaruhi opini pasar.",
        action: "Berhenti mencoba menjadi ahli teknis. Fokuslah pada PR, Marketing, dan menjaga kualitas branding Anda di mata publik.",
        pasangan: "Lord (pengontrol arus kas) & Accumulator (penjaga keamanan aset)."
    },
    "Supporter": { 
        slogan: "Leadership Performa Tinggi Melalui Harmoni Ekosistem", 
        desc: "Anda adalah tipe pemimpin yang mampu menyatukan berbagai talenta menjadi mesin yang solid. Kekuatan Anda bukan pada produk, tapi pada 'budaya'. Kelemahan Anda adalah kecenderungan untuk terlalu kompromis demi menghindari konflik, yang terkadang menghambat ketegasan bisnis. Kesuksesan Anda datang dari pemilihan tim yang tepat dan menjaga moral organisasi agar tetap di level tertinggi.",
        kekuatan: "Manajemen konflik, motivasi tim, loyalitas tinggi, komunikasi empatik.",
        kelemahan: "Sulit melakukan 'firing' (pemecatan), sering terjebak dalam masalah emosional tim.",
        gayaKerja: "Leader-Collaborative. Bekerja terbaik sebagai jembatan komunikasi dalam organisasi besar.",
        action: "Gunakan data objektif untuk mengambil keputusan sulit agar perasaan tidak mengaburkan logika bisnis Anda.",
        pasangan: "Star (untuk mendatangkan peluang) & Lord (untuk analisis data objektif)."
    },
    "Dealmaker": { 
        slogan: "Multiplikasi Profit Melalui Momentum Jaringan Strategis", 
        desc: "Anda sukses melalui transaksi, bukan produksi. Kemampuan Anda membaca 'timing' dan menghubungkan pihak A ke pihak B adalah tambang emas Anda. Kelemahan Anda adalah sering mengabaikan detail kontrak hukum dan analisis risiko mendalam. Strategi Anda adalah menjadi 'Connector' yang lincah; Anda tidak perlu memiliki pabrik, Anda hanya perlu memiliki akses ke pemilik pabrik dan pembelinya.",
        kekuatan: "Networking taktis, pembaca momentum, kemampuan 'closing' yang tinggi.",
        kelemahan: "Terlalu optimis, sering meremehkan detail teknis dan risiko legalitas.",
        gayaKerja: "Connector-Dynamic. Aktif di lapangan dan membangun hubungan jangka panjang.",
        action: "Libatkan seorang Lord atau pengacara bisnis untuk setiap kesepakatan besar guna melindungi posisi hukum Anda.",
        pasangan: "Lord (untuk audit risiko) & Mechanic (untuk eksekusi operasional)."
    },
    "Trader": { 
        slogan: "Optimalisasi Cashflow Melalui Ketajaman Eksekusi Pasar", 
        desc: "Anda memiliki mata yang sangat tajam terhadap harga dan margin profit. Kesuksesan Anda datang dari volume dan kecepatan transaksi (turnover). Kelemahan Anda adalah terjebak dalam rutinitas 'beli-jual' harian sehingga lupa membangun aset jangka panjang. Anda harus belajar untuk mulai mengonversi profit harian menjadi aset tetap agar kekayaan Anda tidak habis hanya untuk operasional.",
        kekuatan: "Ketajaman margin, pembaca tren harga, disiplis eksekusi, taktis.",
        kelemahan: "Fokus jangka pendek, sering kehilangan 'Big Picture' karena terlalu sibuk bertransaksi.",
        gayaKerja: "Speculator-Realist. Fokus pada data lapangan dan angka riil saat ini.",
        action: "Mulai sisihkan 30% profit harian untuk investasi jangka panjang (Accumulator mode) agar keuangan Anda stabil.",
        pasangan: "Accumulator (penjaga profit) & Supporter (manajer operasional harian)."
    },
    "Accumulator": { 
        slogan: "Keamanan Finansial Melalui Konsistensi Pertumbuhan Aset", 
        desc: "Anda adalah penjaga gawang kekayaan. Strategi sukses Anda adalah 'Slow and Steady'. Kekuatan Anda adalah kedisiplinan dan kesabaran dalam riset data. Kelemahan utama Anda adalah 'Analysis Paralysis'—terlalu lama berpikir hingga peluang emas lewat begitu saja. Anda butuh partner yang agresif untuk mendorong Anda mengambil keputusan saat data sudah cukup terkumpul.",
        kekuatan: "Disiplin tinggi, manajemen risiko ekstrem, riset mendalam, integritas data.",
        kelemahan: "Terlalu konservatif, takut risiko, lambat merespons perubahan pasar cepat.",
        gayaKerja: "Safe-Analyst. Membutuhkan data lengkap sebelum melakukan pergerakan besar.",
        action: "Tetapkan batas waktu riset. Begitu data mencapai 70%, paksa diri Anda untuk mengambil keputusan agar tidak kehilangan momentum.",
        pasangan: "Star (untuk menaikkan nilai aset) & Dealmaker (akses peluang eksklusif)."
    },
    "Lord": { 
        slogan: "Kedaulatan Ekonomi Melalui Sistem Kontrol dan Arus Kas", 
        desc: "Anda adalah penguasa infrastruktur. Anda sukses dengan cara memiliki sistem yang menghasilkan uang tanpa kehadiran fisik Anda (Passive Income). Kekuatan Anda adalah kontrol dan efisiensi. Kelemahan Anda adalah kurangnya fleksibilitas dan cenderung dingin terhadap sumber daya manusia. Strategi Anda adalah membeli atau membangun sistem, lalu menaruh orang-orang Supporter untuk mengelolanya.",
        kekuatan: "Kontrol internal, efisiensi biaya, ahli angka, pengawasan sistematis.",
        kelemahan: "Kurang empati, kaku terhadap perubahan, sulit diajak berkolaborasi secara cair.",
        gayaKerja: "Auditor-Controller. Bekerja di balik layar dengan fokus pada laporan dan data.",
        action: "Gunakan teknologi automasi untuk memperketat pengawasan arus kas tanpa harus menambah beban SDM.",
        pasangan: "Creator (sumber inovasi ide) & Supporter (jembatan komunikasi manusia)."
    },
    "Mechanic": { 
        slogan: "Skalabilitas Masif Melalui Standarisasi dan Duplikasi", 
        desc: "Anda adalah arsitek sistem operasional (SOP). Kekuatan Anda adalah menyempurnakan hal yang sudah ada menjadi mesin yang efisien dan bisa diduplikasi (Franchise-able). Kelemahan Anda adalah 'Perfectionist Syndrome'—ingin semua sempurna sebelum diluncurkan. Strategi sukses Anda adalah mengambil ide dari Creator atau Dealmaker, lalu membangun 'pabriknya' agar bisa jalan otomatis.",
        kekuatan: "Standarisasi proses, efisiensi sistem, logika SOP yang kuat, ketelitian tinggi.",
        kelemahan: "Lambat memulai hal baru, sering terjebak dalam perbaikan detail yang tidak esensial.",
        gayaKerja: "System Builder. Bekerja dengan alur kerja, instruksi kerja, dan otomasi.",
        action: "Sempurnakan sistem Anda, lalu jual atau duplikasi sistem tersebut ke banyak cabang (Scalability).",
        pasangan: "Creator (sumber bahan baku ide) & Dealmaker (untuk membawa 'deal' baru)."
    }
};

// --- CORE LOGIC ---

function startQuiz() {
    const nameEl = document.getElementById('user-name');
    const phoneEl = document.getElementById('user-phone');
    
    if (!nameEl || !phoneEl) {
        console.error("Elemen input tidak ditemukan di HTML!");
        return;
    }

    const nameValue = nameEl.value.trim();
    const phoneValue = phoneEl.value.trim();
    
    if (nameValue === "" || phoneValue === "") {
        alert("Mohon isi Nama Lengkap dan Nomor WhatsApp untuk melanjutkan.");
        return;
    }
    
    userInfo.name = nameValue;
    userInfo.phone = phoneValue;
    
    const regSection = document.getElementById('register-section');
    const quizSection = document.getElementById('quiz-section');
    
    if (regSection && quizSection) {
        regSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        
        currentQuestion = 0;
        userAnswers = [];
        showQuestion();
    } else {
        alert("Terjadi kesalahan sistem: Section tampilan tidak ditemukan.");
    }
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-text').innerText = `"${q.q}"`;
    document.getElementById('progress-text').innerText = `SOAL ${currentQuestion + 1} / 25`;
    document.getElementById('progress-bar').style.width = `${((currentQuestion + 1) / 25) * 100}%`;
    const container = document.getElementById('options-container');
    container.innerHTML = "";
    q.map.forEach((m, i) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-4 border rounded-xl hover:bg-blue-50 transition text-sm";
        btn.innerText = [q.a, q.b, q.c, q.d][i];
        btn.onclick = () => selectOption(m);
        container.appendChild(btn);
    });
}

function selectOption(m) {
    userAnswers.push(m);
    if(currentQuestion < 24) { currentQuestion++; showQuestion(); }
    else { calculateAndSync(); }
}

async function calculateAndSync() {
    const counts = {}; userAnswers.forEach(x => counts[x] = (counts[x] || 0) + 1);
    finalWinner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    document.getElementById('quiz-section').innerHTML = "<p class='text-center animate-pulse font-bold text-blue-900'>Sedang Menganalisis Profil Bisnis Anda...</p>";
    
    try {
        await fetch(`${SCRIPT_URL}?name=${encodeURIComponent(userInfo.name)}&phone=${encodeURIComponent(userInfo.phone)}&result=${finalWinner}`);
        document.getElementById('quiz-section').classList.add('hidden');
        document.getElementById('user-display-name').innerText = userInfo.name;
        document.getElementById('paywall-section').classList.remove('hidden');
    } catch (e) {
        document.getElementById('quiz-section').classList.add('hidden');
        document.getElementById('paywall-section').classList.remove('hidden');
    }
}

function activateWithKey() {
    if(!document.getElementById('license-key').value) return alert("Mohon masukkan kode aktivasi!");
    document.getElementById('paywall-section').classList.add('hidden');
    document.getElementById('final-result-section').classList.remove('hidden');
}

// LOGIKA DOWNLOAD PDF OTOMATIS (MODE DIRECT DOWNLOAD)
function downloadPDF() {
    // 1. Jalankan pengisian data ke elemen sertifikat tersembunyi
    const d = shioDatabase[finalWinner];
    document.getElementById('cert-user-name').innerText = userInfo.name;
    document.getElementById('shio-title').innerText = finalWinner.toUpperCase();
    document.getElementById('shio-slogan').innerText = `"${d.slogan}"`;
    document.getElementById('shio-long-desc').innerHTML = `<p>${d.desc}</p><p style="margin-top:10px"><strong>ACTION:</strong> ${d.action}</p>`;
    document.getElementById('shio-details').innerHTML = `
        <li style="margin-bottom:8px"><strong>KEKUATAN:</strong> ${d.kekuatan}</li>
        <li style="margin-bottom:8px"><strong>KELEMAHAN:</strong> ${d.kelemahan}</li>
        <li style="margin-bottom:8px"><strong>GAYA KERJA:</strong> ${d.gayaKerja}</li>
        <li style="margin-bottom:8px"><strong>PARTNER IDEAL:</strong> ${d.pasangan}</li>
    `;
    document.getElementById('cert-date').innerText = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('cert-id').innerText = `ARY-SHI-${Math.floor(100000 + Math.random() * 900000)}`;

    // 2. TARGET ELEMEN SPESIFIK & KONFIGURASI PRESISI
    // Pastikan kita hanya mengambil elemen 'certificate-area', bukan pembungkus luarnya
    const element = document.getElementById('certificate-area');
    const filename = `Sertifikat_Shio_${userInfo.name.replace(/\s+/g, '_')}.pdf`;
    
    const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 1 }, // Kualitas maksimal
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            logging: false,
            letterRendering: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 1122, // Paksa lebar internal (297mm dalam pixel 96dpi)
            windowHeight: 794  // Paksa tinggi internal (210mm dalam pixel 96dpi)
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    // 3. Jalankan Download menggunakan library html2pdf
    html2pdf().set(opt).from(element).save();
}
