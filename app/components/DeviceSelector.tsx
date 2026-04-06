"use client";

import React from "react";
import { DEVICES, DeviceType } from "@/screenshots.config";

interface DeviceSelectorProps {
  value: DeviceType;
  onChange: (device: DeviceType) => void;
}

export default function DeviceSelector({ value, onChange }: DeviceSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as DeviceType)}
      className="bg-[#1a1a1a] border border-[#333] text-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-[#C9A84C] transition-colors cursor-pointer"
    >
      {(Object.keys(DEVICES) as DeviceType[]).map((key) => {
        const d = DEVICES[key];
        return (
          <option key={key} value={key}>
            {d.label} ({d.width}x{d.height})
          </option>
        );
      })}
    </select>
  );
}
