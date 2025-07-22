"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <Button
      className="w-8 h-8 p-0 cursor-pointer"
      onClick={toggleTheme}
      variant="theme"
    >
      {currentTheme === "dark" ? (
        <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      ) : (
        <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
    </Button>
  );
}
