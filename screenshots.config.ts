/**
 * ============================================================
 * App Store Screenshot Configuration
 * ============================================================
 *
 * This file provides the DEFAULT initial state for the in-browser editor.
 * All changes are made live in the editor — no need to edit this file.
 */

export interface SlideConfig {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  screenshotData: string | null; // base64 data URL from file picker
  screenshotPath: string; // fallback path in /public/
  background: string;
  titleColor: string;
  subtitleColor: string;
  categoryColor: string;
  accentLineColor: string;
  showAccentLine: boolean;
  /** Show/hide category label (default: true) */
  showCategory?: boolean;
  /** Show/hide subtitle (default: true) */
  showSubtitle?: boolean;
  /** Device mockup size as percentage of slide width (0.3 to 0.9, default: 0.58 phone / 0.65 tablet) */
  deviceScale?: number;
  /** Vertical offset for the device mockup in pixels (positive = lower) */
  deviceOffsetY?: number;
}

export type DeviceType =
  | "iphone-6.7"
  | "iphone-6.5"
  | "ipad-12.9"
  | "ipad-11";

export interface DeviceConfig {
  label: string;
  width: number;
  height: number;
  type: "phone" | "tablet";
}

export const DEVICES: Record<DeviceType, DeviceConfig> = {
  "iphone-6.7": { label: 'iPhone 6.7"', width: 1290, height: 2796, type: "phone" },
  "iphone-6.5": { label: 'iPhone 6.5"', width: 1284, height: 2778, type: "phone" },
  "ipad-12.9": { label: 'iPad Pro 12.9"', width: 2048, height: 2732, type: "tablet" },
  "ipad-11": { label: 'iPad Pro 11"', width: 1668, height: 2388, type: "tablet" },
};

export const brandConfig = {
  name: "Empire Crypto Trading",
  logoPath: "/images/logo-horizontal.png",
  accentColor: "#C9A84C",
  showLogo: true,
  logoPosition: "bottom" as "top" | "bottom",
};

export const defaultSlides: SlideConfig[] = [
  {
    id: "slide-1",
    title: "Your App's\nBig Feature",
    subtitle: "Describe the main value proposition here",
    category: "FEATURED",
    screenshotData: null,
    screenshotPath: "/screenshots/slide1.png",
    background: "#0a0a0a",
    titleColor: "#FFFFFF",
    subtitleColor: "#888888",
    categoryColor: "#C9A84C",
    accentLineColor: "#C9A84C",
    showAccentLine: true,
  },
  {
    id: "slide-2",
    title: "Real-Time\nNotifications",
    subtitle: "Stay updated with instant push notifications",
    category: "ALERTS",
    screenshotData: null,
    screenshotPath: "/screenshots/slide2.png",
    background: "#0a0a0a",
    titleColor: "#FFFFFF",
    subtitleColor: "#888888",
    categoryColor: "#C9A84C",
    accentLineColor: "#C9A84C",
    showAccentLine: true,
  },
  {
    id: "slide-3",
    title: "Join the\nCommunity",
    subtitle: "Connect with like-minded traders and grow together",
    category: "COMMUNITY",
    screenshotData: null,
    screenshotPath: "/screenshots/slide3.png",
    background: "#0a0a0a",
    titleColor: "#FFFFFF",
    subtitleColor: "#888888",
    categoryColor: "#C9A84C",
    accentLineColor: "#C9A84C",
    showAccentLine: true,
  },
  {
    id: "slide-4",
    title: "Learn &\nGrow",
    subtitle: "Structured courses to level up your skills",
    category: "EDUCATION",
    screenshotData: null,
    screenshotPath: "/screenshots/slide4.png",
    background: "#0a0a0a",
    titleColor: "#FFFFFF",
    subtitleColor: "#888888",
    categoryColor: "#C9A84C",
    accentLineColor: "#C9A84C",
    showAccentLine: true,
  },
  {
    id: "slide-5",
    title: "Dashboard\n& Analytics",
    subtitle: "Track everything that matters in real time",
    category: "ANALYTICS",
    screenshotData: null,
    screenshotPath: "/screenshots/slide5.png",
    background: "#0a0a0a",
    titleColor: "#FFFFFF",
    subtitleColor: "#888888",
    categoryColor: "#C9A84C",
    accentLineColor: "#C9A84C",
    showAccentLine: true,
  },
  {
    id: "slide-6",
    title: "Secure &\nReliable",
    subtitle: "Your data is protected with enterprise-grade security",
    category: "SECURITY",
    screenshotData: null,
    screenshotPath: "/screenshots/slide6.png",
    background: "#0a0a0a",
    titleColor: "#FFFFFF",
    subtitleColor: "#888888",
    categoryColor: "#C9A84C",
    accentLineColor: "#C9A84C",
    showAccentLine: true,
  },
];
