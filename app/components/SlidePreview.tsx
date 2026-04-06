"use client";

import React from "react";
import PhoneMockup from "./PhoneMockup";
import IPadMockup from "./iPadMockup";
import { SlideConfig, DeviceType, DEVICES, brandConfig } from "@/screenshots.config";

interface SlidePreviewProps {
  slide: SlideConfig;
  device: DeviceType;
  logoData: string | null;
  /** If true, render at full export resolution (for capture). Otherwise CSS-scale to fit parent. */
  fullSize?: boolean;
  id?: string;
}

/**
 * Always renders the slide at full device resolution internally.
 * In preview mode, wraps with CSS transform: scale() to fit within its container.
 */
export default function SlidePreview({
  slide,
  device,
  logoData,
  fullSize = false,
  id,
}: SlidePreviewProps) {
  const deviceConfig = DEVICES[device];
  const W = deviceConfig.width;
  const H = deviceConfig.height;
  const isTablet = deviceConfig.type === "tablet";

  const defaultScale = isTablet ? 0.65 : 0.58;
  const phoneWidth = W * (slide.deviceScale ?? defaultScale);
  const logoSrc = logoData; // Only use uploaded logo, not file paths that may 404

  const inner = (
    <div
      id={id}
      style={{
        width: W,
        height: H,
        background: slide.background,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Accent line — centered short bar matching reference design */}
      {slide.showAccentLine && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 80,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: `${slide.accentLineWidth ?? 10}%`,
              height: 4,
              borderRadius: 2,
              background: slide.accentLineColor,
            }}
          />
        </div>
      )}

      {/* Logo at top */}
      {brandConfig.showLogo && brandConfig.logoPosition === "top" && logoSrc && (
        <div style={{ marginTop: 120, marginBottom: 20 }}>
          <img
            src={logoSrc}
            alt={brandConfig.name}
            style={{ height: 60, objectFit: "contain" }}
          />
        </div>
      )}

      {/* Text content */}
      <div
        style={{
          paddingTop: slide.showAccentLine ? 0 : (brandConfig.logoPosition === "top" ? 40 : 160),
          paddingLeft: 80,
          paddingRight: 80,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        {/* Category label */}
        {slide.showCategory !== false && slide.category && (
          <div
            style={{
              fontSize: slide.categorySize ?? 28,
              fontWeight: 600,
              color: slide.categoryColor,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            {slide.category}
          </div>
        )}

        <h1
          style={{
            fontSize: slide.titleSize ?? 96,
            fontWeight: 800,
            color: slide.titleColor,
            lineHeight: 1.1,
            margin: 0,
            whiteSpace: "pre-line",
            letterSpacing: "-1px",
          }}
        >
          {slide.title}
        </h1>
        {slide.showSubtitle !== false && (
          <p
            style={{
              fontSize: slide.subtitleSize ?? 38,
              color: slide.subtitleColor,
              marginTop: 28,
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Device mockup */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 0,
          marginTop: 50 + (slide.deviceOffsetY ?? 0),
        }}
      >
        {isTablet ? (
          <IPadMockup
            screenshotSrc={slide.screenshotData}
            fallbackPath={slide.screenshotPath}
            frameWidth={phoneWidth}
            frameTint={slide.accentLineColor}
          />
        ) : (
          <PhoneMockup
            screenshotSrc={slide.screenshotData}
            fallbackPath={slide.screenshotPath}
            frameWidth={phoneWidth}
            frameTint={slide.accentLineColor}
          />
        )}
      </div>

      {/* Logo at bottom */}
      {brandConfig.showLogo && brandConfig.logoPosition === "bottom" && logoSrc && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <img
            src={logoSrc}
            alt={brandConfig.name}
            style={{ height: 50, objectFit: "contain", opacity: 0.8 }}
          />
        </div>
      )}
    </div>
  );

  if (fullSize) {
    return inner;
  }

  // Preview: render full-res but CSS-scale to fill container
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: W,
          height: H,
          transformOrigin: "top left",
          transform: `scale(var(--preview-scale, 0.28))`,
          position: "absolute",
          top: 0,
          left: 0,
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.parentElement;
          if (!parent) return;
          const observer = new ResizeObserver(() => {
            const pw = parent.clientWidth;
            const ph = parent.clientHeight;
            const scaleX = pw / W;
            const scaleY = ph / H;
            const scale = Math.min(scaleX, scaleY);
            el.style.setProperty("--preview-scale", String(scale));
            el.style.transform = `scale(${scale})`;
          });
          observer.observe(parent);
        }}
      >
        {inner}
      </div>
    </div>
  );
}
