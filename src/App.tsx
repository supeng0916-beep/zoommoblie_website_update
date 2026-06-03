/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  BadgeCheck,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  FileScan,
  FileJson,
  Fingerprint,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Network,
  ReceiptText,
  ScanFace,
  ShieldCheck,
  Sparkles,
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

const aiServiceLinks = [
  { label: 'ZM eKYC AI', href: '#zm-ekyc-ai' },
  { label: 'AI Submission Automation', href: '#ai-submission-automation' },
  { label: 'AI Bank Validation', href: '#ai-bank-validation' },
  { label: 'Multi-Agent AI Chatbot', href: '#multi-agent-ai-chatbot' },
  { label: 'AI Reporting', href: '#ai-reporting' },
];

const companyServices = [
  {
    title: 'Online Management System',
    body:
      'Our dedicated team will provide your business with a tailored management platform that gives you an innovative advantage over your competitors.',
    icon: '馃捇',
  },
  {
    title: 'Mobile Apps Development',
    body:
      'Our expert team offers technical guidance and innovative solutions for mobile app development that exceed your expectations.',
    icon: '馃摫',
  },
  {
    title: 'API Integration',
    body:
      'We provide API development to enable interaction between data, applications, and devices through API. E.g. Youtube API, Messaging API, Payment API, Telco API, Insurance API, etc.',
    icon: '馃敆',
  },
  {
    title: 'Marketing Platform Integration',
    body:
      'Our team specializes in integrating marketing tools like Google Analytics, Facebook SDK or Pixel to help you easily track your marketing performance.',
    icon: '馃搳',
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
    value: 'XXXXXX-XX-XXXX',
  },
  {
    label: 'Status',
    value: 'Risk cleared',
  },
];

const aiServices = [
  {
    id: 'zm-ekyc-ai',
    title: 'ZM eKYC AI',
    body:
      'A secure onboarding layer that combines AI face recognition, OCR document capture, fraud screening, and instant identity approval.',
    visual: 'ekyc',
  },
  {
    id: 'ai-submission-automation',
    title: 'AI Submission Automation',
    body:
      'Transform unstructured documents into actionable data. Our intelligent parsing engine eliminates manual entry, accelerating complex submission workflows.',
    visual: 'submission',
  },
  {
    id: 'ai-bank-validation',
    title: 'AI Bank Validation',
    body:
      'Enterprise-grade anomaly detection for financial transactions. Utilizing advanced ensemble models to identify risks and validate bank data with millisecond latency.',
    visual: 'bank',
  },
  {
    id: 'multi-agent-ai-chatbot',
    title: 'Multi-Agent AI Chatbot',
    body:
      'Not just a bot, but an autonomous agentic architecture. Deliver context-aware, hyper-personalized customer support driven by advanced LLMs.',
    visual: 'agent',
  },
  {
    id: 'ai-reporting',
    title: 'AI Reporting',
    body:
      'Automated time-series analysis and dynamic data visualization. Turn complex operational metrics into predictive insights and automated strategic reports.',
    visual: 'report',
  },
];

const agentNodes = [
  { label: 'Intent Analysis Agent', className: 'node-intent', icon: BrainCircuit },
  { label: 'Time-Series DB Agent', className: 'node-data', icon: Network },
  { label: 'Attribution Report Agent', className: 'node-report', icon: ChartNoAxesCombined },
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

function EKycPhoneVisual() {
  return (
    <div className="ekyc-stage ai-service-phone-stage">
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
    </div>
  );
}

function EKycServiceVisual() {
  return (
    <div className="ai-service-visual-grid">
      <EKycWorkflowSimulator />
      <EKycPhoneVisual />
    </div>
  );
}

function SubmissionAutomationVisual() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-18% 0px' });
  const [displayedText, setDisplayedText] = useState('');

  const invoiceNoise = [
    'INV-2048 / PAYMENT TERM NET-30',
    'addr:: PJ-47810 /// ref## X-92A',
    'TOTAL ??? MYR 4,820.00',
    'merchant=null?  zms--solutions',
    'date: 2026//06//03 / tax-id: --',
    'submit_payload: unreadable_blob',
  ].join('\n');

  const targetJson = [
    '{',
    '  "documentType": "invoice",',
    '  "merchant": "Zoom Mobile Solutions",',
    '  "amount": 4820.00,',
    '  "currency": "MYR",',
    '  "submissionStatus": "ready"',
    '}',
  ].join('\n');

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    let cursor = 0;
    setDisplayedText('');

    const timer = window.setInterval(() => {
      cursor += 1;
      setDisplayedText(targetJson.slice(0, cursor));

      if (cursor >= targetJson.length) {
        window.clearInterval(timer);
      }
    }, 30);

    return () => window.clearInterval(timer);
  }, [isInView, targetJson]);

  const isComplete = displayedText.length === targetJson.length;

  return (
    <div ref={containerRef} className="ai-code-editor shadow-border">
      <div className="ai-editor-toolbar">
        <span className="ai-window-dot-red" />
        <span className="ai-window-dot-yellow" />
        <span className="ai-window-dot-green" />
        <p>parser.engine</p>
      </div>
      <div className="ai-editor-split">
        <div className="ai-raw-document">
          <pre>{invoiceNoise}</pre>
          <motion.div
            className="ai-parser-scan"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="ai-json-output">
          <AnimatePresence>
            {isComplete && (
              <motion.div
                className="ai-match-badge"
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <CheckCircle className="h-4 w-4" />
                <span>100% Match</span>
              </motion.div>
            )}
          </AnimatePresence>
          <pre>
            {displayedText}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.65, repeat: Infinity, repeatType: 'reverse' }}
                className="ai-cursor"
              />
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

function BankValidationVisual() {
  const [showRisk, setShowRisk] = useState(false);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [isLoopResetting, setIsLoopResetting] = useState(false);
  type TransactionLog = {
    id: string;
    amount: string;
    status: string;
    risk?: boolean;
  };

  const baseLogs: TransactionLog[] = [
    { id: 'TX-7192', amount: 'RM 128.40', status: 'Approved' },
    { id: 'TX-7193', amount: 'RM 2,840.00', status: 'Approved' },
    { id: 'TX-7194', amount: 'RM 58.90', status: 'Approved' },
    { id: 'TX-7196', amount: 'RM 240.00', status: 'Approved' },
    { id: 'TX-7197', amount: 'RM 609.20', status: 'Approved' },
    { id: 'TX-7198', amount: 'RM 84.10', status: 'Approved' },
  ];
  const riskLog: TransactionLog = { id: 'TX-7195', amount: 'RM 19,882.00', status: 'Risk Detected: Blocked', risk: true };
  const logs = showRisk ? [...baseLogs.slice(0, 3), riskLog, ...baseLogs.slice(3)] : baseLogs;
  const loopedLogs = [...logs, ...logs];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowRisk(true);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveLogIndex((current) => (current >= logs.length ? current : current + 1));
    }, 1700);

    return () => window.clearInterval(timer);
  }, [logs.length]);

  useEffect(() => {
    if (activeLogIndex !== logs.length) {
      return undefined;
    }

    const resetTimer = window.setTimeout(() => {
      setIsLoopResetting(true);
      setActiveLogIndex(0);

      window.requestAnimationFrame(() => {
        setIsLoopResetting(false);
      });
    }, 760);

    return () => window.clearTimeout(resetTimer);
  }, [activeLogIndex, logs.length]);

  useEffect(() => {
    setIsLoopResetting(true);
    setActiveLogIndex(0);

    window.requestAnimationFrame(() => {
      setIsLoopResetting(false);
    });
  }, [showRisk]);

  return (
    <div className="ai-bank-screen shadow-border">
      <div className="ai-anomaly-map" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} />
        ))}
        <strong />
      </div>
      <div className="ai-log-viewport">
        <motion.div
          className="ai-log-stack"
          animate={{ y: `calc(-${activeLogIndex} * var(--ai-log-step))` }}
          transition={{ duration: isLoopResetting ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence initial={false}>
            {loopedLogs.map((log, index) => (
              <motion.div
                key={`${log.id}-${index}`}
                layout
                initial={log.risk ? { opacity: 0, scale: 0.96, x: 18 } : { opacity: 1 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: log.risk ? 0.28 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                className={`ai-log-row ${log.risk ? 'is-risk' : ''}`}
              >
                <span>{log.id}</span>
                <p>{log.amount}</p>
                <strong>{log.status}</strong>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function AgentChatbotVisual() {
  const [agentPhase, setAgentPhase] = useState(0);
  const [activeSpoke, setActiveSpoke] = useState(-1);

  useEffect(() => {
    const timers: number[] = [];

    if (agentPhase === 0) {
      setActiveSpoke(-1);
      timers.push(window.setTimeout(() => setAgentPhase(1), 950));
    }

    if (agentPhase === 1) {
      timers.push(window.setTimeout(() => setAgentPhase(2), 1150));
    }

    if (agentPhase === 2) {
      agentNodes.forEach((_, index) => {
        timers.push(window.setTimeout(() => setActiveSpoke(index), 420 + index * 260));
      });
      timers.push(window.setTimeout(() => setAgentPhase(0), 2300));
    }

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [agentPhase]);

  return (
    <div className="ai-agent-lab shadow-border">
      <motion.div
        className={`ai-user-query ${agentPhase === 0 ? 'is-active' : ''}`}
        animate={{
          boxShadow: agentPhase === 0
            ? [
                'rgba(255,255,255,0.1) 0 0 0 1px inset, rgba(168,85,247,0.08) 0 0 0px',
                'rgba(216,180,254,0.42) 0 0 0 1px inset, rgba(168,85,247,0.42) 0 0 34px -10px',
                'rgba(255,255,255,0.1) 0 0 0 1px inset, rgba(168,85,247,0.08) 0 0 0px',
              ]
            : 'rgba(255,255,255,0.1) 0 0 0 1px inset',
        }}
        transition={{ duration: 0.95, repeat: agentPhase === 0 ? Infinity : 0 }}
      >
        <span>User request</span>
        <p>Find last month refunds and generate a report.</p>
      </motion.div>
      <svg className="ai-agent-lines" viewBox="0 0 640 360" preserveAspectRatio="none" aria-hidden="true">
        <path className="agent-line-base" d="M150 180 C210 180 248 180 300 180" />
        <path className="agent-line-base" d="M356 180 C420 96 470 82 548 82" />
        <path className="agent-line-base" d="M356 180 C426 180 478 180 548 180" />
        <path className="agent-line-base" d="M356 180 C420 264 470 278 548 278" />
        <path className="agent-line-flow" d="M150 180 C210 180 248 180 300 180" />
        <path className="agent-line-flow" d="M356 180 C420 96 470 82 548 82" />
        <path className="agent-line-flow" d="M356 180 C426 180 478 180 548 180" />
        <path className="agent-line-flow" d="M356 180 C420 264 470 278 548 278" />
      </svg>
      <AnimatePresence>
        {agentPhase === 1 && (
          <motion.div
            className="ai-agent-pulse-dot"
            initial={{ left: '23%', top: '50%', opacity: 0, scale: 0.6 }}
            animate={{ left: '50%', top: '50%', opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        {agentPhase === 2 && (
          <>
            {['24%', '50%', '76%'].map((top, index) => (
              <motion.div
                key={top}
                className="ai-agent-pulse-dot"
                initial={{ left: '50%', top: '50%', opacity: 0, scale: 0.65 }}
                animate={{ left: '86%', top, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.92, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      <motion.div
        className={`ai-core-node ${agentPhase >= 1 ? 'is-active' : ''}`}
        animate={{ scale: agentPhase >= 1 ? 1.05 : 1 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      >
        <Sparkles className="h-7 w-7" />
        <span>Hub Router</span>
      </motion.div>
      {agentNodes.map((node, index) => {
        const Icon = node.icon;
        const isActive = agentPhase === 2 && activeSpoke >= index;
        return (
          <motion.div
            key={node.label}
            className={`ai-agent-node ${node.className} ${isActive ? 'is-active' : ''}`}
            animate={{ scale: isActive ? 1.04 : 1 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            <Icon className="h-6 w-6" />
            <span>{node.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function ReportingVisual() {
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(dashboardRef, { once: true, margin: '-18% 0px' });
  const [isForecastComplete, setIsForecastComplete] = useState(false);
  const [displayedInsight, setDisplayedInsight] = useState('');
  const insightText = 'Insight: Revenue spike highly correlated with Multi-agent operational adjustments.';

  useEffect(() => {
    if (!isForecastComplete) {
      return undefined;
    }

    let cursor = 0;
    setDisplayedInsight('');

    const timer = window.setInterval(() => {
      cursor += 1;
      setDisplayedInsight(insightText.slice(0, cursor));

      if (cursor >= insightText.length) {
        window.clearInterval(timer);
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, [isForecastComplete, insightText]);

  return (
    <div ref={dashboardRef} className="ai-report-dashboard shadow-border">
      <div className="ai-dashboard-top">
        <div>
          <span>Forecast</span>
          <strong>Revenue Trend</strong>
        </div>
        <p>+18.4%</p>
      </div>
      <svg viewBox="0 0 640 320" className="ai-forecast-chart" aria-hidden="true">
        <defs>
          <linearGradient id="forecast-solid" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <path className="ai-chart-grid" d="M44 72H596 M44 142H596 M44 212H596 M44 282H596" />
        <path className="ai-chart-history" d="M56 246 C120 232 128 180 196 188 C252 195 262 132 326 145 C372 154 392 110 430 118" />
        <motion.path
          className="ai-chart-future"
          d="M430 118 C478 98 502 62 552 72 C584 78 596 44 616 36"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => {
            if (isInView) {
              setIsForecastComplete(true);
            }
          }}
        />
        <circle cx="430" cy="118" r="7" className="ai-now-dot" />
      </svg>
      <AnimatePresence>
        {isForecastComplete && (
          <motion.div
            className="ai-insight-card"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{displayedInsight}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AIServiceVisual({ index }: { index: number }) {
  const visuals = [
    <EKycServiceVisual />,
    <SubmissionAutomationVisual />,
    <BankValidationVisual />,
    <AgentChatbotVisual />,
    <ReportingVisual />,
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={aiServices[index].id}
        initial={{ opacity: 0, y: 18, scale: 0.98, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -14, scale: 0.98, filter: 'blur(10px)' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="ai-sticky-visual-inner"
      >
        {visuals[index]}
      </motion.div>
    </AnimatePresence>
  );
}

function AIServiceBlock({
  service,
  index,
}: {
  service: (typeof aiServices)[number];
  index: number;
}) {
  const isReverse = index % 2 === 1;
  const isAgentService = service.id === 'multi-agent-ai-chatbot';
  const isReportingService = service.id === 'ai-reporting';

  if (index === 0) {
    return (
      <motion.section
        id={service.id}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-16%' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="ai-service-ekyc shadow-border scroll-mt-32"
      >
        <div className="ai-service-ekyc-copy">
          <p className="mono-label">Sevice01</p>
          <h3>{service.title}</h3>
          <p>{service.body}</p>
          <div className="ai-service-ekyc-steps">
            <EKycWorkflowSimulator />
          </div>
        </div>
        <div className="ai-service-ekyc-visual">
          <EKycPhoneVisual />
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id={service.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-16%' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`ai-service-block scroll-mt-32 ${isReverse ? 'is-reverse' : ''} ${isAgentService ? 'is-agent-service' : ''} ${isReportingService ? 'is-reporting-service' : ''}`}
    >
      <div className="ai-service-copy">
        <p className="mono-label">Sevice0{index + 1}</p>
        <h3>{service.title}</h3>
        <p>{service.body}</p>
      </div>
      <div className="ai-service-visual-shell shadow-border">
        <AIServiceVisual index={index} />
      </div>
    </motion.section>
  );
}

function AIServicesSection() {
  return (
    <section id="ai-services" className="relative scroll-mt-28 overflow-hidden px-6 py-16">
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
              AI Services / Intelligent operating layer
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="section-title-gradient display-compressed text-5xl font-semibold md:text-7xl"
            >
              AI Services
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="max-w-2xl text-xl leading-9 text-white/62 md:justify-self-end md:text-2xl md:leading-10"
          >
            Intelligent automation services connecting identity verification, document parsing, risk validation, agentic support, and predictive reporting.
          </motion.p>
        </div>

        <div className="ai-services-stack">
          {aiServices.map((service, index) => (
            <AIServiceBlock key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
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
            <div className="group relative">
              <a href="#ai-services" className="nav-gradient-link flex items-center gap-1">
                AI Services
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </a>
              <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="glass-card rounded-2xl p-3 shadow-2xl">
                  {aiServiceLinks.map((item) => (
                    <a key={item.href} href={item.href} className="nav-gradient-link block rounded-xl px-4 py-3 hover:bg-white/10">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
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
              <a href="#ai-services" onClick={closeMenu(setIsMenuOpen)}>
                AI Services
              </a>
              <div className="ml-4 flex flex-col gap-3 border-l border-white/10 pl-4 text-sm text-white/60">
                {aiServiceLinks.map((item) => (
                  <a key={item.href} href={item.href} onClick={closeMenu(setIsMenuOpen)} className="nav-gradient-link">
                    {item.label}
                  </a>
                ))}
              </div>
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
              <p className="mono-label mb-4">Trusted network</p>
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

      <AIServicesSection />

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
              Empowering businesses through innovative software development while ensuring seamless and timely product delivery.
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
                At Zoom Mobile, we design and deliver enterprise software systems that combine AI-enabled workflows,
                secure API integrations, data automation, and scalable web and mobile platforms. Since 2008, our team
                has helped businesses turn complex operational requirements into reliable digital products that can be
                deployed, monitored, and improved with confidence.
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
                  <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 50%)',
                    }}
                  />

                  <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
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

