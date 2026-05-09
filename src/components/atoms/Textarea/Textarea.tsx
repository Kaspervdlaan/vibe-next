import React, { forwardRef, useId } from 'react';
import { Box } from '../Box';
import { Typography } from '../Typography';
import './_textarea.scss';

type TextareaSize = 'sm' | 'md' | 'lg';
type TextareaVariant = 'default' | 'filled';
type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Textarea label */
  label?: string;
  /** Helper text below textarea */
  helperText?: string;
  /** Error message (shows error state when provided) */
  error?: string;
  /** Size of the textarea */
  size?: TextareaSize;
  /** Visual variant */
  variant?: TextareaVariant;
  /** Resize behavior */
  resize?: TextareaResize;
  /** Maximum character count */
  maxLength?: number;
  /** Show character count */
  showCharacterCount?: boolean;
  /** Full width textarea */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      variant = 'default',
      resize = 'vertical',
      maxLength,
      showCharacterCount = false,
      fullWidth = false,
      disabled = false,
      className = '',
      id: providedId,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasError = Boolean(error);
    const currentLength =
      typeof value === 'string' ? value.length : typeof defaultValue === 'string' ? defaultValue.length : 0;
    const showCount = showCharacterCount && maxLength !== undefined;

    const wrapperClassNames = [
      'textarea-wrapper',
      fullWidth && 'textarea-wrapper--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const textareaContainerClassNames = [
      'textarea-container',
      `textarea-container--${size}`,
      `textarea-container--${variant}`,
      `textarea-container--resize-${resize}`,
      hasError && 'textarea-container--error',
      disabled && 'textarea-container--disabled',
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
            className="textarea-label"
            htmlFor={id}
          >
            {label}
          </Typography>
        )}

        <div className={textareaContainerClassNames}>
          <textarea
            ref={ref}
            id={id}
            className="textarea-field"
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            maxLength={maxLength}
            data-focus-managed="true"
            value={value}
            defaultValue={defaultValue}
            {...props}
          />
        </div>

        <Box
          className="textarea-footer"
          display="flex"
          align="center"
          justify="space-between"
        >
          <Box>
            {(error || helperText) && (
              <Typography
                variant="caption"
                tone={hasError ? 'danger' : 'muted'}
                className="textarea-helper"
                id={hasError ? errorId : helperId}
                role={hasError ? 'alert' : undefined}
              >
                {error || helperText}
              </Typography>
            )}
          </Box>
          {showCount && (
            <Typography variant="caption" tone="muted" className="textarea-count">
              {currentLength} / {maxLength}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

