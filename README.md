# Open Academy Dot Space

**Live:** https://openacademy.space

Free, browser-based technical learning modules with structured lessons, exercises, and real-world scenarios.

---

## Module table

| ID  | Title | Status | Levels | Topics | Exercises | Scenarios | Languages |
|-----|-------|--------|--------|--------|-----------|-----------|-----------|
| pcb | Electronics & PCB Design Trainer | Active | 4 | 34 | 84 | 34 | EN, DE |
| robotics | Robotics & Autonomy Trainer | Active | 4 | 24 | 72 | 24 | EN, DE |
| computervision | Modern Computer Vision Trainer | Active | 4 | 29 | 87 | 29 | EN, DE |
| rlrobotics | RL for Robotics Trainer | Active | 4 | 29 | 87 | 29 | EN, DE |
| ros2 | ROS 2 Interactive Course | Active | 4 | 30 | 90 | 30 | EN, DE |
| sensorfusion | Sensor Fusion & Signal Processing Trainer | Active | 4 | 15 | 45 | 15 | EN, DE |
| tinyml | TinyML & Edge AI Trainer | Active | 4 | 23 | 64 | 23 | EN, DE |

---

## Architecture

```
/
├── assets/
│   ├── css/
│   │   ├── engine.css        ← Shared learning UI stylesheet
│   │   └── oads-ads.css      ← Shared ad-rail layout and ad styles
│   ├── js/
│   │   ├── engine.js             ← Shared learning engine (all modules)
│   │   ├── i18n.js               ← Shared i18n runtime (all modules)
│   │   ├── oads-ads-config.js    ← Central AdSense slot config
│   │   └── oads-ads.js           ← AdSense region-to-slot mounting logic
│   ├── icons/                ← Favicon and PWA icons
│   └── logo/                 ← Logo assets
│
├── modules/
│   ├── pcb/                  ← Electronics & PCB Design Trainer
│   ├── robotics/             ← Robotics & Autonomy Trainer
│   ├── computervision/       ← Modern Computer Vision Trainer
│   └── rlrobotics/           ← RL for Robotics Trainer
│   ├── ros2/                 ← ROS 2 Interactive Course
│   └── sensorfusion/         ← Sensor Fusion & Signal Processing Trainer
│   └── tinyml/                 ← TinyML & Edge AI Trainer
│
│   (Each module folder contains: index.html, levels.js, level1..4.js,
│    exercises.js, scenarios.js, and lang/ with EN/DE content files)
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
- **Each module sets its own `MODULE_CONFIG.storageKey`** so progress is stored independently per module (`electronicsProgress`, `roboticsProgress`, `computervisionProgress`, `rlroboticsProgress`, `tinymlProgress`, and other module keys).
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

- The AdSense loader script (`pagead2.googlesyndication.com`) is included in `index.html`, `privacy.html`, and each module `index.html`. Do not remove or alter these tags.
- The AdSense client ID is `ca-pub-4757211359193207`. Do not change it.
- `ads.txt` must remain at the repo root (`/ads.txt`) and must not be moved. GitHub Pages serves it at `https://openacademy.space/ads.txt`, which is where ad networks look for it.
- Refactors must not move, wrap, defer, or otherwise disturb the AdSense loader script placement or attributes.
- Static hosting is fully compatible with AdSense; no server-side configuration is needed.
- Display ads use `assets/css/oads-ads.css`, `assets/js/oads-ads-config.js` (all IDs in one place), and `assets/js/oads-ads.js`. Root `index.html` and `privacy.html` use `data-oads-slot="siteRail"`; modules use `data-oads-slot="moduleRail"`.
- Set **`defaultSlot`** to one numeric ad unit ID to fill every region, or set **`slots.siteRail`** / **`slots.moduleRail`** for separate reporting.
- Empty slot keys with no `defaultSlot` collapse that ad region to full-width content.
- Each module is a single HTML document; the right ad rail stays fixed while in-app views change via JavaScript.

---

## Adding a new module

1. Copy `modules/pcb/` to a new folder, e.g. `modules/robotics/`.
2. In the new `index.html`, keep the `../../assets/...` references pointing to the shared engine, i18n, CSS, and (if you use ads) `oads-ads.css`, `oads-ads-config.js`, and `oads-ads.js`. Add a matching key under `OADS_ADS.slots` in `oads-ads-config.js` only if you do not use `defaultSlot` (mirror the PCB module’s `data-oads-slot` name).
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
- http://localhost:8000/modules/robotics/ — Robotics trainer
- http://localhost:8000/modules/computervision/ — Computer Vision trainer
- http://localhost:8000/modules/rlrobotics/ — RL for Robotics trainer
- http://localhost:8000/modules/tinyml/ — TinyML & Edge AI trainer

---

## License

[MIT](LICENSE)
