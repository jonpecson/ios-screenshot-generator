"use client";

import React from "react";
import { SlideConfig, DeviceType, DEVICES } from "@/screenshots.config";
import SlidePreview from "./SlidePreview";

interface SlideListProps {
  slides: SlideConfig[];
  selectedIndex: number;
  device: DeviceType;
  logoData: string | null;
  onSelect: (index: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onAdd: () => void;
}

export default function SlideList({
  slides,
  selectedIndex,
  device,
  logoData,
  onSelect,
  onReorder,
  onAdd,
}: SlideListProps) {
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== index) {
      onReorder(dragIndex, index);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-3 border-b border-[#222]">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Slides ({slides.length})
        </span>
        <button
          onClick={onAdd}
          className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#333] transition-colors text-lg leading-none"
          title="Add slide"
        >
          +
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => onSelect(index)}
            className="cursor-pointer transition-all group"
            style={{
              opacity: dragIndex === index ? 0.4 : 1,
              borderTop:
                dragOverIndex === index && dragIndex !== null && dragIndex > index
                  ? "2px solid #C9A84C"
                  : "2px solid transparent",
              borderBottom:
                dragOverIndex === index && dragIndex !== null && dragIndex < index
                  ? "2px solid #C9A84C"
                  : "2px solid transparent",
            }}
          >
            <div
              className="rounded-lg overflow-hidden transition-all"
              style={{
                border:
                  selectedIndex === index
                    ? "2px solid #C9A84C"
                    : "2px solid transparent",
                boxShadow:
                  selectedIndex === index
                    ? "0 0 12px #C9A84C22"
                    : "none",
              }}
            >
              {/* Thumbnail */}
              <div className="relative" style={{ width: "100%", aspectRatio: `${DEVICES[device].width} / ${DEVICES[device].height}` }}>
                <div className="absolute inset-0 overflow-hidden rounded-md">
                  <SlidePreview
                    slide={slide}
                    device={device}
                    logoData={logoData}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-1 px-1">
              <span className="text-[10px] text-gray-500 font-mono">
                {index + 1}
              </span>
              <span className="text-[10px] text-gray-400 truncate">
                {slide.category || slide.title.split("\n")[0]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
