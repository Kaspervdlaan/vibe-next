import React from 'react';
import { Box } from '../Box';
import './_divider.scss';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'solid' | 'dashed' | 'dotted';
type DividerWeight = 'thin' | 'medium' | 'thick';
type DividerSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type DividerColor = 'default' | 'muted' | 'primary' | 'secondary';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  weight?: DividerWeight;
  spacing?: DividerSpacing;
  color?: DividerColor;
  label?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  weight = 'medium',
  spacing = 'md',
  color = 'default',
  label,
  className = '',
  ...props
}) => {
  const classNames = [
    'divider',
    `divider--${orientation}`,
    `divider--${variant}`,
    `divider--${weight}`,
    `divider--spacing-${spacing}`,
    `divider--${color}`,
    label && 'divider--with-label',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (label && orientation === 'horizontal') {
    return (
      <Box
        className={classNames}
        display="flex"
        align="center"
        gap="md"
        role="separator"
        aria-orientation={orientation}
        {...props}
      >
        <span className="divider__line" />
        <span className="divider__label">{label}</span>
        <span className="divider__line" />
      </Box>
    );
  }

  return (
    <Box
      className={classNames}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
};

Divider.displayName = 'Divider';

export default Divider;

