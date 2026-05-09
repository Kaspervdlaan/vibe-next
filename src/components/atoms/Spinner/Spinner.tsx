import React from 'react';
import { Box } from '../Box';
import './_spinner.scss';

type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Additional CSS classes */
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className = '',
  ...props
}) => {
  const classNames = [
    'spinner',
    `spinner--${size}`,
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
      {...props}
      aria-label="Loading"
      role="status"
    >
      <svg
        className="spinner__svg"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.25"
        />
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;

