import React, { useEffect, useRef } from 'react';

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Enhanced Star Object
    interface Star {
      x: number;
      y: number;
      z: number; // Depth for parallax
      size: number;
      opacity: number;
      flickerSpeed: number;
    }

    const stars: Star[] = [];
    const starCount = 500; // More stars

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5, // 0.5 to 2.5
        size: Math.random() * 1.5,
        opacity: Math.random(),
        flickerSpeed: 0.02 + Math.random() * 0.05
      });
    }

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      // Fade out trail effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)'; 
      ctx.fillRect(0, 0, width, height);

      // Subtle mouse parallax influence
      const mouseXOffset = (mouseRef.current.x - width / 2) * 0.05;
      const mouseYOffset = (mouseRef.current.y - height / 2) * 0.05;

      stars.forEach((star) => {
        // Vertical movement (falling stars)
        star.y -= 0.3 * star.z; 

        // Wrap around
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        // Calculate position with parallax
        const x = star.x - (mouseXOffset * star.z * 0.1);
        const y = star.y - (mouseYOffset * star.z * 0.1);

        // Twinkle
        const alpha = 0.5 + 0.5 * Math.sin(time * 5 + star.flickerSpeed * 100);

        // Draw
        ctx.beginPath();
        ctx.fillStyle = `rgba(165, 180, 252, ${alpha * star.opacity})`;
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Occasional connecting lines for "constellation" effect (optional, maybe too messy)
        // Kept simple for performance
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
};

export default StarField;
