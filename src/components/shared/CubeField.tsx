"use client";

import { useEffect, useRef } from "react";
import styles from "./CubeField.module.css";

type CubeSpec = {
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  drift: number;
  hue: "violet" | "glow" | "slate";
  /** how strongly this cube reacts to mouse/scroll movement — bigger reads as "closer" */
  depth: number;
};

/*
 * Kept clear of the bottom-right corner (roughly x>65%, y>45%) — that's
 * where the fixed chatbot widget opens, and GPU-composited 3D-transform
 * layers can paint above other fixed layers regardless of z-index there.
 */
const CUBES: CubeSpec[] = [
  { size: 86, top: "4%", left: "62%", duration: 13, delay: 0, drift: 26, hue: "violet", depth: 1.1 },
  { size: 54, top: "26%", left: "88%", duration: 10, delay: 1.1, drift: 18, hue: "glow", depth: 0.7 },
  { size: 84, top: "32%", left: "80%", duration: 16, delay: 0.4, drift: 30, hue: "slate", depth: 1.3 },
  { size: 40, top: "14%", left: "84%", duration: 9, delay: 2, drift: 14, hue: "glow", depth: 0.55 },
  { size: 64, top: "74%", left: "16%", duration: 12, delay: 0.7, drift: 20, hue: "violet", depth: 0.9 },
  { size: 34, top: "60%", left: "6%", duration: 8, delay: 1.6, drift: 12, hue: "glow", depth: 0.5 },
  { size: 48, top: "20%", left: "10%", duration: 11, delay: 1.3, drift: 16, hue: "slate", depth: 0.75 },
  { size: 62, top: "42%", left: "21%", duration: 14, delay: 0.5, drift: 22, hue: "violet", depth: 1.0 },
];

export default function CubeField({ className }: { className?: string }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const posRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let mouseX = 0;
    let mouseY = 0;
    let scrollFactor = 0;
    let raf = 0;

    function apply() {
      raf = 0;
      posRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = CUBES[i].depth;
        const x = mouseX * depth * 16;
        const y = mouseY * depth * 16 + scrollFactor * depth * 26;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(apply);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = field.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    }

    function onScroll() {
      const rect = field.getBoundingClientRect();
      // -1..1 style progress of the field through the viewport, so cubes
      // ease away as the hero scrolls out rather than jumping around
      scrollFactor = Math.max(-1, Math.min(1, -rect.top / (rect.height || 1)));
      schedule();
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={fieldRef} className={`${styles.field} ${className ?? ""}`} aria-hidden="true">
      {CUBES.map((c, i) => (
        <div
          key={i}
          ref={(el) => {
            posRefs.current[i] = el;
          }}
          className={styles.pos}
          style={{ top: c.top, left: c.left }}
        >
          <div
            className={`${styles.orbit} ${styles[c.hue]}`}
            style={
              {
                "--size": `${c.size}px`,
                "--duration": `${c.duration}s`,
                "--delay": `${c.delay}s`,
                "--drift": `${c.drift}px`,
              } as React.CSSProperties
            }
          >
            <div className={styles.cube}>
              <span className={`${styles.face} ${styles.front}`} />
              <span className={`${styles.face} ${styles.back}`} />
              <span className={`${styles.face} ${styles.right}`} />
              <span className={`${styles.face} ${styles.left}`} />
              <span className={`${styles.face} ${styles.top}`} />
              <span className={`${styles.face} ${styles.bottom}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
