function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("hidden");
}
const videoMap = {
    MI2_OSI: { id: "LViQ4Y54wvU", title: "Momen Inersia 2 & Gerak Osilasi" },
    MI1: { id: "rjvFs3JQZi4", title: "Momen Inersia 1" },
    PBL: { id: "JRdFZoGfp5M", title: "Pengukuran Besaran Listrik" },
    RGB: { id: "DhZim8C_Wds", title: "Resonansi Gelombang Bunyi" },
    GMB: { id: "Pc_XYZwTtDs", title: "Gerak Melingkar Beraturan" },
    GJB: { id: "VxaaF2EW53A", title: "Gerak Jatuh Bebas" },
    H2N_HKEM: { id: "xUVEgjlT4x0", title: "Hukum II Newton & Kekekalan Energi Mekanik" },
    SGH: { id: "_a_QonLraKA", title: "Superposisi Getaran Harmonik" },
    GM: { id: "dIDQ0NjcB38", title: "Gerak Menggelinding" },
    IM: { id: "KfF7yqQGe68", title: "Induksi Magnetik" },
    GLB_GLBB: { id: "MHDr6zO770A", title: "Gerak Lurus Beraturan & Berubah Beraturan" },
    HKM: { id: "9dYQ1AmsOhQ", title: "Hukum Kekekalan Momentum" },
    PL: { id: "xCn5rhxUpCs", title: "Pendahuluan Kelistrikan" },
    KAP: { id: "GtcgVgoMHgk", title: "Kapasitor" },
    JW: { id: "diFEpGyODHk", title: "Jembatan Wheatstone" }

    
};

function playVideo(code, el) {
    const video = videoMap[code];
    document.getElementById("videoFrame").src = `https://www.youtube.com/embed/${video.id}?rel=0`;
    document.getElementById("videoTitle").textContent = video.title;
    document.querySelectorAll(".modul-item").forEach(item => item.classList.remove("active"));
    el.classList.add("active");

    
}
