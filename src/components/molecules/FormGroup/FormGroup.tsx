import React from 'react';
import { Box } from '../../atoms/Box';
import { Typography } from '../../atoms/Typography';
import './_form-group.scss';

export interface FormGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  /** Group legend/label */
  legend?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Form fields */
  children?: React.ReactNode;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  legend,
  helperText,
  error,
  className = '',
  children,
  ...props
}) => {
  const hasError = Boolean(error);
  const classNames = [
    'form-group',
    hasError && 'form-group--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Box as="fieldset" className={classNames} display="flex" direction="column" gap="md" {...props}>
      {legend && (
        <Typography as="legend" variant="caption" weight="semibold" className="form-group__legend">
          {legend}
        </Typography>
      )}

      <Box className="form-group__fields" display="flex" direction="column" gap="md">
        {children}
      </Box>

      {(error || helperText) && (
        <Typography
          variant="caption"
          tone={hasError ? 'danger' : 'muted'}
          className="form-group__helper"
          role={hasError ? 'alert' : undefined}
        >
          {error || helperText}
        </Typography>
      )}
    </Box>
  );
};

FormGroup.displayName = 'FormGroup';

export default FormGroup;

