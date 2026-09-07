import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Filter, 
  Sparkles, 
  Calendar, 
  Coins, 
  Award, 
  MessageSquare, 
  Shield, 
  ExternalLink,
  Settings
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { notificationDb, PersistentNotification } from '../services/db/notificationDatabase';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

export const NotificationCenterPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const userId = currentUser?.id || 'usr_student_dileep';

  const [notifications, setNotifications] = useState<PersistentNotification[]>(() => {
    return notificationDb.getNotificationsByUser(userId);
  });
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const refreshNotifs = () => {
    setNotifications(notificationDb.getNotificationsByUser(userId));
  };

  const handleMarkAsRead = (id: string) => {
    notificationDb.markAsRead(id);
    refreshNotifs();
  };

  const handleMarkAllAsRead = () => {
    notificationDb.markAllAsRead(userId);
    refreshNotifs();
    showToast('All notifications marked as read ✓');
  };

  const handleDelete = (id: string) => {
    notificationDb.deleteNotification(id);
    refreshNotifs();
    showToast('Notification removed');
  };

  const filtered = activeCategory === 'ALL'
    ? notifications
    : notifications.filter(n => n.type === activeCategory);

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'DEADLINE':
      case 'EVENT':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'RECOMMENDATION':
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
      case 'REWARD':
        return <Coins className="w-4 h-4 text-amber-600" />;
      case 'MENTORSHIP':
        return <Award className="w-4 h-4 text-emerald-600" />;
      case 'COMMUNITY':
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="COMMUNICATION & ALERTS"
        title="Notification"
        highlight="Center."
        subtitle="Manage deadline reminders, mentorship updates, community mentions, and token rewards in real time."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<CheckCheck className="w-4 h-4" />}
              onClick={handleMarkAllAsRead}
            >
              Mark All Read
            </Button>
            <Link to="/settings/privacy">
              <Button variant="outline" size="sm" icon={<Settings className="w-4 h-4" />}>
                Preferences
              </Button>
            </Link>
          </div>
        }
      />

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-semibold">
        {[
          { id: 'ALL', label: `All Alerts (${notifications.length})` },
          { id: 'DEADLINE', label: '⏰ Deadlines' },
          { id: 'MENTORSHIP', label: '🎓 Mentorship' },
          { id: 'RECOMMENDATION', label: '✨ AI Picks' },
          { id: 'REWARD', label: '🪙 Rewards' },
          { id: 'COMMUNITY', label: '💬 Community' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3.5 py-2 rounded-full whitespace-nowrap transition border ${
              activeCategory === tab.id
                ? 'bg-brand-600 text-white border-brand-600 font-bold shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
            No notifications in this category.
          </div>
        ) : (
          filtered.map(n => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl border transition shadow-xs flex items-start justify-between gap-4 ${
                n.isRead
                  ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 opacity-80'
                  : 'bg-purple-50/40 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/60'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  {getCategoryIcon(n.type)}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm ${n.isRead ? 'font-bold text-slate-800 dark:text-slate-200' : 'font-extrabold text-slate-900 dark:text-white'}`}>
                      {n.title}
                    </h4>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.message}</p>
                  
                  <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-400">
                    <span>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}</span>
                    {n.link && (
                      <Link to={n.link} className="text-brand-600 font-semibold hover:underline inline-flex items-center gap-1">
                        View Details <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(n.id)}
                    className="p-2 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Mark as read"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(n.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
