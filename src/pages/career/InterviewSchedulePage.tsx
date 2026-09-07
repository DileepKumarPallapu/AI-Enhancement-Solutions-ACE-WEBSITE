import React, { useState } from 'react';
import { 
  Calendar, Video, CheckCircle2, User, Clock, 
  ExternalLink, Sparkles, BookOpen 
} from 'lucide-react';
import { interviewsDb, ScheduledInterviewItem } from '../../services/db/interviewsDatabase';
import { ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { useNavigate } from 'react-router-dom';

export const InterviewSchedulePage: React.FC = () => {
  const [interviews] = useState<ScheduledInterviewItem[]>(interviewsDb.getInterviews('usr_student_dileep'));
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 w-fit">
              <Calendar className="w-3.5 h-3.5" /> Interview Schedule Center
            </span>
            <h1 className="text-2xl font-bold text-white">Upcoming Recruiter Interviews</h1>
          </div>
        </div>

        <div className="space-y-4">
          {interviews.map((item) => (
            <ACECard key={item.id} className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.companyLogoUrl} alt={item.companyName} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-white text-base">{item.roleTitle}</h3>
                    <p className="text-xs text-indigo-400 font-medium">{item.companyName}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {new Date(item.scheduledDate).toLocaleString()}
                    </p>
                  </div>
                </div>
                <ACEBadge variant="success">SCHEDULED</ACEBadge>
              </div>

              {item.prepNotes && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-semibold text-indigo-300 block">Preparation Focus Points:</span>
                  <p>{item.prepNotes}</p>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                <ACEButton size="sm" variant="outline" onClick={() => navigate('/career/interview')}>
                  AI Mock Practice
                </ACEButton>
                <a
                  href={item.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" /> Join Video Room
                </a>
              </div>
            </ACECard>
          ))}
        </div>
      </div>
    </div>
  );
};
export default InterviewSchedulePage;
