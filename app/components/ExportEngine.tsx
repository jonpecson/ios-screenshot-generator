"use client";

import React, { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";
import SlideCard from "./SlideCard";
import { brandConfig } from "@/screenshots.config";
import { slides, exportConfig } from "@/screenshots.config";

/**
 * Hidden full-size renderer + export button.
 * Renders each slide at full export resolution off-screen, then captures as PNG.
 */
export default function ExportEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState("");
  const [currentExportIndex, setCurrentExportIndex] = useState<number | null>(null);

  const exportAll = useCallback(async () => {
    setExporting(true);

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      setProgress(`Exporting ${i + 1} of ${slides.length}: ${slide.id}...`);
      setCurrentExportIndex(i);

      // Wait for render
      await new Promise((resolve) => setTimeout(resolve, 500));

      const node = document.getElementById(`export-slide-${slide.id}`);
      if (!node) {
        console.error(`Could not find export node for ${slide.id}`);
        continue;
      }

      try {
        const dataUrl = await toPng(node, {
          width: exportConfig.width,
          height: exportConfig.height,
          pixelRatio: exportConfig.pixelRatio,
          cacheBust: true,
        });

        // Trigger download
        const link = document.createElement("a");
        link.download = `${exportConfig.filePrefix}-${slide.id}-${exportConfig.width}x${exportConfig.height}.png`;
        link.href = dataUrl;
        link.click();

        // Small delay between downloads so browser handles them
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (err) {
        console.error(`Failed to export ${slide.id}:`, err);
        setProgress(`Error exporting ${slide.id}. Check console.`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    setCurrentExportIndex(null);
    setProgress("All screenshots exported!");
    setExporting(false);

    setTimeout(() => setProgress(""), 3000);
  }, []);

  const exportSingle = useCallback(async (slideIndex: number) => {
    const slide = slides[slideIndex];
    setExporting(true);
    setProgress(`Exporting ${slide.id}...`);
    setCurrentExportIndex(slideIndex);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const node = document.getElementById(`export-slide-${slide.id}`);
    if (!node) {
      setProgress("Error: could not find render node.");
      setExporting(false);
      return;
    }

    try {
      const dataUrl = await toPng(node, {
        width: exportConfig.width,
        height: exportConfig.height,
        pixelRatio: exportConfig.pixelRatio,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `${exportConfig.filePrefix}-${slide.id}-${exportConfig.width}x${exportConfig.height}.png`;
      link.href = dataUrl;
      link.click();

      setProgress(`Exported ${slide.id}!`);
    } catch (err) {
      console.error(`Failed to export ${slide.id}:`, err);
      setProgress(`Error exporting ${slide.id}`);
    }

    setCurrentExportIndex(null);
    setExporting(false);
    setTimeout(() => setProgress(""), 2000);
  }, []);

  return (
    <>
      {/* Export controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={exportAll}
          disabled={exporting}
          className="px-6 py-3 rounded-lg font-semibold text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-95"
          style={{ background: brandConfig.accentColor }}
        >
          {exporting ? "Exporting..." : "Export All Screenshots"}
        </button>

        {progress && (
          <span className="text-sm text-gray-400">{progress}</span>
        )}

        <span className="text-xs text-gray-500 ml-auto">
          Export: {exportConfig.width} x {exportConfig.height}px
        </span>
      </div>

      {/* Individual export buttons */}
      <div className="flex gap-2 flex-wrap mt-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => exportSingle(i)}
            disabled={exporting}
            className="px-3 py-1 text-xs rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            Export {slide.id}
          </button>
        ))}
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
        {currentExportIndex !== null && (
          <div id={`export-slide-${slides[currentExportIndex].id}`}>
            <SlideCard slide={slides[currentExportIndex]} fullSize={true} />
          </div>
        )}
      </div>
    </>
  );
}
