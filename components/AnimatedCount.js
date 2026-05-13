"use client";

import { useEffect, useState } from "react";

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

export default function AnimatedCount({ value, formatter }) {
  const target = Number.isFinite(value) ? Math.max(0, value) : 0;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const duration = 900;
    const startedAt = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const nextValue = Math.round(target * easeOutCubic(progress));
      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    setDisplayValue(0);
    frameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [target]);

  const formattedValue = formatter
    ? formatter(displayValue)
    : new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(displayValue);

  return <span className="tabular-nums">{formattedValue}</span>;
}