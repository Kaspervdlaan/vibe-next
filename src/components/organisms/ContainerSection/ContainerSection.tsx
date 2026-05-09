import React from 'react';
import { Section, SectionProps } from '../../atoms/Section';
import { Container, ContainerProps } from '../../atoms/Container';
import './_container-section.scss';

// ============================================================================
// TYPES
// ============================================================================

type ContainerSectionAlign = 'left' | 'center' | 'right';

export interface ContainerSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  align?: ContainerSectionAlign;
  spacing?: SectionProps['spacing'];
  sectionSpacing?: SectionProps['spacing'];
  containerBackground?: ContainerProps['background'];
  containerMaxWidth?: ContainerProps['maxWidth'];
  sectionBackground?: SectionProps['background'];
  containerPadding?: ContainerProps['padding'];
  children?: React.ReactNode;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ContainerSection: React.FC<ContainerSectionProps> = ({
  align = 'center',
  spacing,
  sectionSpacing = 'md',
  containerBackground = 'none',
  sectionBackground = 'none',
  containerPadding = 'md',
  containerMaxWidth = 'lg',
  children,
  className = '',
  ...props
}) => {
  const classNames = [
    'container-section',
    `container-section--align-${align}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Section
      className={classNames}
      spacing={spacing ?? sectionSpacing}
      background={sectionBackground}
      {...props}
    >
      <Container background={containerBackground} maxWidth={containerMaxWidth} padding={containerPadding}>
        {children}
      </Container>
    </Section>
  );
};

ContainerSection.displayName = 'ContainerSection';

