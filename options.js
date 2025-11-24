// Options page script for TrafficVision.Live Chrome Extension

// Load saved settings when page opens
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();

  // Save button click handler
  document.getElementById('saveButton').addEventListener('click', saveSettings);
});

// Load settings from Chrome storage
function loadSettings() {
  chrome.storage.sync.get(['viewMode'], (result) => {
    const viewMode = result.viewMode || 'extension'; // Default to extension view

    // Set the appropriate radio button
    if (viewMode === 'extension') {
      document.getElementById('extensionMode').checked = true;
    } else {
      document.getElementById('homepageMode').checked = true;
    }

    console.log('[Options] Loaded settings:', result);
  });
}

// Save settings to Chrome storage
function saveSettings() {
  const viewMode = document.querySelector('input[name="viewMode"]:checked').value;

  chrome.storage.sync.set({ viewMode }, () => {
    console.log('[Options] Settings saved:', { viewMode });

    // Show success message
    const status = document.getElementById('status');
    status.classList.add('show');

    setTimeout(() => {
      status.classList.remove('show');
    }, 2000);
  });
}
