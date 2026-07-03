"use client";

import {Moon, Sun} from "@gravity-ui/icons";
import {Button, Tooltip} from "@heroui/react";
import {useEffect, useState} from "react";

/**
 * Icon-only light/dark toggle for the site navbar. Reads/writes the persisted
 * `theme` value and syncs the `.dark` class on <html>. The no-flash script in
 * the root layout applies the class before hydration, so we mirror it on mount.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");

    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Ignore storage failures (private mode, etc.) — the toggle still works for the session.
    }
    setIsDark(next);
  };

  const label = isDark ? "สลับเป็นโหมดสว่าง" : "สลับเป็นโหมดมืด";

  return (
    <Tooltip>
      <Button isIconOnly aria-label={label} size="sm" variant="tertiary" onPress={toggle}>
        {/* Render a stable icon until mounted to avoid hydration mismatch. */}
        {mounted && isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </Button>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  );
}
