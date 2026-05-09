import React from 'react';
import './_stack.scss';

// ============================================================================
// TYPES
// ============================================================================

type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type StackWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

type StackElement = 'div' | 'section' | 'article' | 'aside' | 'nav' | 'header' | 'footer' | 'main' | 'ul' | 'ol' | 'li' | 'span';

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /** The HTML element to render as */
  as?: StackElement;
  /** Stack direction */
  direction?: StackDirection;
  /** Align items along the cross axis */
  align?: StackAlign;
  /** Justify content along the main axis */
  justify?: StackJustify;
  /** Gap between items */
  gap?: StackSpacing;
  /** Whether items should wrap */
  wrap?: StackWrap;
  /** Whether to use inline-flex instead of flex */
  inline?: boolean;
  /** Divider element to place between children */
  divider?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Stack children */
  children?: React.ReactNode;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Stack: React.FC<StackProps> = ({
  as: Element = 'div',
  direction = 'column',
  align,
  justify,
  gap = 'md',
  wrap = 'nowrap',
  inline = false,
  divider,
  className = '',
  children,
  ...props
}) => {
  const classNames = [
    'stack',
    `stack--direction-${direction}`,
    `stack--gap-${gap}`,
    `stack--wrap-${wrap}`,
    align && `stack--align-${align}`,
    justify && `stack--justify-${justify}`,
    inline && 'stack--inline',
    className,
  ].filter(Boolean).join(' ');

  // If divider is provided, interleave it between children
  const childArray = React.Children.toArray(children).filter(Boolean);
  
  const content = divider && childArray.length > 1
    ? childArray.reduce<React.ReactNode[]>((acc, child, index) => {
        if (index === 0) {
          return [child];
        }
        return [
          ...acc,
          <span key={`divider-${index}`} className="stack__divider" aria-hidden="true">
            {divider}
          </span>,
          child,
        ];
      }, [])
    : children;

  return (
    <Element className={classNames} {...props}>
      {content}
    </Element>
  );
};

Stack.displayName = 'Stack';

