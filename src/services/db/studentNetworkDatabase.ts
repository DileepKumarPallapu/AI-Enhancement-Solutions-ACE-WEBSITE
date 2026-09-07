import { getCanonicalStudent } from './canonicalDataArchitecture';

export interface PeerStudent {
  id: string;
  name: string;
  username: string;
  institution: string;
  department: string;
  year: string;
  skills: string[];
  mutualConnections: number;
  isFollowing: boolean;
  connectionStatus: 'NONE' | 'REQUEST_SENT' | 'REQUEST_RECEIVED' | 'CONNECTED';
}

const STORAGE_KEY = 'ace_60x_student_network';

export const studentNetworkDatabase = {
  getPeers(): PeerStudent[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: PeerStudent[] = [
      {
        id: 'peer-1',
        name: 'Rohan Sharma',
        username: 'rohan-sharma',
        institution: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        department: 'Computer Science & Engineering',
        year: '4th Year',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'Docker'],
        mutualConnections: 14,
        isFollowing: true,
        connectionStatus: 'CONNECTED'
      },
      {
        id: 'peer-2',
        name: 'Sneha Patel',
        username: 'sneha-patel',
        institution: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        department: 'Information Technology',
        year: '3rd Year',
        skills: ['React', 'TypeScript', 'UI/UX Design', 'Figma'],
        mutualConnections: 9,
        isFollowing: false,
        connectionStatus: 'REQUEST_SENT'
      },
      {
        id: 'peer-3',
        name: 'Aditya Varma',
        username: 'aditya-varma',
        institution: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        department: 'Electronics & Communication',
        year: '4th Year',
        skills: ['Embedded C', 'IoT', 'Cloud Architecture', 'AWS'],
        mutualConnections: 21,
        isFollowing: false,
        connectionStatus: 'NONE'
      },
      {
        id: 'peer-4',
        name: 'Pooja Iyer',
        username: 'pooja-iyer',
        institution: 'IIT Madras',
        department: 'Data Science',
        year: '3rd Year',
        skills: ['Python', 'SQL', 'PostgreSQL', 'Tableau'],
        mutualConnections: 6,
        isFollowing: true,
        connectionStatus: 'NONE'
      }
    ];
    this.savePeers(defaults);
    return defaults;
  },

  savePeers(peers: PeerStudent[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(peers));
    } catch {}
  },

  toggleFollow(id: string): PeerStudent | undefined {
    const peers = this.getPeers();
    const target = peers.find(p => p.id === id);
    if (target) {
      target.isFollowing = !target.isFollowing;
      this.savePeers(peers);
    }
    return target;
  },

  sendConnectionRequest(id: string): PeerStudent | undefined {
    const peers = this.getPeers();
    const target = peers.find(p => p.id === id);
    if (target) {
      target.connectionStatus = target.connectionStatus === 'CONNECTED' ? 'NONE' : 'REQUEST_SENT';
      this.savePeers(peers);
    }
    return target;
  }
};
