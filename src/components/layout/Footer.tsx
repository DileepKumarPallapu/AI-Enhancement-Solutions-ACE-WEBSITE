import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Mail, Globe, Award, ExternalLink, Layers, GraduationCap } from 'lucide-react';
import { BRAND } from '../../config/brand';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800 text-xs">
          
          {/* Brand Column */}
          <div className="col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={BRAND.logoLight}
                alt={BRAND.brandName}
                className="h-9 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The Digital Campus Operating System connecting Students, Faculty Mentors, Colleges, Organizers, Recruiters, and Competition Judges in One Unified Platform.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <Link to="/workspaces" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-800/60 font-bold hover:bg-purple-900 transition-all">
                <Layers className="w-3.5 h-3.5 text-purple-400" /> My ACE Workspaces
              </Link>
              <Link to="/student/mentorship" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-800/60 font-bold hover:bg-indigo-900 transition-all">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> Campus Mentorship
              </Link>
            </div>
          </div>

          {/* Discover & Events */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-3">Discover</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/events" className="hover:text-purple-400 transition-colors">Events Directory</Link></li>
              <li><Link to="/hackathons" className="hover:text-purple-400 transition-colors">National Hackathons</Link></li>
              <li><Link to="/competitions" className="hover:text-purple-400 transition-colors">Competitions Arena</Link></li>
              <li><Link to="/coding" className="hover:text-purple-400 transition-colors">Coding Challenges</Link></li>
              <li><Link to="/opportunities" className="hover:text-purple-400 transition-colors">Global Opportunities</Link></li>
            </ul>
          </div>

          {/* Learning & Career */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-3">Learning & Career</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/learn" className="hover:text-purple-400 transition-colors">Courses & Roadmaps</Link></li>
              <li><Link to="/skills" className="hover:text-purple-400 transition-colors">Interactive Skill Graph</Link></li>
              <li><Link to="/projects/lab" className="hover:text-purple-400 transition-colors">Student Project Lab</Link></li>
              <li><Link to="/career" className="hover:text-purple-400 transition-colors">Career Simulator</Link></li>
              <li><Link to="/certificates" className="hover:text-purple-400 transition-colors">Verify Certificates</Link></li>
            </ul>
          </div>

          {/* Community & Campus */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-3">Community</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/campus" className="hover:text-purple-400 transition-colors">Campus Network</Link></li>
              <li><Link to="/college/clubs" className="hover:text-purple-400 transition-colors">Clubs & Chapters</Link></li>
              <li><Link to="/teams" className="hover:text-purple-400 transition-colors">Hackathon Teams</Link></li>
              <li><Link to="/ambassador" className="hover:text-purple-400 transition-colors">Campus Ambassador</Link></li>
              <li><Link to="/rewards" className="hover:text-purple-400 transition-colors">Wallet & Rewards</Link></li>
            </ul>
          </div>

          {/* Platform & Governance */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/workspaces" className="hover:text-purple-400 transition-colors">Universal Workspaces</Link></li>
              <li><Link to="/about" className="hover:text-purple-400 transition-colors">About ACE</Link></li>
              <li><Link to="/support" className="hover:text-purple-400 transition-colors">Help & Support</Link></li>
              <li><Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {BRAND.currentYear} {BRAND.brandName}. Anchored to Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-400">Terms of Service</Link>
            <Link to="/faq" className="hover:text-slate-400">FAQ</Link>
            <Link to="/support" className="hover:text-slate-400">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
