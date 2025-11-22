# TrafficVision.Live Chrome Extension

A Chrome extension that provides quick access to your favorite traffic cameras and routes from TrafficVision.Live.

## Features

- Access your favorite traffic cameras instantly from the Chrome toolbar
- View your saved routes
- Compact popup interface optimized for quick viewing
- Seamless authentication with the main TrafficVision.Live site
- Background music streaming (Nightride FM) that continues even when popup is closed

## Installation (Development)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** using the toggle in the top right corner
3. Click **Load unpacked**
4. Select the `trafficvision-chrome-extension` folder
5. The TrafficVision.Live extension icon will appear in your Chrome toolbar

## Usage

1. Click the TrafficVision.Live icon in your Chrome toolbar
2. The extension will open showing your favorites view
3. Use the bottom navigation to switch between:
   - **FAVORITES** - Your favorite cameras
   - **MY ROUTES** - Your saved routes
4. Click **FULL SITE ↗** to open the full TrafficVision.Live website in a new tab
5. Click any route or camera to view details

### Background Music

The extension supports persistent background music streaming:

1. Open the extension and click the settings icon (⚙️)
2. Click the **MUSIC** button to toggle on/off
3. Music will continue playing even when you close the extension popup
4. The music stream is managed by a background service worker
5. To stop the music, reopen the extension and toggle music off

## Technical Details

- **Manifest Version**: 3
- **Popup Dimensions**: 400px × 600px
- **Content**: Embeds the TrafficVision.Live `/chrome-extension` route via iframe
- **Permissions**: None required (loads public web content)

## File Structure

```
trafficvision-chrome-extension/
├── manifest.json       # Extension configuration
├── popup.html          # Popup window HTML
├── popup.css           # Popup styling
├── background.js       # Service worker for background music
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # This file
```

## Publishing to Chrome Web Store

1. Zip the extension folder (exclude any development files)
2. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
3. Pay the one-time $5 developer registration fee (if not already registered)
4. Click **New Item** and upload the ZIP file
5. Fill out the store listing with descriptions and screenshots
6. Submit for review (typically 1-3 days)

## Support

For issues or questions, visit [TrafficVision.Live](https://trafficvision.live)
