import React, { useState } from 'react';
import { Box } from '../../atoms/Box';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import './_alert.scss';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';
type AlertSize = 'sm' | 'md' | 'lg';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alert title */
  title?: string;
  /** Alert message/content */
  children?: React.ReactNode;
  /** Visual variant */
  variant?: AlertVariant;
  /** Size of the alert */
  size?: AlertSize;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const getDefaultIcon = (variant: AlertVariant) => {
  switch (variant) {
    case 'success':
      return <SuccessIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'error':
      return <ErrorIcon />;
    default:
      return <InfoIcon />;
  }
};

export const Alert: React.FC<AlertProps> = ({
  title,
  children,
  variant = 'info',
  size = 'md',
  dismissible = false,
  onDismiss,
  icon,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const classNames = [
    'alert',
    `alert--${variant}`,
    `alert--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const displayIcon = icon !== undefined ? icon : getDefaultIcon(variant);

  return (
    <Box
      className={classNames}
      display="flex"
      gap="md"
      padding="md"
      radius="md"
      role="alert"
      {...props}
    >
      {displayIcon && (
        <Box className="alert__icon" display="flex" align="center" flexShrink={0}>
          {displayIcon}
        </Box>
      )}

      <Box className="alert__content" display="flex" direction="column" gap="xs" flex={1}>
        {title && (
          <Typography variant="caption" weight="bold" className="alert__title">
            {title}
          </Typography>
        )}
        {children && (
          <Typography variant="body" className="alert__message">
            {children}
          </Typography>
        )}
      </Box>

      {dismissible && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="alert__close"
          aria-label="Dismiss alert"
        >
          <CloseIcon />
        </Button>
      )}
    </Box>
  );
};

Alert.displayName = 'Alert';

export default Alert;

