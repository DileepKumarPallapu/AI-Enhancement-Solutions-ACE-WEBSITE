import React, { useState } from 'react';
import { Users, Plus, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { campusNetworkDb, CollegeClub } from '../../services/db/campusNetworkDatabase';
import { ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { useToast } from '../../context/ToastContext';

export const CollegeClubsPage: React.FC = () => {
  const [clubs, setClubs] = useState<CollegeClub[]>(campusNetworkDb.getClubs('inst-vel-tech-rangarajan-avadi'));
  const { showToast } = useToast();

  const handleToggleMembership = (id: string) => {
    const isMember = campusNetworkDb.toggleMembership(id);
    setClubs(campusNetworkDb.getClubs('inst-vel-tech-rangarajan-avadi'));
    showToast(isMember ? 'Joined club successfully!' : 'Left club membership', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              Vel Tech Campus Clubs & Societies
            </span>
            <h1 className="text-2xl font-bold text-white">Student Leadership & Chapters</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clubs.map((club) => (
            <ACECard key={club.id} className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">{club.name}</h3>
                  <p className="text-xs text-indigo-400">{club.department}</p>
                </div>
                <ACEBadge variant={club.isMember ? 'success' : 'neutral'}>
                  {club.isMember ? 'Enrolled Member' : 'Open'}
                </ACEBadge>
              </div>

              <p className="text-sm text-slate-300">{club.description}</p>

              <div className="text-xs text-slate-400 space-y-1">
                <p>President: <strong className="text-white">{club.presidentName}</strong></p>
                <p>Faculty Coordinator: <strong className="text-white">{club.facultyCoordinator}</strong></p>
              </div>

              <ACEButton
                variant={club.isMember ? 'outline' : 'primary'}
                className="w-full text-xs"
                onClick={() => handleToggleMembership(club.id)}
              >
                {club.isMember ? 'Leave Society' : 'Join Society'}
              </ACEButton>
            </ACECard>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CollegeClubsPage;
