import React from 'react';
import { Box } from '../Box';
import './_icon.scss';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconColor = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'neutral' | 'dark';
type IconVariant = 'filled' | 'outlined' | 'ghost';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The icon element (SVG or emoji) */
  children: React.ReactNode;
  /** Size of the icon container */
  size?: IconSize;
  /** Color theme */
  color?: IconColor;
  /** Visual variant */
  variant?: IconVariant;
  /** Additional CSS classes */
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  children,
  size = 'md',
  color = 'primary',
  variant = 'filled',
  className = '',
  ...props
}) => {
  const classNames = [
    'icon',
    `icon--${size}`,
    `icon--${color}`,
    `icon--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Box
      className={classNames}
      display="flex"
      align="center"
      justify="center"
      radius="md"
      {...props}
    >
      {children}
    </Box>
  );
};

Icon.displayName = 'Icon';

export default Icon;

