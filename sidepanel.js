// Side panel script for TrafficVision.Live
console.log('TrafficVision.Live side panel loaded');

// Load the appropriate URL based on user settings
chrome.storage.sync.get(['viewMode'], (result) => {
  const viewMode = result.viewMode || 'extension'; // Default to extension view
  const iframe = document.getElementById('app-iframe');

  if (viewMode === 'extension') {
    iframe.src = 'https://trafficvision.live/chrome-extension?v=18';
  } else {
    iframe.src = 'https://trafficvision.live/?v=18';
  }

  console.log('[SidePanel] Loading view mode:', viewMode, '- URL:', iframe.src);
});

// Listen for messages from the iframe (React app)
window.addEventListener('message', (event) => {
  console.log('[SidePanel] Received message:', event.data);

  // Verify the message is from our app
  if (event.data && event.data.source === 'trafficvision-extension') {
    // Forward music toggle to background service worker
    if (event.data.type === 'MUSIC_TOGGLE') {
      console.log('[SidePanel] Forwarding music toggle to background:', event.data.enabled);

      chrome.runtime.sendMessage({
        type: 'MUSIC_TOGGLE',
        enabled: event.data.enabled
      }, (response) => {
        console.log('[SidePanel] Music toggle response:', response);
      });
    }
  }
});
