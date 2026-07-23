"use client";

import { useEffect } from "react";

export default function DisableInspect() {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u"))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleDragStart = (e) =>
       {
      e.preventDefault();
      return false;
    };

    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      img.setAttribute("draggable", "false");
    });

    window.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("dragstart", handleDragStart, true);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu, true);
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("dragstart", handleDragStart, true);
    };

  }, []);

  return null;
}