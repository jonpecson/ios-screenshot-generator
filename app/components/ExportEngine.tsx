"use client";

import React, { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";
import SlidePreview from "./SlidePreview";
import { SlideConfig, DeviceType, DEVICES } from "@/screenshots.config";

interface ExportEngineProps {
  slides: SlideConfig[];
  device: DeviceType;
  logoData: string | null;
  selectedIndex?: number;
}

export default function ExportEngine({ slides, device, logoData, selectedIndex }: ExportEngineProps) {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState("");

  const deviceConfig = DEVICES[device];

  const doExport = useCallback(
    async (index: number) => {
      const slide = slides[index];
      const nodeId = `export-node-${slide.id}`;

      // Wait for images to load
      await new Promise((resolve) => setTimeout(resolve, 800));

      const node = document.getElementById(nodeId);
      if (!node) {
        console.error(`Export node not found: ${nodeId}`);
        return false;
      }

      try {
        const dataUrl = await toPng(node, {
          width: deviceConfig.width,
          height: deviceConfig.height,
          pixelRatio: 1,
          cacheBust: true,
          includeQueryParams: true,
          style: {
            transform: 'none',
            transformOrigin: 'top left',
          },
        });

        const link = document.createElement("a");
        const deviceLabel = deviceConfig.type === "tablet" ? "ipad" : "iphone";
        link.download = `${deviceLabel}-screenshot-${index + 1}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        await new Promise((resolve) => setTimeout(resolve, 400));
        return true;
      } catch (err) {
        console.error(`Failed to export ${slide.id}:`, err);
        return false;
      }
    },
    [slides, deviceConfig]
  );

  const exportSingle = useCallback(
    async (index: number) => {
      setExporting(true);
      setProgress(`Exporting slide ${index + 1}...`);
      const success = await doExport(index);
      setProgress(success ? `Exported slide ${index + 1}!` : `Failed to export slide ${index + 1}`);
      setExporting(false);
      setTimeout(() => setProgress(""), 3000);
    },
    [doExport]
  );

  const exportAll = useCallback(async () => {
    setExporting(true);
    for (let i = 0; i < slides.length; i++) {
      setProgress(`Exporting ${i + 1} of ${slides.length}...`);
      const success = await doExport(i);
      if (!success) {
        setProgress(`Error on slide ${i + 1}. Continuing...`);
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
    setProgress("All screenshots exported!");
    setExporting(false);
    setTimeout(() => setProgress(""), 3000);
  }, [slides, doExport]);

  return (
    <>
      {/* Export controls */}
      <div className="flex items-center gap-2">
        {selectedIndex !== undefined && (
          <button
            onClick={() => exportSingle(selectedIndex)}
            disabled={exporting}
            className="px-4 py-2.5 rounded-lg font-semibold text-sm text-gray-200 border border-[#333] bg-[#1a1a1a] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#C9A84C] hover:text-white active:scale-95"
          >
            {exporting ? "..." : `Export Slide ${selectedIndex + 1}`}
          </button>
        )}
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

      {/* Off-screen full-size render — ALL slides always mounted */}
      <div
        style={{
          position: "fixed",
          left: "-99999px",
          top: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        {slides.map((slide) => (
          <SlidePreview
            key={slide.id}
            id={`export-node-${slide.id}`}
            slide={slide}
            device={device}
            logoData={logoData}
            fullSize={true}
          />
        ))}
      </div>
    </>
  );
}

export type { ExportEngineProps };
