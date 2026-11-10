import React, { useMemo } from "react";

interface ParticleConfig {
  id: number;
  type: "dot" | "plus" | "sparkle" | "ring" | "diamond" | "angle" | "tri-dot";
  left: number; // percentage (0 - 100)
  size: number; // px
  duration: number; // seconds
  delay: number; // negative seconds so they appear everywhere immediately
  drift: number; // px horizontal drift
  rotation: number; // degrees
  opacity: number; // 0.12 - 0.32
}

export const FloatingParticlesBackground: React.FC = () => {
  // Deterministic particle set so there's no SSR / hydration mismatch or re-render churn
  const particles: ParticleConfig[] = useMemo(() => [
    { id: 1, type: "dot", left: 3, size: 3, duration: 22, delay: -4, drift: 15, rotation: 180, opacity: 0.28 },
    { id: 2, type: "plus", left: 7, size: 7, duration: 28, delay: -18, drift: -20, rotation: 270, opacity: 0.22 },
    { id: 3, type: "ring", left: 11, size: 6, duration: 25, delay: -9, drift: 18, rotation: 360, opacity: 0.20 },
    { id: 4, type: "sparkle", left: 15, size: 8, duration: 32, delay: -24, drift: -15, rotation: 180, opacity: 0.26 },
    { id: 5, type: "dot", left: 19, size: 2.5, duration: 19, delay: -12, drift: 12, rotation: 90, opacity: 0.25 },
    { id: 6, type: "diamond", left: 23, size: 6, duration: 27, delay: -3, drift: -25, rotation: 240, opacity: 0.22 },
    { id: 7, type: "plus", left: 27, size: 8, duration: 30, delay: -21, drift: 22, rotation: 180, opacity: 0.24 },
    { id: 8, type: "dot", left: 31, size: 3.5, duration: 24, delay: -15, drift: -18, rotation: 120, opacity: 0.30 },
    { id: 9, type: "ring", left: 35, size: 7, duration: 34, delay: -27, drift: 20, rotation: 360, opacity: 0.18 },
    { id: 10, type: "sparkle", left: 39, size: 9, duration: 26, delay: -6, drift: -22, rotation: 210, opacity: 0.25 },
    { id: 11, type: "tri-dot", left: 43, size: 7, duration: 31, delay: -16, drift: 16, rotation: 90, opacity: 0.20 },
    { id: 12, type: "dot", left: 47, size: 2, duration: 18, delay: -8, drift: -12, rotation: 60, opacity: 0.26 },
    { id: 13, type: "diamond", left: 51, size: 6.5, duration: 29, delay: -23, drift: 24, rotation: 300, opacity: 0.22 },
    { id: 14, type: "plus", left: 55, size: 7.5, duration: 23, delay: -2, drift: -16, rotation: 180, opacity: 0.25 },
    { id: 15, type: "ring", left: 59, size: 6.5, duration: 33, delay: -19, drift: 18, rotation: 360, opacity: 0.19 },
    { id: 16, type: "dot", left: 63, size: 3, duration: 21, delay: -11, drift: -20, rotation: 150, opacity: 0.28 },
    { id: 17, type: "sparkle", left: 67, size: 8.5, duration: 28, delay: -26, drift: 22, rotation: 220, opacity: 0.24 },
    { id: 18, type: "angle", left: 71, size: 7, duration: 35, delay: -7, drift: -18, rotation: 180, opacity: 0.20 },
    { id: 19, type: "dot", left: 75, size: 2.5, duration: 20, delay: -17, drift: 14, rotation: 80, opacity: 0.26 },
    { id: 20, type: "plus", left: 79, size: 7, duration: 27, delay: -4, drift: -24, rotation: 270, opacity: 0.23 },
    { id: 21, type: "ring", left: 83, size: 6, duration: 30, delay: -22, drift: 19, rotation: 360, opacity: 0.18 },
    { id: 22, type: "diamond", left: 87, size: 6, duration: 25, delay: -13, drift: -15, rotation: 210, opacity: 0.22 },
    { id: 23, type: "dot", left: 91, size: 3.5, duration: 22, delay: -5, drift: 17, rotation: 100, opacity: 0.29 },
    { id: 24, type: "sparkle", left: 95, size: 8, duration: 31, delay: -25, drift: -22, rotation: 190, opacity: 0.24 },
    // Intermediate layers for uniform field density
    { id: 25, type: "dot", left: 5, size: 2, duration: 17, delay: -14, drift: 10, rotation: 45, opacity: 0.22 },
    { id: 26, type: "plus", left: 17, size: 6.5, duration: 26, delay: -1, drift: -14, rotation: 180, opacity: 0.21 },
    { id: 27, type: "sparkle", left: 29, size: 7.5, duration: 33, delay: -10, drift: 21, rotation: 240, opacity: 0.23 },
    { id: 28, type: "diamond", left: 41, size: 5.5, duration: 24, delay: -28, drift: -19, rotation: 180, opacity: 0.20 },
    { id: 29, type: "dot", left: 53, size: 3, duration: 21, delay: -20, drift: 15, rotation: 110, opacity: 0.27 },
    { id: 30, type: "ring", left: 65, size: 5.5, duration: 32, delay: -15, drift: -17, rotation: 360, opacity: 0.17 },
    { id: 31, type: "plus", left: 77, size: 7, duration: 29, delay: -8, drift: 23, rotation: 270, opacity: 0.22 },
    { id: 32, type: "dot", left: 89, size: 2.5, duration: 19, delay: -29, drift: -13, rotation: 90, opacity: 0.25 },
    { id: 33, type: "tri-dot", left: 97, size: 6.5, duration: 36, delay: -12, drift: 15, rotation: 90, opacity: 0.19 },
    { id: 34, type: "angle", left: 13, size: 6.5, duration: 30, delay: -30, drift: -16, rotation: 180, opacity: 0.19 },
    { id: 35, type: "dot", left: 37, size: 2.5, duration: 23, delay: -17, drift: 12, rotation: 70, opacity: 0.24 },
    { id: 36, type: "sparkle", left: 73, size: 8, duration: 27, delay: -2, drift: -20, rotation: 200, opacity: 0.23 },
  ], []);

  const renderShape = (particle: ParticleConfig) => {
    const s = particle.size;
    const color = "#D4FF24"; // Acid Lime

    switch (particle.type) {
      case "dot":
        return (
          <div
            style={{
              width: `${s}px`,
              height: `${s}px`,
              backgroundColor: color,
              borderRadius: "9999px",
              boxShadow: "0 0 6px rgba(212, 255, 36, 0.65)",
            }}
          />
        );

      case "plus":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 8 8"
            fill="none"
            style={{ filter: "drop-shadow(0 0 3px rgba(212, 255, 36, 0.5))" }}
          >
            <path
              d="M4 0.5V7.5M0.5 4H7.5"
              stroke={color}
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        );

      case "sparkle":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 16 16"
            fill={color}
            style={{ filter: "drop-shadow(0 0 4px rgba(212, 255, 36, 0.55))" }}
          >
            <path d="M8 0L9.4 6.6L16 8L9.4 9.4L8 16L6.6 9.4L0 8L6.6 6.6L8 0Z" />
          </svg>
        );

      case "ring":
        return (
          <div
            style={{
              width: `${s}px`,
              height: `${s}px`,
              borderRadius: "9999px",
              border: `1px solid ${color}`,
              boxShadow: "0 0 4px rgba(212, 255, 36, 0.35)",
            }}
          />
        );

      case "diamond":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 8 8"
            fill="none"
            style={{ filter: "drop-shadow(0 0 3px rgba(212, 255, 36, 0.45))" }}
          >
            <polygon
              points="4,0.8 7.2,4 4,7.2 0.8,4"
              stroke={color}
              strokeWidth="1"
            />
          </svg>
        );

      case "angle":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 8 8"
            fill="none"
            style={{ filter: "drop-shadow(0 0 3px rgba(212, 255, 36, 0.45))" }}
          >
            <path
              d="M1.5 6.5L6.5 1.5M6.5 6.5V1.5H1.5"
              stroke={color}
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        );

      case "tri-dot":
        return (
          <div className="flex flex-col gap-1 items-center justify-center">
            <span
              style={{
                width: "2px",
                height: "2px",
                backgroundColor: color,
                borderRadius: "9999px",
              }}
            />
            <span
              style={{
                width: "2px",
                height: "2px",
                backgroundColor: color,
                borderRadius: "9999px",
              }}
            />
            <span
              style={{
                width: "2px",
                height: "2px",
                backgroundColor: color,
                borderRadius: "9999px",
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Subtle ambient lighting mesh to highlight background depth */}
      <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full bg-[#1F51FF]/[0.045] blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-[#D4FF24]/[0.02] blur-[150px] pointer-events-none" />

      {/* Floating micro particles */}
      {particles.map((p) => {
        const customStyle: React.CSSProperties & Record<string, string | number> = {
          left: `${p.left}%`,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
          "--p-opacity": p.opacity,
          "--p-drift": `${p.drift}px`,
          "--p-rot": `${p.rotation}deg`,
        };

        return (
          <div
            key={p.id}
            className="particle-float absolute bottom-0 -mb-6"
            style={customStyle}
          >
            {renderShape(p)}
          </div>
        );
      })}
    </div>
  );
};
