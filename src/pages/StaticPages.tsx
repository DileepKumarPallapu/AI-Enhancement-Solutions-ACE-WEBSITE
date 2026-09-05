import React from 'react';

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
    <h1 className="text-3xl font-black text-slate-900">About AllCollegeEvent (ACE)</h1>
    <p className="text-sm text-slate-600 leading-relaxed">
      AllCollegeEvent is India's leading AI-powered student opportunity ecosystem. We bridge the gap between ambitious student creators, engineering colleges, and premier hackathon organizers across India.
    </p>
  </div>
);

export const ContactPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
    <h1 className="text-3xl font-black text-slate-900">Contact ACE Support</h1>
    <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-2 text-xs text-slate-600">
      <p><strong>Email:</strong> support@allcollegeevent.com</p>
      <p><strong>Partnerships:</strong> partners@allcollegeevent.com</p>
      <p><strong>Headquarters:</strong> Coimbatore & Chennai, Tamil Nadu, India</p>
    </div>
  </div>
);

export const FaqPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
    <h1 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h1>
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white rounded-2xl border border-slate-200">
        <h4 className="font-bold text-slate-900">How do I register for an event?</h4>
        <p className="text-slate-600 mt-1">Navigate to the event details page, click 'Register Now', select your ticket tier, and your digital delegate pass will be generated instantly.</p>
      </div>
      <div className="p-4 bg-white rounded-2xl border border-slate-200">
        <h4 className="font-bold text-slate-900">How do referral points work?</h4>
        <p className="text-slate-600 mt-1">You earn 10 points for every friend who joins using your referral code. Points can be redeemed for Amazon gift vouchers and contest tokens in the Rewards Center.</p>
      </div>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-xs text-slate-600 leading-relaxed">
    <h1 className="text-2xl font-black text-slate-900">Privacy Policy</h1>
    <p>AllCollegeEvent is committed to protecting student data privacy. We do not sell or expose student PII to unauthorized third parties.</p>
  </div>
);
