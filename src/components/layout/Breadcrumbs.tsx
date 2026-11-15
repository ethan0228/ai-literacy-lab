import Link from 'next/link';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="頁面路徑" className="text-ink-muted projection:hidden text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-brand-800 py-1 underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
