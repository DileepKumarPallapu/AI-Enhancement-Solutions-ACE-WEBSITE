import React from 'react';
import { marketplaceBillingDatabase } from '../../services/db/marketplaceBillingDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { ShoppingBag, Star, CheckCircle2 } from 'lucide-react';

export function MarketplaceHubPage() {
  const products = marketplaceBillingDatabase.getProducts();
  const plans = marketplaceBillingDatabase.getPlans();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="ACE Marketplace & Services Hub"
          description="Accredited mentorship sessions, capstone architectural reviews, and institutional subscription tiers."
          badge="MARKETPLACE"
        />

        {/* Products */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Accredited Career Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <ACEBadge variant="primary">{p.category}</ACEBadge>
                  <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {p.rating} ({p.reviewsCount})
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{p.title}</h4>
                <div className="text-xs text-slate-500">By {p.provider}</div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="font-bold text-slate-900 dark:text-white text-base">
                    ₹{p.priceINR} <span className="text-xs text-slate-500 font-normal">({p.priceCoins} Coins)</span>
                  </div>
                  <ACEButton variant="primary" size="sm">Book Service</ACEButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Platform Subscription Tiers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((pl) => (
              <div key={pl.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">{pl.name}</h4>
                  <ACEBadge variant="neutral">{pl.targetAudience}</ACEBadge>
                </div>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {pl.priceMonthlyINR === 0 ? 'Free' : `₹${pl.priceMonthlyINR.toLocaleString()} / mo`}
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
                  {pl.features.map((f, fIdx) => (
                    <li key={fIdx}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
