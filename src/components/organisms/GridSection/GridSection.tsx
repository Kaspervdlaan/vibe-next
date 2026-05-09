import React from 'react';
import { Section, SectionProps } from '../../atoms/Section';
import { Container } from '../../atoms/Container';
import { Box } from '../../atoms/Box';
import { Heading, HeadingProps } from '../../molecules/Heading';
import './_grid-section.scss';

// ============================================================================
// TYPES
// ============================================================================

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6;
type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GridSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Heading props (title, subtitle, eyebrow, etc.) */
  heading?: HeadingProps;
  /** Number of columns (1-6) */
  columns?: GridColumns;
  /** Gap between grid items */
  gap?: GridGap;
  /** Section spacing */
  spacing?: SectionProps['spacing'];
  /** Section background */
  background?: SectionProps['background'];
  /** Container max width */
  containerWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Additional CSS classes */
  className?: string;
  /** Grid items */
  children: React.ReactNode;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const GridSection: React.FC<GridSectionProps> = ({
  heading,
  columns = 1,
  gap = 'md',
  spacing = 'md',
  background = 'none',
  containerWidth = 'lg',
  className = '',
  children,
  ...props
}) => {
  const classNames = [
    'grid-section',
    className,
  ].filter(Boolean).join(' ');

  const gridClassNames = [
    'grid-section__grid',
    `grid-section__grid--columns-${columns}`,
    `grid-section__grid--gap-${gap}`,
    `grid-section__grid--background-${background}`,
  ].filter(Boolean).join(' ');

  return (
    <Section 
      className={classNames} 
      spacing={spacing} 
      background={background}
      {...props}
    >
      <Container maxWidth={containerWidth}>
        <Box display="flex" direction="column" gap="lg">
          {heading && (
            <Heading {...heading} />
          )}
          <div className={gridClassNames}>
            {children}
          </div>
        </Box>
      </Container>
    </Section>
  );
};

GridSection.displayName = 'GridSection';

