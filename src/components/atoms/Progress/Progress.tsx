import React from 'react';
import { Box } from '../Box';
import { Typography } from '../Typography';
import './_progress.scss';

type ProgressVariant = 'linear' | 'circular';
type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value?: number;
  /** Show indeterminate progress */
  indeterminate?: boolean;
  /** Variant */
  variant?: ProgressVariant;
  /** Size */
  size?: ProgressSize;
  /** Show label with percentage */
  showLabel?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  indeterminate = false,
  variant = 'linear',
  size = 'md',
  showLabel = false,
  className = '',
  ...props
}) => {
  const classNames = [
    'progress',
    `progress--${variant}`,
    `progress--${size}`,
    indeterminate && 'progress--indeterminate',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const clampedValue = Math.min(100, Math.max(0, value));

  if (variant === 'circular') {
    const radius = size === 'sm' ? 20 : size === 'md' ? 30 : 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clampedValue / 100) * circumference;

    return (
      <Box className={classNames} display="flex" align="center" justify="center" position="relative" {...props}>
        <svg className="progress__svg" viewBox="0 0 100 100">
          <circle
            className="progress__circle-bg"
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="6"
          />
          {!indeterminate && (
            <circle
              className="progress__circle"
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
            />
          )}
        </svg>
        {showLabel && !indeterminate && (
          <Box className="progress__label" position="absolute">
            <Typography variant="caption" weight="bold">
              {Math.round(clampedValue)}%
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box className={classNames} display="flex" direction="column" gap="xs" {...props}>
      {showLabel && !indeterminate && (
        <Box display="flex" align="center" justify="space-between">
          <Typography variant="caption">Progress</Typography>
          <Typography variant="caption" weight="bold">
            {Math.round(clampedValue)}%
          </Typography>
        </Box>
      )}
      <Box className="progress__track">
        <Box
          className="progress__bar"
          style={!indeterminate ? { width: `${clampedValue}%` } : undefined}
        />
      </Box>
    </Box>
  );
};

Progress.displayName = 'Progress';

export default Progress;

