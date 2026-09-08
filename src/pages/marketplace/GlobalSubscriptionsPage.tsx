import React from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { marketplaceBillingDatabase } from '../../services/db/marketplaceBillingDatabase';

export const GlobalSubscriptionsPage: React.FC = () => {
  const plans = marketplaceBillingDatabase.getAvailablePlans();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Subscription Ecosystem
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white">Institutional & Professional Plans</h1>
          <p className="text-sm text-slate-400">
            Select the tier tailored to your student growth, institutional campus deployment, or recruiter talent radar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`p-8 rounded-3xl flex flex-col justify-between space-y-6 ${
                plan.isPopular 
                  ? 'bg-gradient-to-b from-blue-950/80 via-slate-900 to-slate-900 border-2 border-blue-500 shadow-2xl relative' 
                  : 'bg-slate-900 border border-slate-800'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white font-bold text-[10px] rounded-full uppercase tracking-wider shadow">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">For {plan.targetRole}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold font-mono text-white">₹{plan.monthlyINR.toLocaleString()}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-2xl text-xs font-bold transition-all ${
                  plan.isPopular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
