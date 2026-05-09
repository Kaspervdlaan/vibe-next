import React, { forwardRef, useId } from 'react';
import { Box } from '../Box';
import { Typography } from '../Typography';
import './_checkbox.scss';

type CheckboxSize = 'sm' | 'md' | 'lg';
type LabelPosition = 'left' | 'right';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Checkbox label */
  label?: string;
  /** Helper text below checkbox */
  helperText?: string;
  /** Error message (shows error state when provided) */
  error?: string;
  /** Size of the checkbox */
  size?: CheckboxSize;
  /** Label position */
  labelPosition?: LabelPosition;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Full width checkbox */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      labelPosition = 'right',
      indeterminate = false,
      fullWidth = false,
      disabled = false,
      className = '',
      id: providedId,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasError = Boolean(error);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = (ref || inputRef) as React.RefObject<HTMLInputElement>;

    // Handle indeterminate state
    React.useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, combinedRef]);

    const wrapperClassNames = [
      'checkbox-wrapper',
      fullWidth && 'checkbox-wrapper--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const checkboxContainerClassNames = [
      'checkbox-container',
      `checkbox-container--${size}`,
      hasError && 'checkbox-container--error',
      disabled && 'checkbox-container--disabled',
      labelPosition === 'left' && 'checkbox-container--label-left',
    ]
      .filter(Boolean)
      .join(' ');

    const checkboxClassNames = [
      'checkbox',
      `checkbox--${size}`,
      hasError && 'checkbox--error',
      disabled && 'checkbox--disabled',
      indeterminate && 'checkbox--indeterminate',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Box className={wrapperClassNames}>
        <Box className={checkboxContainerClassNames} display="flex" align="center" gap="sm">
          {label && labelPosition === 'left' && (
            <Typography
              as="label"
              variant="body-sm"
              className="checkbox-label checkbox-label--left"
              htmlFor={id}
            >
              {label}
            </Typography>
          )}

          <Box className="checkbox-input-wrapper" position="relative" display="flex" align="center">
            <input
              ref={combinedRef}
              type="checkbox"
              id={id}
              className={checkboxClassNames}
              disabled={disabled}
              checked={checked}
              aria-invalid={hasError}
              aria-describedby={
                hasError ? errorId : helperText ? helperId : undefined
              }
              data-focus-managed="true"
              {...props}
            />
            <span className="checkbox-checkmark">
              {indeterminate ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
          </Box>

          {label && labelPosition === 'right' && (
            <Typography
              as="label"
              variant="body-sm"
              className="checkbox-label checkbox-label--right"
              htmlFor={id}
            >
              {label}
            </Typography>
          )}
        </Box>

        {(error || helperText) && (
          <Typography
            variant="caption"
            tone={hasError ? 'danger' : 'muted'}
            className="checkbox-helper"
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;

