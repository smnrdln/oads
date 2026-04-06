// ====================================================
// i18n Content Manifest
// ====================================================
// Maps each language code to the list of content-file
// names that exist for it (relative to lang/<code>/).
//
// To add a new language:
//   1. Create lang/fr.js  (UI strings + optional __autoTranslateRules)
//   2. Create lang/fr/level1.js … level4.js  (translated content)
//   3. Add an entry here — no other files need to change.
//
// Note: English content is always pre-loaded via the root-level
//       level1.js … level4.js scripts, so 'en' is omitted here.
// ====================================================

window.i18nManifest = {
    de: ['level1', 'level2', 'level3', 'level4', 'quizzes', 'scenarios'],
    // fr: ['level1', 'level2', 'level3', 'level4'],   ← add future languages here
};
