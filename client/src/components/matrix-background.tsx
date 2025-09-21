import { useEffect, useRef } from "react";

export function MatrixBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";
    const columns: HTMLDivElement[] = [];

    const createMatrixRain = () => {
      // Clear existing columns
      container.innerHTML = "";
      columns.length = 0;

      for (let i = 0; i < 50; i++) {
        const column = document.createElement("div");
        column.className = "matrix-column";
        column.style.left = Math.random() * 100 + "%";
        column.style.animationDelay = Math.random() * 15 + "s";
        column.style.animationDuration = (15 + Math.random() * 10) + "s";

        let columnText = "";
        for (let j = 0; j < 20; j++) {
          columnText += characters[Math.floor(Math.random() * characters.length)] + "\n";
        }
        column.textContent = columnText;

        container.appendChild(column);
        columns.push(column);
      }
    };

    createMatrixRain();

    // Recreate columns periodically for variety
    const refreshInterval = setInterval(createMatrixRain, 30000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return <div ref={containerRef} className="matrix-bg scan-lines" data-testid="matrix-background" />;
}
