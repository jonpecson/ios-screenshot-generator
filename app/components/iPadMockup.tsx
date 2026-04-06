"use client";

import React from "react";

interface IPadMockupProps {
  screenshotSrc: string | null;
  fallbackPath: string;
  frameWidth?: number;
  frameTint?: string;
}

/**
 * iPad mockup with thin bezels, rounded corners, and home indicator.
 * Pure CSS — no external images.
 */
export default function IPadMockup({
  screenshotSrc,
  fallbackPath,
  frameWidth = 300,
  frameTint = "#C9A84C",
}: IPadMockupProps) {
  // iPad aspect: roughly 4:3 but in portrait
  const aspectRatio = 4 / 3;
  const frameHeight = frameWidth * aspectRatio;
  const borderRadius = frameWidth * 0.06;
  const bezelWidth = frameWidth * 0.02;
  const innerRadius = borderRadius - bezelWidth;
  const cameraSize = frameWidth * 0.015;

  const imgSrc = screenshotSrc || fallbackPath;

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: frameWidth, height: frameHeight }}
    >
      {/* Outer frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          border: `${bezelWidth}px solid ${frameTint}33`,
          background: `linear-gradient(145deg, ${frameTint}18 0%, #1a1a1a 30%, #0d0d0d 70%, ${frameTint}10 100%)`,
          boxShadow: `0 0 ${frameWidth * 0.06}px ${frameTint}12, 0 ${frameWidth * 0.03}px ${frameWidth * 0.1}px rgba(0,0,0,0.7)`,
        }}
      >
        {/* Screen area */}
        <div
          style={{
            position: "absolute",
            top: bezelWidth * 2,
            left: bezelWidth * 2,
            right: bezelWidth * 2,
            bottom: bezelWidth * 2,
            borderRadius: innerRadius,
            overflow: "hidden",
            background: "#000",
          }}
        >
          <img
            src={imgSrc}
            alt="App screenshot"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.style.background =
                "linear-gradient(180deg, #1a1a2e 0%, #2d2d4e 100%)";
              target.parentElement!.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#555;font-size:${frameWidth * 0.04}px;text-align:center;padding:20px;">
                  Drop screenshot<br/>here
                </div>
              `;
            }}
          />
        </div>

        {/* Front camera */}
        <div
          style={{
            position: "absolute",
            top: bezelWidth * 1.2,
            left: "50%",
            transform: "translateX(-50%)",
            width: cameraSize,
            height: cameraSize,
            borderRadius: "50%",
            background: "#1a1a2e",
            border: `1px solid ${frameTint}22`,
            zIndex: 10,
          }}
        />

        {/* Home indicator bar */}
        <div
          style={{
            position: "absolute",
            bottom: bezelWidth * 1.2,
            left: "50%",
            transform: "translateX(-50%)",
            width: frameWidth * 0.2,
            height: frameWidth * 0.008,
            borderRadius: frameWidth * 0.004,
            background: `${frameTint}44`,
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}
