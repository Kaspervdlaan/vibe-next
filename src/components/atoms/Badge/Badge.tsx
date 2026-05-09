import React from 'react';
import { Box } from '../Box';
import './_badge.scss';

type BadgeVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge content */
  children?: React.ReactNode;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Show as dot only (no text) */
  dot?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const classNames = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    dot && 'badge--dot',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Box
      as="span"
      className={classNames}
      display="inline-flex"
      align="center"
      justify="center"
      {...props}
    >
      {!dot && children}
    </Box>
  );
};

Badge.displayName = 'Badge';

export default Badge;

