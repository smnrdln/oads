# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Open Academy Dot Space is a **static** learning site (HTML/CSS/JS). There is no `package.json`, no build step, and no backend services. All interactivity runs in the browser (`assets/js/engine.js`, `assets/js/i18n.js`).

### Running locally

From the repo root:

```bash
python3 -m http.server 8000
```

Then open:

- Landing: http://localhost:8000/
- Example module: http://localhost:8000/modules/pcb/

Use a real HTTP server (not `file://`). Modules load translated lesson scripts dynamically via `i18n.js`, which requires HTTP paths.

Prefer a **tmux** session for the dev server so it survives backgrounding (e.g. session name `oads-dev-server`).

### Lint / test / build

| Task | Status |
|------|--------|
| Lint | Not configured in-repo |
| Unit/E2E tests | Not committed (`.gitignore` may reference optional local `tests/test_*.py`) |
| Build | None — deploy is static files (GitHub Pages) |

### Optional services

- **Google AdSense**: loader tags exist on pages; ads are disabled in `assets/js/oads-ads-config.js` (`OADS_ADS.enabled: false`). No AdSense network is required for local dev.
- **Content generators** (`modules/*/_gen_*.py`): maintainer-only; not needed to run the site.

### Gotchas

- Root-relative asset paths (e.g. `/assets/...`) are discouraged for GitHub Pages; modules use `../../assets/...` relative paths — keep that pattern when adding modules.
- README’s module table may list fewer modules than `index.html` / `modules/` (e.g. `embeddedsystems`, `embeddedlinux`, `firmware` exist on disk but are omitted from the README table).
