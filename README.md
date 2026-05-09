# Duari HTML Prototype

Duari(듀아리: Duo + Diary) relationship record app prototype built as a static HTML/CSS/JS app.

Open `index.html` in a browser.

## AI API

AI refinement is handled by a local server so the OpenAI API key is not exposed in browser code.

```powershell
$env:OPENAI_API_KEY="your_api_key"
node server.js
```

Then open `http://localhost:3000` in a browser. The static `file://` page can also call the local API while `server.js` is running.

## Design System

- `DESIGN_SYSTEM.md`: image-reference-based visual system, component rules, accessibility notes
- `design-tokens.css`: reusable CSS variables and starter component classes
