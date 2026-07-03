"use client";

import type {Color} from "react-aria-components";

import {
  ColorArea,
  ColorField,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  Label,
  parseColor,
} from "@heroui/react";
import {CellColorPicker} from "@heroui-pro/react";
import {useEffect, useState} from "react";

// Keep in sync with the `--accent` default in globals.css.
const DEFAULT_ACCENT = "#1877E0";

const PRESETS = [
  "#1877E0",
  "#0EA5E9",
  "#0284C7",
  "#2563EB",
  "#10316E",
  "#0D9488",
  "#7C3AED",
  "#DB2777",
  "#DC2626",
];

function applyAccent(hex: string) {
  document.documentElement.style.setProperty("--accent", hex);
}

export function ThemeColorPicker() {
  const [color, setColor] = useState<Color>(() => parseColor(DEFAULT_ACCENT));

  useEffect(() => {
    try {
      const saved = localStorage.getItem("accent");

      if (saved) setColor(parseColor(saved));
    } catch {
      // Ignore storage failures — fall back to the default accent.
    }
  }, []);

  const handleChange = (next: Color) => {
    setColor(next);

    const hex = next.toString("hex");

    applyAccent(hex);
    try {
      localStorage.setItem("accent", hex);
    } catch {
      // Ignore storage failures — the change still applies for this session.
    }
  };

  const reset = () => {
    setColor(parseColor(DEFAULT_ACCENT));
    applyAccent(DEFAULT_ACCENT);
    try {
      localStorage.removeItem("accent");
    } catch {
      // Ignore.
    }
  };

  return (
    <CellColorPicker aria-label="ปรับสีธีม" value={color} onChange={handleChange}>
      <CellColorPicker.Trigger
        aria-label="ปรับสีธีม"
        className="hover:bg-surface-secondary size-9 justify-center rounded-lg p-0"
      >
        <CellColorPicker.Label className="sr-only">สีธีม</CellColorPicker.Label>
        <CellColorPicker.ValueDisplay className="sr-only" />
        <CellColorPicker.Swatch className="border-border size-5 rounded-full border shadow-sm ring-2 ring-white/60 dark:ring-white/10" />
      </CellColorPicker.Trigger>
      <CellColorPicker.Popover className="w-[248px]">
        <div className="flex items-center justify-between px-1 pb-1">
          <span className="text-foreground text-sm font-medium">สีธีม</span>
          <button
            className="text-muted hover:text-foreground text-xs"
            type="button"
            onClick={reset}
          >
            รีเซ็ต
          </button>
        </div>

        <ColorSwatchPicker className="justify-center pt-1" size="xs">
          {PRESETS.map((preset) => (
            <ColorSwatchPicker.Item key={preset} color={preset}>
              <ColorSwatchPicker.Swatch />
            </ColorSwatchPicker.Item>
          ))}
        </ColorSwatchPicker>

        <ColorArea
          aria-label="เลือกเฉดสี"
          className="max-w-full"
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
        >
          <ColorArea.Thumb />
        </ColorArea>

        <ColorSlider aria-label="เฉดสี (Hue)" channel="hue" className="gap-1 px-1" colorSpace="hsb">
          <Label>เฉดสี</Label>
          <ColorSlider.Output className="text-muted" />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>

        <ColorField aria-label="ค่าสีแบบ Hex">
          <ColorField.Group variant="secondary">
            <ColorField.Prefix>
              <ColorSwatch size="xs" />
            </ColorField.Prefix>
            <ColorField.Input />
          </ColorField.Group>
        </ColorField>
      </CellColorPicker.Popover>
    </CellColorPicker>
  );
}
