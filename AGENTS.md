# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the single entry point and includes the main sections (nav, hero, about, work, projects, contact, footer).
- `css/styles.css` holds all styling: CSS variables, typography, layout, interactions, and responsive rules.
- `js/main.js` contains minimal progressive enhancement (adds `is-ready` on DOM ready).
- `assets/` stores static media (images/icons/SVGs) referenced by HTML/CSS (e.g., `assets/Group 2.png` for the favicon).

## Build, Test, and Development Commands
- No build step is required; this is a static site.
- Open `index.html` directly in a browser for local development.
- Optional local server for relative paths/CORS:
  - `python3 -m http.server 8000` (serves at `http://localhost:8000`).

## Coding Style & Naming Conventions
- Indentation: 2 spaces in HTML/CSS/JS.
- CSS: define reusable values in `:root` variables; class names are kebab-case (e.g., `site-nav`, `button-group`).
- JS: vanilla ES5/ES6, minimal DOM-focused behavior only; avoid frameworks.
- Keep markup semantic and sectioned with clear class names that mirror layout intent.

## UI Behavior & Interactions
- The navigation is fixed (`.site-nav`) and includes hover/focus states.
- Hero buttons are anchors styled as buttons:
  - “See my work” links to `#projects`.
  - “Lets connect” links to `#contact`.
- Footer links use the same hover/focus treatment as the nav; the phone number is padded for alignment.
- The contact form uses a `mailto:` action to send to `jatindavis5@gmail.com` and relies on the visitor’s email client.

## Testing Guidelines
- No automated tests are configured.
- Manual checks:
  - Desktop and mobile layout at `@media (max-width: 720px)`.
  - Light/dark theme rendering via `prefers-color-scheme`.
  - Fixed nav doesn’t overlap content (page top padding accounts for nav height).

## Commit & Pull Request Guidelines
- No commit message conventions are defined (no Git history available).
- If you add Git/PRs, include:
  - A short description of changes.
  - Screenshots for any visual updates.
  - Notes on how to verify locally.

## Performance Notes
- Keep the site lightweight: avoid heavy JS, large images, or unnecessary dependencies.
- Prefer optimized assets in `assets/` and keep CSS/JS minimal.

## Comments Policy
- Detailed in-file comments are present throughout HTML/CSS/JS for maintainability.
