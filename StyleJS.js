function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            element.innerHTML = langData[key];
        }
    });
}
// Save the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
}

// Load the translation file for the selected language
async function fetchLanguageData(lang) {
    try {
        const response = await fetch(`Assets/${lang}.json`);
        return await response.json();
    } catch (error) {
        console.error(`Could not load language file: ${lang}`, error);
        return {}; // fallback if JSON is missing
    }
}
async function changeLanguage(lang) {
    setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);

    updateContent(langData);
});
function splitLetters() {
    document.querySelectorAll('.Home h1, .Home h2, .AboutMe h1, .Experience h1, .Contact h1, h2, .Skills h1').forEach(el => {
        el.innerHTML = el.textContent
            .split('')
            .map((ch, i) => `<span style="--i:${i}">${ch}</span>`)
            .join('');
    });
}

function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            element.innerHTML = langData[key];
        }
    });
    splitLetters();
}
