import React, { forwardRef } from 'react';
import './_button.scss';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Show box shadow (default: true) */
  shadow?: boolean;
  /** Show border (default: true) */
  border?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

type ButtonNativeProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
};

type ButtonAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
};

export type ButtonProps = ButtonBaseProps & (ButtonNativeProps | ButtonAnchorProps);

const Spinner: React.FC<{ size: ButtonSize }> = ({ size }) => {
  const sizeMap = {
    sm: 14,
    md: 18,
    lg: 22,
  };
  const dimension = sizeMap[size];

  return (
    <svg
      className="button__spinner"
      width={dimension}
      height={dimension}
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
  );
};

export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      as = 'button',
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      shadow = true,
      border = true,
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      type = 'button',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const classNames = [
      'button',
      `button--${variant}`,
      `button--${size}`,
      fullWidth && 'button--full-width',
      !shadow && 'button--no-shadow',
      !border && 'button--no-border',
      isLoading && 'button--loading',
      isDisabled && 'button--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {isLoading ? (
          <Spinner size={size} />
        ) : (
          leftIcon && <span className="button__icon button__icon--left">{leftIcon}</span>
        )}
        <span className="button__text">{children}</span>
        {!isLoading && rightIcon && (
          <span className="button__icon button__icon--right">{rightIcon}</span>
        )}
      </>
    );

    if (as === 'a') {
      const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classNames}
          aria-busy={isLoading}
          aria-disabled={isDisabled || undefined}
          data-focus-managed="true"
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classNames}
        disabled={isDisabled}
        aria-busy={isLoading}
        data-focus-managed="true"
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

