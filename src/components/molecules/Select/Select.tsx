import React, { useState, useRef, useEffect, useId } from 'react';
import { Box } from '../../atoms/Box';
import { Typography } from '../../atoms/Typography';
import './_select.scss';

type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Select label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Options */
  options: SelectOption[];
  /** Selected value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Size */
  size?: SelectSize;
  /** Disabled state */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const Select: React.FC<SelectProps> = ({
  label,
  helperText,
  error,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select an option...',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
  const [open, setOpen] = useState(false);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const selectedOption = options.find((opt) => opt.value === currentValue);

  const listboxRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open || !listboxRef.current) return;

    const listbox = listboxRef.current;
    const items = Array.from(listbox.querySelectorAll('.select-option:not(.select-option--disabled)')) as HTMLElement[];
    let focusedIndex = items.findIndex((item) => item === document.activeElement);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusedIndex = (focusedIndex + 1) % items.length;
        items[focusedIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusedIndex = focusedIndex <= 0 ? items.length - 1 : focusedIndex - 1;
        items[focusedIndex]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        focusedIndex = 0;
        items[focusedIndex]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        focusedIndex = items.length - 1;
        items[focusedIndex]?.focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const focusedItem = items[focusedIndex];
        if (focusedItem) {
          const value = focusedItem.getAttribute('data-value');
          if (value) {
            handleOptionSelect(value);
          }
        }
      }
    };

    listbox.addEventListener('keydown', handleKeyDown);
    return () => {
      listbox.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, options]);

  // Scroll to selected option when opening
  useEffect(() => {
    if (open && listboxRef.current && currentValue) {
      const selectedElement = listboxRef.current.querySelector(`[data-value="${currentValue}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [open, currentValue]);

  const handleOptionSelect = (value: string) => {
    if (!isControlled) {
      setUncontrolledValue(value);
    }
    onChange?.(value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const selectId = useId();
  const helperId = `${selectId}-helper`;
  const errorId = `${selectId}-error`;
  const hasError = Boolean(error);

  const wrapperClassNames = [
    'select-wrapper',
    fullWidth && 'select-wrapper--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const buttonClassNames = [
    'select-button',
    `select-button--${size}`,
    hasError && 'select-button--error',
    disabled && 'select-button--disabled',
    open && 'select-button--open',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Box className={wrapperClassNames} {...props}>
      {label && (
        <Typography
          as="label"
          variant="caption"
          weight="semibold"
          className="select-label"
          htmlFor={selectId}
        >
          {label}
        </Typography>
      )}

      <Box ref={containerRef} className="select-container" position="relative">
        <button
          ref={buttonRef}
          id={selectId}
          className={buttonClassNames}
          disabled={disabled}
          aria-invalid={hasError}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          onClick={() => !disabled && setOpen(!open)}
        >
          <span className="select-button__text">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="select-button__icon">
            <ChevronDownIcon />
          </span>
        </button>

        {open && (
          <ul
            ref={listboxRef}
            className="select-listbox"
            role="listbox"
            aria-labelledby={label ? selectId : undefined}
          >
            {options.map((option) => {
              const isSelected = option.value === currentValue;
              const isDisabled = option.disabled || disabled;

              return (
                <li
                  key={option.value}
                  className={[
                    'select-option',
                    isSelected && 'select-option--selected',
                    isDisabled && 'select-option--disabled',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="option"
                  aria-selected={isSelected}
                  data-value={option.value}
                  data-selected={isSelected}
                  tabIndex={isDisabled ? -1 : 0}
                  onClick={() => !isDisabled && handleOptionSelect(option.value)}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        )}
      </Box>

      {(error || helperText) && (
        <Typography
          variant="caption"
          tone={hasError ? 'danger' : 'muted'}
          className="select-helper"
          id={hasError ? errorId : helperId}
          role={hasError ? 'alert' : undefined}
        >
          {error || helperText}
        </Typography>
      )}
    </Box>
  );
};

Select.displayName = 'Select';

export default Select;
