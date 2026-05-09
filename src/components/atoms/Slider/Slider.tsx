import React, { forwardRef, useId } from 'react';
import { Box } from '../Box';
import { Typography } from '../Typography';
import './_slider.scss';

type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Slider label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value */
  step?: number;
  /** Show value label */
  showValue?: boolean;
  /** Size */
  size?: SliderSize;
  /** Full width */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      helperText,
      error,
      min = 0,
      max = 100,
      step = 1,
      showValue = false,
      size = 'md',
      fullWidth = false,
      disabled = false,
      className = '',
      id: providedId,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasError = Boolean(error);
    const currentValue = typeof value === 'number' ? value : Number(value) || min;
    const percentage = ((currentValue - min) / (max - min)) * 100;

    const wrapperClassNames = [
      'slider-wrapper',
      fullWidth && 'slider-wrapper--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const sliderClassNames = [
      'slider',
      `slider--${size}`,
      hasError && 'slider--error',
      disabled && 'slider--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Box className={wrapperClassNames}>
        {(label || showValue) && (
          <Box display="flex" align="center" justify="space-between" marginBottom="xs">
            {label && (
              <Typography
                as="label"
                variant="caption"
                weight="semibold"
                className="slider-label"
                htmlFor={id}
              >
                {label}
              </Typography>
            )}
            {showValue && (
              <Typography variant="caption" weight="bold" className="slider-value">
                {currentValue}
              </Typography>
            )}
          </Box>
        )}

        <Box className="slider-container" position="relative" display="flex" align="center">
          <input
            ref={ref}
            type="range"
            id={id}
            className={sliderClassNames}
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            style={{
              '--slider-progress': `${percentage}%`,
            } as React.CSSProperties}
            {...props}
          />
        </Box>

        {(error || helperText) && (
          <Typography
            variant="caption"
            tone={hasError ? 'danger' : 'muted'}
            className="slider-helper"
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

Slider.displayName = 'Slider';

export default Slider;

