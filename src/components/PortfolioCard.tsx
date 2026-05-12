import { motion, useMotionValue, useTransform } from 'motion/react';
import { CSSProperties, MouseEvent, useRef } from 'react';

interface PortfolioCardProps {
  item: {
    title: string;
    images: string[];
    mobile?: boolean;
    note?: string;
    category: string;
  };
  index: number;
}

export default function PortfolioCard({ item, index }: PortfolioCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const scale = useTransform(
    [mouseX, mouseY],
    ([x, y]) => 1 + Math.abs(x as number) * 0.02 + Math.abs(y as number) * 0.02
  );

  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const categoryColors: Record<string, string> = {
    mobile: 'from-blue-500 to-cyan-500',
    web: 'from-purple-500 to-pink-500',
    game: 'from-orange-500 to-red-500',
    government: 'from-green-500 to-emerald-500',
    system: 'from-yellow-500 to-amber-500',
  };

  const gradientClass = categoryColors[item.category] || 'from-purple-500 to-fuchsia-500';

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: Math.min(index * 0.08, 0.4),
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="portfolio-card group relative cursor-pointer overflow-hidden rounded-2xl"
    >
      {/* Card background with gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent p-[1px]">
        <div className="h-full w-full rounded-[15px] bg-[#0a0a12]" />
      </div>

      {/* Animated border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `conic-gradient(from ${(x as number) * 3.6}deg at ${x}% ${y}%, transparent, rgba(168, 85, 247, 0.5), transparent, rgba(236, 72, 153, 0.5), transparent)`
          ),
          filter: 'blur(4px)',
        }}
      />

      {/* Inner content */}
      <div className="relative z-10 p-6">
        {/* Header with index */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 font-mono text-sm text-purple-300/80 ring-1 ring-white/10">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          {item.note && (
            <span className="font-mono text-xs text-white/40">{item.note}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-5 font-display text-xl font-semibold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-purple-200 md:text-2xl">
          {item.title}
        </h3>

        {/* Image grid with 3D effect */}
        <div
          className={`grid gap-3 ${item.mobile ? 'grid-cols-4' : 'grid-cols-2'}`}
          style={{ transform: 'translateZ(20px)' }}
        >
          {item.images.map((image, imageIndex) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + imageIndex * 0.1 }}
              className="group/image relative aspect-[4/3] overflow-hidden rounded-xl bg-white/5"
            >
              <img
                src={`/assets/portfolio/${image}`}
                alt={item.title}
                className="h-full w-full object-cover transition-all duration-500 group-hover/image:scale-110 group-hover/image:brightness-110"
                loading="lazy"
              />
              {/* Image hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/image:opacity-100" />

              {/* Glare effect on image */}
              <motion.div
                className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover/image:opacity-30"
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([x, y]) =>
                      `radial-gradient(circle at ${x}% ${y}%, white, transparent 60%)`
                  ),
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Hover CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0, y: 10 }}
          className="mt-4 flex items-center justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 px-4 py-2 text-sm font-medium text-purple-300 ring-1 ring-purple-500/30 backdrop-blur-sm transition-all duration-300 group-hover:from-purple-500/30 group-hover:to-fuchsia-500/30 group-hover:ring-purple-500/50">
            View Details
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </motion.div>
      </div>

      {/* Glare effect overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-20"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.8), transparent 50%)`
          ),
        }}
      />
    </motion.article>
  );
}
