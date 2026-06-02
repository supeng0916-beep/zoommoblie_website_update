/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  FileScan,
  Fingerprint,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  ScanFace,
  ShieldCheck,
  UserCheck,
  ClipboardCheck,
  X,
} from 'lucide-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import HeroParticles from './components/HeroParticles';
import HeroTitle from './components/HeroTitle';
import HeroLoopVideo from './components/HeroLoopVideo';
import TimelineSection from './components/TimelineSection';
import AnimatedCounter from './components/AnimatedCounter';

const aboutLinks = [
  { label: 'The Company', href: '#company' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'Our Strength', href: '#strength' },
  { label: 'Our Team', href: '#team' },
];

const companyServices = [
  {
    title: 'Online Management System',
    body:
      'Our dedicated team will provide your business with a tailored management platform that gives you an innovative advantage over your competitors.',
    icon: '💻',
  },
  {
    title: 'Mobile Apps Development',
    body:
      'Our expert team offers technical guidance and innovative solutions for mobile app development that exceed your expectations.',
    icon: '📱',
  },
  {
    title: 'API Integration',
    body:
      'We provide API development to enable interaction between data, applications, and devices through API. E.g. Youtube API, Messaging API, Payment API, Telco API, Insurance API, etc.',
    icon: '🔗',
  },
  {
    title: 'Marketing Platform Integration',
    body:
      'Our team specializes in integrating marketing tools like Google Analytics, Facebook SDK or Pixel to help you easily track your marketing performance.',
    icon: '📊',
  },
];

const partnerLogos = [
  { name: 'Alibaba', file: 'alibaba.png' },
  { name: 'Anti', file: 'anti.jpg' },
  { name: 'Axiata', file: 'axiata.png' },
  { name: 'Celcom', file: 'celcom.png' },
  { name: 'CityLife', file: 'citylifelogo.png' },
  { name: 'Digi', file: 'dg.png' },
  { name: 'eGHL', file: 'eghl.png' },
  { name: 'Etiqa', file: 'etiqa.png' },
  { name: 'GW', file: 'gwlogo.jpg' },
  { name: 'Lonpac', file: 'lonpac.png' },
  { name: 'Maxis', file: 'maxis-logo.png' },
  { name: 'Motor2U', file: 'motor2u.png' },
  { name: 'MPI', file: 'mpi.jpg' },
  { name: 'Noah Ark', file: 'noahark.png' },
  { name: 'Revenue Monster', file: 'revenue_monster.png' },
  { name: 'SenangPay', file: 'senangpay.png' },
  { name: 'Shinjiru', file: 'shinjiru.png' },
  { name: 'Tune', file: 'tune.png' },
  { name: 'XOX', file: 'xox.png' },
];

const aboutMilestones = [
  {
    id: 'mission',
    eyebrow: '01 / Direction',
    title: 'Our Mission',
    body:
      'Zoom Mobile aims to have leadership in the web and mobile application market. This leadership will enable us to sustain profitable company growth and provide our people with a variety of professional challenges. When working together with Zoom Mobile, you will benefit from our reliable infrastructure, our in-depth expertise and our strong service orientation.',
  },
  {
    id: 'strength',
    eyebrow: '02 / Capability',
    title: 'Our Strength',
    body:
      "Zoom Mobile excels in undertaking projects of any size or complexity, supported by our exceptional capabilities and professional team. We provide excellent services and customized solutions to meet clients' needs and expectations, ensuring smooth progress and successful delivery. We take our clients' success as our mission, always upholding the values of integrity, quality, and innovation, and infusing each project with our utmost passion and professional spirit. By choosing us, you will be selecting a reliable partner to ensure the success of your project.",
  },
  {
    id: 'team',
    eyebrow: '03 / People',
    title: 'Our Team',
    body:
      "Zoom Mobile's team of programmers spans from more than 20 years of experience to energetic new talent. They value professionalism, invest in development, and recognize the importance of people to business success. With 20+ years of expertise, they deliver reliable internet and mobile solutions, leading the industry with a commitment to diversity and employee growth. Zoom Mobile is a formidable force in the tech space.",
  },
];

const eKycBenefits = [
  {
    title: 'Fraud Risk Control',
    body: 'Detect forged documents, spoofed selfies, and high-risk onboarding patterns before they enter your system.',
    icon: ShieldCheck,
  },
  {
    title: 'Seamless User Retention',
    body: 'Reduce manual review friction with guided capture, instant feedback, and a verification flow built for completion.',
    icon: UserCheck,
  },
  {
    title: 'Compliance Audit Trail',
    body: 'Keep verification decisions traceable with encrypted identity evidence, timestamps, and review-ready records.',
    icon: ClipboardCheck,
  },
];

const eKycWorkflowSteps = [
  {
    step: 'Step 1',
    title: 'Smart Capture',
    body: 'AI liveness selfie detection + anti-forgery ID photo capture',
    icon: ScanFace,
  },
  {
    step: 'Step 2',
    title: 'Model Matching',
    body: 'OCR extraction + neural face feature matching + authoritative database cross-checks',
    icon: FileScan,
  },
  {
    step: 'Step 3',
    title: 'Encrypted Authorization',
    body: 'Generate an encrypted digital identity and approve access in seconds',
    icon: LockKeyhole,
  },
];

const eKycDocumentFields = [
  {
    label: 'Name',
    value: 'Verified User',
  },
  {
    label: 'ID No.',
    value: 'A9284 6021',
  },
  {
    label: 'Status',
    value: 'Risk cleared',
  },
];

const Logo = ({ className = '' }: { className?: string }) => (
  <a href="#top" className={`flex items-center ${className}`} aria-label="Zoom Mobile Solutions home">
    <img
      src="/assets/ZM_logo.png"
      alt="Zoom Mobile Solutions"
      className="h-[2.75rem] w-auto object-contain md:h-[3.45rem]"
    />
  </a>
);

const closeMenu = (setter: (value: boolean) => void) => () => setter(false);

const buttonClass =
  'inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-3 font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.22)] backdrop-blur-xl transition-all hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_32px_rgba(255,255,255,0.24)] active:scale-95';

const contactButtonClass =
  'contact-button inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-3 font-semibold shadow-[0_0_28px_rgba(124,58,237,0.22)] backdrop-blur-xl transition-all hover:border-white hover:bg-white hover:shadow-[0_0_32px_rgba(255,255,255,0.24)] active:scale-95';

function EKycWorkflowSimulator() {
  const [activeStep, setActiveStep] = useState(1);
  const [settledStep, setSettledStep] = useState(1);
  const [impactStep, setImpactStep] = useState<number | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const updateLayout = () => setIsCompact(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);

    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current === 3 ? 1 : current + 1));
    }, 2500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setImpactStep(null);

    const arrivalTimer = window.setTimeout(() => {
      setSettledStep(activeStep);
      setImpactStep(activeStep);
    }, 900);

    return () => window.clearTimeout(arrivalTimer);
  }, [activeStep]);

  const dotPositions = isCompact
    ? [
        { left: '24px', top: '11%' },
        { left: '24px', top: '50%' },
        { left: '24px', top: '89%' },
      ]
    : [
        { left: '12.5%', top: '50%' },
        { left: '50%', top: '50%' },
        { left: '87.5%', top: '50%' },
      ];

  return (
    <div className="ekyc-timeline">
      <div className={`ekyc-laser-line ${isCompact ? 'is-vertical' : 'is-horizontal'}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient
              id={`purple-gradient-${isCompact ? 'vertical' : 'horizontal'}`}
              x1="0"
              y1="0"
              x2={isCompact ? '0' : '1'}
              y2={isCompact ? '1' : '0'}
            >
              <stop offset="0%" stopColor="#581c87" stopOpacity="0.12" />
              <stop offset="34%" stopColor="#a855f7" stopOpacity="0.98" />
              <stop offset="62%" stopColor="#e9d5ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <line
            className="ekyc-laser-base"
            x1={isCompact ? '50' : '0'}
            y1={isCompact ? '0' : '50'}
            x2={isCompact ? '50' : '100'}
            y2={isCompact ? '100' : '50'}
          />
          <line
            className="ekyc-laser-pulse"
            x1={isCompact ? '50' : '0'}
            y1={isCompact ? '0' : '50'}
            x2={isCompact ? '50' : '100'}
            y2={isCompact ? '100' : '50'}
            stroke={`url(#purple-gradient-${isCompact ? 'vertical' : 'horizontal'})`}
            strokeDasharray="20, 150"
            strokeDashoffset="0"
            pathLength="100"
          />
        </svg>
      </div>
      <motion.div
        className="ekyc-neon-dot"
        animate={dotPositions[activeStep - 1]}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      {impactStep !== null && (
        <motion.div
          key={impactStep}
          className="ekyc-impact-ripple"
          style={dotPositions[impactStep - 1]}
          initial={{ opacity: 0.75, scale: 0.38 }}
          animate={{ opacity: 0, scale: 2.4 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      {eKycWorkflowSteps.map((item, index) => {
        const Icon = item.icon;
        const isCurrent = settledStep === index + 1;

        return (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ scale: isCurrent ? 1.02 : 1, y: isCurrent ? -6 : 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            aria-current={isCurrent ? 'step' : undefined}
            className={`ekyc-workflow-card ${isCurrent ? 'is-active' : ''}`}
          >
            <div className="ekyc-workflow-icon">
              <Icon className="h-5 w-5" />
            </div>
            <span>{item.step}</span>
            <h4>{item.title}</h4>
            <p>{item.body}</p>
          </motion.article>
        );
      })}
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 18, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 18, mass: 0.4 });
  const imageX = useTransform(smoothX, [-1, 1], [-16, 16]);
  const imageY = useTransform(smoothY, [-1, 1], [-12, 12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0]);

  const handleHeroMouseMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const handleHeroMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Initialize smooth scrolling
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();
  }, []);

  return (
    <div
      id="top"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden font-sans selection:bg-purple-500/30 selection:text-white"
    >
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#030303]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(88,28,135,0.24),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(24,24,27,0.74),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_34%)]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-55 mix-blend-screen">
        <HeroParticles />
      </div>

      <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-6">
        <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-1.5 shadow-2xl md:px-6">
          <Logo />

          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#partners" className="nav-gradient-link">
              Partners & Clients
            </a>
            <a href="#ekyc" className="nav-gradient-link">
              ZM eKYC AI
            </a>
            <div className="group relative">
              <a href="#about" className="nav-gradient-link flex items-center gap-1">
                About
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </a>
              <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="glass-card rounded-2xl p-3 shadow-2xl">
                  {aboutLinks.map((item) => (
                    <a key={item.href} href={item.href} className="nav-gradient-link block rounded-xl px-4 py-3 hover:bg-white/10">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <a href="#contact" className={`${contactButtonClass} px-6 py-2`}>
              <span className="contact-gradient-text">Contact us</span>
            </a>
          </div>

          <button
            type="button"
            className="rounded-full p-2 text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass absolute left-4 right-4 top-20 rounded-3xl p-6 text-white md:hidden"
          >
            <div className="flex flex-col gap-4 text-base">
              <a href="#partners" onClick={closeMenu(setIsMenuOpen)}>
                Partners & Clients
              </a>
              <a href="#ekyc" onClick={closeMenu(setIsMenuOpen)}>
                ZM eKYC AI
              </a>
              <a href="#about" onClick={closeMenu(setIsMenuOpen)}>
                About
              </a>
              <div className="ml-4 flex flex-col gap-3 border-l border-white/10 pl-4 text-sm text-white/60">
                {aboutLinks.map((item) => (
                  <a key={item.href} href={item.href} onClick={closeMenu(setIsMenuOpen)} className="nav-gradient-link">
                    {item.label}
                  </a>
                ))}
              </div>
              <a href="#contact" onClick={closeMenu(setIsMenuOpen)} className={contactButtonClass}>
                <span className="contact-gradient-text">Contact us</span>
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-32 text-center"
      >
        <motion.div
          style={{
            x: imageX,
            y: imageY,
            opacity: heroOpacity,
          }}
          className="absolute inset-0 z-0"
        >
          <HeroLoopVideo
            className="hero-video h-full w-full object-cover"
            src="/assets/background_gif.mp4"
          />
        </motion.div>

        {/* Gradient overlays for depth */}
        <div className="hero-video-tint pointer-events-none absolute inset-0 z-[1]" />
        <div className="hero-video-depth pointer-events-none absolute inset-0 z-[1]" />
        <div className="hero-video-fade pointer-events-none absolute inset-0 z-[1]" />

        <div className="hero-copy relative z-10 mx-auto mt-20 flex max-w-4xl flex-col items-center px-5 py-8 md:mt-28 md:px-10">
          <HeroTitle />

          <motion.a
            href="#partners"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${buttonClass} mt-9 gap-2 text-lg`}
          >
            Explore
            <ChevronRight className="h-5 w-5" />
          </motion.a>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="relative scroll-mt-28 overflow-hidden px-6 py-16">
        <div className="section-orbit section-orbit-left" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mono-label mb-4">Trusted network / 19 signals</p>
              <h2 className="section-title-gradient display-compressed text-5xl font-semibold md:text-7xl">
                Partners & Clients
              </h2>
            </div>
            <p className="max-w-2xl text-xl leading-9 text-white/62 md:justify-self-end md:text-2xl md:leading-10">
              A technical delivery network spanning payments, telco, insurance, commerce, hosting, and platform partners.
            </p>
          </div>

          <div className="partner-wall">
            {partnerLogos.map((logo, index) => (
              <motion.div
                key={logo.file}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.025, 0.28) }}
                className="partner-logo-tile"
              >
                <img src={`/assets/partners/${logo.file}`} alt={logo.name} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ZM eKYC AI Section */}
      <section id="ekyc" className="relative scroll-mt-28 overflow-hidden px-6 py-16">
        <div className="section-orbit section-orbit-right" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mono-label mb-4"
              >
                ZM eKYC AI / Identity verification engine
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="section-title-gradient display-compressed text-5xl font-semibold md:text-7xl"
              >
                ZM eKYC AI
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="max-w-2xl text-xl leading-9 text-white/62 md:justify-self-end md:text-2xl md:leading-10"
            >
              A secure onboarding layer that combines AI face recognition, OCR document capture, fraud screening, and instant identity approval.
            </motion.p>
          </div>

          <div className="ekyc-bento mt-14">
            {eKycBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 + index * 0.08 }}
                  className="ekyc-benefit"
                >
                  <div className="ekyc-benefit-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28 }}
            className="ekyc-engine mt-16"
          >
            <div className="ekyc-engine-copy">
              <p className="mono-label mb-4">Workflow engine / Live data path</p>
              <h3 className="display-compressed font-display text-4xl font-semibold text-white md:text-6xl">
                Verification moves like data, not paperwork.
              </h3>
            </div>

            <div className="ekyc-workbench">
              <EKycWorkflowSimulator />

              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
                className="ekyc-stage"
              >
                <div className="ekyc-phone shadow-border">
                  <div className="ekyc-phone-top">
                    <span />
                    <p>Identity Scan</p>
                    <Fingerprint className="h-5 w-5" />
                  </div>

                  <div className="ekyc-scan-area">
                    <div className="ekyc-face-ring">
                      <ScanFace className="h-20 w-20" />
                    </div>
                    <div className="ekyc-scan-line" />
                    <div className="ekyc-corner ekyc-corner-tl" />
                    <div className="ekyc-corner ekyc-corner-tr" />
                    <div className="ekyc-corner ekyc-corner-bl" />
                    <div className="ekyc-corner ekyc-corner-br" />
                  </div>

                  <div className="ekyc-document-card">
                    <div>
                      <p className="mono-label">OCR document</p>
                      <h3>MYKad / Passport</h3>
                    </div>
                    <div className="ekyc-document-chip">LIVE</div>
                    {eKycDocumentFields.map((field) => (
                      <div key={field.label} className="ekyc-document-field">
                        <span>{field.label}</span>
                        <p>{field.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="ekyc-success">
                    <BadgeCheck className="h-7 w-7" />
                    <div>
                      <strong>Verification passed</strong>
                      <p>Face, OCR and risk checks approved</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section with Enhanced Interactions */}
      <section id="about" className="relative scroll-mt-28 overflow-hidden px-6 py-16">
        <div className="section-orbit section-orbit-right" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mono-label mb-4">About / Build discipline</p>
              <h2 className="section-title-gradient display-compressed text-5xl font-semibold md:text-7xl">About</h2>
            </div>
            <p className="max-w-2xl text-balance text-xl leading-9 text-white/62 lg:justify-self-end md:text-2xl md:leading-10">
              Software development with the restraint of infrastructure and the momentum of product delivery.
            </p>
          </div>

          <motion.section
            id="company"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="company-editorial shadow-border scroll-mt-32"
          >
            <div className="company-statement">
              <p className="mono-label mb-5">The Company</p>
              <h3 className="display-compressed text-4xl font-semibold text-white md:text-6xl">
                Expert software services since{' '}
                <span className="inline-block">
                  <AnimatedCounter
                    from={2000}
                    to={2008}
                    duration={1.5}
                    className="text-purple-300"
                  />
                </span>
              </h3>
              <p className="mt-8 max-w-2xl text-lg leading-9 text-white/62">
                At Zoom Mobile, we're passionate about software development, and we've been providing expert services
                tailored to meet the unique needs of businesses like yours since 2008.
              </p>
            </div>

            <div className="service-panel-grid">
              {companyServices.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="service-panel group relative overflow-hidden"
                >
                  {/* Hover glow effect */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 50%)',
                    }}
                  />

                  <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
                  <div className="mt-6 text-3xl">{service.icon}</div>
                  <h4 className="transition-colors duration-300 group-hover:text-purple-200">{service.title}</h4>
                  <p className="transition-colors duration-300 group-hover:text-white/70">{service.body}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* Enhanced Timeline Section */}
          <TimelineSection items={aboutMilestones} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-28 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-[28px] p-8 text-center md:p-12"
          >
            <h2 className="section-title-gradient mb-8 font-display text-4xl font-bold md:text-5xl">Contact Us</h2>
            <div className="space-y-6 text-white/65">
              <p className="text-lg text-white">Zoom Mobile Solutions Sdn Bhd. (864551-T)</p>
              <div className="flex justify-center gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-purple-300" />
                <p>
                  No 5-2, Jalan PJU 5/20A,
                  <br />
                  Pusat Perdagangan Kota Damansara,
                  <br />
                  47810 Petaling Jaya,
                  <br />
                  Selangor Darul Ehsan.
                </p>
              </div>
              <a
                href="mailto:inquiry@zoommobile.com.my"
                className="inline-flex items-center justify-center gap-3 text-white transition-colors hover:text-purple-200"
              >
                <Mail className="h-5 w-5 text-purple-300" />
                inquiry@zoommobile.com.my
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-black/60 px-6 py-8 text-center text-xs text-white/35">
        <p>Copyright © since 2008 Zoom Mobile Solutions Sdn Bhd. All Right Reserved.</p>
      </footer>
    </div>
  );
}
