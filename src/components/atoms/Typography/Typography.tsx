import React, { forwardRef } from 'react';
import './_typography.scss';

type TypographyVariant = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'bodySm' | 'body-sm' | 'caption';
type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TypographyAlign = 'left' | 'center' | 'right';
type TypographyTone = 'default' | 'muted' | 'danger' | 'success';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** The HTML element to render */
  as?: keyof React.JSX.IntrinsicElements;
  /** Typography variant determining size and style */
  variant?: TypographyVariant;
  /** Font weight */
  weight?: TypographyWeight;
  /** Text alignment */
  align?: TypographyAlign;
  /** Color tone */
  tone?: TypographyTone;
  /** Additional CSS classes */
  className?: string;
  /** Label target when rendering as a label element */
  htmlFor?: string;
  /** Content to render */
  children?: React.ReactNode;
}

const defaultElementMap: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  bodySm: 'p',
  'body-sm': 'p',
  caption: 'span',
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      as,
      variant = 'body',
      weight,
      align,
      tone = 'default',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const Element = as || defaultElementMap[variant];

    const classNames = [
      'typography',
      `typography--${variant}`,
      weight && `typography--weight-${weight}`,
      align && `typography--align-${align}`,
      tone !== 'default' && `typography--tone-${tone}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return React.createElement(
      Element,
      {
        ref,
        className: classNames,
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;

