import React, { useState } from 'react';
import { CreditCard, DollarSign, Receipt, RefreshCw, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { marketplaceBillingDatabase, MarketplaceOrder } from '../../services/db/marketplaceBillingDatabase';
import { globalizationService } from '../../services/global/globalizationService';
import { ACEBadge } from '../../components/ui/ace';

export const GlobalMarketplaceBillingPage: React.FC = () => {
  const [orders, setOrders] = useState<MarketplaceOrder[]>(marketplaceBillingDatabase.getAllOrders());
  const [refundStatusMsg, setRefundStatusMsg] = useState<string | null>(null);

  const handleRefund = (orderId: string) => {
    const res = marketplaceBillingDatabase.requestRefund(orderId, 'User requested audit cancellation');
    if (res) {
      setRefundStatusMsg(`Refund request #${res.id} submitted for audit review.`);
      setTimeout(() => setRefundStatusMsg(null), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 w-fit">
            <Receipt className="w-3.5 h-3.5 text-emerald-400" /> Marketplace Billing & Invoices
          </span>
          <h1 className="text-3xl font-extrabold text-white">Billing History & Invoices</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Jurisdiction-aware tax compliance, itemized receipts, and auditable refund lifecycle tracking.
          </p>
        </div>

        {refundStatusMsg && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-800/60 rounded-2xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {refundStatusMsg}
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Your Completed Transactions</h2>
          {orders.map(order => (
            <div key={order.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400">{order.orderNumber}</span>
                  <ACEBadge variant="success">{order.status}</ACEBadge>
                </div>
                <h3 className="font-bold text-white text-base">{order.itemTitle}</h3>
                <div className="text-xs text-slate-400 flex flex-wrap items-center gap-4">
                  <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                  <span>Gateway: {order.paymentGateway}</span>
                  <span>Invoice: {order.invoiceNumber}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <div className="text-lg font-bold font-mono text-white">₹{order.totalAmountINR.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">
                    Billed: {order.billedCurrency} {order.billedAmountConverted}
                  </div>
                </div>
                <button
                  onClick={() => handleRefund(order.id)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-all cursor-pointer"
                >
                  Request Refund
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
