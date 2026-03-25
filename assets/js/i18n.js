// ====================================================
// i18n - Internationalization Core
// ====================================================

const i18n = (() => {
    const translations = {};
    const contentRegistry = {}; // { 'en': { 'level1': [...], ... }, 'de': { ... } }
    const localizedFallbackCache = {};
    const loadedContentFiles = {}; // { 'de': Set{'level1','level2',...} }
    const languages = [];          // [{ code, label }]
    let currentLang = (function () {
        try { return localStorage.getItem('appLanguage') || 'en'; }
        catch (e) { return 'en'; }
    })();
    const fallbackLang = 'en';

    // ── Document language / RTL ──────────────────────────────────────────────

    function applyDocumentLanguage(code) {
        document.documentElement.lang = code;
        const rtlLanguages = ['ar', 'fa', 'he', 'ur'];
        document.documentElement.dir = rtlLanguages.includes(code) ? 'rtl' : 'ltr';
    }

    // ── Auto-translation helpers ─────────────────────────────────────────────

    /**
     * Apply a language's own auto-translate rules (if any) to a single string.
     * Rules are stored in translations[code].__autoTranslateRules as an array
     * of [RegExp, replacement] pairs — exactly like the old deAutoTranslationRules.
     */
    function autoTranslateString(str, targetLang) {
        if (typeof str !== 'string' || !str.trim()) return str;

        const rules = translations[targetLang] && translations[targetLang].__autoTranslateRules;
        if (!rules || !rules.length) return str;

        // Keep direct URLs untouched.
        if (/^https?:\/\//i.test(str.trim())) return str;

        // Protect inline URLs during replacement.
        const urls = [];
        let result = str.replace(/https?:\/\/[^\s"'<>]+/gi, (m) => {
            const token = `__URL_${urls.length}__`;
            urls.push(m);
            return token;
        });

        rules.forEach(([pattern, replacement]) => {
            result = result.replace(pattern, replacement);
        });

        result = result.replace(/__URL_(\d+)__/g, (_, idx) => urls[Number(idx)] || '');
        return result;
    }

    function autoTranslateDeep(value, targetLang) {
        if (typeof value === 'string') return autoTranslateString(value, targetLang);
        if (Array.isArray(value))     return value.map(item => autoTranslateDeep(item, targetLang));
        if (value && typeof value === 'object') {
            const output = {};
            Object.keys(value).forEach(key => {
                output[key] = autoTranslateDeep(value[key], targetLang);
            });
            return output;
        }
        return value;
    }

    // ── Dynamic content loading ──────────────────────────────────────────────

    /**
     * Dynamically load a language content file (e.g. lang/de/level1.js).
     * Returns a Promise that resolves when the script has executed.
     */
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.onload  = resolve;
            s.onerror = () => reject(new Error(`[i18n] Failed to load: ${src}`));
            document.head.appendChild(s);
        });
    }

    /**
     * Load all content files listed in window.i18nManifest for the given
     * language code. Already-loaded files are skipped.
     * Returns a Promise that resolves when every file has loaded.
     */
    function loadLanguageContent(code) {
        const manifest = window.i18nManifest;
        if (!manifest || !manifest[code]) return Promise.resolve();

        if (!loadedContentFiles[code]) loadedContentFiles[code] = new Set();
        const alreadyLoaded = loadedContentFiles[code];

        const pending = manifest[code]
            .filter(name => !alreadyLoaded.has(name))
            .map(name => {
                const src = `lang/${code}/${name}.js`;
                alreadyLoaded.add(name);
                return loadScript(src).catch(err => console.warn(err.message));
            });

        return Promise.all(pending);
    }

    // ── Public API ───────────────────────────────────────────────────────────

    /**
     * Register a language pack.
     *
     * @param {string} code    - ISO 639-1 code (e.g. 'en', 'de', 'fr')
     * @param {string} label   - Display label (e.g. 'English', 'Deutsch', 'Français')
     * @param {object} strings - Map of i18n keys → translated strings.
     *                           May include the special key __autoTranslateRules:
     *                           an array of [RegExp, string] pairs used to
     *                           machine-translate untranslated content blocks.
     */
    function registerLanguage(code, label, strings) {
        translations[code] = strings;
        if (!languages.find(l => l.code === code)) {
            languages.push({ code, label });
        }
    }

    /**
     * Translate a UI key. Supports %s substitution for dynamic values.
     * Falls back: currentLang → fallbackLang → raw key.
     *
     * Usage:  t('notifications.levelUp', userProgress.level)
     */
    function t(key, ...args) {
        let str = (translations[currentLang] && translations[currentLang][key])
                || (translations[fallbackLang] && translations[fallbackLang][key])
                || key;

        args.forEach(arg => { str = str.replace('%s', arg); });
        return str;
    }

    /**
     * Register large content blocks (lessons, quizzes, scenarios).
     *
     * @param {string} code - Language code
     * @param {string} type - Content type (e.g. 'level1', 'quizzes', 'scenarios')
     * @param {any}    data - The content array/object
     */
    function registerContent(code, type, data) {
        if (!contentRegistry[code]) contentRegistry[code] = {};
        contentRegistry[code][type] = data;
    }

    /**
     * Get content for the current language, falling back to English.
     * If the target language has no content for this type yet, auto-translate
     * the fallback so non-English UIs don't show raw English blocks.
     */
    function getContent(type) {
        if (contentRegistry[currentLang] &&
            Object.prototype.hasOwnProperty.call(contentRegistry[currentLang], type)) {
            return contentRegistry[currentLang][type];
        }

        const fallbackContent = contentRegistry[fallbackLang] && contentRegistry[fallbackLang][type];
        if (!fallbackContent) return null;
        if (currentLang === fallbackLang) return fallbackContent;

        if (!localizedFallbackCache[currentLang]) localizedFallbackCache[currentLang] = {};
        if (!Object.prototype.hasOwnProperty.call(localizedFallbackCache[currentLang], type)) {
            localizedFallbackCache[currentLang][type] = autoTranslateDeep(fallbackContent, currentLang);
        }
        return localizedFallbackCache[currentLang][type];
    }

    /**
     * Switch active language, persist, and re-render the entire UI.
     * Content files for the chosen language are loaded on demand.
     */
    function setLanguage(code) {
        if (!translations[code]) {
            console.warn(`[i18n] Language "${code}" not registered.`);
            return;
        }
        currentLang = code;
        try { localStorage.setItem('appLanguage', code); } catch (e) {}
        applyDocumentLanguage(code);

        // Load content files for this language if not already loaded, then render.
        loadLanguageContent(code).then(() => {
            // Clear the auto-translate cache for this language so fresh content
            // (just loaded) takes priority over any stale machine-translated copy.
            delete localizedFallbackCache[code];

            if (typeof updateStaticTexts     === 'function') updateStaticTexts();
            if (typeof renderSidebar         === 'function') renderSidebar();
            if (typeof updateProgressDisplay === 'function') updateProgressDisplay();
            if (typeof updateLanguageSwitcher === 'function') updateLanguageSwitcher();

            if (typeof currentView !== 'undefined' && currentView.levelId !== null) {
                if (typeof showTopic  === 'function') showTopic(currentView.levelId, currentView.topicIndex);
            } else {
                if (typeof showWelcome === 'function') showWelcome();
            }
        });
    }

    function getCurrentLang()        { return currentLang; }
    function getAvailableLanguages() { return [...languages]; }

    // Ensure document language attributes are in sync on first paint.
    applyDocumentLanguage(currentLang);

    return {
        registerLanguage,
        registerContent,
        getContent,
        t,
        setLanguage,
        getCurrentLang,
        getAvailableLanguages
    };
})();

// Convenience shortcut
const t = i18n.t;
