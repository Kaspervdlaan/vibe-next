import React, { forwardRef, useId } from 'react';
import { Box } from '../Box';
import { Typography } from '../Typography';
import './_switch.scss';

type SwitchSize = 'sm' | 'md' | 'lg';
type LabelPosition = 'left' | 'right';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Switch label */
  label?: string;
  /** Helper text below switch */
  helperText?: string;
  /** Error message (shows error state when provided) */
  error?: string;
  /** Size of the switch */
  size?: SwitchSize;
  /** Label position */
  labelPosition?: LabelPosition;
  /** Full width switch */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      labelPosition = 'right',
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

    const wrapperClassNames = [
      'switch-wrapper',
      fullWidth && 'switch-wrapper--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const switchContainerClassNames = [
      'switch-container',
      `switch-container--${size}`,
      hasError && 'switch-container--error',
      disabled && 'switch-container--disabled',
      labelPosition === 'left' && 'switch-container--label-left',
    ]
      .filter(Boolean)
      .join(' ');

    const switchClassNames = [
      'switch',
      `switch--${size}`,
      hasError && 'switch--error',
      disabled && 'switch--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Box className={wrapperClassNames}>
        <Box className={switchContainerClassNames} display="flex" align="center" gap="sm">
          {label && labelPosition === 'left' && (
            <Typography
              as="label"
              variant="body-sm"
              className="switch-label switch-label--left"
              htmlFor={id}
            >
              {label}
            </Typography>
          )}

          <Box className="switch-input-wrapper" position="relative" display="flex" align="center">
            <input
              ref={ref}
              type="checkbox"
              role="switch"
              id={id}
              className={switchClassNames}
              disabled={disabled}
              checked={checked}
              aria-invalid={hasError}
              aria-describedby={
                hasError ? errorId : helperText ? helperId : undefined
              }
              data-focus-managed="true"
              {...props}
            />
            <span className="switch-track">
              <span className="switch-thumb" />
            </span>
          </Box>

          {label && labelPosition === 'right' && (
            <Typography
              as="label"
              variant="body-sm"
              className="switch-label switch-label--right"
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
            className="switch-helper"
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

Switch.displayName = 'Switch';

export default Switch;

