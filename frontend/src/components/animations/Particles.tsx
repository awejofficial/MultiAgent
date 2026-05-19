import { useMemo } from "react";

export function Particles({ count = 30 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 1,
        d: Math.random() * 6 + 4,
        delay: Math.random() * 4,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-primary/50 float-y"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.s,
            height: d.s,
            animationDuration: `${d.d}s`,
            animationDelay: `${d.delay}s`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}
