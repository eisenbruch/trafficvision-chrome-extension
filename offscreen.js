// Offscreen document script for audio playback
// Service workers can't use Audio API, so we use an offscreen document

console.log('[Offscreen] Script loaded');

let audioElement = null;

// Listen for messages from the background service worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Offscreen] Received message:', message);

  if (message.type === 'START_MUSIC') {
    startMusic(message.url);
    sendResponse({ success: true });
  }

  if (message.type === 'STOP_MUSIC') {
    stopMusic();
    sendResponse({ success: true });
  }

  return true;
});

function startMusic(url) {
  console.log('[Offscreen] Starting music:', url);

  // If already playing, don't restart
  if (audioElement && !audioElement.paused) {
    console.log('[Offscreen] Music already playing');
    return;
  }

  // Create audio element if it doesn't exist
  if (!audioElement) {
    audioElement = new Audio();
    audioElement.volume = 0.3; // 30% volume
    audioElement.crossOrigin = 'anonymous';

    audioElement.addEventListener('error', (e) => {
      console.error('[Offscreen] Audio error:', e, audioElement.error);
      chrome.runtime.sendMessage({
        type: 'AUDIO_ERROR',
        error: audioElement.error ? audioElement.error.message : 'Unknown error'
      });
    });

    audioElement.addEventListener('playing', () => {
      console.log('[Offscreen] Music started playing');
      chrome.runtime.sendMessage({ type: 'AUDIO_PLAYING' });
    });

    audioElement.addEventListener('pause', () => {
      console.log('[Offscreen] Music paused');
    });

    audioElement.addEventListener('loadeddata', () => {
      console.log('[Offscreen] Audio data loaded');
    });

    audioElement.addEventListener('canplay', () => {
      console.log('[Offscreen] Audio can play');
    });
  }

  // Chrome doesn't natively support HLS m3u8 streams
  // Try the direct AAC stream instead
  const directStreamUrl = 'https://stream.nightride.fm/nightride.m4a';

  audioElement.src = directStreamUrl;
  console.log('[Offscreen] Set audio source to:', directStreamUrl);

  audioElement.play()
    .then(() => {
      console.log('[Offscreen] Music playback started successfully');
    })
    .catch(error => {
      console.error('[Offscreen] Error playing music:', error);

      // Try the HLS URL as fallback (might work in some browsers)
      console.log('[Offscreen] Trying HLS URL as fallback...');
      audioElement.src = url;
      audioElement.play().catch(err => {
        console.error('[Offscreen] HLS stream also failed:', err);
        chrome.runtime.sendMessage({
          type: 'AUDIO_ERROR',
          error: err.message
        });
      });
    });
}

function stopMusic() {
  console.log('[Offscreen] Stopping music...');

  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
}
