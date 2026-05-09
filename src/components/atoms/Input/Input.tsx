import React, { forwardRef, useId } from 'react';
import { Box } from '../Box';
import { Typography } from '../Typography';
import './_input.scss';

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'default' | 'filled';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message (shows error state when provided) */
  error?: string;
  /** Size of the input */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Icon on the left side */
  leftIcon?: React.ReactNode;
  /** Icon on the right side */
  rightIcon?: React.ReactNode;
  /** Full width input */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      variant = 'default',
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      className = '',
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasError = Boolean(error);

    const wrapperClassNames = [
      'input-wrapper',
      fullWidth && 'input-wrapper--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputContainerClassNames = [
      'input-container',
      `input-container--${size}`,
      `input-container--${variant}`,
      hasError && 'input-container--error',
      disabled && 'input-container--disabled',
      leftIcon && 'input-container--has-left-icon',
      rightIcon && 'input-container--has-right-icon',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Box className={wrapperClassNames}>
        {label && (
          <Typography
            as="label"
            variant="caption"
            weight="semibold"
            className="input-label"
            htmlFor={id}
          >
            {label}
          </Typography>
        )}

        <div className={inputContainerClassNames}>
          {leftIcon && (
            <span className="input-icon input-icon--left">{leftIcon}</span>
          )}

          <input
            ref={ref}
            id={id}
            className="input-field"
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            data-focus-managed="true"
            {...props}
          />

          {rightIcon && (
            <span className="input-icon input-icon--right">{rightIcon}</span>
          )}
        </div>

        {(error || helperText) && (
          <Typography
            variant="caption"
            tone={hasError ? 'danger' : 'muted'}
            className="input-helper"
            id={hasError ? errorId : helperId}
            role={hasError ? 'alert' : undefined}
          >
            {error || helperText}
          </Typography>
        )}
      </Box>
    );
  }
);

Input.displayName = 'Input';

export default Input;

