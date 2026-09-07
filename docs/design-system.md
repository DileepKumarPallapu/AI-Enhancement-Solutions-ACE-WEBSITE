# ACE Design System — Specification & Guidelines

## 1. Design Principles
- **Student-First & AI-Native**: Everything connects through the student's authentic canonical identity (*Vel Tech / Dileep Kumar*).
- **Database = Authority, AI = Assistant**: Explicit permissions, no fabricated scores, zero fake production data.
- **Consistent Tokens**: Uniform CSS variables for surfaces, text, borders, feedback colors, radii, spacing, and shadows.

## 2. Core Tokens
- **Surfaces**: `--ace-bg`, `--ace-bg-secondary`, `--ace-surface`, `--ace-surface-elevated`, `--ace-surface-hover`
- **Text**: `--ace-text`, `--ace-text-secondary`, `--ace-text-muted`, `--ace-text-inverse`
- **Borders**: `--ace-border`, `--ace-border-subtle`, `--ace-border-strong`
- **Primary / Brand**: `--ace-primary`, `--ace-primary-hover`, `--ace-primary-active`
- **Financial Rule**: `100 ACE Coins = ₹1 INR` (Authoritative currency conversion).

## 3. Atomic Components (`src/components/ui/ace/`)
1. `ACEButton`: Primary, secondary, tertiary, danger, success, ghost, icon, loading states.
2. `ACECard`: Standard, interactive, featured, elevated, stat, and compact cards.
3. `ACEEventCard`: 16:9 responsive aspect ratio, badges, verified mark, bookmarking, and CTAs.
4. `ACEBadge`: Status, category, verified indicator.
5. `ACEAvatar`: Verified checkmark, initial fallback, size scale (`xs` to `2xl`).
6. `ACEModal`: Dialog with focus trap, backdrop blur, and keyboard escape.
7. `ACEDataTable`: Sortable, searchable, paginated data table with mobile responsive card mode.
8. `ACEPageHeader`: Breadcrumb-aware standard page header with CTAs.
9. `ACEEmptyState`: Beautiful contextual empty state with action CTAs.
