import React from 'react';
import { getCanonicalStudent } from '../../services/db/canonicalDataArchitecture';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { ShieldCheck, QrCode, Download, Share2 } from 'lucide-react';

export function DigitalStudentIDPage() {
  const student = getCanonicalStudent();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        
        <ACEPageHeader
          title="Digital Student ID"
          description="Cryptographically signed student identification for campus entry and lab access."
          badge="VERIFIED ID"
        />

        {/* Digital ID Card */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-xl border border-indigo-500/30 space-y-6 relative overflow-hidden">
          
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              {student.institution.name}
            </div>
            <ACEBadge variant="success">
              <ShieldCheck className="w-3 h-3 mr-1" /> ACTIVE
            </ACEBadge>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-indigo-700/50 border border-indigo-400/40 text-white font-bold text-2xl flex items-center justify-center shrink-0">
              {student.profile.firstName.charAt(0)}{student.profile.lastName.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold">{student.profile.firstName} {student.profile.lastName}</h3>
              <div className="text-xs text-slate-300">{student.profile.department}</div>
              <div className="text-xs text-indigo-300 font-mono mt-0.5">UID: {student.id.toUpperCase()}</div>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center space-y-2">
            <div className="w-36 h-36 border-4 border-slate-900 rounded-lg flex items-center justify-center bg-slate-50">
              <QrCode className="w-28 h-28 text-slate-900" />
            </div>
            <span className="text-[10px] text-slate-600 font-mono">
              SECURE QR • ACE TOKEN v60X
            </span>
          </div>

          <div className="text-center text-xs text-slate-400">
            Valid Academic Year 2026 - 2027 • Avadi Campus
          </div>

        </div>

        <div className="flex gap-3">
          <ACEButton variant="outline" size="md" className="flex-1 justify-center flex items-center gap-2">
            <Download className="w-4 h-4" /> Download Card
          </ACEButton>
          <ACEButton variant="primary" size="md" className="flex-1 justify-center flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share Token
          </ACEButton>
        </div>

      </div>
    </div>
  );
}
