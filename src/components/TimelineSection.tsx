import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface TimelineItem {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
}

interface TimelineSectionProps {
  items: TimelineItem[];
}

export default function TimelineSection({ items }: TimelineSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="about-rail relative mt-16">
      {/* Animated timeline line */}
      <div className="absolute left-[42px] top-0 bottom-0 w-[2px] bg-white/10">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-fuchsia-500 to-pink-500"
          style={{ height: lineHeight }}
        />
      </div>

      {items.map((item, index) => (
        <motion.section
          id={item.id}
          key={item.id}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            delay: index * 0.15,
            duration: 0.6,
            type: 'spring',
            stiffness: 100,
          }}
          className="about-step group relative scroll-mt-32"
        >
          {/* Timeline node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
            className="about-step-marker relative z-10"
          >
            {/* Pulse effect */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
              className="absolute inset-0 rounded-full bg-purple-500/30"
            />

            {/* Node content */}
            <span className="relative z-10">{String(index + 1).padStart(2, '0')}</span>
          </motion.div>

          {/* Content */}
          <div className="relative">
            <p className="mono-label mb-3">{item.eyebrow}</p>
            <h3 className="display-compressed text-3xl font-semibold text-white transition-colors duration-300 group-hover:text-purple-200 md:text-5xl">
              {item.title}
            </h3>
            <p className="mt-6 max-w-4xl text-lg leading-9 text-white/62 transition-colors duration-300 group-hover:text-white/75">
              {item.body}
            </p>

            {/* Hover glow effect */}
            <motion.div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.1), transparent 70%)',
              }}
            />
          </div>
        </motion.section>
      ))}
    </div>
  );
}
