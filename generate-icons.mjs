import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(0, 0, size, size);
  
  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.5}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('D', size / 2, size / 2);
  
  const buffer = canvas.toBuffer('image/png');
  writeFileSync(join(__dirname, 'public', filename), buffer);
  console.log(`✓ Created ${filename}`);
}

try {
  createIcon(192, 'icon-192.png');
  createIcon(512, 'icon-512.png');
  console.log('\n✨ PWA icons generated successfully!');
} catch (error) {
  console.error('Note: canvas package not installed. Please generate icons manually.');
  console.error('Open create-icons.html in a browser to generate icons.');
}
