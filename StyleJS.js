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
        const response = await fetch(`Assets/${lang}.json`); // <-- fixed path
        return await response.json();
    } catch (error) {
        console.error(`Could not load language file: ${lang}`, error);
        return {}; // fallback if JSON is missing
    }
}
// Change the page language
async function changeLanguage(lang) {
    setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
    toggleJapaneseStylesheet(lang);
}

// Toggle Japanese stylesheet when needed
function toggleJapaneseStylesheet(lang) {
    let link = document.getElementById("japanese-style");

    if (lang === "jp") {
        if (!link) {
            link = document.createElement("link");
            link.id = "japanese-style";
            link.rel = "stylesheet";
            link.href = "StyleJP.css"; // your Japanese-specific stylesheet
            document.head.appendChild(link);
        }
    } else if (link) {
        link.remove();
    }
}

// Initialize when the DOM is ready
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);

    updateContent(langData);
    toggleJapaneseStylesheet(userPreferredLanguage);
});
