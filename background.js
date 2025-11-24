// Background service worker for TrafficVision.Live Chrome Extension
// Handles persistent music streaming that continues even when popup is closed

let musicEnabled = false;
let offscreenDocumentCreated = false;

// Stream URL for Nightride FM
const STREAM_URL = 'https://stream.nightride.fm:8443/nightride/aac_hifi.m3u8';

// Create offscreen document for audio playback
async function createOffscreenDocument() {
  if (offscreenDocumentCreated) return;

  try {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'Playing background music stream'
    });
    offscreenDocumentCreated = true;
    console.log('[Background] Offscreen document created');
  } catch (error) {
    console.error('[Background] Error creating offscreen document:', error);
  }
}

// Update extension badge to show music status
function updateBadge(isPlaying) {
  if (isPlaying) {
    // Set badge with music note emoji and green background
    chrome.action.setBadgeText({ text: '♫' });
    chrome.action.setBadgeBackgroundColor({ color: '#00ff00' });
    chrome.action.setTitle({ title: 'TrafficVision.Live - Music Playing' });
  } else {
    // Clear badge
    chrome.action.setBadgeText({ text: '' });
    chrome.action.setTitle({ title: 'TrafficVision.Live' });
  }
}

// Store auth tokens temporarily
let pendingAuthTokens = new Map();

// Listen for messages from the popup/iframe
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Background] Received message:', message);

  if (message.type === 'MUSIC_TOGGLE') {
    musicEnabled = message.enabled;

    if (musicEnabled) {
      startMusic();
      updateBadge(true);
      sendResponse({ success: true, playing: true });
    } else {
      stopMusic();
      updateBadge(false);
      sendResponse({ success: true, playing: false });
    }
    return true;
  }

  if (message.type === 'MUSIC_STATUS') {
    sendResponse({ enabled: musicEnabled, playing: musicEnabled });
    return true;
  }

  // Handle auth token storage from auth tab
  if (message.type === 'AUTH_TOKEN_STORE') {
    console.log('[Background] Storing auth token');
    pendingAuthTokens.set('latest', {
      token: message.token,
      userData: message.userData
    });

    // Notify all open popups about auth completion
    chrome.runtime.sendMessage({
      type: 'AUTH_COMPLETE',
      token: message.token,
      userData: message.userData
    }).catch(() => {
      // Popup might be closed, that's ok
      console.log('[Background] No popup to notify');
    });

    sendResponse({ success: true });
    return true;
  }

  // Handle auth token retrieval from extension popup
  if (message.type === 'AUTH_TOKEN_GET') {
    const authData = pendingAuthTokens.get('latest');
    if (authData) {
      sendResponse({ success: true, ...authData });
      // Clear after retrieval
      pendingAuthTokens.delete('latest');
    } else {
      sendResponse({ success: false });
    }
    return true;
  }

  // Messages from offscreen document
  if (message.type === 'AUDIO_PLAYING') {
    console.log('[Background] Audio playback started');
    updateBadge(true);
  }

  if (message.type === 'AUDIO_ERROR') {
    console.error('[Background] Audio error from offscreen:', message.error);
    updateBadge(false);
  }
});

async function startMusic() {
  console.log('[Background] Starting music...');

  // Create offscreen document if needed
  await createOffscreenDocument();

  // Send message to offscreen document to start music
  try {
    await chrome.runtime.sendMessage({
      type: 'START_MUSIC',
      url: STREAM_URL
    });
    console.log('[Background] Start music message sent');
  } catch (error) {
    console.error('[Background] Error sending start music message:', error);
  }
}

async function stopMusic() {
  console.log('[Background] Stopping music...');

  if (!offscreenDocumentCreated) return;

  try {
    await chrome.runtime.sendMessage({
      type: 'STOP_MUSIC'
    });
    console.log('[Background] Stop music message sent');
  } catch (error) {
    console.error('[Background] Error sending stop music message:', error);
  }
}

// Keep service worker alive
chrome.runtime.onStartup.addListener(() => {
  console.log('[Background] Extension started');
  // Restore badge if music was playing
  if (musicEnabled) {
    updateBadge(true);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('[Background] Extension installed/updated');
  // Restore badge if music was playing
  if (musicEnabled) {
    updateBadge(true);
  }
});

console.log('[Background] Service worker loaded');

// Initial badge update in case service worker restarted
if (musicEnabled) {
  updateBadge(true);
}

// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
  await chrome.sidePanel.open({ windowId: tab.windowId });
});
