# Weather App Frontend

## Requirements
- Node.js 18+ (LTS) and npm
- A GitHub repo named `weatherappfrontend` (or change `vite.config.js` base and package.json homepage)

## Local dev
```bash
npm install
npm run dev
# open http://localhost:5173
```

## Build for production (set API base)
The frontend reads the backend base URL from `import.meta.env.VITE_API_BASE`. You can set it inline when building:

```bash
# Unix/macOS
VITE_API_BASE=https://weather.backendsepp.org npm run build

# Windows (PowerShell)
$env:VITE_API_BASE = 'https://weather.backendsepp.org'; npm run build
```

## Deploy to GitHub Pages
Make sure your repo remote is set and you're on the main branch. Then:

```bash
# this pushes the content of `dist/` to the gh-pages branch
npm run deploy
```

If you prefer GitHub Actions or a separate Pages config (docs/ folder), adjust `vite.config.js` base accordingly.