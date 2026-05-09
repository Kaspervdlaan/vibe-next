import React from 'react';
import { Box } from '../../atoms/Box';
import { Media } from '../../atoms/Media';
import { Typography } from '../../atoms/Typography';
import { Container } from '../../atoms/Container';
import './_media-section.scss';

type MediaSectionLayout = 'media-left' | 'media-right';
type MediaSectionSpacing = 'sm' | 'md' | 'lg' | 'xl';
type MediaSectionBackground = 'none' | 'subtle' | 'dark';

interface MediaSectionMediaImage {
  type: 'image';
  src: string;
  alt: string;
}

interface MediaSectionMediaVideo {
  type: 'video';
  src: string;
  alt: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
}

type MediaSectionMedia = MediaSectionMediaImage | MediaSectionMediaVideo;

export interface MediaSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Media configuration (image or video) */
  media: MediaSectionMedia;
  /** Section eyebrow/label text */
  eyebrow?: string;
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Layout direction */
  layout?: MediaSectionLayout;
  /** Vertical spacing */
  spacing?: MediaSectionSpacing;
  /** Background style */
  background?: MediaSectionBackground;
  /** Optional call-to-action slot */
  actions?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Content to render below title/description */
  children?: React.ReactNode;
}

const spacingToSection = {
  sm: 'sm' as const,
  md: 'md' as const,
  lg: 'lg' as const,
  xl: 'xl' as const,
};

export const MediaSection: React.FC<MediaSectionProps> = ({
  media,
  eyebrow,
  title,
  description,
  layout = 'media-left',
  spacing = 'lg',
  background = 'none',
  actions,
  className = '',
  children,
  ...props
}) => {
  const classNames = [
    'media-section',
    `media-section--${layout}`,
    `media-section--spacing-${spacing}`,
    `media-section--bg-${background}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderMedia = () => {
    if (media.type === 'video') {
      return (
        <Media
          type="video"
          src={media.src}
          alt={media.alt}
          poster={media.poster}
          autoPlay={media.autoPlay}
          loop={media.loop}
          controls={media.controls ?? true}
          aspectRatio="video"
          radius="lg"
        />
      );
    }

    return (
      <Media
        type="image"
        src={media.src}
        alt={media.alt}
        aspectRatio="video"
        radius="lg"
      />
    );
  };

  return (
    <Box
      as="section"
      className={classNames}
      paddingY={spacingToSection[spacing]}
      {...props}
    >
      <Container maxWidth="xl" padding="md">
        <Box
          className="media-section__grid"
          display="flex"
          direction={layout === 'media-right' ? 'row-reverse' : 'row'}
          gap="xl"
          align="center"
        >
          {/* Media Column */}
          <Box className="media-section__media">
            {renderMedia()}
          </Box>

          {/* Content Column */}
          <Box
            className="media-section__content"
            display="flex"
            direction="column"
            gap="md"
          >
            {eyebrow && (
              <Typography
                variant="caption"
                className="media-section__eyebrow"
              >
                {eyebrow}
              </Typography>
            )}

            <Typography
              variant="h1"
              className="media-section__title"
            >
              {title}
            </Typography>

            {description && (
              <Typography
                variant="body"
                tone="muted"
                className="media-section__description"
              >
                {description}
              </Typography>
            )}

            {children && (
              <Box className="media-section__children">
                {children}
              </Box>
            )}

            {actions && (
              <Box
                className="media-section__actions"
                display="flex"
                gap="md"
                align="center"
              >
                {actions}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

MediaSection.displayName = 'MediaSection';

export default MediaSection;

