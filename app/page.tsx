"use client";

import React from "react";
import SlideCard from "./components/SlideCard";
import ExportEngine from "./components/ExportEngine";
import { slides, brandConfig, exportConfig } from "@/screenshots.config";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={brandConfig.logoPath}
              alt={brandConfig.name}
              className="h-8 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div>
              <h1 className="text-lg font-bold">App Store Screenshot Generator</h1>
              <p className="text-xs text-gray-500">
                {slides.length} slides &middot; {exportConfig.width}x{exportConfig.height}px
              </p>
            </div>
          </div>
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: brandConfig.accentColor }}
            title={`Accent: ${brandConfig.accentColor}`}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <ExportEngine />
      </div>

      {/* Preview grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Preview
        </h2>
        <div className="flex gap-5 overflow-x-auto pb-4">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex flex-col items-center gap-2 flex-shrink-0">
              <SlideCard slide={slide} />
              <span className="text-xs text-gray-500">
                {index + 1}. {slide.id}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Quick Guide</h3>
          <ol className="text-xs text-gray-500 space-y-1.5 list-decimal list-inside">
            <li>
              Replace screenshots in{" "}
              <code className="text-gray-400 bg-gray-800 px-1 py-0.5 rounded">
                /public/screenshots/
              </code>{" "}
              (slide1.png, slide2.png, etc.)
            </li>
            <li>
              Edit titles and colors in{" "}
              <code className="text-gray-400 bg-gray-800 px-1 py-0.5 rounded">
                screenshots.config.ts
              </code>
            </li>
            <li>
              Add your logo at{" "}
              <code className="text-gray-400 bg-gray-800 px-1 py-0.5 rounded">
                /public/images/logo-horizontal.png
              </code>
            </li>
            <li>Preview with <code className="text-gray-400 bg-gray-800 px-1 py-0.5 rounded">npm run dev</code></li>
            <li>Click <strong className="text-indigo-400">Export All Screenshots</strong> to download PNGs</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
