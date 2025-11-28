/**
 * Composable for locale management
 * Provides date-fns locale and translations based on WeWeb language
 */
import { computed } from 'vue';
import { enUS, fr } from 'date-fns/locale';
import { getWeWebLanguage, getTranslation, getTranslations } from '../utils/i18n';

/**
 * Map of locale codes to date-fns locale objects
 */
const dateFnsLocales = {
  en: enUS,
  fr: fr,
};

/**
 * Use locale for internationalization
 * @returns {object} Locale utilities
 */
export function useLocale() {
  /**
   * Current locale code from WeWeb
   */
  const currentLocale = computed(() => {
    return getWeWebLanguage();
  });

  /**
   * Current date-fns locale object
   */
  const dateFnsLocale = computed(() => {
    const locale = currentLocale.value?.toLowerCase().split('-')[0] || 'en';
    return dateFnsLocales[locale] || dateFnsLocales['en'];
  });

  /**
   * All translations for current locale
   */
  const t = computed(() => {
    return getTranslations(currentLocale.value);
  });

  /**
   * Translate a specific key
   * @param {string} key - Translation key
   * @returns {string} Translated text
   */
  const translate = (key) => {
    return getTranslation(key, currentLocale.value);
  };

  return {
    currentLocale,
    dateFnsLocale,
    t,
    translate,
  };
}
