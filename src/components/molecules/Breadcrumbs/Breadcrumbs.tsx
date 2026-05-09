import React from 'react';
import { Box } from '../../atoms/Box';
import { Typography } from '../../atoms/Typography';
import './_breadcrumbs.scss';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator */
  separator?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

const DefaultSeparator = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = <DefaultSeparator />,
  className = '',
  ...props
}) => {
  const classNames = ['breadcrumbs', className].filter(Boolean).join(' ');

  return (
    <Box
      as="nav"
      className={classNames}
      aria-label="Breadcrumb"
      display="flex"
      align="center"
      gap="xs"
      {...props}
    >
      <ol className="breadcrumbs__list" style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const itemId = `breadcrumb-${index}`;

          return (
            <li key={itemId} className="breadcrumbs__item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {item.href || item.onClick ? (
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={[
                    'breadcrumbs__link',
                    isLast && 'breadcrumbs__link--current',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  <Typography variant="body">{item.label}</Typography>
                </a>
              ) : (
                <span
                  className={[
                    'breadcrumbs__text',
                    isLast && 'breadcrumbs__text--current',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  <Typography variant="body">{item.label}</Typography>
                </span>
              )}
              {!isLast && (
                <span className="breadcrumbs__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </Box>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;

