// ACE Team Finder & Private Hackathon Workspace Database
// Handles hackathon squad matching, skill requirement filters, invite flows, tasks, files, and private workspace chat

export interface TeamMember {
  userId: string;
  fullName: string;
  displayName: string;
  avatarUrl: string;
  institutionName: string;
  roleInTeam: 'LEADER' | 'FRONTEND' | 'BACKEND' | 'AI_ENGINEER' | 'DESIGNER' | 'RESEARCHER';
  joinedAt: string;
  isOwner: boolean;
}

export interface TeamJoinRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userCollege: string;
  targetRole: string;
  pitchMessage: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

export interface TeamTask {
  id: string;
  title: string;
  assignedToUserId?: string;
  assignedToName?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  dueDate?: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface TeamResource {
  id: string;
  title: string;
  url: string;
  type: 'GITHUB_REPO' | 'FIGMA' | 'DOCS' | 'DRIVE' | 'DEPLOYMENT';
  addedBy: string;
  addedAt: string;
}

export interface TeamWorkspace {
  id: string;
  eventId: string;
  eventName: string;
  teamName: string;
  tagline: string;
  category: string;
  targetSize: number;
  lookingForRoles: string[];
  ownerId: string;
  members: TeamMember[];
  joinRequests: TeamJoinRequest[];
  tasks: TeamTask[];
  resources: TeamResource[];
  projectRepoUrl?: string;
  demoUrl?: string;
  pitchDeckUrl?: string;
  isRecruiting: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'ace_db_team_workspaces_v1';

class TeamDatabase {
  private teams: Map<string, TeamWorkspace> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.teams.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const items = JSON.parse(raw) as TeamWorkspace[];
          items.forEach(t => this.teams.set(t.id, t));
        }
      }
    } catch {
      // Storage fallback
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.teams.values())));
      }
    } catch {
      // Storage fallback
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (err) { console.error(err); }
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public seedInitial() {
    const defaultTeam: TeamWorkspace = {
      id: 'team_veltech_neural_01',
      eventId: 'evt_nat_hackathon_2026',
      eventName: 'National AI & Autonomous Robotics Hackathon 2026',
      teamName: 'Neural Titans - Vel Tech',
      tagline: 'Autonomous Multimodal Ground Rescue Drone with Edge SLAM Perception',
      category: 'Autonomous AI & Robotics',
      targetSize: 4,
      lookingForRoles: ['UI/UX Designer', 'Computer Vision Specialist'],
      ownerId: 'usr_student_dileep',
      isRecruiting: true,
      createdAt: '2026-03-01T10:00:00.000Z',
      updatedAt: new Date().toISOString(),
      projectRepoUrl: 'https://github.com/neural-titans/ground-rescue-slam',
      demoUrl: 'https://neural-titans-rescue.vercel.app',
      pitchDeckUrl: 'https://pitch.com/p/neural-titans-ace',
      members: [
        {
          userId: 'usr_student_dileep',
          fullName: 'Dileep Kumar Pallapu',
          displayName: 'Dileep Kumar',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
          institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
          roleInTeam: 'LEADER',
          joinedAt: '2026-03-01T10:00:00.000Z',
          isOwner: true
        },
        {
          userId: 'usr_member_priya',
          fullName: 'Priya Sundaram',
          displayName: 'Priya S',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
          institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
          roleInTeam: 'AI_ENGINEER',
          joinedAt: '2026-03-02T11:00:00.000Z',
          isOwner: false
        }
      ],
      joinRequests: [
        {
          id: 'req_join_01',
          userId: 'usr_cand_aravind',
          userName: 'Aravind Swaminathan',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
          userCollege: 'IIT Madras',
          targetRole: 'Computer Vision Specialist',
          pitchMessage: 'Built real-time YOLOv10 object tracking models with 45 FPS on Jetson Nano. Eager to partner!',
          status: 'PENDING',
          createdAt: '2026-03-05T14:20:00.000Z'
        }
      ],
      tasks: [
        {
          id: 'tsk_001',
          title: 'Finalize ROS2 Navigation Node Pipeline',
          assignedToUserId: 'usr_student_dileep',
          assignedToName: 'Dileep Kumar',
          status: 'IN_PROGRESS',
          dueDate: '2026-03-12',
          priority: 'HIGH'
        },
        {
          id: 'tsk_002',
          title: 'Train Obstacle Avoidance model with synthetic depth',
          assignedToUserId: 'usr_member_priya',
          assignedToName: 'Priya S',
          status: 'DONE',
          dueDate: '2026-03-08',
          priority: 'HIGH'
        },
        {
          id: 'tsk_003',
          title: 'Record 3-Minute Demo Video for Jury Preliminary Round',
          status: 'TODO',
          dueDate: '2026-03-14',
          priority: 'CRITICAL'
        }
      ],
      resources: [
        {
          id: 'res_01',
          title: 'GitHub Core Monorepo',
          url: 'https://github.com/neural-titans/ground-rescue-slam',
          type: 'GITHUB_REPO',
          addedBy: 'Dileep Kumar',
          addedAt: '2026-03-01T10:30:00.000Z'
        },
        {
          id: 'res_02',
          title: 'Figma UI Telemetry Dashboard',
          url: 'https://figma.com/file/neural-titans-telemetry',
          type: 'FIGMA',
          addedBy: 'Dileep Kumar',
          addedAt: '2026-03-02T15:00:00.000Z'
        }
      ]
    };

    this.teams.set(defaultTeam.id, defaultTeam);
    this.saveToStorage();
  }

  public getAll(): TeamWorkspace[] {
    return Array.from(this.teams.values()).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  public getById(teamId: string): TeamWorkspace | null {
    return this.teams.get(teamId) || null;
  }

  public getByUser(userId: string): TeamWorkspace[] {
    return Array.from(this.teams.values()).filter(t => 
      t.members.some(m => m.userId === userId) || t.ownerId === userId
    );
  }

  public getByEvent(eventId: string): TeamWorkspace[] {
    return Array.from(this.teams.values()).filter(t => t.eventId === eventId);
  }

  public createTeam(params: {
    eventId: string;
    eventName: string;
    teamName: string;
    tagline: string;
    category: string;
    targetSize: number;
    lookingForRoles: string[];
    owner: {
      userId: string;
      fullName: string;
      displayName: string;
      avatarUrl: string;
      institutionName: string;
      roleInTeam: TeamMember['roleInTeam'];
    };
  }): TeamWorkspace {
    const id = `team_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newTeam: TeamWorkspace = {
      id,
      eventId: params.eventId,
      eventName: params.eventName,
      teamName: params.teamName,
      tagline: params.tagline,
      category: params.category,
      targetSize: params.targetSize,
      lookingForRoles: params.lookingForRoles,
      ownerId: params.owner.userId,
      isRecruiting: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: [
        {
          userId: params.owner.userId,
          fullName: params.owner.fullName,
          displayName: params.owner.displayName,
          avatarUrl: params.owner.avatarUrl,
          institutionName: params.owner.institutionName,
          roleInTeam: params.owner.roleInTeam,
          joinedAt: new Date().toISOString(),
          isOwner: true
        }
      ],
      joinRequests: [],
      tasks: [],
      resources: []
    };

    this.teams.set(id, newTeam);
    this.saveToStorage();
    return newTeam;
  }

  public requestToJoin(teamId: string, request: Omit<TeamJoinRequest, 'id' | 'createdAt' | 'status'>): boolean {
    const team = this.teams.get(teamId);
    if (!team) return false;

    // Check already member or pending
    if (team.members.some(m => m.userId === request.userId)) return false;
    if (team.joinRequests.some(r => r.userId === request.userId && r.status === 'PENDING')) return false;

    const newReq: TeamJoinRequest = {
      ...request,
      id: `req_join_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    team.joinRequests.unshift(newReq);
    team.updatedAt = new Date().toISOString();
    this.teams.set(teamId, team);
    this.saveToStorage();
    return true;
  }

  public handleJoinRequest(teamId: string, requestId: string, decision: 'ACCEPTED' | 'REJECTED'): boolean {
    const team = this.teams.get(teamId);
    if (!team) return false;

    const req = team.joinRequests.find(r => r.id === requestId);
    if (!req) return false;

    req.status = decision;
    if (decision === 'ACCEPTED') {
      const newMember: TeamMember = {
        userId: req.userId,
        fullName: req.userName,
        displayName: req.userName,
        avatarUrl: req.userAvatar,
        institutionName: req.userCollege,
        roleInTeam: 'AI_ENGINEER',
        joinedAt: new Date().toISOString(),
        isOwner: false
      };
      team.members.push(newMember);
      if (team.members.length >= team.targetSize) {
        team.isRecruiting = false;
      }
    }

    team.updatedAt = new Date().toISOString();
    this.teams.set(teamId, team);
    this.saveToStorage();
    return true;
  }

  public addTask(teamId: string, task: Omit<TeamTask, 'id'>): boolean {
    const team = this.teams.get(teamId);
    if (!team) return false;
    const newTask: TeamTask = {
      ...task,
      id: `tsk_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`
    };
    team.tasks.unshift(newTask);
    team.updatedAt = new Date().toISOString();
    this.teams.set(teamId, team);
    this.saveToStorage();
    return true;
  }

  public updateTaskStatus(teamId: string, taskId: string, status: TeamTask['status']): boolean {
    const team = this.teams.get(teamId);
    if (!team) return false;
    const t = team.tasks.find(tk => tk.id === taskId);
    if (!t) return false;
    t.status = status;
    team.updatedAt = new Date().toISOString();
    this.teams.set(teamId, team);
    this.saveToStorage();
    return true;
  }

  public addResource(teamId: string, resource: Omit<TeamResource, 'id' | 'addedAt'>): boolean {
    const team = this.teams.get(teamId);
    if (!team) return false;
    const newRes: TeamResource = {
      ...resource,
      id: `res_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      addedAt: new Date().toISOString()
    };
    team.resources.unshift(newRes);
    team.updatedAt = new Date().toISOString();
    this.teams.set(teamId, team);
    this.saveToStorage();
    return true;
  }
}

export const teamDb = new TeamDatabase();
