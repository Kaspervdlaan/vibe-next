// ============================================================================
// STORYBLOK MEDIA SECTION
// ============================================================================

import React from 'react';
import { storyblokEditable, StoryblokComponent, SbBlokData } from '@storyblok/react';
import { MediaSection } from '../../../components/organisms/MediaSection';

interface StoryblokAsset {
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype: string;
}

export interface SbMediaSectionProps {
  blok: {
    _uid: string;
    component: string;
    title: string;
    description?: string;
    eyebrow?: string;
    image?: StoryblokAsset;
    video_url?: string;
    video_poster?: StoryblokAsset;
    media_type?: 'image' | 'video';
    layout?: 'media-left' | 'media-right';
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
    background?: 'none' | 'subtle' | 'dark';
    buttons?: SbBlokData[];
  };
}

export const SbMediaSection: React.FC<SbMediaSectionProps> = ({ blok }) => {
  // Determine media configuration
  const isVideo = blok.media_type === 'video' && blok.video_url;
  
  const media = isVideo
    ? {
        type: 'video' as const,
        src: blok.video_url || '',
        alt: blok.title,
        poster: blok.video_poster?.filename,
        controls: true,
      }
    : {
        type: 'image' as const,
        src: blok.image?.filename || '',
        alt: blok.image?.alt || blok.title,
      };

  const actions = blok.buttons && blok.buttons.length > 0 ? (
    <>
      {blok.buttons.map((buttonBlok) => (
        <StoryblokComponent blok={buttonBlok} key={buttonBlok._uid} />
      ))}
    </>
  ) : undefined;

  return (
    <MediaSection
      {...storyblokEditable(blok)}
      media={media}
      title={blok.title}
      description={blok.description}
      eyebrow={blok.eyebrow}
      layout={blok.layout}
      spacing={blok.spacing}
      background={blok.background}
      actions={actions}
    />
  );
};

SbMediaSection.displayName = 'SbMediaSection';

