/**
 * ============================================================
 * App Store Screenshot Configuration
 * ============================================================
 *
 * HOW TO EDIT:
 * 1. Change titles, subtitles, and descriptions below
 * 2. Replace images in /public/screenshots/ (use slide1.png, slide2.png, etc.)
 * 3. Adjust gradients/colors per slide
 * 4. Run `npm run dev` to preview, then click "Export All"
 */

export interface SlideConfig {
  /** Unique ID for the slide */
  id: string;
  /** Big headline text */
  title: string;
  /** Smaller description text below the headline */
  subtitle: string;
  /** Path to the app screenshot (relative to /public/) */
  screenshotPath: string;
  /** CSS gradient or solid color for the slide background */
  background: string;
  /** Optional: override title color (default: white) */
  titleColor?: string;
  /** Optional: override subtitle color (default: rgba(255,255,255,0.85)) */
  subtitleColor?: string;
}

export const brandConfig = {
  /** Brand name displayed in exports */
  name: "Your App Name",
  /** Path to horizontal logo (relative to /public/) */
  logoPath: "/images/logo.png",
  /** Primary accent color */
  accentColor: "#6366F1",
  /** Show logo on slides */
  showLogo: true,
  /** Logo position: "top" or "bottom" */
  logoPosition: "bottom" as "top" | "bottom",
};

/**
 * Apple App Store required resolutions:
 * - iPhone 6.7" (1290 x 2796) — iPhone 15 Pro Max, 14 Pro Max
 * - iPhone 6.5" (1284 x 2778) — iPhone 14 Plus, 13 Pro Max
 * - iPhone 5.5" (1242 x 2208) — iPhone 8 Plus (if supporting)
 *
 * This generator exports at 1290x2796 (6.7") by default.
 * Change below if you need different sizes.
 */
export const exportConfig = {
  /** Export width in pixels */
  width: 1290,
  /** Export height in pixels */
  height: 2796,
  /** Pixel ratio for rendering (2 = retina) */
  pixelRatio: 1,
  /** File name prefix for exported images */
  filePrefix: "appstore-screenshot",
};

export const slides: SlideConfig[] = [
  {
    id: "slide-1",
    title: "Your App's\nBig Feature",
    subtitle: "Describe the main value proposition here",
    screenshotPath: "/screenshots/slide1.png",
    background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    id: "slide-2",
    title: "Real-Time\nNotifications",
    subtitle: "Stay updated with instant push notifications",
    screenshotPath: "/screenshots/slide2.png",
    background: "linear-gradient(180deg, #0f3460 0%, #1a1a2e 100%)",
  },
  {
    id: "slide-3",
    title: "Built-In\nCommunity",
    subtitle: "Connect with like-minded people and grow together",
    screenshotPath: "/screenshots/slide3.png",
    background: "linear-gradient(180deg, #1a1a2e 0%, #2d1b4e 100%)",
  },
  {
    id: "slide-4",
    title: "Learn &\nGrow",
    subtitle: "Structured courses to level up your skills",
    screenshotPath: "/screenshots/slide4.png",
    background: "linear-gradient(180deg, #2d1b4e 0%, #1a1a2e 100%)",
  },
  {
    id: "slide-5",
    title: "Dashboard\n& Analytics",
    subtitle: "Track everything that matters in real time",
    screenshotPath: "/screenshots/slide5.png",
    background: "linear-gradient(180deg, #1a1a2e 0%, #0a2e1a 50%, #1a1a2e 100%)",
  },
  {
    id: "slide-6",
    title: "Secure &\nReliable",
    subtitle: "Your data is protected with enterprise-grade security",
    screenshotPath: "/screenshots/slide6.png",
    background: "linear-gradient(180deg, #0f3460 0%, #1a1a2e 50%, #2d1b4e 100%)",
  },
];
