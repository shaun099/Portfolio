"use client";

import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    liquidGlass: (
      el: HTMLElement,
      options?: Record<string, any>,
    ) => {
      supported: boolean;
      refresh: () => void;
      destroy: () => void;
    };
  }
}

const SIZE = 150; // px, width = height

export default function GlassBox() {
  const boxRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

  const [pos, setPos] = useState({ x: 10, y: 40 });

  useEffect(() => {
    if (!boxRef.current || typeof window.liquidGlass !== "function") return;
    const glass = window.liquidGlass(boxRef.current, {
      scale: -90,
      chroma: 6,
      blur: 3,
      saturate: 1.5,
    });
    return () => glass.destroy();
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    dragState.current = {
      dragging: true,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const x = e.clientX - dragState.current.offsetX;
    const y = e.clientY - dragState.current.offsetY;

    const maxX = window.innerWidth - SIZE;
    const maxY = window.innerHeight - SIZE;

    setPos({
      x: Math.min(Math.max(0, x), maxX),
      y: Math.min(Math.max(0, y), maxY),
    });
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragState.current.dragging = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  return (
    <div
      ref={boxRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: SIZE,
        height: SIZE,
        borderRadius: "50%", // always a true circle, any size
        touchAction: "none",
        zIndex: 50,
      }}
      className="glass rounded-full cursor-grab active:cursor-grabbing select-none"
    />
  );
}
