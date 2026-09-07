import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Eye, Lock, Globe, Check, Users, Download, Loader2, FileArchive } from 'lucide-react';
import { VisibilityLevel } from '../../types/account';
import { useAutoSave } from '../../hooks/useAutoSave';
import { SaveStatus } from '../../components/common/SaveStatus';
import { backgroundJobQueue, BackgroundJob } from '../../services/jobs/backgroundJobQueue';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';

export const PrivacySettingsPage: React.FC = () => {
  const { currentUser, updateProfile, refreshUser } = useAuth();
  const { showToast } = useToast();
  const userId = currentUser?.id || 'usr_student_dileep';

  const [profileVisibility, setProfileVisibility] = useState<VisibilityLevel>(
    (currentUser?.privacyPreferences?.profileVisibility as VisibilityLevel) || 'PUBLIC'
  );
  const [showEmail, setShowEmail] = useState(currentUser?.privacyPreferences?.showEmail || false);
  const [showPhone, setShowPhone] = useState(currentUser?.privacyPreferences?.showPhone || false);
  const [showCollege, setShowCollege] = useState(currentUser?.privacyPreferences?.showCollege !== false);
  const [showSkills, setShowSkills] = useState(currentUser?.privacyPreferences?.showSkills !== false);
  const [showProjects, setShowProjects] = useState(currentUser?.privacyPreferences?.showProjects !== false);
  const [allowFollowers, setAllowFollowers] = useState(currentUser?.privacyPreferences?.allowFollowers !== false);

  // Data Export State
  const [exportJob, setExportJob] = useState<BackgroundJob | null>(null);

  const autoSave = useAutoSave({
    value: {
      profileVisibility,
      showEmail,
      showPhone,
      showCollege,
      showSkills,
      showProjects,
      allowFollowers
    },
    debounceMs: 600,
    onSave: async (prefs) => {
      if (!currentUser) return;
      await updateProfile({
        privacyPreferences: {
          profileVisibility: prefs.profileVisibility,
          showEmail: prefs.showEmail,
          showPhone: prefs.showPhone,
          showCollege: prefs.showCollege,
          showLocation: true,
          showSkills: prefs.showSkills,
          showProjects: prefs.showProjects,
          showGallery: 'PUBLIC',
          showAchievements: true,
          showSocialLinks: true,
          allowFollowers: prefs.allowFollowers
        }
      });
      refreshUser();
    }
  });

  const handleRequestDataExport = () => {
    const job = backgroundJobQueue.enqueueJob({
      type: 'DATA_EXPORT',
      userId,
      payload: { requestedAt: new Date().toISOString() }
    });
    setExportJob(job);
    showToast('Background export job queued...');

    // Poll job status
    const pollId = setInterval(() => {
      const updated = backgroundJobQueue.getJob(job.id);
      if (updated) {
        setExportJob({ ...updated });
        if (updated.status === 'COMPLETED') {
          clearInterval(pollId);
          showToast('Data snapshot prepared and ready for download! 📦');
        }
      }
    }, 400);
  };

  const handleDownloadSnapshot = () => {
    if (!exportJob?.result) return;
    const blob = new Blob([JSON.stringify(exportJob.result.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ace_data_export_${userId}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Archive downloaded successfully ✓');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Privacy & Data Governance</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose what details are visible to campus peers and external recruiters. Edits autosave seamlessly.
          </p>
        </div>
        <SaveStatus status={autoSave.status} lastSavedAt={autoSave.lastSavedAt} />
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
          Profile Visibility Scope
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'PUBLIC', label: 'Public (Everyone)', desc: 'Visible to all students, mentors & recruiters' },
            { id: 'COLLEGE_ONLY', label: 'Campus Only', desc: 'Only members of your college institution' },
            { id: 'PRIVATE', label: 'Private (Invite Only)', desc: 'Only users you explicitly approve' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setProfileVisibility(item.id as VisibilityLevel)}
              className={`p-3 rounded-2xl border text-left transition ${
                profileVisibility === item.id
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-sm mb-1">{item.label}</div>
              <div className="text-xs text-slate-400">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
          Detail Visibility Toggles
        </label>

        {[
          { label: 'Display Email Address Publicly', checked: showEmail, toggle: () => setShowEmail(!showEmail) },
          { label: 'Display Mobile Phone Number', checked: showPhone, toggle: () => setShowPhone(!showPhone) },
          { label: 'Display College & Academic Department', checked: showCollege, toggle: () => setShowCollege(!showCollege) },
          { label: 'Display Verified Skill Badges', checked: showSkills, toggle: () => setShowSkills(!showSkills) },
          { label: 'Display Student Project Showcase', checked: showProjects, toggle: () => setShowProjects(!showProjects) },
          { label: 'Allow Peer Students to Follow Profile', checked: allowFollowers, toggle: () => setAllowFollowers(!allowFollowers) }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{item.label}</span>
            <button
              type="button"
              onClick={item.toggle}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                item.checked ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  item.checked ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Asynchronous Data Export */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Export My Account Data (GDPR Compliant)</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Download a machine-readable JSON archive containing all your registrations, verified certificates, wallet transactions, and roadmaps.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-brand-600 flex items-center justify-center">
              <FileArchive className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 dark:text-white">Full Platform Snapshot Archive</span>
              <p className="text-[11px] text-slate-400">Includes Profile, Events, Wallet, Roadmaps, Projects</p>
            </div>
          </div>

          <div>
            {!exportJob && (
              <Button variant="primary" size="sm" onClick={handleRequestDataExport} icon={<Download className="w-3.5 h-3.5" />}>
                Request Export Archive
              </Button>
            )}

            {exportJob?.status === 'QUEUED' && (
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" /> Preparing Export...
              </span>
            )}

            {exportJob?.status === 'RUNNING' && (
              <span className="text-xs text-indigo-600 font-bold flex items-center gap-1.5 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" /> Building Archive...
              </span>
            )}

            {exportJob?.status === 'COMPLETED' && (
              <Button variant="ai" size="sm" onClick={handleDownloadSnapshot} icon={<Download className="w-3.5 h-3.5" />}>
                Download JSON Snapshot (Ready)
              </Button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
