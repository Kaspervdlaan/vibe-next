import React, { useId } from 'react';
import { Box } from '../../atoms/Box';
import { Typography } from '../../atoms/Typography';
import { Radio } from '../../atoms/Radio';
import './_radio-group.scss';

type RadioGroupOrientation = 'horizontal' | 'vertical';
type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioOption {
  value: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Group name (for radio grouping) */
  name: string;
  /** Selected value */
  value?: string;
  /** Default selected value */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Radio options */
  options: RadioOption[];
  /** Group label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Orientation */
  orientation?: RadioGroupOrientation;
  /** Size of radio buttons */
  size?: RadioSize;
  /** Additional CSS classes */
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue,
  onChange,
  options,
  label,
  helperText,
  error,
  orientation = 'vertical',
  size = 'md',
  className = '',
  ...props
}) => {
  const groupId = useId();
  const helperId = `${groupId}-helper`;
  const errorId = `${groupId}-error`;
  const hasError = Boolean(error);

  const classNames = [
    'radio-group',
    `radio-group--${orientation}`,
    hasError && 'radio-group--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleChange = (optionValue: string) => {
    onChange?.(optionValue);
  };

  return (
    <Box className={classNames} display="flex" direction="column" gap="sm">
      {label && (
        <Typography
          variant="caption"
          weight="semibold"
          className="radio-group__label"
        >
          {label}
        </Typography>
      )}

      <Box
        className="radio-group__options"
        display="flex"
        direction={orientation === 'horizontal' ? 'row' : 'column'}
        gap={orientation === 'horizontal' ? 'md' : 'sm'}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
      >
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          const isChecked = value !== undefined
            ? value === option.value
            : defaultValue === option.value;

          return (
            <Radio
              key={option.value}
              id={optionId}
              name={name}
              label={option.label}
              helperText={option.helperText}
              size={size}
              checked={isChecked}
              disabled={option.disabled}
              onChange={() => handleChange(option.value)}
            />
          );
        })}
      </Box>

      {(error || helperText) && (
        <Typography
          variant="caption"
          tone={hasError ? 'danger' : 'muted'}
          className="radio-group__helper"
          id={hasError ? errorId : helperId}
          role={hasError ? 'alert' : undefined}
        >
          {error || helperText}
        </Typography>
      )}
    </Box>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;

