import React from 'react';
import { Box } from '../../atoms/Box';
import { Typography } from '../../atoms/Typography';
import './_heading.scss';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingSize = 'sm' | 'md' | 'lg' | 'xl';
type HeadingAlign = 'left' | 'center' | 'right';

export interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main heading text */
  title: string;
  /** Optional subheading/description text */
  subtitle?: string;
  /** HTML heading level for accessibility */
  level?: HeadingLevel;
  /** Visual size (independent of level) */
  size?: HeadingSize;
  /** Text alignment */
  align?: HeadingAlign;
  /** Optional eyebrow/label above the title */
  eyebrow?: string;
  /** Eyebrow color */
  eyebrowColor?: 'primary' | 'secondary' | 'muted';
  /** Additional CSS classes */
  className?: string;
}

const sizeToTitleVariant = {
  sm: 'h3' as const,
  md: 'h2' as const,
  lg: 'h1' as const,
  xl: 'display' as const,
};

const sizeToSubtitleVariant = {
  sm: 'bodySm' as const,
  md: 'body' as const,
  lg: 'body' as const,
  xl: 'body' as const,
};

const sizeToGap = {
  sm: 'xs' as const,
  md: 'sm' as const,
  lg: 'md' as const,
  xl: 'md' as const,
};

export const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  level = 'h2',
  size = 'md',
  align = 'left',
  eyebrow,
  eyebrowColor = 'primary',
  className = '',
  ...props
}) => {
  const classNames = [
    'heading',
    `heading--${size}`,
    `heading--${align}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const eyebrowTone = eyebrowColor === 'muted' ? 'muted' : 'default';

  return (
    <Box
      className={classNames}
      display="flex"
      direction="column"
      gap={sizeToGap[size]}
      {...props}
    >
      {eyebrow && (
        <Typography
          variant="caption"
          tone={eyebrowTone}
          align={align}
          className={`heading__eyebrow heading__eyebrow--${eyebrowColor}`}
        >
          {eyebrow}
        </Typography>
      )}

      <Typography
        as={level}
        variant={sizeToTitleVariant[size]}
        align={align}
        className="heading__title"
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant={sizeToSubtitleVariant[size]}
          tone="muted"
          align={align}
          className="heading__subtitle"
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

Heading.displayName = 'Heading';

export default Heading;

