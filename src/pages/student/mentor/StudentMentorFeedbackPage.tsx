import React, { useState } from 'react';
import { useMentor } from '../../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Send
} from 'lucide-react';

export const StudentMentorFeedbackPage: React.FC = () => {
  const { studentSessions, collegeMentors, submitFeedback } = useMentor();

  const [sessionId, setSessionId] = useState(studentSessions[0]?.id || 'session-1');
  const [commRating, setCommRating] = useState(5);
  const [helpRating, setHelpRating] = useState(5);
  const [knowledgeRating, setKnowledgeRating] = useState(5);
  const [guidanceRating, setGuidanceRating] = useState(5);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitFeedback(sessionId, {
      communication: commRating,
      helpfulness: helpRating,
      knowledge: knowledgeRating,
      guidance: guidanceRating,
      comment: comments
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/student/mentorship" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentorship Hub
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mentorship Feedback</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Provide confidential feedback on your mentor sessions to uphold high academic advisory standards.
          </p>
        </div>

        {submitted ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Thank You for Your Feedback!</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your evaluation helps mentors refine guidance and ensures top mentorship quality across campus.
            </p>
            <Link to="/student/mentorship" className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs">
              Return to Mentorship Hub
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Communication Clarity (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={commRating}
                  onChange={e => setCommRating(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Helpfulness & Actionability (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={helpRating}
                  onChange={e => setHelpRating(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Domain & Technical Knowledge (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={knowledgeRating}
                  onChange={e => setKnowledgeRating(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Guidance & Mentorship Impact (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={guidanceRating}
                  onChange={e => setGuidanceRating(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Review Comments & Testimonial</label>
              <textarea
                rows={4}
                placeholder="Share how this mentor helped you with project architecture, hackathon prep, or placements..."
                value={comments}
                onChange={e => setComments(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Submit Mentorship Evaluation
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
