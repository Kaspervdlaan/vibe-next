// ============================================================================
// STORYBLOK HEADING SECTION
// ============================================================================

import React from 'react';
import { storyblokEditable, StoryblokComponent, SbBlokData } from '@storyblok/react';
import { HeadingSection } from '../../../components/organisms/HeadingSection';

export interface SbHeadingSectionProps {
  blok: {
    _uid: string;
    component: string;
    title: string;
    subtitle?: string;
    eyebrow?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    align?: 'left' | 'center' | 'right';
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
    background?: 'none' | 'subtle' | 'dark' | 'primary' | 'secondary';
    max_width?: 'sm' | 'md' | 'lg' | 'xl';
    buttons?: SbBlokData[];
  };
}

export const SbHeadingSection: React.FC<SbHeadingSectionProps> = ({ blok }) => {
  const actions = blok.buttons && blok.buttons.length > 0 ? (
    <>
      {blok.buttons.map((buttonBlok) => (
        <StoryblokComponent blok={buttonBlok} key={buttonBlok._uid} />
      ))}
    </>
  ) : undefined;

  return (
    <HeadingSection
      {...storyblokEditable(blok)}
      title={blok.title}
      subtitle={blok.subtitle}
      eyebrow={blok.eyebrow}
      size={blok.size}
      align={blok.align}
      spacing={blok.spacing}
      background={blok.background}
      maxWidth={blok.max_width}
      actions={actions}
    />
  );
};

SbHeadingSection.displayName = 'SbHeadingSection';

