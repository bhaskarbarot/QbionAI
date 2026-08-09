import styles from "./CubeField.module.css";

type CubeSpec = {
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  drift: number;
  hue: "violet" | "glow" | "slate";
};

/*
 * Kept clear of the bottom-right corner (roughly x>65%, y>45%) — that's
 * where the fixed chatbot widget opens, and GPU-composited 3D-transform
 * layers can paint above other fixed layers regardless of z-index there.
 */
const CUBES: CubeSpec[] = [
  { size: 86, top: "4%", left: "62%", duration: 13, delay: 0, drift: 26, hue: "violet" },
  { size: 54, top: "26%", left: "88%", duration: 10, delay: 1.1, drift: 18, hue: "glow" },
  { size: 84, top: "32%", left: "80%", duration: 16, delay: 0.4, drift: 30, hue: "slate" },
  { size: 40, top: "14%", left: "84%", duration: 9, delay: 2, drift: 14, hue: "glow" },
  { size: 64, top: "74%", left: "16%", duration: 12, delay: 0.7, drift: 20, hue: "violet" },
  { size: 34, top: "60%", left: "6%", duration: 8, delay: 1.6, drift: 12, hue: "glow" },
];

export default function CubeField({ className }: { className?: string }) {
  return (
    <div className={`${styles.field} ${className ?? ""}`} aria-hidden="true">
      {CUBES.map((c, i) => (
        <div
          key={i}
          className={`${styles.orbit} ${styles[c.hue]}`}
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
          <div className={styles.cube}>
            <span className={`${styles.face} ${styles.front}`} />
            <span className={`${styles.face} ${styles.back}`} />
            <span className={`${styles.face} ${styles.right}`} />
            <span className={`${styles.face} ${styles.left}`} />
            <span className={`${styles.face} ${styles.top}`} />
            <span className={`${styles.face} ${styles.bottom}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
