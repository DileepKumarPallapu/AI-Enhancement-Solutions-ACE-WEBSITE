// ACE Centralized Authorization & Permission Engine (RBAC + ABAC + PBAC)
// Protects all operations against horizontal privilege escalation (IDOR)

import { User, AccountRoleType } from '../db/canonicalDataArchitecture';
import { accountDb } from '../db/accountDatabase';

export type PermissionAction = 
  | 'VIEW'
  | 'CREATE'
  | 'EDIT'
  | 'DELETE'
  | 'PUBLISH'
  | 'APPROVE'
  | 'REJECT'
  | 'ASSIGN'
  | 'REVOKE'
  | 'REDEEM'
  | 'EXPORT';

export type ResourceType = 
  | 'PROFILE'
  | 'EVENT'
  | 'EVENT_DRAFT'
  | 'MENTORSHIP_REQUEST'
  | 'MENTORSHIP_SESSION'
  | 'MENTORSHIP_NOTE'
  | 'ACTION_PLAN'
  | 'PROJECT'
  | 'POST'
  | 'CERTIFICATE'
  | 'WALLET'
  | 'SESSION'
  | 'AUDIT_LOG'
  | 'INSTITUTION';

export interface AuthorizationContext {
  resourceOwnerId?: string;
  resourceInstitutionId?: string;
  targetStudentId?: string;
  targetMentorId?: string;
  isPrivate?: boolean;
}

export class PermissionEngine {
  /**
   * Determine whether the active authenticated user is authorized to execute an action on a resource.
   */
  public can(
    user: User | null,
    action: PermissionAction,
    resource: ResourceType,
    context?: AuthorizationContext
  ): { allowed: boolean; reason?: string } {
    if (!user) {
      if (action === 'VIEW' && (resource === 'EVENT' || resource === 'POST' || resource === 'PROJECT')) {
        return { allowed: true };
      }
      return { allowed: false, reason: 'Authentication required' };
    }

    // 1. Super Admin override
    if ((user.role as string) === 'SUPER_ADMIN' || (user.role as string) === 'ADMIN' || (user.roles && user.roles.includes('SUPER_ADMIN'))) {
      return { allowed: true };
    }

    // 2. Ownership-based access (Self-resource)
    const isOwner = context?.resourceOwnerId === user.id;

    // 3. Institution Boundary Check
    const sameInstitution = !context?.resourceInstitutionId || context.resourceInstitutionId === user.institutionId;

    switch (resource) {
      case 'PROFILE':
        if (action === 'VIEW') return { allowed: true };
        if (action === 'EDIT') {
          return isOwner 
            ? { allowed: true } 
            : { allowed: false, reason: 'Cannot edit another user profile' };
        }
        break;

      case 'EVENT':
        if (action === 'VIEW') return { allowed: true };
        if (action === 'CREATE' || action === 'EDIT') {
          if (user.role === 'STUDENT' || user.role === 'ORGANIZER' || user.role === 'COLLEGE_AMBASSADOR' || user.role === 'ADMIN') {
            return isOwner || action === 'CREATE'
              ? { allowed: true }
              : { allowed: false, reason: 'Can only edit events created by yourself' };
          }
        }
        if (action === 'APPROVE' || action === 'REJECT') {
          return (user.role === 'ADMIN' && sameInstitution)
            ? { allowed: true }
            : { allowed: false, reason: 'Requires institution admin rights' };
        }
        break;

      case 'EVENT_DRAFT':
        return isOwner
          ? { allowed: true }
          : { allowed: false, reason: 'Cannot access another user drafts' };

      case 'MENTORSHIP_REQUEST':
        if (action === 'CREATE') {
          return sameInstitution
            ? { allowed: true }
            : { allowed: false, reason: 'Mentorship requests strictly restricted to your registered institution' };
        }
        if (action === 'APPROVE' || action === 'REJECT') {
          return context?.targetMentorId === user.id || user.role === 'ADMIN'
            ? { allowed: true }
            : { allowed: false, reason: 'Only the requested mentor can respond' };
        }
        break;

      case 'MENTORSHIP_SESSION':
      case 'ACTION_PLAN':
        if (action === 'VIEW' || action === 'EDIT' || action === 'CREATE') {
          const isParticipant = isOwner || context?.targetStudentId === user.id || context?.targetMentorId === user.id;
          return isParticipant && sameInstitution
            ? { allowed: true }
            : { allowed: false, reason: 'Access restricted to participating student and mentor' };
        }
        break;

      case 'PROJECT':
      case 'POST':
        if (action === 'VIEW') return { allowed: true };
        if (action === 'CREATE') return { allowed: true };
        if (action === 'EDIT' || action === 'DELETE') {
          return isOwner
            ? { allowed: true }
            : { allowed: false, reason: 'Only author can modify content' };
        }
        break;

      case 'WALLET':
        return isOwner
          ? { allowed: true }
          : { allowed: false, reason: 'Cannot access other wallet accounts' };

      case 'SESSION':
        return isOwner
          ? { allowed: true }
          : { allowed: false, reason: 'Cannot manage other user sessions' };

      case 'AUDIT_LOG':
        return (user.role === 'ADMIN' || (user.role as string) === 'SUPER_ADMIN' || (user.role as string) === 'ADMIN') && sameInstitution
          ? { allowed: true }
          : { allowed: false, reason: 'Audit logs restricted to administrators' };
    }

    return { allowed: isOwner, reason: isOwner ? undefined : 'Permission denied' };
  }
}

export const permissionEngine = new PermissionEngine();
