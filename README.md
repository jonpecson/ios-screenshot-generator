# iOS Screenshot Generator

Generate App Store screenshots for your iOS app. Built with Next.js, Tailwind CSS, and `html-to-image`.

![Preview](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![License](https://img.shields.io/badge/license-MIT%20%2B%20Commons%20Clause-blue)

## Features

- Pure CSS iPhone mockup frame (no image assets needed)
- Edit titles, descriptions, and colors from a single config file
- Export at Apple's required resolutions (1290x2796 for iPhone 6.7")
- Supports up to 10 slides
- One-click "Export All" to download PNGs
- Dark preview UI

## Quick Start

```bash
git clone https://github.com/jonpecson/ios-screenshot-generator.git
cd ios-screenshot-generator
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How to Use

### 1. Add your screenshots

Drop your app screenshots into `/public/screenshots/` as:
- `slide1.png`
- `slide2.png`
- `slide3.png`
- etc.

### 2. Add your logo (optional)

Place your app logo at `/public/images/logo.png`

### 3. Edit the config

Open `screenshots.config.ts` and customize:

```typescript
// Change your brand
export const brandConfig = {
  name: "Your App Name",
  logoPath: "/images/logo.png",
  accentColor: "#6366F1",  // Your brand color
  showLogo: true,
  logoPosition: "bottom",
};

// Edit each slide
export const slides = [
  {
    id: "slide-1",
    title: "Your App's\nBig Feature",
    subtitle: "Describe the main value proposition here",
    screenshotPath: "/screenshots/slide1.png",
    background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
  },
  // ... add more slides
];
```

### 4. Export

Click **Export All Screenshots** in the browser to download PNGs at the correct App Store resolution.

## Export Resolutions

| Device | Resolution | Supported |
|--------|-----------|-----------|
| iPhone 6.7" (15 Pro Max) | 1290 x 2796 | Default |
| iPhone 6.5" (14 Plus) | 1284 x 2778 | Change in config |
| iPhone 5.5" (8 Plus) | 1242 x 2208 | Change in config |

Edit `exportConfig` in `screenshots.config.ts` to change the resolution.

## Project Structure

```
├── screenshots.config.ts    # Edit this file to customize slides
├── public/
│   ├── screenshots/         # Drop your app screenshots here
│   └── images/              # Your logo goes here
├── app/
│   ├── page.tsx             # Preview page
│   └── components/
│       ├── SlideCard.tsx     # Individual slide renderer
│       ├── PhoneMockup.tsx   # CSS iPhone frame
│       └── ExportEngine.tsx  # Export logic
```

## License

MIT + Commons Clause — free to use, modify, and share. Cannot be sold as a product or service.

## Author

[Jon Pecson](https://github.com/jonpecson)
