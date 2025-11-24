# TrafficVision.Live Chrome Extension

A Chrome extension that provides quick access to your favorite traffic cameras and custom routes from TrafficVision.Live.

![TrafficVision.Live Chrome Extension](media/trafficvisionlive-chrome-extension.webp)

## Features

- Access your favorite traffic cameras instantly from the Chrome side panel
- View your saved routes
- Resizable side panel interface for flexible viewing
- Seamless authentication with the main TrafficVision.Live site
- Background music streaming (Nightride FM) that continues even when side panel is closed

## Installation (Development)

1. Clone/download this repo
1. Open Chrome and navigate to `chrome://extensions/`
1. Enable **Developer mode** using the toggle in the top right corner
1. Click **Load unpacked**
1. Select the `trafficvision-chrome-extension` folder
1. The TrafficVision.Live extension icon will appear in your Chrome toolbar

## Usage

1. Click the TrafficVision.Live icon in your Chrome toolbar
2. The extension will open in the side panel showing your favorites view
3. Resize the side panel to your preferred width
4. Use the bottom navigation to switch between:
   - **FAVORITES** - Your favorite cameras
   - **MY ROUTES** - Your saved routes
5. Click **FULL SITE ↗** to open the full TrafficVision.Live website in a new tab
6. Click any route or camera to view details

### Extension Options

Customize how the extension displays content:

1. Navigate to `chrome://extensions/`
2. Find **TrafficVision.Live** extension
3. Click **Details**
4. Click **Extension options**
5. Choose your preferred view mode:
   - **Extension View (Recommended)** - Optimized layout for the side panel with favorites and routes. Best experience for quick camera access.
   - **Full Homepage** - Load the complete website homepage with map and all features. May require more scrolling in the side panel.
6. Click **Save Settings**
7. Close and reopen the extension to see the changes

### Background Music

The extension supports persistent background music streaming:

1. Open the extension and click the settings icon (⚙️)
2. Click the **MUSIC** button to toggle on/off
3. Music will continue playing even when you close the side panel
4. The music stream is managed by a background service worker
5. To stop the music, reopen the extension and toggle music off

## File Structure

```
trafficvision-chrome-extension/
├── manifest.json       # Extension configuration
├── sidepanel.html      # Side panel HTML
├── sidepanel.css       # Side panel styling
├── sidepanel.js        # Side panel script
├── options.html        # Extension options/settings page
├── options.js          # Options page logic
├── background.js       # Service worker for background music and side panel
├── offscreen.html      # Offscreen document for audio playback
├── offscreen.js        # Audio playback handler
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── media/              # Screenshots and assets
└── README.md           # This file
```


## Support

For issues or questions, visit [TrafficVision.Live](https://trafficvision.live) to contact the team.
