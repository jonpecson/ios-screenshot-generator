"use client";

import React, { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";
import SlidePreview from "./SlidePreview";
import { SlideConfig, DeviceType, DEVICES } from "@/screenshots.config";

interface ExportEngineProps {
  slides: SlideConfig[];
  device: DeviceType;
  logoData: string | null;
}

export default function ExportEngine({ slides, device, logoData }: ExportEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState("");
  const [currentExportIndex, setCurrentExportIndex] = useState<number | null>(null);

  const deviceConfig = DEVICES[device];

  const exportSlide = useCallback(
    async (index: number) => {
      const slide = slides[index];
      setCurrentExportIndex(index);

      // Wait for render
      await new Promise((resolve) => setTimeout(resolve, 600));

      const node = document.getElementById(`export-slide-${slide.id}`);
      if (!node) {
        console.error(`Could not find export node for ${slide.id}`);
        return false;
      }

      try {
        const dataUrl = await toPng(node, {
          width: deviceConfig.width,
          height: deviceConfig.height,
          pixelRatio: 1,
          cacheBust: true,
        });

        const link = document.createElement("a");
        link.download = `screenshot-${index + 1}.png`;
        link.href = dataUrl;
        link.click();

        await new Promise((resolve) => setTimeout(resolve, 300));
        return true;
      } catch (err) {
        console.error(`Failed to export ${slide.id}:`, err);
        return false;
      }
    },
    [slides, deviceConfig]
  );

  const exportAll = useCallback(async () => {
    setExporting(true);

    for (let i = 0; i < slides.length; i++) {
      setProgress(`Exporting ${i + 1} of ${slides.length}...`);
      const success = await exportSlide(i);
      if (!success) {
        setProgress(`Error exporting slide ${i + 1}. Check console.`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    setCurrentExportIndex(null);
    setProgress("All screenshots exported!");
    setExporting(false);
    setTimeout(() => setProgress(""), 3000);
  }, [slides, exportSlide]);

  const exportSingle = useCallback(
    async (index: number) => {
      setExporting(true);
      setProgress(`Exporting slide ${index + 1}...`);
      await exportSlide(index);
      setCurrentExportIndex(null);
      setProgress(`Exported slide ${index + 1}!`);
      setExporting(false);
      setTimeout(() => setProgress(""), 2000);
    },
    [exportSlide]
  );

  return (
    <>
      {/* Export controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={exportAll}
          disabled={exporting}
          className="px-5 py-2.5 rounded-lg font-semibold text-sm text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-95"
          style={{ background: "#C9A84C" }}
        >
          {exporting ? "Exporting..." : "Export All"}
        </button>

        {progress && (
          <span className="text-xs text-gray-400">{progress}</span>
        )}
      </div>

      {/* Hidden off-screen full-size render area */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        {currentExportIndex !== null && slides[currentExportIndex] && (
          <SlidePreview
            id={`export-slide-${slides[currentExportIndex].id}`}
            slide={slides[currentExportIndex]}
            device={device}
            logoData={logoData}
            fullSize={true}
          />
        )}
      </div>
    </>
  );
}

export type { ExportEngineProps };
