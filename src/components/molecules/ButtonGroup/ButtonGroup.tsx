import React from 'react';
import { Stack } from '../../atoms/Stack';
import './_button-group.scss';

// ============================================================================
// TYPES
// ============================================================================

type ButtonGroupVariant = 'default' | 'attached';
type ButtonGroupSize = 'sm' | 'md' | 'lg';
type ButtonGroupDirection = 'row' | 'column';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: ButtonGroupVariant;
  /** Size of buttons (passed via context or className) */
  size?: ButtonGroupSize;
  /** Direction of the button group */
  direction?: ButtonGroupDirection;
  /** Gap between buttons (only applies to 'default' variant) */
  gap?: 'none' | 'xs' | 'sm' | 'md';
  /** Whether buttons should take full width */
  fullWidth?: boolean;
  /** Disable all buttons in the group */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Button children */
  children: React.ReactNode;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  variant = 'default',
  size = 'md',
  direction = 'row',
  gap = 'sm',
  fullWidth = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const classNames = [
    'button-group',
    `button-group--variant-${variant}`,
    `button-group--size-${size}`,
    `button-group--direction-${direction}`,
    fullWidth && 'button-group--full-width',
    disabled && 'button-group--disabled',
    className,
  ].filter(Boolean).join(' ');

  // For attached variant, we don't use gap
  const stackGap = variant === 'attached' ? 'none' : gap;

  return (
    <Stack
      direction={direction}
      gap={stackGap}
      align={direction === 'row' ? 'center' : 'stretch'}
      className={classNames}
      role="group"
      {...props}
    >
      {children}
    </Stack>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

