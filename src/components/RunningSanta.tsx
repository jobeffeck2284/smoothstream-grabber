import { useEffect, useRef } from 'react';

export function RunningSanta() {
  const santaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const santa = santaRef.current;
    if (!santa) return;

    let position = -100;
    const speed = 2;
    const width = window.innerWidth;

    function animate() {
      position += speed;
      if (position > width) {
        position = -100;
      }
      if (santa) {
        santa.style.transform = `translateX(${position}px)`;
      }
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div
      ref={santaRef}
      className="fixed bottom-4 z-50 pointer-events-none"
    >
      <div className="text-4xl">🎅</div>
    </div>
  );
}