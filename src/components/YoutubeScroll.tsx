import React, { useEffect, useRef } from 'react';

export const YoutubeScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let position = 0;
    const scrollSpeed = 1;

    const animate = () => {
      position -= scrollSpeed;
      if (position <= -container.scrollHeight / 2) {
        position = 0;
      }
      container.style.transform = `translateY(${position}px)`;
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="fixed right-0 top-0 h-full w-96 overflow-hidden opacity-20 pointer-events-none">
      <div ref={containerRef} className="space-y-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="bg-primary/10 rounded-lg h-32 w-full animate-pulse" />
        ))}
      </div>
    </div>
  );
};