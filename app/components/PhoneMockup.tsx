"use client";

import React from "react";

interface PhoneMockupProps {
  screenshotPath: string;
  /** Width of the phone frame in CSS pixels (for preview) */
  frameWidth?: number;
}

/**
 * iPhone mockup frame with a screenshot rendered inside.
 * Uses pure CSS to draw the phone bezel — no external images needed.
 */
export default function PhoneMockup({
  screenshotPath,
  frameWidth = 240,
}: PhoneMockupProps) {
  const aspectRatio = 19.5 / 9; // iPhone aspect ratio
  const frameHeight = frameWidth * aspectRatio;
  const borderRadius = frameWidth * 0.14;
  const bezelWidth = frameWidth * 0.025;
  const notchWidth = frameWidth * 0.35;
  const notchHeight = frameWidth * 0.065;
  const innerRadius = borderRadius - bezelWidth;

  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width: frameWidth,
        height: frameHeight,
      }}
    >
      {/* Outer phone frame */}
      <div
        className="absolute inset-0 bg-black shadow-2xl"
        style={{
          borderRadius,
          border: `${bezelWidth}px solid #2a2a2a`,
        }}
      >
        {/* Screen area */}
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            top: bezelWidth,
            left: bezelWidth,
            right: bezelWidth,
            bottom: bezelWidth,
            borderRadius: innerRadius,
          }}
        >
          {/* Screenshot image */}
          <img
            src={screenshotPath}
            alt="App screenshot"
            className="w-full h-full object-cover object-top"
            style={{ display: "block" }}
            onError={(e) => {
              // Show placeholder if image not found
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.style.background =
                "linear-gradient(180deg, #1a1a2e 0%, #2d2d4e 100%)";
              target.parentElement!.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#555;font-size:${frameWidth * 0.055}px;text-align:center;padding:20px;">
                  Replace with<br/>your screenshot
                </div>
              `;
            }}
          />
        </div>

        {/* Dynamic Island / Notch */}
        <div
          className="absolute left-1/2 bg-black z-10"
          style={{
            top: bezelWidth + notchHeight * 0.4,
            width: notchWidth,
            height: notchHeight,
            borderRadius: notchHeight / 2,
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Side button (power) */}
      <div
        className="absolute bg-[#2a2a2a]"
        style={{
          right: -bezelWidth - 1.5,
          top: frameHeight * 0.22,
          width: 2.5,
          height: frameWidth * 0.15,
          borderRadius: 1,
        }}
      />

      {/* Volume buttons */}
      <div
        className="absolute bg-[#2a2a2a]"
        style={{
          left: -bezelWidth - 1.5,
          top: frameHeight * 0.18,
          width: 2.5,
          height: frameWidth * 0.08,
          borderRadius: 1,
        }}
      />
      <div
        className="absolute bg-[#2a2a2a]"
        style={{
          left: -bezelWidth - 1.5,
          top: frameHeight * 0.24,
          width: 2.5,
          height: frameWidth * 0.08,
          borderRadius: 1,
        }}
      />
    </div>
  );
}
