import { MODULES } from '@/content';
import { ModuleCard } from './ModuleCard';

export function ModuleGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {MODULES.map((module) => (
        <li key={module.id}>
          <ModuleCard module={module} />
        </li>
      ))}
    </ul>
  );
}
