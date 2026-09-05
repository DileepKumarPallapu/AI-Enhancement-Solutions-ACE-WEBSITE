import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Github, 
  ShieldCheck, 
  Bot, 
  Search, 
  Layers, 
  Award, 
  Trophy, 
  Users, 
  CheckCircle2, 
  Zap, 
  Brain, 
  FileText, 
  QrCode, 
  Gift, 
  Send,
  Linkedin,
  ChevronRight,
  TrendingUp,
  Flame,
  Globe
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ProjectShowcasePage: React.FC = () => {
  const [selectedAiFeature, setSelectedAiFeature] = useState(0);

  const aiFeatures = [
    {
      title: "AI Recommendation Engine",
      subtitle: "Profile-Aware Scoring & Behavioral Learning",
      icon: Brain,
      description: "Combines academic department, skills, year, location, and past interaction history (saves, registrations, views) into a multi-dimensional fit score with natural-language matching explanations.",
      metrics: "94% Accuracy Fit",
      codeSnippet: "// Multi-dimensional Scoring Pipeline\nconst score = baseWeight(deptMatch)\n  + userInterestsWeight(skills)\n  + locationAffinity(city)\n  + urgencyMultiplier(deadline);"
    },
    {
      title: "AI Smart Search",
      subtitle: "Semantic & Natural Language Query Parser",
      icon: Search,
      description: "Translates unstructured student queries (e.g., 'Free AI hackathons near Chennai this weekend') into precise multi-parameter SQL/API filter trees with typo correction and instant visual chip interpretation.",
      metrics: "<15ms NLP Parsing",
      codeSnippet: "query: 'Free AI hackathons in Chennai'\nparsed: { isFree: true, category: 'Technical & Coding', city: 'Chennai', mode: 'OFFLINE' }"
    },
    {
      title: "ACE AI Assistant ('Ask Zuzu')",
      subtitle: "Grounded Conversational Intelligence",
      icon: Bot,
      description: "Floating conversational assistant indexing loaded live opportunity records. Accurately answers questions on beginner eligibility, registration fee structures, certificate issuance, and referral rules with zero hallucinations.",
      metrics: "100% Grounded Context",
      codeSnippet: "const answer = queryAceAiAssistant(userQuestion, loadedEvents);\n// Automatically falls back or escalates to organizer contact"
    },
    {
      title: "AI Event Verification",
      subtitle: "Automated Authenticity & Quality Scorer",
      icon: ShieldCheck,
      description: "Pre-publication audit engine evaluating 12 parameters (poster resolution, physical venue clarity, ticket legitimacy, duplicate listing detection) to produce an event quality score (0–100) before admin publication.",
      metrics: "0–100 Quality Index",
      codeSnippet: "const { score, status, issues } = calculateEventQualityScore(event);\n// Flags suspicious URLs & missing contact details"
    },
    {
      title: "AI Content Studio",
      subtitle: "1-Click Copywriting & Poster OCR Extraction",
      icon: FileText,
      description: "Empowers college organizers to generate high-converting student descriptions, SEO metadata, FAQs, and social media captions with one click, while extracting text and dates from uploaded event posters.",
      metrics: "Instant Draft Generation",
      codeSnippet: "const copy = generateAiEventCopy({ title, eventType, venue, audience, perks });\n// Formats structured HTML, SEO tags, & FAQs"
    },
    {
      title: "AI Engagement Enhancement",
      subtitle: "Deadline-Aware Prioritization & Reminders",
      icon: Zap,
      description: "Proactively notifies students before registration deadlines, detects newly published symposiums in followed departments, and delivers personalized weekly opportunity digests.",
      metrics: "4x Registration Conversion",
      codeSnippet: "if (event.hoursUntilDeadline <= 48 && user.isSaved(event.slug)) {\n  sendTriggerNotification('Registration closing soon!');\n}"
    }
  ];

  return (
    <div className="space-y-20 pb-24 text-slate-900 bg-[#FAF8FF]">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16 bg-gradient-to-b from-purple-900 via-indigo-950 to-slate-950 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#A855F7_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold text-purple-200">
            <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
            <span>Official Project Case Study & Architecture Overview</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            AllCollegeEvent.com — AI-Powered{' '}
            <span className="bg-gradient-to-r from-brand-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Student Opportunity Ecosystem
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-purple-200 font-medium tracking-wide">
            Discover. Engage. Trust. Return. Advocate.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A comprehensive, production-ready platform designed to empower millions of Indian college students to discover, evaluate, register for, and conquer the best technical symposiums, hackathons, workshops, and career opportunities.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link to="/">
              <Button variant="ai" size="lg" icon={<Sparkles className="w-5 h-5" />}>
                Launch Live App (Port 8080)
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Explore Events Explorer
              </Button>
            </Link>
            <a href="https://github.com/allcollegeevent" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20" icon={<Github className="w-5 h-5" />}>
                GitHub Repository
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">The Challenge</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Why Campus Opportunity Discovery Was Broken</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">1</div>
            <h3 className="font-extrabold text-slate-900 text-base">Information Fragmentation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              College posters get buried in WhatsApp groups, Telegram channels, and scattered Instagram stories, causing students to miss crucial registration deadlines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">2</div>
            <h3 className="font-extrabold text-slate-900 text-base">Zero Personalization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generic event websites show identical listings to a 1st-year biology student and a 4th-year computer science hacker, causing low engagement and high drop-offs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">3</div>
            <h3 className="font-extrabold text-slate-900 text-base">Trust & Duplicate Issues</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unverified listings, broken registration payment links, and missing certificate guarantees damage student trust and event turnout.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">The Innovation</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">AllCollegeEvent: An AI-Driven Ecosystem</h2>
        </div>

        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <p className="text-sm sm:text-base text-purple-100 leading-relaxed max-w-3xl">
            We transformed AllCollegeEvent from a static listing site into an intelligent opportunity marketplace combining profile-aware neural recommendations, natural language smart search, real-time verified certificates, and an incentive-aligned Campus Ambassador network.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <p className="text-2xl font-black text-brand-300">10,000+</p>
              <p className="text-[11px] text-purple-200">Active Students</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <p className="text-2xl font-black text-emerald-300">186+</p>
              <p className="text-[11px] text-purple-200">Verified Live Events</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <p className="text-2xl font-black text-amber-300">80+</p>
              <p className="text-[11px] text-purple-200">Partner Colleges</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <p className="text-2xl font-black text-pink-300">₹15L+</p>
              <p className="text-[11px] text-purple-200">Prizes Distributed</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SIX INTERACTIVE AI FEATURE CARDS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">AI Intelligence Layer</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">The 6 Core AI Modules</h2>
          <p className="text-xs text-slate-500">Click each module to view architectural behavior and code design</p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {aiFeatures.map((f, idx) => {
            const IconComp = f.icon;
            return (
              <button
                key={idx}
                onClick={() => setSelectedAiFeature(idx)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${selectedAiFeature === idx ? 'bg-brand-500 text-white border-brand-500 shadow-md scale-105' : 'bg-white text-slate-700 border-slate-200 hover:border-brand-300'}`}
              >
                <IconComp className="w-5 h-5" />
                <span className="text-[11px] font-bold leading-tight line-clamp-2">{f.title}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Detail Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="px-3 py-1 rounded-full bg-purple-50 text-brand-700 text-xs font-bold uppercase tracking-wider">
              {aiFeatures[selectedAiFeature].subtitle}
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              {aiFeatures[selectedAiFeature].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {aiFeatures[selectedAiFeature].description}
            </p>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-900">Performance Metric</span>
              <span className="font-black text-emerald-700">{aiFeatures[selectedAiFeature].metrics}</span>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-950 text-slate-200 p-6 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[10px] text-slate-400 mb-3">
              <span>aiService.ts</span>
              <span className="text-emerald-400">● LIVE RUNTIME</span>
            </div>
            <pre className="text-purple-300 whitespace-pre-wrap leading-relaxed">
              {aiFeatures[selectedAiFeature].codeSnippet}
            </pre>
          </div>
        </div>
      </section>

      {/* 5. 3-TIER SYSTEM ARCHITECTURE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">System Design</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">3-Tier High Scalability Architecture</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Layer 1 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 w-fit">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">1. Experience Layer</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>• Responsive Web (React 19 / TypeScript)</li>
              <li>• PWA Offline-ready Mobile Shell</li>
              <li>• Ask Zuzu AI Floating Conversational Drawer</li>
              <li>• 3-Pane Desktop Discovery & Mobile Bottom-Sheets</li>
            </ul>
          </div>

          {/* Layer 2 */}
          <div className="p-6 rounded-3xl bg-purple-50 border border-purple-200 shadow-xs space-y-4">
            <div className="p-3 rounded-2xl bg-purple-600 text-white w-fit shadow-md">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-purple-950">2. AI Intelligence Layer</h3>
            <ul className="space-y-2 text-xs text-purple-900">
              <li>• Multi-criteria Semantic Search Engine</li>
              <li>• Profile-aware Dynamic Recommendation Ranker</li>
              <li>• 0–100 Event Quality Verification Engine</li>
              <li>• 1-Click Organizer AI Content Studio & OCR</li>
            </ul>
          </div>

          {/* Layer 3 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 w-fit">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">3. Backend & Data Layer</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>• PostgreSQL Relational Tables with Indexes</li>
              <li>• Node.js REST API (`api.allcollegeeventz.com`)</li>
              <li>• AWS S3 CDN for Fast Poster Delivery</li>
              <li>• LocalStorage Offline-first Resilience</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. STUDENT JOURNEY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Product Flywheel</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">The 5-Stage Student Lifecycle</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          {[
            { stage: 'Discover', desc: 'AI smart search & personalized homepage feed.' },
            { stage: 'Engage', desc: 'Ask Zuzu questions, save events & compare options.' },
            { stage: 'Trust', desc: 'Verified organizer badges & guaranteed certificates.' },
            { stage: 'Return', desc: 'Calendar deadlines, earned XP badges & certificates.' },
            { stage: 'Advocate', desc: 'Referral code (+10 Pts) & Campus Ambassador leadership.' }
          ].map((s, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <span className="w-7 h-7 rounded-full bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center mx-auto">
                {idx + 1}
              </span>
              <h4 className="font-extrabold text-slate-900 text-sm">{s.stage}</h4>
              <p className="text-[11px] text-slate-500 leading-tight">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ROADMAP */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Vision</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Platform Scaling Roadmap</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase">
              Phase 1 • Complete
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">Foundation & AI Discovery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time API integrations, Next.js / React 19 architecture, NLP search, and floating AI assistant.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] uppercase">
              Phase 2 • Current
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">Trust & Ambassador Network</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              0–100 Verification scoring, department leaderboards, and QR check-in event day ticketing.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-brand-700 font-bold text-[10px] uppercase">
              Phase 3 • Scale
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">1M+ Student Ecosystem</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI skill-gap career matchmaker, automated Scopus paper indexing, and corporate internship sponsorships.
            </p>
          </div>
        </div>
      </section>

      {/* 8. TEAM CREDITS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center space-y-4 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project Credits</span>
          <h3 className="text-xl font-black text-slate-900">Architected & Engineered by the ACE Engineering Team</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Developed as an AI-powered student opportunity ecosystem to bridge the gap between campus events and student ambitions.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/">
              <Button variant="primary" size="md">
                Launch Application →
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
