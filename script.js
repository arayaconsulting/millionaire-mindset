// DATABASE PERTANYAAN (25 SOAL ORIGINAL DARI BUKU)
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

// DATABASE HASIL (ANALISIS TAKTIS SESUAI BUKU)
const shioDatabase = {
    "Creator": { 
        slogan: "Menciptakan Produk yang Inovatif", 
        kekuatan: ["Pemikir dengan visi besar", "Mampu membangun terobosan", "Fokus pada inovasi"],
        kelemahan: "Sering bukan manajer andal, cepat bosan dengan rutinitas.",
        gayaKerja: "Visioner / Individual Player.",
        posisiTim: "Striker / Penyerang (Mencetak Gol)",
        fokusWaktu: "Masa Depan (Future)",
        pasangan: "Mechanic & Supporter",
        action: "Delegasikan operasional rutin segera agar fokus pada inovasi.",
        models: ["Walt Disney", "Bill Gates", "Richard Branson"] 
    },
    "Star": { 
        slogan: "Membangun Merek yang Kuat", 
        kekuatan: ["Personal branding kuat", "Bintang panggung alami", "Pembangun citra"],
        kelemahan: "Lemah dalam detail teknis dan manajemen tim rumit.",
        gayaKerja: "Promotor / Individual Player.",
        posisiTim: "Winger (Pencari Celah & Penarik Perhatian)",
        fokusWaktu: "Masa Depan (Future)",
        pasangan: "Lord & Accumulator",
        action: "Gunakan karisma Anda untuk membuka peluang, biarkan tim mengolah detail.",
        models: ["Oprah Winfrey", "Anthony Robbins"] 
    },
    "Supporter": { 
        slogan: "Membangun Tim Performa Tinggi", 
        kekuatan: ["Pemberi motivasi tim", "Management skill kuat", "Pemimpin praktis"],
        kelemahan: "Sulit mengetahui kemampuan menciptakan sistem mandiri.",
        gayaKerja: "Team Player / Leader.",
        posisiTim: "Kapten Tim / Gelandang Bertahan",
        fokusWaktu: "Masa Kini (Now)",
        pasangan: "Star & Lord",
        action: "Fokuslah pada manajemen orang dan budaya tim.",
        models: ["Jack Welch", "Michael Eisner"] 
    },
    "Dealmaker": { 
        slogan: "Menemukan Deal yang Menguntungkan", 
        kekuatan: ["Negosiator ulung", "Pembangun koneksi", "Cepat menangkap visi"],
        kelemahan: "Terjebak detail panjang yang menunda peluang.",
        gayaKerja: "Connector / Individual Player.",
        posisiTim: "Playmaker (Pengatur Serangan)",
        fokusWaktu: "Masa Kini (Now)",
        pasangan: "Lord & Mechanic",
        action: "Perbanyak networking, delegasikan audit teknis.",
        models: ["Donald Trump", "Masayoshi Son"] 
    },
    "Trader": { 
        slogan: "Jual Beli di Waktu yang Tepat", 
        kekuatan: ["Peka terhadap tren pasar", "Pedagang alami", "Efisien dalam waktu"],
        kelemahan: "Gagal jika dipermainkan pasar atau lupa waktu.",
        gayaKerja: "Speculator / Individual Player.",
        posisiTim: "Defensive Midfielder (Penjaga Profit)",
        fokusWaktu: "Masa Kini (Now)",
        pasangan: "Accumulator & Supporter",
        action: "Manfaatkan volatilitas pasar untuk profit cepat.",
        models: ["George Soros", "Jim Rogers"] 
    },
    "Accumulator": { 
        slogan: "Membeli dan Koleksi Aset", 
        kekuatan: ["Mementingkan keamanan", "Mampu menumpuk modal", "Dapat diandalkan"],
        kelemahan: "Lambat mengambil keputusan risiko besar.",
        gayaKerja: "Safe Player / Individual Player.",
        posisiTim: "Goal Keeper (Penjaga Gawang)",
        fokusWaktu: "Masa Lalu / Data (Past)",
        pasangan: "Star & Dealmaker",
        action: "Tumpuk aset aman dan biarkan efek bunga berbunga bekerja.",
        models: ["Warren Buffett", "Paul Allen"] 
    },
    "Lord": { 
        slogan: "Menghasilkan Uang dari Aset", 
        kekuatan: ["Pengendali belakang layar", "Mencintai detail data", "Perencana cermat"],
        kelemahan: "Mementingkan angka daripada hubungan manusia.",
        gayaKerja: "Auditor / Individual Player.",
        posisiTim: "Central Back (Bek Tengah / Pengendali)",
        fokusWaktu: "Masa Lalu / Data (Past)",
        pasangan: "Creator & Supporter",
        action: "Gunakan data untuk kontrol arus kas ketat.",
        models: ["Rockefeller", "Sergei Brin"] 
    },
    "Mechanic": { 
        slogan: "Membuat Sistem Terduplikasi", 
        kekuatan: ["Pembuat sistem andal", "Penyempurna jaringan", "Sistematis"],
        kelemahan: "Lambat memulai inovasi benar-benar baru.",
        gayaKerja: "System Builder / Individual Player.",
        posisiTim: "Full Back (Bek Sayap / Penyempurna)",
        fokusWaktu: "Masa Lalu / Data (Past)",
        pasangan: "Creator & Dealmaker",
        action: "Sempurnakan sistem agar bisnis jalan tanpa Anda.",
        models: ["Henry Ford", "Ray Kroc"] 
    }
};

let currentQuestion = 0;
let userAnswers = [];
let userInfo = { name: "", phone: "" };
let finalWinner = "";

// Initialize App
function startQuiz() {
    const nameInput = document.getElementById('user-name');
    const phoneInput = document.getElementById('user-phone');
    
    if(!nameInput.value || !phoneInput.value) return alert("Mohon lengkapi data Anda!");
    
    userInfo.name = nameInput.value;
    userInfo.phone = phoneInput.value;
    
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-text').innerText = `"${q.q}"`;
    document.getElementById('progress-text').innerText = `PERTANYAAN ${currentQuestion + 1} / 25`;
    document.getElementById('progress-bar').style.width = `${((currentQuestion + 1) / 25) * 100}%`;
    
    const container = document.getElementById('options-container');
    container.innerHTML = "";
    
    const options = [
        { text: q.a, map: q.map[0] },
        { text: q.b, map: q.map[1] },
        { text: q.c, map: q.map[2] },
        { text: q.d, map: q.map[3] }
    ];

    options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition shadow-sm bg-white";
        btn.innerText = opt.text;
        btn.onclick = () => selectOption(opt.map);
        container.appendChild(btn);
    });
}

function selectOption(targetShio) {
    userAnswers.push(targetShio);
    if(currentQuestion < 24) {
        currentQuestion++;
        showQuestion();
    } else {
        processResults();
    }
}

function processResults() {
    const counts = {};
    userAnswers.forEach(x => counts[x] = (counts[x] || 0) + 1);
    finalWinner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('user-display-name').innerText = userInfo.name;
    document.getElementById('paywall-section').classList.remove('hidden');
}

function activateWithKey() {
    const key = document.getElementById('license-key').value.toUpperCase();
    if(key === "SUKSES") { // Ubah sesuai kebutuhan lisensi Anda
        renderCertificate();
        document.getElementById('paywall-section').classList.add('hidden');
        document.getElementById('final-result-section').classList.remove('hidden');
    } else {
        alert("Kode Aktivasi Salah!");
    }
}

function renderCertificate() {
    const data = shioDatabase[finalWinner];
    
    document.getElementById('cert-user-name').innerText = userInfo.name;
    document.getElementById('shio-title').innerText = finalWinner.toUpperCase();
    document.getElementById('shio-slogan').innerText = `"${data.slogan}"`;
    document.getElementById('cert-date').innerText = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('cert-id').innerText = `ARY-SHI-${Math.floor(Math.random()*900000) + 100000}`;
    
    // Core Traits
    const traitsList = data.kekuatan.map(k => `<li>${k}</li>`).join("");
    document.getElementById('shio-traits').innerHTML = `
        ${traitsList}
        <li class="mt-2 text-red-700 font-bold italic">Tantangan: ${data.kelemahan}</li>
        <li class="mt-1 font-bold">Gaya Kerja: ${data.gayaKerja}</li>
    `;

    // Analogy
    document.getElementById('shio-analogy').innerHTML = `
        <p><strong>Posisi Tim:</strong><br>${data.posisiTim}</p>
        <p class="mt-3"><strong>Fokus Waktu:</strong><br>${data.fokusWaktu}</p>
    `;

    // Strategy
    document.getElementById('shio-strategy').innerHTML = `
        <p><strong>Pasangan Ideal:</strong><br>${data.pasangan}</p>
        <p class="mt-3"><strong>Action Plan:</strong><br>${data.action}</p>
    `;

    // Models
    document.getElementById('shio-models').innerHTML = data.models.map(m => `<li>${m}</li>`).join("");

    document.getElementById('certificate').style.display = "block";
}
