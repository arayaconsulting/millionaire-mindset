// CONFIG DATABASE - URL WEB APP TERBARU
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzJUUd8I9VWfvXxbOq4GWwkZ6PHnYGYB9XlI9yuA20F3xiUysVPUuMzCFioEutYHvFk/exec";

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

// DATABASE HASIL (8 SHIO KESUKSESAN)
const shioDatabase = {
    "Creator": { slogan: "Menciptakan Produk yang Inovatif", kekuatan: "Visi besar, inovatif, melompat antar ide.", kelemahan: "Kurang detail pada rutinitas.", gayaKerja: "Visioner / Individual Player.", posisiTim: "Striker / Penyerang", fokusWaktu: "Masa Depan (Future)", pasangan: "Mechanic & Supporter", action: "Delegasikan operasional rutin segera.", models: ["Bill Gates", "Walt Disney"] },
    "Star": { slogan: "Membangun Merek yang Kuat", kekuatan: "Personal branding kuat, magnet massa.", kelemahan: "Lemah dalam detail operasional.", gayaKerja: "Promotor / Individual Player.", posisiTim: "Winger (Penarik Perhatian)", fokusWaktu: "Masa Depan (Future)", pasangan: "Lord & Accumulator", action: "Gunakan karisma untuk menarik peluang.", models: ["Oprah Winfrey", "Anthony Robbins"] },
    "Supporter": { slogan: "Membangun Tim Performa Tinggi", kekuatan: "Leadership kuat, motivator handal.", kelemahan: "Sulit membuat sistem mandiri.", gayaKerja: "Team Player / Leader.", posisiTim: "Kapten Tim", fokusWaktu: "Masa Kini (Now)", pasangan: "Star & Lord", action: "Fokus pada budaya tim.", models: ["Jack Welch", "Steve Case"] },
    "Dealmaker": { slogan: "Menemukan Deal Menguntungkan", kekuatan: "Negosiator ulung, networking luas.", kelemahan: "Terjebak detail panjang.", gayaKerja: "Connector / Individual Player.", posisiTim: "Playmaker", fokusWaktu: "Masa Kini (Now)", pasangan: "Lord & Mechanic", action: "Perbanyak networking.", models: ["Donald Trump", "Sandiaga Uno"] },
    "Trader": { slogan: "Jual Beli di Waktu yang Tepat", kekuatan: "Peka tren pasar, taktis.", kelemahan: "Gagal jika lupa waktu.", gayaKerja: "Speculator / Individual Player.", posisiTim: "Defensive Midfielder", fokusWaktu: "Masa Kini (Now)", pasangan: "Accumulator & Supporter", action: "Manfaatkan volatilitas pasar.", models: ["George Soros", "Jim Rogers"] },
    "Accumulator": { slogan: "Membeli dan Koleksi Aset", kekuatan: "Sangat sabar, mementingkan keamanan.", kelemahan: "Lambat membuat keputusan.", gayaKerja: "Safe Player / Individual Player.", posisiTim: "Goal Keeper", fokusWaktu: "Masa Lalu (Past)", pasangan: "Star & Dealmaker", action: "Tumpuk aset secara konsisten.", models: ["Warren Buffett", "Paul Allen"] },
    "Lord": { slogan: "Menghasilkan Uang dari Aset", kekuatan: "Pengendali belakang layar, cermat.", kelemahan: "Kurang empati pada manusia.", gayaKerja: "Auditor / Individual Player.", posisiTim: "Central Back", fokusWaktu: "Masa Lalu (Past)", pasangan: "Creator & Supporter", action: "Kontrol arus kas ketat.", models: ["Rockefeller", "Sergei Brin"] },
    "Mechanic": { slogan: "Membuat Sistem Terduplikasi", kekuatan: "Ahli SOP, rapi, teratur.", kelemahan: "Lambat memulai inovasi baru.", gayaKerja: "System Builder / Individual Player.", posisiTim: "Full Back", fokusWaktu: "Masa Lalu (Past)", pasangan: "Creator & Dealmaker", action: "Sempurnakan sistem bisnis.", models: ["Henry Ford", "Ray Kroc"] }
};

// --- LOGIKA APLIKASI ---

function startQuiz() {
    const nameInput = document.getElementById('user-name');
    const phoneInput = document.getElementById('user-phone');
    
    if(!nameInput.value || !phoneInput.value) {
        alert("Mohon lengkapi Nama dan WhatsApp!");
        return;
    }
    
    userInfo.name = nameInput.value;
    userInfo.phone = phoneInput.value;
    
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    const container = document.getElementById('options-container');
    
    document.getElementById('question-text').innerText = `"${q.q}"`;
    document.getElementById('progress-text').innerText = `PERTANYAAN ${currentQuestion + 1} / 25`;
    document.getElementById('progress-bar').style.width = `${((currentQuestion + 1) / 25) * 100}%`;
    
    container.innerHTML = "";
    const opts = [{t: q.a, m: q.map[0]}, {t: q.b, m: q.map[1]}, {t: q.c, m: q.map[2]}, {t: q.d, m: q.map[3]}];
    
    opts.forEach(o => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition bg-white shadow-sm";
        btn.innerText = o.t;
        btn.onclick = () => selectOption(o.m);
        container.appendChild(btn);
    });
}

function selectOption(m) {
    userAnswers.push(m);
    if(currentQuestion < 24) {
        currentQuestion++;
        showQuestion();
    } else {
        const counts = {};
        userAnswers.forEach(x => counts[x] = (counts[x] || 0) + 1);
        finalWinner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        
        document.getElementById('quiz-section').classList.add('hidden');
        document.getElementById('user-display-name').innerText = userInfo.name;
        document.getElementById('paywall-section').classList.remove('hidden');
    }
}

async function activateWithKey() {
    const keyInput = document.getElementById('license-key');
    const key = keyInput.value.trim().toUpperCase();
    const btn = document.getElementById('btn-activate');
    
    if (!key) return alert("Masukkan kode aktivasi!");
    
    btn.disabled = true; 
    btn.innerText = "Memvalidasi...";

    try {
        // 1. Validasi Kode ke Spreadsheet
        const valRes = await fetch(`${SCRIPT_URL}?action=validate&code=${key}`);
        const status = await valRes.text();
        
        if (status === "VALID") {
            btn.innerText = "Menyimpan Data...";
            
            // 2. Simpan Data User ke Spreadsheet
            const saveParams = `?action=save&name=${encodeURIComponent(userInfo.name)}&phone=${userInfo.phone}&result=${finalWinner}&code=${key}`;
            const saveRes = await fetch(SCRIPT_URL + saveParams);
            const saveStatus = await saveRes.text();

            if (saveStatus === "SUCCESS") {
                renderCertificate();
                document.getElementById('paywall-section').classList.add('hidden');
                document.getElementById('final-result-section').classList.remove('hidden');
            }
        } else {
            alert("Kode tidak valid atau sudah digunakan.");
            btn.disabled = false; 
            btn.innerText = "BUKA AKSES SERTIFIKAT";
        }
    } catch (e) {
        alert("Gagal terhubung ke database. Pastikan Apps Script sudah di-deploy 'Anyone'.");
        btn.disabled = false; 
        btn.innerText = "BUKA AKSES SERTIFIKAT";
    }
}

function renderCertificate() {
    const d = shioDatabase[finalWinner];
    document.getElementById('cert-user-name').innerText = userInfo.name;
    document.getElementById('shio-title').innerText = finalWinner.toUpperCase();
    document.getElementById('shio-slogan').innerText = `"${d.slogan}"`;
    document.getElementById('cert-date').innerText = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('cert-id').innerText = `ARY-SHI-${Math.floor(Math.random()*900000) + 100000}`;
    
    document.getElementById('shio-traits').innerHTML = `<li><strong>Kekuatan:</strong> ${d.kekuatan}</li><li><strong>Tantangan:</strong> ${d.kelemahan}</li><li><strong>Gaya Kerja:</strong> ${d.gayaKerja}</li>`;
    document.getElementById('shio-analogy').innerHTML = `<p><strong>Posisi Tim:</strong> ${d.posisiTim}</p><p class="mt-2"><strong>Fokus:</strong> ${d.fokusWaktu}</p>`;
    document.getElementById('shio-strategy').innerHTML = `<p><strong>Partner:</strong> ${d.pasangan}</p><p class="mt-2"><strong>Action:</strong> ${d.action}</p>`;
    document.getElementById('shio-models').innerHTML = d.models.map(m => `<li>${m}</li>`).join("");
    
    document.getElementById('certificate').style.display = "block";
}
