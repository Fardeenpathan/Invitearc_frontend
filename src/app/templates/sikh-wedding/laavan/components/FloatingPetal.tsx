"use client";

import { useMemo } from "react";
import {assets} from "../assets";

export default function FloatingPetal({
  className,
  style
}: {
  className?: string;
  style?: React.CSSProperties;
}) {

  const petalValues = useMemo(() => {

    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

    const duration = isDesktop
      ? 40 + Math.random() * 30   // longer for desktop
      : 20 + Math.random() * 15;

    const delay = Math.random() * 10;

    const scale =
      Math.random() < 0.6
        ? 0.4 + Math.random() * 0.4
        : 0.9 + Math.random() * 0.6;

    const rotate = Math.random() * 360;

    return { duration, delay, scale, rotate };

  }, []);


  return (
    <img
      src={assets.petals}
      alt="petal"
      className={`floating-petal ${className}`}
      style={{
        animationDuration: `${petalValues.duration}s`,
        animationDelay: `${petalValues.delay}s`,
        "--scale": petalValues.scale,
        "--rotate": `${petalValues.rotate}deg`,
        ...style
      } as React.CSSProperties}
    />
  );
}