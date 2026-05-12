import { motion, useMotionValue, useTransform } from 'motion/react';
import { MouseEvent, useRef } from 'react';

export default function HeroTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const mouseX = useMotionValue(0.5);
  const isHovered = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLHeadingElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
  };

  const handleMouseEnter = () => {
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    isHovered.set(0);
    mouseX.set(0.5);
  };

  // Gradient position follows mouse
  const gradientPos = useTransform(mouseX, [0, 1], [0, 100]);

  // Gradient opacity based on hover state
  const gradientOpacity = useTransform(isHovered, [0, 1], [0, 1]);

  return (
    <motion.h1
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="hero-title hero-title-hologram hero-title-gradient-safe display-compressed font-display text-6xl font-semibold md:text-8xl lg:text-9xl cursor-default select-none"
    >
      {/* White text layer - always visible */}
      <span className="block text-white">
        Digital
        <br />
        Transformation Helper
      </span>

      {/* Gradient overlay - appears on hover */}
      <motion.span
        className="absolute left-0 top-0 block h-full w-full pointer-events-none"
        style={{
          backgroundImage: useTransform(
            gradientPos,
            (pos) =>
              `linear-gradient(90deg, #ffffff 0%, #c4b5fd ${Math.max(0, pos - 20)}%, #a855f7 ${pos}%, #c4b5fd ${Math.min(100, pos + 20)}%, #ffffff 100%)`
          ),
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          opacity: gradientOpacity,
        }}
      >
        Digital
        <br />
        Transformation Helper
      </motion.span>
    </motion.h1>
  );
}
