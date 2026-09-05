import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Mail, Globe, Award, ExternalLink } from 'lucide-react';
import { BRAND } from '../../config/brand';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Intro */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={BRAND.logoLight}
                alt={BRAND.brandName}
                className="h-10 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {BRAND.tagline} India's premier AI-Driven Student Opportunity Ecosystem. Discover, personalize, register, track, and participate in verified college symposiums, hackathons, workshops, and career opportunities.
            </p>
            <div className="pt-2">
              <Link to="/project-showcase" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-brand-300 border border-white/20 hover:bg-white/20 transition-all">
                <Sparkles className="w-3.5 h-3.5" /> View Project Architecture Showcase
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/events" className="hover:text-brand-400 transition-colors">All College Events</Link></li>
              <li><Link to="/events?type=hackathons" className="hover:text-brand-400 transition-colors">National Hackathons</Link></li>
              <li><Link to="/events?type=workshops" className="hover:text-brand-400 transition-colors">Technical Workshops</Link></li>
              <li><Link to="/events?type=conferences" className="hover:text-brand-400 transition-colors">Research Conferences</Link></li>
              <li><Link to="/events?type=symposiums" className="hover:text-brand-400 transition-colors">College Symposiums</Link></li>
              <li><Link to="/location/chennai" className="hover:text-brand-400 transition-colors">Events in Chennai</Link></li>
              <li><Link to="/location/coimbatore" className="hover:text-brand-400 transition-colors">Events in Coimbatore</Link></li>
            </ul>
          </div>

          {/* For Organizers & Platform */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/search" className="hover:text-brand-400 transition-colors">AI Smart Search</Link></li>
              <li><Link to="/organizer/create" className="hover:text-brand-400 transition-colors">+ Host an Event</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-400 transition-colors">Student Dashboard</Link></li>
              <li><Link to="/admin/moderation" className="hover:text-brand-400 transition-colors">Verification Standards</Link></li>
              <li><Link to="/referral" className="hover:text-brand-400 transition-colors">Referral Partner Program</Link></li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/ambassador" className="hover:text-brand-400 transition-colors">Campus Ambassador</Link></li>
              <li><Link to="/contest" className="hover:text-brand-400 transition-colors">Monthly Contests</Link></li>
              <li><Link to="/rewards/vouchers" className="hover:text-brand-400 transition-colors">Rewards & Perks</Link></li>
              <li><Link to="/blog" className="hover:text-brand-400 transition-colors">Tech Blog</Link></li>
              <li><Link to="/compare" className="hover:text-brand-400 transition-colors">AI Event Comparison</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {BRAND.currentYear} {BRAND.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-400">Terms</Link>
            <Link to="/faq" className="hover:text-slate-400">FAQ</Link>
            <Link to="/contact" className="hover:text-slate-400">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
