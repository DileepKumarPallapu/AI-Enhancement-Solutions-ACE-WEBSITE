import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Sparkles, Brain, ShieldCheck, Trophy, Users, Globe, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PresentationDemoPage: React.FC = () => {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "AllCollegeEvent (ACE)",
      subtitle: "AI-Powered Student Opportunity Ecosystem",
      points: [
        "10,000+ active student engineers and creators across India",
        "186+ verified technical symposiums, hackathons & workshops",
        "80+ accredited engineering partner colleges & deemed universities",
        "₹15L+ student prize pools and direct internship fast-tracks"
      ],
      color: "from-purple-900 to-indigo-950"
    },
    {
      title: "The Problem",
      subtitle: "Why Campus Opportunity Discovery Was Fragmented",
      points: [
        "Event announcements buried across fragmented WhatsApp & Telegram groups",
        "Generic event feeds with zero personalization cause 70%+ student drop-off",
        "Unverified listings and broken registration links damage trust",
        "Students miss national hackathons and Scopus publication deadlines"
      ],
      color: "from-rose-950 to-slate-900"
    },
    {
      title: "The 6-Module AI Architecture",
      subtitle: "Shared Intelligence Layer",
      points: [
        "1. AI Recommendation Engine (Profile-aware multi-dimensional ranking)",
        "2. AI Smart Search (Natural language query interpreter)",
        "3. ACE AI Assistant ('Ask Zuzu' grounded in live records)",
        "4. AI Event Verification (0–100 quality scoring engine)",
        "5. AI Content Studio (1-click copywriter & poster OCR)",
        "6. AI Engagement Intelligence (Deadline-aware triggers)"
      ],
      color: "from-purple-950 to-slate-900"
    },
    {
      title: "Campus Growth & Ambassador Strategy",
      subtitle: "Incentive-Aligned Viral Expansion",
      points: [
        "Department-vs-Department Leaderboard challenges",
        "Unique student referral engine (+10 Points per verified join)",
        "QR code event-day check-in & attendance verification",
        "Post-event structured 5-star feedback loops"
      ],
      color: "from-blue-950 to-indigo-950"
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setSlide(prev => (prev + 1) % slides.length);
      } else if (e.key === 'ArrowLeft') {
        setSlide(prev => (prev - 1 + slides.length) % slides.length);
      } else if (e.key === 'Escape') {
        navigate('/project-showcase');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, navigate]);

  const current = slides[slide];

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br ${current.color} text-white flex flex-col justify-between p-8 sm:p-16 animate-fadeIn`}>
      
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            Presentation Mode • Slide {slide + 1} of {slides.length}
          </span>
        </div>
        <Link to="/project-showcase">
          <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white">
            <X className="w-5 h-5" />
          </button>
        </Link>
      </div>

      {/* Slide Body */}
      <div className="max-w-4xl mx-auto space-y-6 text-center">
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          {current.title}
        </h1>
        <p className="text-lg sm:text-xl text-purple-200 font-medium">
          {current.subtitle}
        </p>

        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {current.points.map((p, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-slate-100 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between max-w-4xl mx-auto w-full pt-4 border-t border-white/10">
        <button
          onClick={() => setSlide((slide - 1 + slides.length) % slides.length)}
          className="flex items-center gap-2 text-xs font-bold text-purple-200 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" /> Previous (←)
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${slide === i ? 'bg-brand-400 w-6' : 'bg-white/30'}`}
            />
          ))}
        </div>

        <button
          onClick={() => setSlide((slide + 1) % slides.length)}
          className="flex items-center gap-2 text-xs font-bold text-purple-200 hover:text-white"
        >
          Next (→) <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
