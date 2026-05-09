import React from 'react';
import './_section.scss';

type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl';
type SectionBackground = 'none' | 'subtle' | 'primary' | 'dark' | 'secondary';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical spacing (padding top/bottom) */
  spacing?: SectionSpacing;
  /** Background style */
  background?: SectionBackground;
  /** Additional CSS classes */
  className?: string;
  /** Section content */
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  spacing = 'md',
  background = 'none',
  className = '',
  children,
  ...props
}) => {
  const classNames = [
    'section',
    `section--spacing-${spacing}`,
    `section--bg-${background}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classNames} {...props}>
      {children}
    </section>
  );
};

Section.displayName = 'Section';

export default Section;

