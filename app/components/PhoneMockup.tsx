"use client";

import React from "react";

interface PhoneMockupProps {
  screenshotSrc: string | null;
  fallbackPath: string;
  frameWidth?: number;
  frameTint?: string;
}

/**
 * iPhone mockup with Dynamic Island, gold-tinted frame.
 * Pure CSS — no external images.
 */
export default function PhoneMockup({
  screenshotSrc,
  fallbackPath,
  frameWidth = 240,
  frameTint = "#C9A84C",
}: PhoneMockupProps) {
  const aspectRatio = 19.5 / 9;
  const frameHeight = frameWidth * aspectRatio;
  const borderRadius = frameWidth * 0.14;
  const bezelWidth = frameWidth * 0.02;
  const dynamicIslandWidth = frameWidth * 0.28;
  const dynamicIslandHeight = frameWidth * 0.055;
  const innerRadius = borderRadius - bezelWidth;

  const imgSrc = screenshotSrc || fallbackPath;

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: frameWidth, height: frameHeight }}
    >
      {/* Outer frame with gold tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          border: `${bezelWidth}px solid ${frameTint}44`,
          background: `linear-gradient(145deg, ${frameTint}22 0%, #1a1a1a 30%, #0d0d0d 70%, ${frameTint}15 100%)`,
          boxShadow: `0 0 ${frameWidth * 0.08}px ${frameTint}15, 0 ${frameWidth * 0.04}px ${frameWidth * 0.12}px rgba(0,0,0,0.8)`,
        }}
      >
        {/* Screen area */}
        <div
          style={{
            position: "absolute",
            top: bezelWidth * 1.5,
            left: bezelWidth * 1.5,
            right: bezelWidth * 1.5,
            bottom: bezelWidth * 1.5,
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
                <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#555;font-size:${frameWidth * 0.05}px;text-align:center;padding:20px;">
                  Drop screenshot<br/>here
                </div>
              `;
            }}
          />
        </div>

        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: bezelWidth * 1.5 + dynamicIslandHeight * 0.35,
            left: "50%",
            transform: "translateX(-50%)",
            width: dynamicIslandWidth,
            height: dynamicIslandHeight,
            borderRadius: dynamicIslandHeight / 2,
            background: "#000",
            zIndex: 10,
          }}
        />
      </div>

      {/* Power button */}
      <div
        style={{
          position: "absolute",
          right: -bezelWidth - 1,
          top: frameHeight * 0.22,
          width: 2,
          height: frameWidth * 0.14,
          borderRadius: 1,
          background: `${frameTint}55`,
        }}
      />

      {/* Volume buttons */}
      <div
        style={{
          position: "absolute",
          left: -bezelWidth - 1,
          top: frameHeight * 0.18,
          width: 2,
          height: frameWidth * 0.07,
          borderRadius: 1,
          background: `${frameTint}55`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -bezelWidth - 1,
          top: frameHeight * 0.24,
          width: 2,
          height: frameWidth * 0.07,
          borderRadius: 1,
          background: `${frameTint}55`,
        }}
      />
    </div>
  );
}
