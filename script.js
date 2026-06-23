// --- BASE DE DATOS CENTRALIZADA DE APPS ---
const APPS_DATA = [
    {
        id: 'whatsapp',
        title: 'WhatsApp Plus VCTM: yesiimods',
        keys: ['whatsapp', 'wasap', 'plus', 'whassap', 'wassap'],
        link: 'https://www.mediafire.com/file/il2w3t9djgdsnas/[COM.UNI]Plus_YesiiMods_V5.32.apk/file',
        isImage: true,
        bgValue: 'linear-gradient(135deg, #FF8512, #FF3E12)',
        bannerText: 'WhatsApp Plus'
    },
    {
        id: 'capcut',
        title: 'CapCut: Premium',
        keys: ['capcut', 'catcup', 'catcut', 'capcup'],
        link: 'https://9mod.com/download/capcut-866/2',
        isImage: false,
        bgValue: '#00d2ff',
        bannerText: 'Capcut premium'
    },
    {
        id: 'xupertv',
        title: 'XuperTV: mod',
        keys: ['super tv', 'xuper tv', 'xuper', 'súper tv'],
        link: 'https://www.mediafire.com/file/ewwiflzy9au1fo4/XuperHydra.apk/file',
        isImage: false,
        bgValue: '#006EFF',
        bannerText: 'Xuper tv'
    }
];

const sideMenuContent = document.getElementById('side-menu-content').innerHTML;

function resetToHome() {
    if (window.supportInterval) cancelSupport();
    
    ['side-menu', 'search-modal', 'loading-screen'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    document.getElementById('search-results').style.display = 'none';
    document.getElementById('welcome-text').style.display = 'block';
    document.getElementById('back-button').style.display = 'none';

    if (window.loadingInterval) clearInterval(window.loadingInterval);
}

function toggleModal(id) { 
    document.getElementById(id).style.display = 'flex';
    document.getElementById('welcome-text').style.display = 'none';
    document.getElementById('back-button').style.display = 'flex';
}

const SUN_ICON = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
const MOON_ICON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';

function toggleTheme() {
    const icon = document.getElementById('theme-icon');
    let isDark = document.body.classList.contains('dark-mode');
    
    if (!isDark && !document.body.classList.length && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        icon.innerHTML = MOON_ICON;
    } else {
        isDark = document.body.classList.toggle('dark-mode');
        icon.innerHTML = isDark ? SUN_ICON : MOON_ICON;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('theme-icon');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
        document.body.classList.add('dark-mode');
        icon.innerHTML = SUN_ICON;
    } else {
        icon.innerHTML = MOON_ICON;
    }
});

function performSearch() {
    const input = document.getElementById('search-input');
    const value = input.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    const welcomeText = document.getElementById('welcome-text');

    resultsContainer.innerHTML = ''; 
    resultsContainer.style.display = 'none';
    input.value = '';

    if (!value) {
        resetToHome();
        return;
    }

    welcomeText.style.display = 'none'; 
    let found = false;

    APPS_DATA.forEach(app => {
        if (app.keys.some(k => value.includes(k))) {
            const styleValue = app.isImage ? `background-image: ${app.bgValue};` : `background-color: ${app.bgValue};`;
            
            resultsContainer.innerHTML += `
                <div class="result-item" onclick="startLoading('${app.id}')">
                    <div class="banner-dynamic" style="${styleValue}">
                        ${app.bannerText}
                    </div>
                    <h3 class="result-title">${app.title}</h3>
                </div>`;
            found = true;
        }
    });
    
    if (found) { 
        resultsContainer.style.display = 'block'; 
        document.getElementById('search-modal').style.display = 'none';
        document.getElementById('back-button').style.display = 'flex';
    } else {
        welcomeText.style.display = 'block';
        welcomeText.innerHTML = `<h1>Sin resultados</h1><p class="intro-text">No encontramos nada para "${value}". Intenta otra búsqueda.</p>`;
        document.getElementById('search-modal').style.display = 'none';
        document.getElementById('back-button').style.display = 'flex';
    }
}

function startLoading(id) {
    const screen = document.getElementById('loading-screen'), 
          img = document.getElementById('loading-image'), 
          title = document.getElementById('loading-title'), 
          btn = document.getElementById('download-btn'),
          loaderContainer = document.getElementById('circular-loader'),
          circleProgress = document.getElementById('circle-progress'),
          countdownText = document.getElementById('countdown-text');
    
    img.innerHTML = '';
    img.style.backgroundImage = "none";
    img.style.backgroundColor = "transparent";

    const app = APPS_DATA.find(a => a.id === id);
    
    if (app) {
        img.innerHTML = `<div style="color:white; font-size:40px; font-weight:bold;">${app.bannerText}</div>`;
        if (app.isImage) {
            img.style.backgroundImage = app.bgValue;
        } else {
            img.style.backgroundColor = app.bgValue;
        }
        title.textContent = app.title;
        btn.dataset.link = app.link;
    }

    btn.classList.remove('active'); 
    btn.disabled = true; 
    btn.innerHTML = `<svg id="lock-icon" class="lock-icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Loading...`;
    
    const totalProgress = 276.46; 
    circleProgress.style.strokeDashoffset = totalProgress; 
    loaderContainer.classList.remove('complete');
    
    let timeLeft = 10;
    countdownText.textContent = timeLeft;
    
    screen.style.display = 'block';
    document.getElementById('back-button').style.display = 'none';

    if (window.loadingInterval) clearInterval(window.loadingInterval);

    window.loadingInterval = setInterval(() => {
        timeLeft--;
        const offset = totalProgress - ((10 - timeLeft) / 10) * totalProgress;
        circleProgress.style.strokeDashoffset = offset;
        
        if (timeLeft >= 0) {
            countdownText.textContent = timeLeft;
        }

        if (timeLeft <= 0) {
            clearInterval(window.loadingInterval); 
            loaderContainer.classList.add('complete'); 
            btn.textContent = "Download"; 
            btn.classList.add('active'); 
            btn.disabled = false; 
            btn.onclick = () => window.location.href = btn.dataset.link;
            document.getElementById('back-button').style.display = 'flex';
        }
    }, 1000);
}

function showSupportLoading() {
    const container = document.getElementById('side-menu-content');
    container.innerHTML = `<h3>Conectando con soporte</h3><div class="support-progress-container"><div class="support-progress-fill" id="support-progress"></div></div><div class="support-buttons"><button class="btn-cancel-support" onclick="cancelSupport()">Cancelar</button></div>`;
    let p = 0;
    window.supportInterval = setInterval(() => { 
        p += 1; 
        document.getElementById('support-progress').style.width = p + '%'; 
        if (p >= 100) { 
            clearInterval(window.supportInterval); 
            window.location.href = "https://wa.me/50584875836"; 
        } 
    }, 40);
}

function cancelSupport() {
    clearInterval(window.supportInterval);
    document.getElementById('side-menu-content').innerHTML = sideMenuContent;
    resetToHome();
}
