"use client";

import React from "react";
import PhoneMockup from "./PhoneMockup";
import { SlideConfig, brandConfig } from "@/screenshots.config";

interface SlideCardProps {
  slide: SlideConfig;
  /** If true, render at full export size; otherwise render scaled preview */
  fullSize?: boolean;
}

/**
 * A single App Store screenshot slide.
 * Contains background, headline, subtitle, phone mockup, and optional logo.
 */
export default function SlideCard({ slide, fullSize = false }: SlideCardProps) {
  // Full export dimensions: 1290x2796
  // Preview: scaled down proportionally
  const exportWidth = 1290;
  const exportHeight = 2796;

  // For preview, render at a smaller scale
  const previewScale = 0.18;
  const width = fullSize ? exportWidth : exportWidth * previewScale;
  const height = fullSize ? exportHeight : exportHeight * previewScale;

  const titleColor = slide.titleColor || "#FFFFFF";
  const subtitleColor = slide.subtitleColor || "rgba(255,255,255,0.85)";

  // Phone frame width relative to slide width
  const phoneWidth = fullSize ? exportWidth * 0.58 : width * 0.58;

  if (fullSize) {
    // Full-size render for export (rendered at actual pixel dimensions)
    return (
      <div
        style={{
          width: exportWidth,
          height: exportHeight,
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
        {/* Logo at top */}
        {brandConfig.showLogo && brandConfig.logoPosition === "top" && (
          <div style={{ marginTop: 120, marginBottom: 20 }}>
            <img
              src={brandConfig.logoPath}
              alt={brandConfig.name}
              style={{ height: 60, objectFit: "contain" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        {/* Text content */}
        <div
          style={{
            paddingTop: brandConfig.logoPosition === "top" ? 40 : 180,
            paddingLeft: 80,
            paddingRight: 80,
            textAlign: "center",
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: titleColor,
              lineHeight: 1.1,
              margin: 0,
              whiteSpace: "pre-line",
              letterSpacing: "-1px",
            }}
          >
            {slide.title}
          </h1>
          <p
            style={{
              fontSize: 42,
              color: subtitleColor,
              marginTop: 30,
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            {slide.subtitle}
          </p>
        </div>

        {/* Phone mockup */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 0,
            marginTop: 60,
          }}
        >
          <PhoneMockup
            screenshotPath={slide.screenshotPath}
            frameWidth={phoneWidth}
          />
        </div>

        {/* Logo at bottom */}
        {brandConfig.showLogo && brandConfig.logoPosition === "bottom" && (
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={brandConfig.logoPath}
              alt={brandConfig.name}
              style={{ height: 50, objectFit: "contain", opacity: 0.8 }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        {/* Gold accent line at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: brandConfig.accentColor,
          }}
        />
      </div>
    );
  }

  // Preview render (scaled)
  return (
    <div
      style={{
        width,
        height,
        background: slide.background,
        borderRadius: 12,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
      }}
      className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
    >
      {/* Logo at top */}
      {brandConfig.showLogo && brandConfig.logoPosition === "top" && (
        <div style={{ marginTop: height * 0.035 }}>
          <img
            src={brandConfig.logoPath}
            alt={brandConfig.name}
            style={{ height: height * 0.02, objectFit: "contain" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      {/* Text */}
      <div
        style={{
          paddingTop: brandConfig.logoPosition === "top" ? height * 0.015 : height * 0.06,
          paddingLeft: width * 0.06,
          paddingRight: width * 0.06,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            fontSize: Math.max(12, width * 0.075),
            fontWeight: 800,
            color: titleColor,
            lineHeight: 1.1,
            margin: 0,
            whiteSpace: "pre-line",
            letterSpacing: "-0.5px",
          }}
        >
          {slide.title}
        </h2>
        <p
          style={{
            fontSize: Math.max(7, width * 0.033),
            color: subtitleColor,
            marginTop: height * 0.008,
            lineHeight: 1.3,
            fontWeight: 400,
          }}
        >
          {slide.subtitle}
        </p>
      </div>

      {/* Phone mockup (preview size) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
          marginTop: height * 0.02,
        }}
      >
        <PhoneMockup screenshotPath={slide.screenshotPath} frameWidth={phoneWidth} />
      </div>

      {/* Logo at bottom */}
      {brandConfig.showLogo && brandConfig.logoPosition === "bottom" && (
        <div
          style={{
            position: "absolute",
            bottom: height * 0.02,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={brandConfig.logoPath}
            alt={brandConfig.name}
            style={{ height: height * 0.016, objectFit: "contain", opacity: 0.8 }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      {/* Gold accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: brandConfig.accentColor,
        }}
      />
    </div>
  );
}
