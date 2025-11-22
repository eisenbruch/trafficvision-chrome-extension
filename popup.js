// Popup script that forwards messages between iframe and background
console.log('[Popup] Script loaded');

// Listen for messages from the iframe
window.addEventListener('message', (event) => {
  console.log('[Popup] Received message:', event.data);

  // Only process messages from our iframe
  if (event.data.source === 'trafficvision-extension') {
    console.log('[Popup] Processing TrafficVision message:', event.data.type);

    // Forward to background service worker
    chrome.runtime.sendMessage(event.data, (response) => {
      if (chrome.runtime.lastError) {
        console.error('[Popup] Error forwarding to background:', chrome.runtime.lastError);
      } else {
        console.log('[Popup] Background response:', response);
      }
    });
  }
});

console.log('[Popup] Message listener registered');
