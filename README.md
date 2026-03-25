# Open Academy Dot Space

**Live:** https://openacademy.space

Free, browser-based technical learning modules with structured lessons, exercises, and real-world scenarios.

---

## Module table

| ID  | Title | Status | Levels | Topics | Exercises | Scenarios | Languages |
|-----|-------|--------|--------|--------|-----------|-----------|-----------|
| pcb | Electronics & PCB Design Trainer | Active | 4 | 34 | 84 | 34 | EN, DE |

---

## Architecture

```
/
├── assets/
│   ├── css/
│   │   └── engine.css        ← Shared stylesheet (all modules)
│   ├── js/
│   │   ├── engine.js         ← Shared learning engine (all modules)
│   │   └── i18n.js           ← Shared i18n runtime (all modules)
│   ├── icons/                ← Favicon and PWA icons
│   └── logo/                 ← Logo assets
│
├── modules/
│   └── pcb/                  ← PCB module (module-local files)
│       ├── index.html        ← Module page (sets MODULE_CONFIG, loads shared assets)
│       ├── levels.js         ← Module roadmap structure
│       ├── level1.js         ← Lesson content (Level 1)
│       ├── level2.js         ← Lesson content (Level 2)
│       ├── level3.js         ← Lesson content (Level 3)
│       ├── level4.js         ← Lesson content (Level 4)
│       ├── exercises.js      ← Exercise data
│       ├── scenarios.js      ← Scenario data
│       └── lang/
│           ├── en.js         ← English UI strings
│           ├── de.js         ← German UI strings
│           ├── manifest.js   ← i18n content file manifest
│           └── de/
│               ├── level1.js ← German lesson content (Level 1)
│               ├── level2.js ← German lesson content (Level 2)
│               ├── level3.js ← German lesson content (Level 3)
│               └── level4.js ← German lesson content (Level 4)
│
├── index.html                ← Root landing page
├── privacy.html              ← Privacy policy
├── ads.txt                   ← Google AdSense publisher file
├── CNAME                     ← Custom domain for GitHub Pages
└── README.md
```

### Key shared files

**`assets/js/engine.js`**
The core learning engine. Renders the sidebar, topic views, quizzes, scenarios, progress tracking, XP, achievements, theme switching, and language switching. All rendering logic lives here and is shared by every module.

**`assets/js/i18n.js`**
The internationalization runtime. Manages language registration, content registration, dynamic loading of translated lesson files, and UI re-rendering on language switch. Shared by every module.

**`assets/css/engine.css`**
The shared stylesheet. Contains all CSS custom properties, layout, sidebar, topic view, exercises, scenario, quiz, and responsive styles used by the engine.

**`window.MODULE_CONFIG`**
Each module's `index.html` declares a small config object before the theme-init IIFE:

```html
<script>
    window.MODULE_CONFIG = {
        id: "pcb",
        storageKey: "electronicsProgress"
    };
</script>
```

The engine reads `MODULE_CONFIG.storageKey` to determine which `localStorage` key to use for progress persistence. This isolates each module's progress from other modules.

### Module-local files

Each module owns its own:
- `levels.js` — defines the `roadmapData` structure (levels, topics, categories)
- `level1.js` … `levelN.js` — English lesson content blocks
- `exercises.js` — exercise/quiz data
- `scenarios.js` — scenario data
- `lang/en.js` — English UI strings
- `lang/<locale>.js` — translated UI strings for each supported locale
- `lang/manifest.js` — maps locale codes to content file names to load on demand
- `lang/<locale>/levelN.js` — translated lesson content blocks

---

## Scalability model

The shared engine is designed so future learning modules can be added without editing shared files.

- **`assets/js/engine.js`** is reused by all modules. It is only changed when a platform-wide behavior needs to change.
- **`assets/js/i18n.js`** is reused by all modules for the same reason.
- **`assets/css/engine.css`** is reused by all modules. Module-specific visual overrides, if ever needed, can be added via an additional module-local stylesheet loaded after the engine CSS.
- **Each module owns only its content, metadata, and translations.** The engine knows nothing about PCB-specific content; it reads from a generic `roadmapData` global and the i18n content registry.
- **Each module sets its own `MODULE_CONFIG.storageKey`** so progress is stored independently per module. A future "Robotics" module would set `storageKey: "roboticsProgress"`, keeping its data completely isolated.
- **Future modules are addable without touching the shared engine** unless the behavior truly needs to change at the platform level.

---

## GitHub Pages notes

- Static hosting only — no server-side code, no build step.
- All local asset paths must be relative. Root-relative paths (e.g. `/assets/...`) do not work reliably on GitHub Pages with a custom domain subfolder setup.
- Scripts are loaded with classic `<script src="...">` tags. No ES modules, no import/export.
- Direct routes like `https://openacademy.space/modules/pcb/` work because each module has its own `index.html`.
- `CNAME` at the repo root sets the custom domain for GitHub Pages. Do not delete or move it.

---

## Google AdSense notes

- The AdSense loader script (`pagead2.googlesyndication.com`) is included in both `index.html` (root) and `modules/pcb/index.html`. Do not remove or alter these tags.
- The AdSense client ID is `ca-pub-4757211359193207`. Do not change it.
- `ads.txt` must remain at the repo root (`/ads.txt`) and must not be moved. GitHub Pages serves it at `https://openacademy.space/ads.txt`, which is where ad networks look for it.
- Refactors must not move, wrap, defer, or otherwise disturb the AdSense loader script placement or attributes.
- Static hosting is fully compatible with AdSense; no server-side configuration is needed.

---

## Adding a new module

1. Copy `modules/pcb/` to a new folder, e.g. `modules/robotics/`.
2. In the new `index.html`, keep the `../../assets/...` references pointing to the shared engine, i18n, and CSS.
3. Set a unique `MODULE_CONFIG.storageKey`, e.g. `"roboticsProgress"`.
4. Update all module-specific metadata in `index.html`: `<title>`, meta description, OG tags, JSON-LD, `<h1>`, canonical URL, and static welcome copy.
5. Replace `levels.js` with the new module's roadmap structure.
6. Replace `level1.js` … `levelN.js` with the new module's English lesson content.
7. Replace `exercises.js` and `scenarios.js` with the new module's exercise and scenario data.
8. Replace `lang/en.js`, `lang/<locale>.js`, and `lang/manifest.js` with the new module's translations.
9. Add translated lesson files under `lang/<locale>/`.
10. Update the canonical `<link rel="canonical">` to the new module's URL.
11. Add a card or link for the new module on the root `index.html` landing page.

No shared engine files need to be edited for a new module.

---

## Local development

No build step is required.

```bash
python3 -m http.server 8000
```

Then open:
- http://localhost:8000/ — root landing page
- http://localhost:8000/modules/pcb/ — PCB trainer

---

## License

MIT
