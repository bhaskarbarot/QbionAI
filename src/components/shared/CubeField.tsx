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

// how fast each cube drifts on its own with nobody touching it (deg/sec)
const BASE_SPIN = CUBES.map((c) => 360 / (c.duration * 2.2));

// how much "spin energy" a drag imparts, and how quickly that energy fades
const DRAG_SENSITIVITY = 0.85; // deg/sec of extra spin per px of cursor movement
const MAX_EXTRA_SPEED = 150; // deg/sec cap, so a hard swipe still looks smooth, not frantic
const DECAY_PER_SECOND = 0.08; // fraction of extra spin still left after 1 full second

export default function CubeField({ className }: { className?: string }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const posRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let mouseX = 0;
    let mouseY = 0;
    let clientX = -9999;
    let clientY = -9999;
    let scrollFactor = 0;
    let raf = 0;
    let lastT = performance.now();

    const angleX = CUBES.map(() => -24);
    const angleY = CUBES.map(() => 0);
    const extraVelX = CUBES.map(() => 0);
    const extraVelY = CUBES.map(() => 0);
    const pendingImpulseX = CUBES.map(() => 0);
    const pendingImpulseY = CUBES.map(() => 0);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - lastT) / 1000);
      lastT = now;
      const decay = Math.pow(DECAY_PER_SECOND, dt);

      // parallax on the outer positioning layer (mouse tilt + scroll drift)
      posRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = CUBES[i].depth;
        const x = mouseX * depth * 16;
        const y = mouseY * depth * 16 + scrollFactor * depth * 26;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });

      // per-cube rotation: gentle ambient spin + drag momentum that eases out
      cubeRefs.current.forEach((el, i) => {
        if (!el) return;

        extraVelX[i] = (extraVelX[i] + pendingImpulseX[i]) * decay;
        extraVelY[i] = (extraVelY[i] + pendingImpulseY[i]) * decay;
        pendingImpulseX[i] = 0;
        pendingImpulseY[i] = 0;
        extraVelX[i] = Math.max(-MAX_EXTRA_SPEED, Math.min(MAX_EXTRA_SPEED, extraVelX[i]));
        extraVelY[i] = Math.max(-MAX_EXTRA_SPEED, Math.min(MAX_EXTRA_SPEED, extraVelY[i]));

        angleX[i] += (BASE_SPIN[i] + extraVelX[i]) * dt;
        angleY[i] += (BASE_SPIN[i] + extraVelY[i]) * dt;

        el.style.transform = `rotateX(${angleX[i].toFixed(2)}deg) rotateY(${angleY[i].toFixed(2)}deg)`;
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = field.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      clientX = e.clientX;
      clientY = e.clientY;

      // only cubes the cursor is actually dragging across pick up spin
      cubeRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect2 = el.getBoundingClientRect();
        const cx = rect2.left + rect2.width / 2;
        const cy = rect2.top + rect2.height / 2;
        const dist = Math.hypot(clientX - cx, clientY - cy);
        const threshold = CUBES[i].size * 1.6 + 70;
        if (dist < threshold) {
          pendingImpulseY[i] += e.movementX * DRAG_SENSITIVITY;
          pendingImpulseX[i] += -e.movementY * DRAG_SENSITIVITY;
        }
      });
    };

    const onScroll = () => {
      const rect = field.getBoundingClientRect();
      // -1..1 style progress of the field through the viewport, so cubes
      // ease away as the hero scrolls out rather than jumping around
      scrollFactor = Math.max(-1, Math.min(1, -rect.top / (rect.height || 1)));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
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
          style={
            {
              top: c.top,
              left: c.left,
              "--size": `${c.size}px`,
              "--duration": `${c.duration}s`,
              "--delay": `${c.delay}s`,
              "--drift": `${c.drift}px`,
            } as React.CSSProperties
          }
        >
          <div className={`${styles.orbit} ${styles[c.hue]}`}>
            <div
              className={styles.cube}
              ref={(el) => {
                cubeRefs.current[i] = el;
              }}
            >
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
