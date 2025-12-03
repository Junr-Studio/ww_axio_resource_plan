/**
 * Internationalization utilities for Resource Planning Timeline
 * Supports French (fr) and English (en)
 */

/**
 * Translation keys and their values for each locale
 */
const translations = {
  en: {
    // Timeline Header
    resources: 'Resources',
    week: 'W', // Week abbreviation prefix

    // Tooltip/Labels
    capacity: 'Capacity',
    startDate: 'Start Date',
    endDate: 'End Date',
    project: 'Project',
    status: 'Status',
  },
  fr: {
    // Timeline Header
    resources: 'Ressources',
    week: 'S', // Semaine abbreviation prefix

    // Tooltip/Labels
    capacity: 'Capacité',
    startDate: 'Date de début',
    endDate: 'Date de fin',
    project: 'Projet',
    status: 'Statut',
  },
};

/**
 * Get translation for a key in the specified locale
 * @param {string} key - Translation key
 * @param {string} locale - Locale code (en, fr)
 * @returns {string} Translated text
 */
export function getTranslation(key, locale = 'en') {
  const normalizedLocale = locale?.toLowerCase()?.split('-')?.[0] || 'en'; // Handle 'en-US' -> 'en'
  const translation = translations[normalizedLocale]?.[key] || translations['en']?.[key];
  return translation || key;
}

/**
 * Get all translations for a locale
 * @param {string} locale - Locale code (en, fr)
 * @returns {object} All translations for the locale
 */
export function getTranslations(locale = 'en') {
  const normalizedLocale = locale?.toLowerCase()?.split('-')?.[0] || 'en';
  return translations[normalizedLocale] || translations['en'];
}

/**
 * Get current WeWeb language from context
 * Falls back to 'en' if not available
 * @returns {string} Current locale code
 */
export function getWeWebLanguage() {
  try {
    // CRITICAL: Use wwLib.getFrontWindow() instead of direct window access
    const frontWindow = wwLib?.getFrontWindow?.();
    const wwLang = frontWindow?.wwLang || wwLib?.wwLang?.lang;
    return wwLang || 'en';
  } catch (error) {
    /* wwEditor:start */
    console.warn('Could not access WeWeb language, defaulting to English:', error);
    /* wwEditor:end */
    return 'en';
  }
}
