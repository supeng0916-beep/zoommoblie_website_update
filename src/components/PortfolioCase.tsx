import { motion, useMotionValue, useTransform } from 'motion/react';
import { CSSProperties, MouseEvent, useRef } from 'react';

interface PortfolioCaseProps {
  item: {
    title: string;
    images: string[];
    mobile?: boolean;
    note?: string;
    category: string;
  };
  index: number;
}

export default function PortfolioCase({ item, index }: PortfolioCaseProps) {
  const cardRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);

  // Glare position for gradient effect
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.025, 0.24) }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="portfolio-case shadow-border group relative"
    >
      {/* Animated gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-20"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `conic-gradient(from ${(x as number) * 3.6}deg at ${x}% ${y}%, transparent, rgba(168, 85, 247, 0.4), transparent, rgba(236, 72, 153, 0.3), transparent)`
          ),
          filter: 'blur(3px)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '2px',
        }}
      />

      {/* Glare overlay effect */}
      <motion.div
        className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-20 pointer-events-none z-20"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(168, 85, 247, 0.3), transparent 60%)`
          ),
        }}
      />

      <div className="portfolio-case-header relative z-10">
        <span className="portfolio-index">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h3>{item.title}</h3>
          {item.note && <p>{item.note}</p>}
        </div>
      </div>
      <div className={`portfolio-image-stack relative z-10 ${item.mobile ? 'portfolio-mobile-stack' : ''}`}>
        {item.images.map((image, imageIndex) => (
          <div key={image} className="portfolio-image-frame" style={{ '--image-index': imageIndex } as CSSProperties}>
            <img src={`/assets/portfolio/${image}`} alt={item.title} />
          </div>
        ))}
      </div>
    </motion.article>
  );
}
