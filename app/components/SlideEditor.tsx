"use client";

import React, { useRef } from "react";
import { SlideConfig } from "@/screenshots.config";

interface SlideEditorProps {
  slide: SlideConfig;
  onChange: (updated: SlideConfig) => void;
  onDelete: () => void;
}

const GRADIENT_PRESETS = [
  { label: "Dark", value: "#0a0a0a" },
  { label: "Navy", value: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" },
  { label: "Purple", value: "linear-gradient(180deg, #1a1a2e 0%, #2d1b4e 100%)" },
  { label: "Green", value: "linear-gradient(180deg, #1a1a2e 0%, #0a2e1a 50%, #1a1a2e 100%)" },
  { label: "Blue", value: "linear-gradient(180deg, #0f3460 0%, #1a1a2e 100%)" },
  { label: "Charcoal", value: "linear-gradient(180deg, #111 0%, #1a1a1a 100%)" },
  { label: "Deep Blue", value: "linear-gradient(180deg, #0c1445 0%, #0a0a0a 100%)" },
  { label: "Midnight", value: "linear-gradient(180deg, #0a0a0a 0%, #1a0a2e 100%)" },
];

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-400 w-24 shrink-0">{label}</label>
      <div className="flex items-center gap-1.5 flex-1">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded border border-[#333] bg-transparent cursor-pointer p-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-gray-300 outline-none focus:border-[#C9A84C] font-mono"
        />
      </div>
    </div>
  );
}

export default function SlideEditor({ slide, onChange, onDelete }: SlideEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (partial: Partial<SlideConfig>) => {
    onChange({ ...slide, ...partial });
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      update({ screenshotData: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {/* Category */}
      <div>
        <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">
          Category Label
        </label>
        <input
          type="text"
          value={slide.category}
          onChange={(e) => update({ category: e.target.value })}
          placeholder="e.g. COMMUNITY"
          className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#C9A84C] transition-colors"
        />
      </div>

      {/* Title */}
      <div>
        <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">
          Title <span className="text-gray-600 normal-case">(use \n for line breaks)</span>
        </label>
        <textarea
          value={slide.title.replace(/\n/g, "\\n")}
          onChange={(e) => update({ title: e.target.value.replace(/\\n/g, "\n") })}
          rows={2}
          className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#C9A84C] transition-colors resize-none font-mono"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">
          Subtitle
        </label>
        <input
          type="text"
          value={slide.subtitle}
          onChange={(e) => update({ subtitle: e.target.value })}
          className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#C9A84C] transition-colors"
        />
      </div>

      {/* Screenshot upload */}
      <div>
        <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">
          Screenshot
        </label>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 text-xs rounded-lg bg-[#1a1a1a] border border-[#333] text-gray-300 hover:border-[#C9A84C] hover:text-white transition-colors"
          >
            {slide.screenshotData ? "Replace Image" : "Upload Image"}
          </button>
          {slide.screenshotData && (
            <button
              onClick={() => update({ screenshotData: null })}
              className="px-2 py-1.5 text-xs rounded-lg text-red-400 hover:text-red-300 transition-colors"
            >
              Clear
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleScreenshotUpload}
            className="hidden"
          />
        </div>
        {slide.screenshotData && (
          <div className="mt-2 w-16 h-28 rounded overflow-hidden border border-[#333]">
            <img
              src={slide.screenshotData}
              alt="Preview"
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[#222] pt-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Colors</p>
      </div>

      {/* Background presets */}
      <div>
        <label className="text-xs text-gray-400 mb-2 block">Background</label>
        <div className="flex gap-1.5 flex-wrap mb-2">
          {GRADIENT_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => update({ background: preset.value })}
              className="w-7 h-7 rounded border transition-all"
              style={{
                background: preset.value,
                borderColor:
                  slide.background === preset.value ? "#C9A84C" : "#333",
                boxShadow:
                  slide.background === preset.value
                    ? "0 0 0 1px #C9A84C"
                    : "none",
              }}
              title={preset.label}
            />
          ))}
        </div>
        <input
          type="text"
          value={slide.background}
          onChange={(e) => update({ background: e.target.value })}
          placeholder="CSS color or gradient"
          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-gray-300 outline-none focus:border-[#C9A84C] font-mono"
        />
      </div>

      <ColorInput
        label="Title"
        value={slide.titleColor}
        onChange={(v) => update({ titleColor: v })}
      />
      <ColorInput
        label="Subtitle"
        value={slide.subtitleColor}
        onChange={(v) => update({ subtitleColor: v })}
      />
      <ColorInput
        label="Category"
        value={slide.categoryColor}
        onChange={(v) => update({ categoryColor: v })}
      />

      {/* Accent line */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-400 w-24 shrink-0">Accent Line</label>
        <input
          type="checkbox"
          checked={slide.showAccentLine}
          onChange={(e) => update({ showAccentLine: e.target.checked })}
          className="accent-[#C9A84C]"
        />
        {slide.showAccentLine && (
          <div className="flex items-center gap-1.5 flex-1">
            <input
              type="color"
              value={slide.accentLineColor}
              onChange={(e) => update({ accentLineColor: e.target.value })}
              className="w-7 h-7 rounded border border-[#333] bg-transparent cursor-pointer p-0"
            />
            <input
              type="text"
              value={slide.accentLineColor}
              onChange={(e) => update({ accentLineColor: e.target.value })}
              className="flex-1 bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-gray-300 outline-none focus:border-[#C9A84C] font-mono"
            />
          </div>
        )}
      </div>

      {/* Delete */}
      <div className="border-t border-[#222] pt-4">
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-xs rounded-lg border border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
        >
          Delete Slide
        </button>
      </div>
    </div>
  );
}
