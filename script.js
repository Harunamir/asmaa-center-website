// ========== SIMPLE TRANSLATION SYSTEM ==========
const translations = {
    ar: {
        "welcome-title": "مرحباً بكم في مركز أسماء بنت أبي بكر",
        "welcome-text": "مركز علمي دعوي لنشر العلم الشرعي وفق منهج أهل السنة والجماعة",
        "watch-btn": "استمع للمحاضرات",
        "services-title": "خدمات المركز",
        "feature1-title": "محاضرات مرئية",
        "feature1-text": "محاضرات ودروس مرئية في مختلف العلوم الشرعية",
        "feature2-title": "دروس صوتية",
        "feature2-text": "دروس صوتية يمكن الاستماع لها في أي وقت",
        "feature3-title": "مكتبة الكترونية",
        "feature3-text": "مجموعة من الكتب والرسائل العلمية بصيغة PDF",
        "feature4-title": "ترجمة متعددة اللغات",
        "feature4-text": "الترجمة بين العربية والإنجليزية",
        "recent-title": "آخر المحاضرات",
         "nav-schedule": "الجدول الأسبوعي",
        "nav-register": "التسجيل",
        "schedule-page-title": "الجدول الأسبوعي",
        "register-page-title": "التسجيل في الدورات"

    },
    en: {
        "welcome-title": "Welcome to Asmaa Bint Abi Bakr Center",
        "welcome-text": "A scientific da'wah center for spreading Islamic knowledge according to the methodology of Ahlus Sunnah wal Jama'ah",
        "watch-btn": "Watch Lectures",
        "services-title": "Our Services",
        "feature1-title": "Video Lectures",
        "feature1-text": "Video lectures and lessons in various Islamic sciences",
        "feature2-title": "Audio Lessons",
        "feature2-text": "Audio lessons that can be listened to anytime",
        "feature3-title": "Digital Library",
        "feature3-text": "A collection of books and research papers in PDF format",
        "feature4-title": "Multilingual Translation",
        "feature4-text": "Translation between Arabic and English",
        "recent-title": "Recent Lectures",
         "nav-schedule": "Weekly Schedule",
        "nav-register": "Registration",
        "schedule-page-title": "Weekly Schedule",
        "register-page-title": "Course Registration"

    }
    
};

// Load language from localStorage or default to Arabic
let currentLang = localStorage.getItem('language') || 'ar';

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(lang === 'ar' ? 'العربية' : 'English')) {
            btn.classList.add('active');
        }
    });
    
    // Update direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update text content
    for (const [key, value] of Object.entries(translations[lang])) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = value;
        }
    }
    
    // Reload lectures if on lectures page
    if (window.location.pathname.includes('lectures.html')) {
        // The lectures page has its own loadLectures function
        if (typeof loadLectures === 'function') {
            loadLectures();
        }
    }
    
    // Reload PDFs if on PDFs page
    if (window.location.pathname.includes('pdfs.html')) {
        loadPDFs();
    }
}

// ========== PDF LOADING SYSTEM ==========
async function loadPDFs() {
    try {
        const response = await fetch(`data/pdfs-${currentLang}.json`);
        const pdfs = await response.json();
        
        const container = document.getElementById('pdfsContainer');
        if (!container) return;
        
        container.innerHTML = pdfs.map(pdf => `
            <div class="pdf-card">
                <i class="fas fa-file-pdf"></i>
                <div style="flex: 1;">
                    <h4>${pdf.title}</h4>
                    <p>${pdf.description}</p>
                    <small>${pdf.category} | ${pdf.pages} ${currentLang === 'ar' ? 'صفحات' : 'pages'}</small>
                </div>
                <a href="${pdf.url}" class="btn-primary" download>
                    ${currentLang === 'ar' ? 'تحميل' : 'Download'} <i class="fas fa-download"></i>
                </a>
            </div>
        `).join('');
    } catch (error) {
        console.log('No PDFs data found yet. Add PDFs to data folder.');
    }
}

// ========== MOBILE MENU ==========
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// ========== SUBSCRIPTION FORM ==========
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    changeLanguage(currentLang);
    
    // Load content based on page
    if (window.location.pathname.includes('index.html') || 
        window.location.pathname === '/') {
        // Home page has its own lecture loading in index.html
    }
    
    if (window.location.pathname.includes('pdfs.html')) {
        loadPDFs();
    }
    
    // Handle subscription form
    const form = document.getElementById('subscriptionForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            
            // Simple validation
            if (!email.includes('@')) {
                alert(currentLang === 'ar' ? 'الرجاء إدخال بريد إلكتروني صحيح' : 'Please enter a valid email');
                return;
            }
            
            // Here you would normally send to a server
            // For now, just show success message
            alert(currentLang === 'ar' 
                ? `شكراً ${name}! تم تسجيل بريدك ${email} بنجاح.` 
                : `Thank you ${name}! Your email ${email} has been registered.`);
            
            form.reset();
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        }
    });
});