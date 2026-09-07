import React from 'react';
import { 
  Building2, Users, Trophy, BookOpen, 
  Award, ShieldCheck, MapPin, Globe 
} from 'lucide-react';
import { ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { campusNetworkDb } from '../../services/db/campusNetworkDatabase';
import { useNavigate } from 'react-router-dom';

export const CampusNetworkPage: React.FC = () => {
  const navigate = useNavigate();
  const clubs = campusNetworkDb.getClubs('inst-vel-tech-rangarajan-avadi');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 border border-indigo-800/40 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                VT
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">Vel Tech University</h1>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-xs text-indigo-300">Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology</p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> Avadi, Chennai, Tamil Nadu • Deemed University
                </p>
              </div>
            </div>
            <ACEBadge variant="success">Institution Verified</ACEBadge>
          </div>
        </div>

        {/* Campus Clubs Hub */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Active Campus Societies & Clubs ({clubs.length})
            </h2>
            <ACEButton size="sm" variant="outline" onClick={() => navigate('/college/clubs')}>
              Manage Clubs
            </ACEButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clubs.map((club) => (
              <ACECard key={club.id} className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">{club.name}</h3>
                    <p className="text-xs text-indigo-400">{club.department}</p>
                  </div>
                  <ACEBadge variant="primary">{club.category}</ACEBadge>
                </div>

                <p className="text-xs text-slate-300">{club.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>Faculty Lead: <strong className="text-white">{club.facultyCoordinator}</strong></span>
                  <span>{club.membersCount} Members</span>
                </div>
              </ACECard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CampusNetworkPage;
