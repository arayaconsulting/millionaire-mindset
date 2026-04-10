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
        [span_5](start_span)desc: "Anda memiliki profil 'disruptor' yang mampu melihat celah pasar sebelum orang lain menyadarinya. Kekuatan Anda bukan pada manajemen, melainkan pada penciptaan nilai (Value Creation)[span_5](end_span). [span_6](start_span)Kelemahan utama Anda adalah terlalu cepat berpindah ide sebelum ide sebelumnya matang[span_6](end_span). [span_7](start_span)Strategi sukses Anda adalah fokus pada riset dan desain produk[span_7](end_span).",
        [span_8](start_span)kekuatan: "Visi tingkat tinggi, inovasi radikal, pemecah masalah kompleks[span_8](end_span).",
        [span_9](start_span)kelemahan: "Buruk dalam rutinitas, mudah bosan, mengabaikan profit jangka pendek[span_9](end_span).",
        gayaKerja: "Visioner-Strategis. Membutuhkan ruang kreatif tanpa gangguan administratif.",
        action: "Bangun sistem delegasi total untuk urusan teknis dan admin. [span_10](start_span)Fokus menjadi 'Arsitek' bisnis, bukan 'Kuli' bisnis[span_10](end_span).",
        [span_11](start_span)pasangan: "Mechanic (standarisasi) & Supporter (manajemen manusia)[span_11](end_span)."
    },
    "Star": { 
        slogan: "Akselerasi Bisnis Melalui Otoritas dan Personal Branding", 
        desc: "Kekuatan ekonomi Anda terletak pada persona dan kepercayaan publik. Anda sukses dengan cara 'menjadi wajah' dari bisnis Anda. Kelemahan terbesar adalah ketergantungan pada ego dan kelelahan jika mengurus detail teknis sendirian.",
        kekuatan: "Otoritas publik, karisma persuasif, negosiasi panggung.",
        kelemahan: "Kurang fokus pada detail internal, terpengaruh opini publik.",
        gayaKerja: "Promotor-Magnetis. Unggul dalam membangun jaringan dan memengaruhi opini pasar.",
        action: "Berhenti mencoba menjadi ahli teknis. Fokus pada Public Relations, Marketing, dan menjaga kualitas personal branding Anda.",
        pasangan: "Lord (pengontrol arus kas) & Accumulator (penjaga aset)."
    },
    "Supporter": { 
        slogan: "Leadership Performa Tinggi Melalui Harmoni Ekosistem", 
        [span_12](start_span)desc: "Anda adalah tipe pemimpin yang mampu menyatukan berbagai talenta menjadi mesin yang solid[span_12](end_span). [span_13](start_span)Kekuatan Anda bukan pada produk, tapi pada 'budaya'[span_13](end_span). [span_14](start_span)Kelemahan Anda adalah kecenderungan untuk terlalu kompromis demi menghindari konflik[span_14](end_span).",
        [span_15](start_span)kekuatan: "Manajemen konflik, motivasi tim, loyalitas tinggi, komunikasi empatik[span_15](end_span).",
        [span_16](start_span)kelemahan: "Sulit melakukan pemecatan (firing), sering terjebak dalam masalah emosional tim[span_16](end_span).",
        gayaKerja: "Leader-Collaborative. [span_17](start_span)Bekerja terbaik sebagai jembatan komunikasi[span_17](end_span).",
        [span_18](start_span)action: "Gunakan data objektif untuk mengambil keputusan sulit agar perasaan tidak mengaburkan logika bisnis Anda[span_18](end_span).",
        [span_19](start_span)pasangan: "Star (pembuka peluang) & Lord (analisis data objektif)[span_19](end_span)."
    },
    "Dealmaker": { 
        slogan: "Multiplikasi Profit Melalui Momentum Jaringan Strategis", 
        [span_20](start_span)desc: "Anda sukses melalui transaksi, bukan produksi[span_20](end_span). [span_21](start_span)Kemampuan Anda membaca momentum dan menghubungkan antar pihak adalah tambang emas Anda[span_21](end_span). [span_22](start_span)Kelemahan Anda adalah sering mengabaikan detail kontrak hukum[span_22](end_span).",
        [span_23](start_span)kekuatan: "Networking taktis, pembaca momentum, kemampuan 'closing' yang tinggi[span_23](end_span).",
        [span_24](start_span)kelemahan: "Terlalu optimis, meremehkan detail teknis dan risiko legalitas[span_24](end_span).",
        gayaKerja: "Connector-Dynamic. [span_25](start_span)Aktif di lapangan dan membangun hubungan jangka panjang[span_25](end_span).",
        [span_26](start_span)action: "Libatkan seorang pengacara bisnis untuk setiap kesepakatan besar guna melindungi posisi hukum Anda[span_26](end_span).",
        [span_27](start_span)pasangan: "Lord (audit risiko) & Mechanic (eksekusi operasional)[span_27](end_span)."
    },
    "Trader": { 
        slogan: "Optimalisasi Cashflow Melalui Ketajaman Eksekusi Pasar", 
        desc: "Anda memiliki mata yang sangat tajam terhadap harga dan margin profit. Kesuksesan Anda datang dari volume dan kecepatan transaksi. Kelemahan Anda adalah terjebak dalam rutinitas beli-jual sehingga lupa membangun aset tetap jangka panjang.",
        kekuatan: "Ketajaman margin, pembaca tren harga, disiplin eksekusi.",
        kelemahan: "Fokus jangka pendek, sering kehilangan gambaran besar (Big Picture).",
        gayaKerja: "Speculator-Realist. Fokus pada data lapangan dan angka riil saat ini.",
        action: "Mulai sisihkan 30% profit harian untuk investasi aset tetap agar keuangan Anda stabil jangka panjang.",
        pasangan: "Accumulator (penjaga profit) & Supporter (manajer operasional)."
    },
    "Accumulator": { 
        slogan: "Keamanan Finansial Melalui Konsistensi Pertumbuhan Aset", 
        desc: "Anda adalah penjaga gawang kekayaan. Strategi sukses Anda adalah konsistensi dan pertumbuhan bertahap. Kekuatan Anda adalah kedisiplinan dan riset data. Kelemahan utama adalah terlalu lama berpikir hingga peluang emas terlewat.",
        kekuatan: "Disiplin tinggi, manajemen risiko, riset mendalam, integritas data.",
        kelemahan: "Terlalu konservatif, takut risiko, lambat merespons perubahan pasar.",
        gayaKerja: "Safe-Analyst. Membutuhkan data lengkap sebelum melakukan pergerakan besar.",
        action: "Tetapkan batas waktu riset. Begitu data mencapai 70%, paksa diri Anda untuk mengambil keputusan.",
        pasangan: "Star (menaikkan nilai aset) & Dealmaker (akses peluang eksklusif)."
    },
    "Lord": { 
        slogan: "Kedaulatan Ekonomi Melalui Sistem Kontrol dan Arus Kas", 
        desc: "Anda adalah penguasa infrastruktur. Anda sukses dengan cara memiliki sistem yang menghasilkan uang tanpa kehadiran fisik Anda. Kekuatan Anda adalah kontrol dan efisiensi. Kelemahan Anda adalah kurangnya fleksibilitas terhadap manusia.",
        kekuatan: "Kontrol internal, efisiensi biaya, ahli angka, pengawasan sistematis.",
        kelemahan: "Kurang empati, kaku terhadap perubahan, sulit berkolaborasi secara cair.",
        gayaKerja: "Auditor-Controller. Bekerja di balik layar dengan fokus pada laporan dan data.",
        action: "Gunakan teknologi automasi untuk memperketat pengawasan arus kas tanpa menambah beban SDM.",
        pasangan: "Creator (inovasi ide) & Supporter (jembatan komunikasi manusia)."
    },
    "Mechanic": { 
        slogan: "Skalabilitas Masif Melalui Standarisasi dan Duplikasi", 
        desc: "Anda adalah arsitek sistem operasional (SOP). Kekuatan Anda adalah menyempurnakan hal yang sudah ada menjadi mesin yang efisien. Kelemahan Anda adalah ingin semua sempurna sebelum diluncurkan.",
        kekuatan: "Standarisasi proses, efisiensi sistem, logika SOP yang kuat.",
        kelemahan: "Lambat memulai hal baru, terjebak dalam perbaikan detail yang tidak esensial.",
        gayaKerja: "System Builder. Bekerja dengan alur kerja, instruksi kerja, dan otomasi.",
        action: "Sempurnakan sistem Anda, lalu lakukan duplikasi sistem tersebut ke banyak cabang.",
        pasangan: "Creator (bahan baku ide) & Dealmaker (untuk membawa kesepakatan baru)."
    }
};

// --- CORE LOGIC ---

function startQuiz() {
    const nameEl = document.getElementById('user-name');
    const phoneEl = document.getElementById('user-phone');
    if (!nameEl || !phoneEl) return;
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
    const counts = {}; 
    userAnswers.forEach(x => counts[x] = (counts[x] || 0) + 1);
    finalWinner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    
    document.getElementById('quiz-section').innerHTML = "<p class='text-center animate-pulse font-bold text-blue-900'>Sedang Menganalisis Profil Bisnis Anda...</p>";
    
    [span_28](start_span)const reportId = `ARY-SHI-${Math.floor(100000 + Math.random() * 900000)}`;[span_28](end_span)
    
    [span_29](start_span)[span_30](start_span)// Auto-update WhatsApp link[span_29](end_span)[span_30](end_span)
    const waMessage = `Halo Mas Ali, saya sudah selesai tes Shio Kesuksesan. Mohon kode aktivasi sertifikat.\n\nNama: *${userInfo.name}*\nID Saya: *${reportId}*`;
    const waUrl = `https://wa.me/6285232526003?text=${encodeURIComponent(waMessage)}`;
    const waBtn = document.getElementById('wa-admin-btn');
    if(waBtn) waBtn.href = waUrl;

    try {
        await fetch(`${SCRIPT_URL}?name=${encodeURIComponent(userInfo.name)}&phone=${encodeURIComponent(userInfo.phone)}&result=${finalWinner}&reportId=${reportId}`);
        document.getElementById('quiz-section').classList.add('hidden');
        document.getElementById('user-display-name').innerText = userInfo.name;
        document.getElementById('paywall-section').classList.remove('hidden');
        document.getElementById('cert-id').innerText = reportId;
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

function renderCertificate() {
    const d = shioDatabase[finalWinner] || shioDatabase["Creator"];
    document.getElementById('cert-user-name').innerText = userInfo.name;
    document.getElementById('shio-title').innerText = finalWinner.toUpperCase();
    document.getElementById('shio-slogan').innerText = `"${d.slogan}"`;
    document.getElementById('shio-long-desc').innerHTML = `
        <p style="margin-bottom: 8px;">${d.desc}</p>
        <p style="color: #1e3a8a; font-weight: bold; margin-top: 10px;">ACTION PLAN:</p>
        <p>${d.action}</p>
    `;
    document.getElementById('shio-details').innerHTML = `
        <li style="margin-bottom: 6px;"><strong>KEKUATAN:</strong> ${d.kekuatan}</li>
        <li style="margin-bottom: 6px;"><strong>KELEMAHAN:</strong> ${d.kelemahan}</li>
        <li style="margin-bottom: 6px;"><strong>GAYA KERJA:</strong> ${d.gayaKerja}</li>
        <li style="margin-bottom: 6px;"><strong>PARTNER IDEAL:</strong> ${d.pasangan}</li>
    `;
    document.getElementById('cert-date').innerText = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}

function downloadPDF() {
    renderCertificate();
    const element = document.getElementById('certificate-area');
    const wrapper = document.getElementById('certificate-wrapper');
    const filename = `Sertifikat_Shio_${userInfo.name.replace(/\s+/g, '_')}.pdf`;
    
    wrapper.style.left = "0";
    wrapper.style.position = "static";

    const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
            scale: 4, 
            useCORS: true, 
            letterRendering: true,
            scrollY: 0,
            scrollX: 0,
            width: 1122, // Standar pixel A4 Landscape
            height: 794  
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape', compress: true }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        wrapper.style.left = "-9999px";
        wrapper.style.position = "absolute";
    });
}
