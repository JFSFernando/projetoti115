# Copilot Instructions for this Repository

This repository is a small static JavaScript/HTML learning project. There is no build pipeline, package manager, or automated tests in the current workspace.

## What this project is
- Simple client-side JavaScript exercises and examples.
- Files are primarily static HTML with embedded `<script>` blocks.
- The only standalone JS file is `teste.js/teste.js`, but it is not currently imported by any HTML page.
- The `Aula01/` folder contains example pages (`index.html`, `operadores.html`) showing basic JS operators, conditionals, math, and console output.

## How to edit and validate
- Changes should be visible by opening the HTML file in a browser and checking the browser console.
- There is no `npm`, `yarn`, `package.json`, or test command in this repository.
- Prefer plain `<script>` tags and browser-compatible ES syntax over module bundlers.

## Project-specific conventions
- Use Portuguese names/comments when matching existing examples, e.g. `idade`, `valorProduto`, `senha`, `categoria`.
- Keep code simple and imperative: loops, conditionals, arithmetic, strings, and console output.
- Avoid inventing backend/server code or build tooling; this repo is static front-end only.

## Important notes for Copilot-style edits
- Do not add Node.js-specific workflows unless the user explicitly adds a package manager or build config.
- If you create a separate JS file, ensure it is referenced with a `<script src="..."></script>` tag from the appropriate HTML file.
- If updating `index.html`, prefer `<script>` lowercase tags instead of `Script`/`Script>`.

## Files to reference
- `index.html` — root browser examples and conditionals.
- `teste.js/teste.js` — standalone JS exercise for summing arrays.
- `Aula01/index.html` — basic JS console outputs.
- `Aula01/operadores.html` — arithmetic and comparison examples.

If any section is unclear or missing, please indicate which area should be expanded. 