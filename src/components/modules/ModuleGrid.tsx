import { MODULES } from '@/content';
import { ModuleCard } from './ModuleCard';

/** compact：首頁用的精簡卡片（以提問為主、不顯示描述），手機為兩欄。 */
export function ModuleGrid({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={`grid sm:grid-cols-2 lg:grid-cols-3 ${compact ? 'grid-cols-2 gap-3 sm:gap-5' : 'gap-5'}`}
    >
      {MODULES.map((module) => (
        <li key={module.id}>
          <ModuleCard module={module} compact={compact} />
        </li>
      ))}
    </ul>
  );
}
