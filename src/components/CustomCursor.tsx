import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect touch device to hide custom cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer');
        setIsPointer(Boolean(isClickable));
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Central spotlight dot */}
      <div
        className="fixed pointer-events-none z-50 rounded-full bg-[#F5D37C] mix-blend-screen transition-transform duration-75"
        style={{
          width: isPointer ? '12px' : '6px',
          height: isPointer ? '12px' : '6px',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 12px #F5D37C',
        }}
      />

      {/* Outer ambient spotlight halo ring */}
      <div
        className="fixed pointer-events-none z-50 rounded-full border border-[#C9A24B]/40 transition-all duration-200 ease-out"
        style={{
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
          backgroundColor: isPointer ? 'rgba(201, 162, 75, 0.12)' : 'transparent',
        }}
      />
    </>
  );
};
