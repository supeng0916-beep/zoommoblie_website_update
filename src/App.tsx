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
import { ChevronDown, ChevronRight, Mail, MapPin, Menu, X } from 'lucide-react';
import { CSSProperties, MouseEvent, useRef, useState } from 'react';

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
  },
  {
    title: 'Mobile Apps Development',
    body:
      'Our expert team offers technical guidance and innovative solutions for mobile app development that exceed your expectations.',
  },
  {
    title: 'API Integration',
    body:
      'We provide API development to enable interaction between data, applications, and devices through API. E.g. Youtube API, Messaging API, Payment API, Telco API, Insurance API, etc.',
  },
  {
    title: 'Marketing Platform Integration',
    body:
      'Our team specializes in integrating marketing tools like Google Analytics, Facebook SDK or Pixel to help you easily track your marketing performance.',
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

const portfolioItems = [
  {
    title: 'eCommerce Mobile App - Flutter, MSSQL',
    images: ['E1.png', 'E2.png', 'E3.png', 'E4.png'],
    mobile: true,
  },
  {
    title: 'Sound Frequency Analysis Report - VB .NET',
    images: ['D1.png', 'D2.png'],
  },
  {
    title: 'Online Game P v P & Tournament Platform - Angular, Node JS, MongoDB',
    images: ['beatuph.jpg', 'beatupl.jpg'],
  },
  {
    title: 'EV Charger - PHP Laravel, Flutter, MySQL',
    images: ['evchargerh.jpg', 'evchargerp.jpg'],
  },
  {
    title: 'Government Project 4 (Club Management) - .NET 6 Core, C#, MSSQL',
    note: '(Sub Con)',
    images: ['ZM_P10a.jpg', 'ZM_P10b.jpg'],
  },
  {
    title: 'Government Project 3 - .NET C#, Flutter, MSSQL',
    note: '(Sub Con)',
    images: ['ZM_P9a.jpg', 'ZM_P9b.jpg'],
  },
  {
    title: 'Government Project 2 - PHP CI, MSSQL',
    note: '(Sub Con)',
    images: ['ZM_P8a.jpg', 'ZM_P8b.jpg'],
  },
  {
    title: 'Government Project 1 - .NET C#, ASP, MSSQL',
    note: '(Sub Con)',
    images: ['ZM_P7a.jpg', 'ZM_P7b.jpg'],
  },
  {
    title: 'Travel Insurance Agent System - ASP, Delphi, MSSQL',
    images: ['ZM_P1a.jpg', 'ZM_P1b.jpg'],
  },
  {
    title: 'Staff Tags, Game Cards & Token Tracking System - C#, Angular, MSSQL, NodeJS, RabbitMQ',
    images: ['ZM_rfid01.jpg', 'ZM_rfid02.jpg'],
  },
  {
    title: 'eCommerce + Agent System - ASP .NET, MSSQL',
    images: ['ZM_P3a.jpg', 'ZM_P3b.jpg'],
  },
  {
    title: 'Machines Management - PHP CI, MYSQL',
    images: ['ZM_P6a.jpg', 'ZM_P6b.jpg'],
  },
  {
    title: 'Token App - ASP .Net, Flutter, MSSQL',
    images: ['ZM_P5a.jpg', 'ZM_P5b.jpg'],
  },
  {
    title: 'Broadcast System (million subscribers) - VB .NET, ASP .NET, ASP, MSSQL',
    images: ['ZM_P4a.jpg', 'ZM_P4b.jpg'],
  },
  {
    title: 'Motor Insurance Agent System - PHP Laravel, MYSQL, ASP, Delphi, MSSQL',
    images: ['ZM_P2a.jpg', 'ZM_P2b.jpg'],
  },
  {
    title: 'Game Research - Cocos2dx C++, Android Studio (Java), FB SDK',
    images: ['ZM_Game1a.jpg', 'ZM_Game1b.jpg'],
  },
  {
    title: 'Game Research - Reversed Engineering, Smali (Android Assembly Code)',
    note: 'Reserve engineer emulator, code injection, SDK integration etc.',
    images: ['ZM_Game2a.jpg', 'ZM_Game2b.jpg'],
  },
];

const Logo = ({ className = '' }: { className?: string }) => (
  <a href="#top" className={`flex items-center ${className}`} aria-label="Zoom Mobile Solutions home">
    <img
      src="/assets/ZM_logo.png"
      alt="Zoom Mobile Solutions"
      className="h-[3.4rem] w-auto object-contain md:h-[4.25rem]"
    />
  </a>
);

const closeMenu = (setter: (value: boolean) => void) => () => setter(false);

const buttonClass =
  'inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-3 font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.22)] backdrop-blur-xl transition-all hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_32px_rgba(255,255,255,0.24)] active:scale-95';

const contactButtonClass =
  'contact-button inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-3 font-semibold shadow-[0_0_28px_rgba(124,58,237,0.22)] backdrop-blur-xl transition-all hover:border-white hover:bg-white hover:shadow-[0_0_32px_rgba(255,255,255,0.24)] active:scale-95';

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

  return (
    <div
      id="top"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden font-sans selection:bg-purple-500/30 selection:text-white"
    >
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#030303]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(88,28,135,0.24),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(24,24,27,0.74),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_34%)]" />

      <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-6">
        <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-1.5 shadow-2xl md:px-6">
          <Logo />

          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#partners" className="nav-gradient-link">
              Partners & Clients
            </a>
            <a href="#portfolio" className="nav-gradient-link">
              Portfolio
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
              <a href="#portfolio" onClick={closeMenu(setIsMenuOpen)}>
                Portfolio
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
          className="hero-visual absolute inset-x-0 top-16 mx-auto h-[78vh] max-w-7xl px-4 md:top-20 md:h-[82vh]"
        >
          <div className="hero-image-frame relative h-full overflow-hidden rounded-[34px]">
            <img
              src="/assets/background.png"
              alt="Digital transformation technology"
              className="hero-image h-full w-full object-cover"
            />
            <div className="hero-overlay" />
            <div className="hero-fade" />
            <div className="noise-overlay" />
          </div>
        </motion.div>

        <div className="hero-copy relative z-10 mx-auto mt-20 flex max-w-4xl flex-col items-center px-5 py-8 md:mt-28 md:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hero-title hero-title-hologram display-compressed font-display text-6xl font-semibold text-white md:text-8xl lg:text-9xl"
            data-text="Digital Transformation Helper"
          >
            <span className="hero-title-base">
              Digital <br />
              <span className="text-gradient">Transformation Helper</span>
            </span>
            <span className="hero-title-highlight" aria-hidden="true">
              Digital <br />
              Transformation Helper
            </span>
          </motion.h1>
          <div className="hero-console-strip mt-5">
            <span>build:production</span>
            <span>latency:minimized</span>
            <span>systems:online</span>
          </div>

          <motion.a
            href="#portfolio"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${buttonClass} mt-9 gap-2 text-lg`}
          >
            View Our Portfolio
            <ChevronRight className="h-5 w-5" />
          </motion.a>
        </div>
      </section>

      <section id="partners" className="relative scroll-mt-28 overflow-hidden px-6 py-28">
        <div className="section-orbit section-orbit-left" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mono-label mb-4">Trusted network / 19 signals</p>
              <h2 className="section-title-gradient display-compressed text-5xl font-semibold md:text-7xl">
                Partners & Clients
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/56 md:justify-self-end">
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

      <section id="portfolio" className="relative scroll-mt-28 overflow-hidden px-6 py-28">
        <div className="section-orbit section-orbit-right" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.42fr_1fr]">
          <div className="portfolio-sticky">
            <p className="mono-label mb-4">Portfolio / Case archive</p>
            <h2 className="section-title-gradient display-compressed text-5xl font-semibold md:text-7xl">Portfolio</h2>
            <p className="mt-7 max-w-sm text-lg leading-8 text-white/58">
              Production work across commerce, mobile, government systems, payments, games, and enterprise platforms.
            </p>
            <div className="portfolio-metrics shadow-border mt-9">
              <div>
                <span>{portfolioItems.length}</span>
                <p>documented cases</p>
              </div>
              <div>
                <span>36</span>
                <p>demo screens</p>
              </div>
            </div>
          </div>

          <div className="portfolio-case-list">
            {portfolioItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.025, 0.24) }}
                className="portfolio-case shadow-border"
              >
                <div className="portfolio-case-header">
                  <span className="portfolio-index">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    {item.note && <p>{item.note}</p>}
                  </div>
                </div>
                <div className={`portfolio-image-stack ${item.mobile ? 'portfolio-mobile-stack' : ''}`}>
                  {item.images.map((image, imageIndex) => (
                    <div key={image} className="portfolio-image-frame" style={{ '--image-index': imageIndex } as CSSProperties}>
                      <img src={`/assets/portfolio/${image}`} alt={item.title} />
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative scroll-mt-28 overflow-hidden px-6 py-28">
        <div className="section-orbit section-orbit-right" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mono-label mb-4">About / Build discipline</p>
              <h2 className="section-title-gradient display-compressed text-5xl font-semibold md:text-7xl">About</h2>
            </div>
            <p className="text-balance text-2xl leading-10 text-white/66 md:text-3xl">
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
                Expert software services since 2008.
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
                  className="service-panel"
                >
                  <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
                  <h4>{service.title}</h4>
                  <p>{service.body}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <div className="about-rail mt-16">
            {aboutMilestones.map((item, index) => (
              <motion.section
                id={item.id}
                key={item.id}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="about-step scroll-mt-32"
              >
                <div className="about-step-marker">{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <p className="mono-label mb-3">{item.eyebrow}</p>
                  <h3 className="display-compressed text-3xl font-semibold text-white md:text-5xl">{item.title}</h3>
                  <p className="mt-6 max-w-4xl text-lg leading-9 text-white/62">{item.body}</p>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card rounded-[28px] p-8 text-center md:p-12">
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
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-black/60 px-6 py-8 text-center text-xs text-white/35">
        <p>Copyright © since 2008 Zoom Mobile Solutions Sdn Bhd. All Right Reserved.</p>
      </footer>
    </div>
  );
}
