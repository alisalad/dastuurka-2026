import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Simple script to create a PNG social card with the emblem
// This creates an HTML file that can be opened in browser to generate the PNG

const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Generate Social Media Card</title>
  <style>
    body { margin: 0; padding: 20px; font-family: Arial; }
    #canvas { border: 1px solid #ccc; }
    button { margin: 10px 0; padding: 10px 20px; font-size: 16px; cursor: pointer; }
  </style>
</head>
<body>
  <h2>Social Media Card Generator</h2>
  <p>Click the button to generate and download the OG image</p>
  <button onclick="generateCard()">Generate & Download</button>
  <br><br>
  <canvas id="canvas" width="1200" height="630"></canvas>

  <script>
    function generateCard() {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');

      // Background - light blue
      ctx.fillStyle = '#dbeafe';
      ctx.fillRect(0, 0, 1200, 630);

      // Load and draw emblem
      const img = new Image();
      img.onload = function() {
        // Center the emblem with low opacity
        ctx.globalAlpha = 0.15;
        const size = 400;
        ctx.drawImage(img, (1200 - size) / 2, (630 - size) / 2, size, size);
        ctx.globalAlpha = 1;

        // Add text
        ctx.fillStyle = '#0c4a6e';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Dastuurka Soomaaliya', 600, 300);

        ctx.fillStyle = '#18181b';
        ctx.font = 'bold 36px Arial';
        ctx.fillText('Somali Constitution', 600, 350);

        // Download
        canvas.toBlob(function(blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'og-image.png';
          a.click();
          URL.revokeObjectURL(url);
          alert('Downloaded! Save this as og-image.png in the public folder');
        });
      };
      img.src = '../somalia-emblem.svg';
    }
  </script>
</body>
</html>`;

writeFileSync(join(process.cwd(), 'generate-og-card.html'), htmlContent);
console.log('✓ Created generate-og-card.html');
console.log('\n📝 Instructions:');
console.log('1. Open generate-og-card.html in your browser');
console.log('2. Click "Generate & Download"');
console.log('3. Save the file as "og-image.png" in the public/ folder');
console.log('4. Run this script again after saving\n');
