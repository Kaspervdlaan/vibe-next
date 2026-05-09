import React from 'react';
import { Box } from '../../atoms/Box';
import { Container } from '../../atoms/Container';
import { Heading } from '../../molecules/Heading';
import './_heading-section.scss';

type HeadingSectionSpacing = 'sm' | 'md' | 'lg' | 'xl';
type HeadingSectionBackground = 'none' | 'subtle' | 'dark' | 'primary' | 'secondary';
type HeadingSectionSize = 'sm' | 'md' | 'lg' | 'xl';
type HeadingSectionAlign = 'left' | 'center' | 'right';
type HeadingSectionWidth = 'sm' | 'md' | 'lg' | 'xl';

export interface HeadingSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Main heading text */
  title: string;
  /** Optional subheading/description */
  subtitle?: string;
  /** Optional eyebrow/label above title */
  eyebrow?: string;
  /** Heading size */
  size?: HeadingSectionSize;
  /** Text alignment */
  align?: HeadingSectionAlign;
  /** Vertical spacing */
  spacing?: HeadingSectionSpacing;
  /** Background style */
  background?: HeadingSectionBackground;
  /** Maximum width of content */
  maxWidth?: HeadingSectionWidth;
  /** Optional call-to-action buttons */
  actions?: React.ReactNode;
  /** Additional content below heading */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

const backgroundToEyebrowColor = {
  none: 'primary' as const,
  subtle: 'primary' as const,
  dark: 'primary' as const,
  primary: 'muted' as const,
  secondary: 'muted' as const,
};

export const HeadingSection: React.FC<HeadingSectionProps> = ({
  title,
  subtitle,
  eyebrow,
  size = 'lg',
  align = 'center',
  spacing = 'lg',
  background = 'none',
  maxWidth = 'lg',
  actions,
  children,
  className = '',
  ...props
}) => {
  const classNames = [
    'heading-section',
    `heading-section--spacing-${spacing}`,
    `heading-section--bg-${background}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Box
      as="section"
      className={classNames}
      {...props}
    >
      <Container maxWidth={maxWidth} padding="md">
        <Box
          className="heading-section__content"
          display="flex"
          direction="column"
          align={align === 'left' ? 'start' : align === 'right' ? 'end' : 'center'}
          gap="lg"
        >
          <Heading
            title={title}
            subtitle={subtitle}
            eyebrow={eyebrow}
            eyebrowColor={backgroundToEyebrowColor[background]}
            size={size}
            align={align}
            className="heading-section__heading"
          />

          {actions && (
            <Box
              className="heading-section__actions"
              display="flex"
              gap="md"
              align="center"
              justify={align}
            >
              {actions}
            </Box>
          )}

          {children && (
            <Box className="heading-section__children">
              {children}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

HeadingSection.displayName = 'HeadingSection';

export default HeadingSection;

