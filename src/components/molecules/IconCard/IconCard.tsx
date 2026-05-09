import React from 'react';
import { Box } from '../../atoms/Box';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import './_icon-card.scss';

type IconCardVariant = 'default' | 'outlined' | 'filled';
type IconCardSize = 'sm' | 'md' | 'lg';
type IconCardIconColor = 'primary' | 'secondary' | 'danger' | 'success' | 'neutral';

export interface IconCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The icon to display */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** Card description text */
  description?: string;
  /** Visual variant */
  variant?: IconCardVariant;
  /** Size of the card */
  size?: IconCardSize;
  /** Color theme for the icon */
  iconColor?: IconCardIconColor;
  /** Center align content */
  centered?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const sizeToTypographyVariant = {
  sm: { title: 'body' as const, description: 'bodySm' as const },
  md: { title: 'h3' as const, description: 'bodySm' as const },
  lg: { title: 'h2' as const, description: 'body' as const },
};

const sizeToIconSize = {
  sm: 'md' as const,
  md: 'lg' as const,
  lg: 'xl' as const,
};

const sizeToPadding = {
  sm: 'md' as const,
  md: 'lg' as const,
  lg: 'xl' as const,
};

const sizeToGap = {
  sm: 'sm' as const,
  md: 'md' as const,
  lg: 'lg' as const,
};

export const IconCard: React.FC<IconCardProps> = ({
  icon,
  title,
  description,
  variant = 'default',
  size = 'md',
  iconColor = 'primary',
  centered = false,
  className = '',
  ...props
}) => {
  const classNames = [
    'icon-card',
    `icon-card--${variant}`,
    centered && 'icon-card--centered',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const typographyVariants = sizeToTypographyVariant[size];

  return (
    <Box
      className={classNames}
      display="flex"
      direction={centered ? 'column' : 'row'}
      align={centered ? 'center' : 'start'}
      gap={sizeToGap[size]}
      padding={sizeToPadding[size]}
      radius="lg"
      {...props}
    >
      <Icon
        size={sizeToIconSize[size]}
        color={iconColor}
        variant="filled"
      >
        {icon}
      </Icon>
      <Box
        display="flex"
        direction="column"
        gap="xs"
        align={centered ? 'center' : 'start'}
        className="icon-card__content"
      >
        <Typography
          variant={typographyVariants.title}
          weight="bold"
          className="icon-card__title"
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant={typographyVariants.description}
            tone="muted"
            align={centered ? 'center' : 'left'}
            className="icon-card__description"
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

IconCard.displayName = 'IconCard';

export default IconCard;
