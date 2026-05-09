import React, { forwardRef, useId } from 'react';
import { Box } from '../Box';
import { Typography } from '../Typography';
import './_radio.scss';

type RadioSize = 'sm' | 'md' | 'lg';
type LabelPosition = 'left' | 'right';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Radio label */
  label?: string;
  /** Helper text below radio */
  helperText?: string;
  /** Size of the radio */
  size?: RadioSize;
  /** Label position */
  labelPosition?: LabelPosition;
  /** Full width radio */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      helperText,
      size = 'md',
      labelPosition = 'right',
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

    const wrapperClassNames = [
      'radio-wrapper',
      fullWidth && 'radio-wrapper--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const radioContainerClassNames = [
      'radio-container',
      `radio-container--${size}`,
      disabled && 'radio-container--disabled',
      labelPosition === 'left' && 'radio-container--label-left',
    ]
      .filter(Boolean)
      .join(' ');

    const radioClassNames = [
      'radio',
      `radio--${size}`,
      disabled && 'radio--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Box className={wrapperClassNames}>
        <Box className={radioContainerClassNames} display="flex" align="center" gap="sm">
          {label && labelPosition === 'left' && (
            <Typography
              as="label"
              variant="body-sm"
              className="radio-label radio-label--left"
              htmlFor={id}
            >
              {label}
            </Typography>
          )}

          <Box className="radio-input-wrapper" position="relative" display="flex" align="center">
            <input
              ref={ref}
              type="radio"
              id={id}
              className={radioClassNames}
              disabled={disabled}
              aria-describedby={helperText ? helperId : undefined}
              data-focus-managed="true"
              {...props}
            />
            <span className="radio-dot" />
          </Box>

          {label && labelPosition === 'right' && (
            <Typography
              as="label"
              variant="body-sm"
              className="radio-label radio-label--right"
              htmlFor={id}
            >
              {label}
            </Typography>
          )}
        </Box>

        {helperText && (
          <Typography
            variant="caption"
            tone="muted"
            className="radio-helper"
            id={helperId}
          >
            {helperText}
          </Typography>
        )}
      </Box>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;

