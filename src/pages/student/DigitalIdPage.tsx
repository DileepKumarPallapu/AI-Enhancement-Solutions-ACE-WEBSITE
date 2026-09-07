import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  QrCode, 
  Download, 
  Share2, 
  Sparkles, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Copy, 
  Palette,
  ExternalLink,
  Smartphone,
  Eye,
  Calendar,
  UserCheck
} from 'lucide-react';
import { digitalIdDb, DigitalStudentId } from '../../services/db/digitalIdDatabase';
import { useAuth } from '../../context/AuthContext';

export const DigitalIdPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  const [card, setCard] = useState<DigitalStudentId | null>(null);
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const c = digitalIdDb.getByUserId(currentUserId) || digitalIdDb.createOrUpdate({
      userId: currentUserId,
      fullName: user?.displayName || 'Dileep Kumar Pallapu',
      displayName: user?.displayName || 'Dileep Kumar',
      institutionName: user?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      institutionId: 'inst-vel-tech-rangarajan-avadi'
    });
    setCard(c);

    const unsub = digitalIdDb.subscribe(() => {
      setCard(digitalIdDb.getByUserId(currentUserId));
    });
    return unsub;
  }, [currentUserId, user]);

  if (!card) return null;

  const handleCopyVerificationUrl = () => {
    navigator.clipboard.writeText(card.verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleThemeChange = (theme: DigitalStudentId['cardTheme']) => {
    digitalIdDb.updateTheme(card.userId, theme);
  };

  const getThemeGradient = (theme: DigitalStudentId['cardTheme']) => {
    switch (theme) {
      case 'quantum_emerald':
        return 'from-emerald-900 via-teal-950 to-slate-950 border-emerald-500/30 text-emerald-100';
      case 'cyber_indigo':
        return 'from-indigo-900 via-purple-950 to-slate-950 border-indigo-500/30 text-indigo-100';
      case 'aurora_gold':
        return 'from-amber-900 via-stone-900 to-slate-950 border-amber-500/30 text-amber-100';
      case 'glassmorphism':
        return 'from-cyan-900/80 via-blue-950/80 to-slate-900/90 backdrop-blur-xl border-cyan-400/40 text-cyan-100';
      case 'obsidian_dark':
      default:
        return 'from-zinc-900 via-zinc-950 to-black border-zinc-700/50 text-zinc-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Canonical Academic Credential
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">ACE Digital Student ID</h1>
            <p className="text-slate-400 text-sm mt-1">
              Verifiable student identity backed by official institution affiliation and cryptographic token.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyVerificationUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-medium hover:bg-slate-800 transition"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Verification Link Copied' : 'Share Verification Link'}
            </button>
            <button
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition shadow-lg shadow-emerald-900/30"
            >
              <QrCode className="w-4 h-4" /> Fullscreen QR
            </button>
          </div>
        </div>

        {/* Card Presentation & Customizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Digital ID Card (3D Styled) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className={`w-full max-w-md cursor-pointer transition-all duration-300 transform hover:scale-[1.02] rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${getThemeGradient(card.cardTheme)} border shadow-2xl relative overflow-hidden`}
            >
              {/* Background watermark badge */}
              <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                <GraduationCap className="w-64 h-64" />
              </div>

              {!isFlipped ? (
                // Front View
                <div className="space-y-6 relative z-10">
                  {/* Institution Banner */}
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-400 block">
                        Official Academic Network
                      </span>
                      <h3 className="font-bold text-white text-base leading-tight mt-0.5">
                        {card.institutionName}
                      </h3>
                      <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                        <Building2 className="w-3 h-3 text-slate-400" /> {card.campusAddress}
                      </p>
                    </div>
                    <div className="shrink-0 p-2 bg-white/10 rounded-2xl border border-white/20">
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>

                  {/* Student Details */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={card.avatarUrl} 
                      alt={card.fullName} 
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400/50 shadow-md"
                    />
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                        <UserCheck className="w-3 h-3" /> {card.verificationBadge.replace('_', ' ')}
                      </div>
                      <h2 className="text-xl font-bold text-white leading-snug">{card.fullName}</h2>
                      <p className="text-xs text-slate-300">{card.program}</p>
                      <p className="text-xs text-slate-400">Roll: {card.rollNumber} • Sem {card.currentSemester}</p>
                    </div>
                  </div>

                  {/* ID Bar & Quick QR */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block">ACE Student ID</span>
                      <span className="font-mono text-base font-bold text-emerald-300 tracking-wider">{card.aceId}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Valid Thru: {new Date(card.expiresAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                    </div>

                    <div className="p-2 bg-white rounded-xl shadow-inner text-slate-950 flex flex-col items-center">
                      <QrCode className="w-12 h-12 text-slate-900" />
                      <span className="text-[8px] font-mono font-bold tracking-tighter">SCAN TO VERIFY</span>
                    </div>
                  </div>
                </div>
              ) : (
                // Back View
                <div className="space-y-6 relative z-10 py-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Credential Verification</h4>
                    <span className="text-xs text-emerald-400">Card Back</span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Encrypted Token Reference</span>
                      <p className="font-mono text-[11px] text-emerald-300 break-all">{card.verificationToken}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Blood Group</span>
                        <span className="font-bold text-white">{card.bloodGroup || 'O+'}</span>
                      </div>
                      <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Emergency Phone</span>
                        <span className="font-bold text-white">{card.emergencyContact || '+91 98765 43210'}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-emerald-200 text-[11px] leading-relaxed">
                      This digital student ID is cryptographically verifiable. Scanning the QR opens a public proof page with non-sensitive confirmation.
                    </div>
                  </div>

                  <p className="text-[10px] text-center text-slate-400 pt-2">Click to flip back to front view</p>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Tap card to flip and inspect verified metadata
            </p>
          </div>

          {/* Controls & Security Specs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card Customizer */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-emerald-400" /> Digital ID Theme
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'quantum_emerald', label: 'Quantum Emerald', color: 'bg-emerald-600' },
                  { id: 'cyber_indigo', label: 'Cyber Indigo', color: 'bg-indigo-600' },
                  { id: 'aurora_gold', label: 'Aurora Gold', color: 'bg-amber-600' },
                  { id: 'glassmorphism', label: 'Glass Cyan', color: 'bg-cyan-600' },
                  { id: 'obsidian_dark', label: 'Obsidian Dark', color: 'bg-zinc-800' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id as any)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition ${
                      card.cardTheme === t.id 
                        ? 'bg-slate-800 border-emerald-500 text-white' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${t.color}`} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Verification Stats */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security & Scan Telemetry
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Total Scans</span>
                  <span className="text-xl font-bold text-white">{card.qrScansCount}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">NFC Tap Status</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                    <Smartphone className="w-3.5 h-3.5" /> Enabled
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>Issued Institution:</span>
                  <span className="text-slate-200 font-medium truncate max-w-[180px]">Vel Tech University</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Scanned:</span>
                  <span className="text-slate-200 font-medium">
                    {card.lastScannedAt ? new Date(card.lastScannedAt).toLocaleDateString() : 'Never'}
                  </span>
                </div>
              </div>
            </div>

            {/* Public Link */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs flex items-center justify-between">
              <span className="text-slate-300">Public Verification Portal</span>
              <a 
                href={`/verify/${card.verificationToken}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 font-semibold hover:underline"
              >
                Open Live Proof <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full text-center space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Event Entry & Verification</h3>
              <p className="text-xs text-slate-400">{card.fullName} • {card.aceId}</p>
            </div>

            <div className="p-6 bg-white rounded-2xl inline-block shadow-2xl">
              <QrCode className="w-48 h-48 text-slate-950 mx-auto" />
            </div>

            <p className="text-xs text-slate-400">
              Present this code at hackathon reception, lab check-in, or campus gates.
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
