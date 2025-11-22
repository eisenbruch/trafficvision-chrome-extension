# TrafficVision.Live Chrome Extension - Build Guide

## Summary for New Claude Code Agent

**Project**: Chrome Extension for TrafficVision.Live

**Goal**: Create a minimal Chrome extension that embeds the TrafficVision.Live web app (specifically the `/chrome-extension` route) in a popup window.

---

## Context

The main TrafficVision.Live website already has Chrome extension-optimized pages built at:
- `/chrome-extension` - Favorites view (default landing page)
- `/chrome-extension/routes` - My Routes list
- `/chrome-extension/route/:slug` - Route detail pages

These pages have:
- Mobile-only layout optimized for 300-400px wide popup
- Compact header with logo, "FULL SITE ↗" button, About and Settings panels
- Bottom navigation with MY ROUTES and FAVORITES tabs
- All authentication, routes, and favorites functionality from the main app
- Same cyberpunk theme and styling

---

## Extension Requirements

**Manifest v3 Chrome Extension** with:

### 1. manifest.json
- Name: "TrafficVision.Live"
- Description: "View your favorite traffic cameras and routes"
- Version: "1.0.0"
- Manifest version: 3
- Popup: popup.html
- Icons: 16x16, 48x48, 128x128 PNG icons
- Permissions: none required (just loads iframe)

### 2. popup.html
- Simple HTML page that iframes `https://trafficvision.live/chrome-extension`
- Popup dimensions: 400px wide, 600px tall
- No scrollbars, full viewport
- Minimal styling

### 3. popup.css (optional)
- Remove margins/padding
- Ensure iframe fills entire popup
- Hide scrollbars

### 4. Icons
- Need 16x16, 48x48, 128x128 PNG icons
- Can use placeholder icons initially (suggest describing what to use - the TrafficVision logo with neon green/cyberpunk theme)

---

## Technical Approach

The extension should simply iframe the existing web app:

```html
<iframe src="https://trafficvision.live/chrome-extension"
        width="400"
        height="600"
        frameborder="0"></iframe>
```

**Key points:**
- No complex JavaScript needed - the web app handles everything
- User authentication state persists via cookies (same domain)
- All features work through the iframe
- Clicking "FULL SITE ↗" opens the full site in a new tab
- Creating/editing routes opens the full site in a new tab

---

## File Structure

```
trafficvision-chrome-extension/
├── manifest.json
├── popup.html
├── popup.css (optional)
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

---

## Testing

1. Load unpacked extension in Chrome: navigate to `chrome://extensions/`
2. Enable "Developer mode" toggle (top right)
3. Click "Load unpacked" button
4. Select the `trafficvision-chrome-extension` folder
5. Click the extension icon in Chrome toolbar to test

---

## Future Publishing

1. Zip the extension folder (excluding any development files)
2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
3. Pay one-time $5 developer registration fee (if not already registered)
4. Click "New Item" and upload the ZIP file
5. Fill out store listing:
   - Detailed description
   - Screenshots of the extension in action
   - Privacy policy URL (if collecting data)
   - Category: Productivity
6. Submit for review (typically 1-3 days)
7. Extension ID and public store listing will be created after approval

---

## Implementation Instructions

Please create this Chrome extension following the structure above. The extension should:

1. Create a clean, minimal popup that iframes the TrafficVision.Live chrome extension page
2. Use proper manifest v3 format
3. Include placeholder icons (can be simple colored squares with "TV" text initially)
4. Ensure the iframe loads without scrollbars and fills the popup window
5. Add a README.md explaining how to install and use the extension
