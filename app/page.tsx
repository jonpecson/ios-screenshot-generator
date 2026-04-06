"use client";

import React, { useState, useRef } from "react";
import SlideList from "./components/SlideList";
import SlidePreview from "./components/SlidePreview";
import SlideEditor from "./components/SlideEditor";
import DeviceSelector from "./components/DeviceSelector";
import ExportEngine from "./components/ExportEngine";
import {
  SlideConfig,
  DeviceType,
  DEVICES,
  defaultSlides,
  brandConfig,
} from "@/screenshots.config";

export default function Home() {
  const [slides, setSlides] = useState<SlideConfig[]>(defaultSlides);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [device, setDevice] = useState<DeviceType>("iphone-6.7");
  const [logoData, setLogoData] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const selectedSlide = slides[selectedIndex] || slides[0];
  const deviceConfig = DEVICES[device];

  const updateSlide = (updated: SlideConfig) => {
    setSlides((prev) =>
      prev.map((s, i) => (i === selectedIndex ? updated : s))
    );
  };

  const deleteSlide = () => {
    if (slides.length <= 1) return;
    setSlides((prev) => prev.filter((_, i) => i !== selectedIndex));
    setSelectedIndex((prev) => Math.max(0, prev - 1));
  };

  const addSlide = () => {
    const newSlide: SlideConfig = {
      id: `slide-${Date.now()}`,
      title: "New\nSlide",
      subtitle: "Add your subtitle here",
      category: "CATEGORY",
      screenshotData: null,
      screenshotPath: "/screenshots/slide1.png",
      background: "#0a0a0a",
      titleColor: "#FFFFFF",
      subtitleColor: "#888888",
      categoryColor: "#C9A84C",
      accentLineColor: "#C9A84C",
      showAccentLine: true,
    };
    setSlides((prev) => [...prev, newSlide]);
    setSelectedIndex(slides.length);
  };

  const reorderSlides = (fromIndex: number, toIndex: number) => {
    setSlides((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
    // Adjust selection
    if (selectedIndex === fromIndex) {
      setSelectedIndex(toIndex);
    } else if (
      selectedIndex > fromIndex &&
      selectedIndex <= toIndex
    ) {
      setSelectedIndex(selectedIndex - 1);
    } else if (
      selectedIndex < fromIndex &&
      selectedIndex >= toIndex
    ) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoData(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Compute preview sizing to fit within the center panel
  const previewAspect = deviceConfig.width / deviceConfig.height;

  return (
    <main className="h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* Top bar */}
      <header className="border-b border-[#1a1a1a] bg-[#0f0f0f] px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <img
            src={logoData || brandConfig.logoPath}
            alt={brandConfig.name}
            className="h-6 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="h-4 w-px bg-[#333]" />
          <h1 className="text-sm font-semibold text-gray-200">
            Screenshot Generator
          </h1>
          <span className="text-xs text-gray-600">
            {slides.length} slides
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Logo upload */}
          <button
            onClick={() => logoInputRef.current?.click()}
            className="px-3 py-1.5 text-xs rounded-lg bg-[#1a1a1a] border border-[#333] text-gray-400 hover:border-[#555] hover:text-gray-200 transition-colors"
          >
            {logoData ? "Change Logo" : "Upload Logo"}
          </button>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />

          <DeviceSelector value={device} onChange={setDevice} />

          <div className="text-[10px] text-gray-600 font-mono">
            {deviceConfig.width}x{deviceConfig.height}
          </div>

          <ExportEngine slides={slides} device={device} logoData={logoData} />
        </div>
      </header>

      {/* Main content: 3-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Slide list */}
        <aside className="w-48 border-r border-[#1a1a1a] bg-[#0c0c0c] shrink-0 overflow-hidden">
          <SlideList
            slides={slides}
            selectedIndex={selectedIndex}
            device={device}
            logoData={logoData}
            onSelect={setSelectedIndex}
            onReorder={reorderSlides}
            onAdd={addSlide}
          />
        </aside>

        {/* Center: Live preview */}
        <div className="flex-1 flex items-center justify-center bg-[#080808] overflow-hidden p-8">
          <div
            className="relative"
            style={{
              aspectRatio: `${deviceConfig.width} / ${deviceConfig.height}`,
              maxHeight: "100%",
              maxWidth: "100%",
              height: "100%",
            }}
          >
            <div
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{
                boxShadow: "0 0 60px rgba(0,0,0,0.5), 0 0 120px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                <SlidePreview
                  slide={selectedSlide}
                  device={device}
                  logoData={logoData}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Editor panel */}
        <aside className="w-80 border-l border-[#1a1a1a] bg-[#0c0c0c] shrink-0 overflow-y-auto">
          <div className="px-4 py-3 border-b border-[#222]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Edit Slide {selectedIndex + 1}
              </span>
              <span className="text-[10px] text-gray-600 font-mono">
                {selectedSlide.id}
              </span>
            </div>
          </div>
          <div className="p-4">
            <SlideEditor
              key={selectedSlide.id}
              slide={selectedSlide}
              onChange={updateSlide}
              onDelete={deleteSlide}
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
