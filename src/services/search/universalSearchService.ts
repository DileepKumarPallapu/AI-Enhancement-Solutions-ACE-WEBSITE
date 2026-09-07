// ACE Universal Server-Side Search Engine
// Indexes Events, Hackathons, Competitions, Colleges, Mentors, Courses, Projects, and Communities

import { eventPersistenceDb } from '../db/eventPersistenceDatabase';
import { communityDb } from '../db/communityDatabase';
import { projectDb } from '../db/projectDatabase';
import { mentorshipDb } from '../db/mentorshipDatabase';
import { institutionDatabase } from '../db/institutionDatabase';

export interface SearchResultItem {
  id: string;
  type: 'EVENT' | 'COMPETITION' | 'COLLEGE' | 'MENTOR' | 'COURSE' | 'PROJECT' | 'COMMUNITY';
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  url: string;
  meta?: string;
}

export interface UniversalSearchParams {
  query: string;
  typeFilter?: string;
  city?: string;
  state?: string;
  limit?: number;
}

class UniversalSearchService {
  public search(params: UniversalSearchParams): { results: SearchResultItem[]; totalCount: number } {
    const q = (params.query || '').trim().toLowerCase();
    const results: SearchResultItem[] = [];

    // 1. Events & Hackathons
    const events = eventPersistenceDb.getAllEvents();
    events.forEach(e => {
      if (!q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.tags.some(t => t.toLowerCase().includes(q)) || e.college.toLowerCase().includes(q)) {
        if (!params.typeFilter || params.typeFilter === 'ALL' || params.typeFilter === 'EVENT') {
          results.push({
            id: e.id,
            type: 'EVENT',
            title: e.title,
            subtitle: `${e.college} • ${e.city}, ${e.state}`,
            description: e.shortDescription || e.description.slice(0, 120),
            badge: e.eventType,
            url: `/events/${e.slug}`
          });
        }
      }
    });

    // 2. Mentors
    const mentors = mentorshipDb.getAllMentors();
    mentors.forEach(m => {
      const expertiseList = m.expertise || m.expertiseSkills || m.specialties || [];
      const college = m.collegeName || m.institutionName || 'Vel Tech Campus';
      if (!q || m.fullName.toLowerCase().includes(q) || expertiseList.some(ex => ex.toLowerCase().includes(q)) || college.toLowerCase().includes(q)) {
        if (!params.typeFilter || params.typeFilter === 'ALL' || params.typeFilter === 'MENTOR') {
          results.push({
            id: m.id,
            type: 'MENTOR',
            title: m.fullName,
            subtitle: `${m.designation} • ${college}`,
            description: expertiseList.join(', ') || m.bio.slice(0, 100),
            badge: 'Verified Mentor',
            url: `/mentors`
          });
        }
      }
    });

    // 3. Projects
    const projects = projectDb.getProjects();
    projects.forEach(p => {
      if (!q || p.title.toLowerCase().includes(q) || p.techStack.some(t => t.toLowerCase().includes(q)) || p.description.toLowerCase().includes(q)) {
        if (!params.typeFilter || params.typeFilter === 'ALL' || params.typeFilter === 'PROJECT') {
          results.push({
            id: p.id,
            type: 'PROJECT',
            title: p.title,
            subtitle: `By ${p.authorName} (${p.authorCollege})`,
            description: p.tagline || p.description.slice(0, 120),
            badge: p.category.replace('_', ' '),
            url: `/projects`
          });
        }
      }
    });

    // 4. Colleges / Institutions
    const institutions = institutionDatabase.searchInstitutions({ query: q, limit: 10 });
    institutions.institutions.forEach(inst => {
      if (!params.typeFilter || params.typeFilter === 'ALL' || params.typeFilter === 'COLLEGE') {
        results.push({
          id: inst.id,
          type: 'COLLEGE',
          title: inst.name,
          subtitle: `${inst.city}, ${inst.stateName}`,
          description: `Accredited ${inst.institutionType} with NIRF Rank ${inst.nirfRank || 'N/A'}`,
          badge: inst.institutionCategory || 'University',
          url: `/colleges`
        });
      }
    });

    // 5. Community Discussions
    const posts = communityDb.getPosts();
    posts.forEach(post => {
      if (!q || post.title.toLowerCase().includes(q) || post.content.toLowerCase().includes(q)) {
        if (!params.typeFilter || params.typeFilter === 'ALL' || params.typeFilter === 'COMMUNITY') {
          results.push({
            id: post.id,
            type: 'COMMUNITY',
            title: post.title,
            subtitle: `${post.authorName} (${post.authorCollege})`,
            description: post.content.slice(0, 120),
            badge: post.category.replace('_', ' '),
            url: `/community`
          });
        }
      }
    });

    const limit = params.limit || 30;
    return {
      results: results.slice(0, limit),
      totalCount: results.length
    };
  }

  public getRecentSearches(userId: string): string[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const raw = localStorage.getItem(`ace_recent_searches_${userId}`);
      return raw ? JSON.parse(raw) : ['AI Hackathons', 'Vel Tech', 'Python', 'React 19'];
    } catch (e) {
      return [];
    }
  }

  public saveRecentSearch(userId: string, query: string): void {
    if (typeof localStorage === 'undefined' || !query.trim()) return;
    try {
      const list = this.getRecentSearches(userId).filter(s => s.toLowerCase() !== query.toLowerCase());
      list.unshift(query.trim());
      localStorage.setItem(`ace_recent_searches_${userId}`, JSON.stringify(list.slice(0, 8)));
    } catch (e) {
      // ignore
    }
  }
}

export const universalSearchService = new UniversalSearchService();
