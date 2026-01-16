import React, { useEffect, useRef } from 'react';

interface ScrollManagerProps {
  onOpenModal: () => void;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ onOpenModal }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 1. Inject Styles for Flashy Animations & Overrides
    const style = document.createElement('style');
    style.innerHTML = `
      /* --- Override Body Background to let StarField shine through --- */
      body, .hero-bg, footer, section {
        background-color: transparent !important;
        background-image: none !important;
      }
      /* But keep some gradient overlays for readability if needed, or rely on glass cards */
      
      /* --- Scroll Reveal Classes --- */
      .js-hidden {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
        transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        filter: blur(5px);
      }
      .js-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }

      /* --- Animated Gradient Text --- */
      @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .gradient-text {
        background-size: 200% auto;
        animation: gradientFlow 5s ease infinite;
      }

      /* --- Floating Elements --- */
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      .glass-card {
        animation: float 6s ease-in-out infinite;
      }
      .glass-card:nth-child(2) { animation-delay: 1s; }
      .glass-card:nth-child(3) { animation-delay: 2s; }

    `;
    document.head.appendChild(style);

    // 2. Select Elements to Animate
    const animatedElements = document.querySelectorAll(
      'h1, h2, h3, h4, p, .glass-card, li, .flex > div, button, a.bg-indigo-600'
    );
    
    // 3. Setup Intersection Observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('js-visible');
          entry.target.classList.remove('js-hidden');
          // Don't unobserve if we want them to re-animate on scroll back? 
          // Let's keep it simple: animate once.
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // 4. Apply initial state and observe
    animatedElements.forEach((el, index) => {
      el.classList.add('js-hidden');
      // Add a slight stagger delay using inline styles if possible, or just let scroll handle it
      (el as HTMLElement).style.transitionDelay = `${(index % 3) * 0.1}s`;
      observerRef.current?.observe(el);
    });

    // 5. Hijack Buttons for Modal Interaction
    const buttons = document.querySelectorAll('a[href="#package"], button, a[href="#"]');
    const handleButtonClick = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const text = target.textContent?.trim() || "";
      // Match keywords for "Buy" or "Start"
      if (
        text.includes("구매하기") || 
        text.includes("시작하기") || 
        text.includes("패키지") ||
        target.tagName === 'BUTTON'
      ) {
        e.preventDefault();
        onOpenModal();
      }
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', handleButtonClick);
    });

    // Cleanup
    return () => {
      document.head.removeChild(style);
      observerRef.current?.disconnect();
      buttons.forEach((btn) => {
        btn.removeEventListener('click', handleButtonClick);
      });
    };
  }, [onOpenModal]);

  return null;
};

export default ScrollManager;
