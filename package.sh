#!/bin/bash

# Package Chrome extension for Web Store submission
OUTPUT="TrafficVisionLive-Chrome.zip"

# Remove existing package if it exists
rm -f "$OUTPUT"

# Create zip with only necessary files
zip "$OUTPUT" \
  manifest.json \
  background.js \
  sidepanel.html \
  sidepanel.js \
  sidepanel.css \
  options.html \
  options.js \
  offscreen.html \
  offscreen.js \
  icons/icon16.png \
  icons/icon48.png \
  icons/icon128.png

echo "Package created: $OUTPUT"
