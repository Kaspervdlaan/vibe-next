import React from 'react';
import { Box } from '../../atoms/Box';
import { Typography } from '../../atoms/Typography';
import { Media } from '../../atoms/Media';
import { Icon } from '../../atoms/Icon';
import './_quote.scss';

type QuoteVariant = 'default' | 'elevated' | 'minimal';
type QuoteSize = 'sm' | 'md' | 'lg';
type QuoteLayout = 'horizontal' | 'vertical';

export interface QuoteProps extends React.HTMLAttributes<HTMLElement> {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  authorIcon?: React.ReactNode;
  variant?: QuoteVariant;
  size?: QuoteSize;
  layout?: QuoteLayout;
  className?: string;
}

export const Quote: React.FC<QuoteProps> = ({
  quote,
  author,
  role,
  avatar,
  authorIcon,
  variant = 'default',
  size = 'md',
  layout = 'vertical',
  className = '',
  ...props
}) => {
  const classNames = [
    'quote',
    `quote--${variant}`,
    `quote--${size}`,
    `quote--${layout}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const avatarSizes = {
    sm: 48,
    md: 64,
    lg: 80,
  };
  
  return (
    <blockquote className={classNames} {...props}>
      <Box
        display="flex"
        direction={layout === 'vertical' ? 'column' : 'row'}
        gap={layout === 'vertical' ? 'lg' : 'xl'}
        align={layout === 'vertical' ? 'center' : 'start'}
      >
        {/* Avatar */}
        {avatar && (
          <Box className="quote__avatar">
            <Media
              type="image"
              src={avatar}
              alt={`${author}'s avatar`}
              aspectRatio="square"
              radius="full"
              width={avatarSizes[size]}
              height={avatarSizes[size]}
            />
          </Box>
        )}

        {/* Content */}
        <Box
          display="flex"
          direction="column"
          gap="md"
          align={layout === 'vertical' ? 'center' : 'start'}
          style={{ flex: 1 }}
        >
          {/* Quote Text */}
          <Typography
            variant={size === 'lg' ? 'h2' : size === 'sm' ? 'body' : 'h3'}
            weight="medium"
            align={layout === 'vertical' ? 'center' : 'left'}
            className="quote__text"
          >
            "{quote}"
          </Typography>

          {/* Author Section */}
          <Box
            display="flex"
            align="center"
            gap="sm"
            className="quote__author"
          >
            {authorIcon && (
              <Icon size="xs" color="primary" variant="ghost">
                {authorIcon}
              </Icon>
            )}
            <Box display="flex" direction="column" gap="none">
              <Typography variant="bodySm" weight="bold">
                {author}
              </Typography>
              {role && (
                <Typography variant="caption" tone="muted">
                  {role}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </blockquote>
  );
};

Quote.displayName = 'Quote';

export default Quote;

