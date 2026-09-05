import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Users, Eye, TrendingUp, CheckCircle2, QrCode, Download, Edit, Copy } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';

export const OrganizerDashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [scannedId, setScannedId] = useState('');
  const [checkInSuccess, setCheckInSuccess] = useState(false);

  const attendees = [
    { id: 'REG-88192', name: 'Pallapu Dileep Kumar', college: 'Hindustan Institute of Tech', status: 'Checked In', time: '09:15 AM' },
    { id: 'REG-88193', name: 'Geeresh P', college: 'PSG College of Tech', status: 'Pending', time: '-' },
    { id: 'REG-88194', name: 'Subhani S', college: 'Karpagam College of Eng', status: 'Checked In', time: '09:22 AM' }
  ];

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedId.trim()) return;
    setCheckInSuccess(true);
    showToast(`Attendee ${scannedId} Checked In Successfully ✓`);
    setTimeout(() => {
      setCheckInSuccess(false);
      setScannedId('');
      setIsQrModalOpen(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      <PageHeader
        eyebrow="ORGANIZER OVERVIEW"
        title="Event Performance &"
        highlight="Attendance Control."
        subtitle="Track registrations, attendee check-ins, ticket revenue, and conversion metrics in real time."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="md" onClick={() => setIsQrModalOpen(true)} icon={<QrCode className="w-4 h-4" />}>
              Scan QR Check-in
            </Button>
            <Link to="/organizer/create">
              <Button variant="primary" size="md" icon={<PlusCircle className="w-4 h-4" />}>
                + Host New Event
              </Button>
            </Link>
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Total Registrations</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">428</p>
          <span className="text-[11px] text-emerald-600 font-bold">+18% this week</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Page Views</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">2,840</p>
          <span className="text-[11px] text-purple-600 font-bold">94% Organic</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Conversion Rate</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">15.1%</p>
          <span className="text-[11px] text-brand-600 font-bold">Top Quartile</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Attendance Rate</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">86%</p>
          <span className="text-[11px] text-emerald-600 font-bold">Verified QR Scans</span>
        </div>
      </div>

      {/* Attendee Check-In Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Recent Attendee Registrations</h3>
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
            Export CSV
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 font-bold uppercase border-y border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Reg ID</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Check-in Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {attendees.map(a => (
                <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-600">{a.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{a.name}</td>
                  <td className="py-3.5 px-4">{a.college}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      a.status === 'Checked In' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Check-in Modal */}
      <Modal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} title="Event-Day QR / ID Check-in">
        <form onSubmit={handleCheckIn} className="space-y-4 text-center">
          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 space-y-2">
            <QrCode className="w-12 h-12 text-brand-600 mx-auto animate-pulse" />
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Point scanner at student QR pass or enter ID below</p>
          </div>

          <input
            type="text"
            value={scannedId}
            onChange={(e) => setScannedId(e.target.value)}
            placeholder="Enter Registration ID (e.g. REG-88192)"
            className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold"
          />

          {checkInSuccess && (
            <p className="text-xs font-bold text-emerald-600">✓ Checked in successfully!</p>
          )}

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Confirm Check-In
          </Button>
        </form>
      </Modal>

    </div>
  );
};
