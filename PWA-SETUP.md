# PWA Setup for Dastuurka

## ✅ What's Been Configured

The website is now a **Progressive Web App (PWA)** with the following features:

- ✨ **Offline Access**: Entire constitution available without internet
- 📱 **Installable**: Can be added to home screen like a native app
- 🚀 **Fast Loading**: Content cached for instant access
- 🎨 **Theme Color**: Sky blue (#0284c7) matches the brand
- 💾 **Smart Caching**: Fonts and static assets cached automatically

## 📋 Current Status

- [x] PWA plugin installed and configured
- [x] Service worker set up
- [x] Manifest file configured
- [x] Meta tags added for iOS/Android
- [x] Caching strategy implemented
- [ ] Custom app icons (using placeholders)

## 🎨 App Icons - Action Required

Currently using **SVG placeholder icons** (letter "D" on blue background). 

### To Replace with Custom Icons:

**Option 1: Use Browser Tool**
1. Open `create-icons.html` in your browser
2. It will auto-download `icon-192.png` and `icon-512.png`
3. Move them to the `public/` folder
4. Update `astro.config.mjs` to use `.png` instead of `.svg`

**Option 2: Design Custom Icons**
1. Create a 512x512px icon design (your logo/branding)
2. Export as PNG in two sizes: 192x192 and 512x512
3. Name them `icon-192.png` and `icon-512.png`
4. Place in `public/` folder
5. Update `astro.config.mjs` file format from `svg+xml` to `png`

**Option 3: Use Online Tools**
- [favicon.io](https://favicon.io/) - Generate from text or image
- [PWA Asset Generator](https://progressier.com/pwa-icons-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

## 🧪 Testing the PWA

### Local Testing:
```bash
npm run build
npm run preview
```

Then visit http://localhost:4321 and:
- Open DevTools > Application > Service Workers (should show registered)
- Check "Manifest" tab to see app details
- Try "Install App" button in browser address bar

### Mobile Testing:
1. Deploy to production (Netlify/Vercel)
2. Visit on mobile device
3. Look for "Add to Home Screen" prompt
4. Install and test offline mode

## 📱 How Users Will Experience It

1. **First Visit**: Normal website load, service worker installs in background
2. **Install Prompt**: Browser suggests "Add to Home Screen"
3. **After Install**: App icon appears on home screen
4. **Opening**: Launches in full-screen, no browser UI
5. **Offline**: Works without internet (after first visit)

## 🔧 Configuration Details

- **Name**: "Dastuurka Soomaaliya - Somali Constitution"
- **Short Name**: "Dastuurka"
- **Theme**: Sky blue (#0284c7)
- **Display**: Standalone (full-screen)
- **Start URL**: Homepage (/)
- **Scope**: Entire site

## 📝 Next Steps

1. Generate proper PNG icons (see options above)
2. Test PWA functionality: `npm run build && npm run preview`
3. Deploy to production
4. Test on actual mobile devices
5. Consider adding an "Install App" button in the UI

## 🐛 Troubleshooting

**Service worker not registering?**
- Make sure you're testing on HTTPS or localhost
- Check browser DevTools console for errors
- Try hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

**Icons not showing?**
- Replace SVG placeholders with PNG files
- Clear cache and rebuild
- Check file paths in `astro.config.mjs`

**Not working offline?**
- Visit a few pages first (to cache them)
- Wait a few seconds after page load
- Check Service Worker is active in DevTools

---

🎉 **Your constitution is now a PWA!** Users can access their rights and laws anytime, anywhere, even offline.
