import React from 'react';
import { Box } from '../Box';
import './_media.scss';

type MediaAspectRatio = 'auto' | 'square' | 'video' | 'wide' | 'portrait';
type MediaFit = 'cover' | 'contain' | 'fill' | 'none';
type MediaRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface MediaBaseProps {
  aspectRatio?: MediaAspectRatio;
  fit?: MediaFit;
  radius?: MediaRadius;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

interface MediaImageProps extends MediaBaseProps {
  type: 'image';
  src: string;
}

interface MediaVideoProps extends MediaBaseProps {
  type: 'video';
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
}

export type MediaProps = MediaImageProps | MediaVideoProps;

export const Media: React.FC<MediaProps> = (props) => {
  const {
    type,
    src,
    alt,
    aspectRatio = 'auto',
    fit = 'cover',
    radius = 'md',
    width,
    height,
    className = '',
    ...rest
  } = props;

  const classNames = [
    'media',
    `media--aspect-${aspectRatio}`,
    `media--fit-${fit}`,
    `media--radius-${radius}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (type === 'video') {
    const {
      poster,
      autoPlay = false,
      loop = false,
      controls = true,
      muted = autoPlay,
    } = rest as Omit<MediaVideoProps, keyof MediaBaseProps | 'type' | 'src'>;

    return (
      <Box className={classNames} radius={radius}>
        <video
          className="media__video"
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          controls={controls}
          muted={muted}
          playsInline
          aria-label={alt}
          width={width}
          height={height}
        >
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      </Box>
    );
  }

  return (
    <Box className={classNames} radius={radius}>
      <img
        className="media__image"
        src={src}
        alt={alt}
        loading="lazy"
        width={width}
        height={height}
      />
    </Box>
  );
};

Media.displayName = 'Media';

export default Media;

