import React from 'react';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BlogPage: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: "How to Win Your First National College Hackathon in 2026",
      slug: "win-first-college-hackathon-2026",
      category: "Hackathons",
      readTime: "5 min read",
      date: "Sep 01, 2026",
      author: "ACE Editorial Team",
      image: "https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/b9228fbd-8694-44c7-94f7-d1b80968788c-Screenshot-2026-08-31-at-3.00.07-PM.webp",
      excerpt: "Essential preparation strategies, tech stack recommendations, pitching tactics, and advice from past winners of HACKVERSE and HackNIMA."
    },
    {
      id: 2,
      title: "Top 10 Technical Symposiums in Tamil Nadu You Shouldn't Miss",
      slug: "top-10-technical-symposiums-tamil-nadu",
      category: "Symposiums",
      readTime: "4 min read",
      date: "Aug 28, 2026",
      author: "Student Community",
      image: "https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/55392a78-124c-4139-982b-2f3fcfdb6252-WhatsApp-Image-2026-08-31-at-9.37.06-PM.webp",
      excerpt: "A curated guide to flagship college symposiums across Coimbatore and Chennai with Scopus publication and direct cash prize pools."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">ACE Student Tech Blog</h1>
        <p className="text-xs text-slate-500 mt-1">Guides, hackathon strategies, and student opportunity insights.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map(p => (
          <article key={p.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[11px] font-bold text-brand-600 uppercase">{p.category}</span>
                <h3 className="font-extrabold text-slate-900 text-lg">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.excerpt}</p>
              </div>
            </div>
            <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
              <span>{p.date} • {p.readTime}</span>
              <span className="font-semibold text-brand-600 flex items-center gap-1">Read Article <ArrowRight className="w-3.5 h-3.5" /></span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
