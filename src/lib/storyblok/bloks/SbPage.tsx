// ============================================================================
// STORYBLOK PAGE WRAPPER
// ============================================================================

import React from 'react';
import { storyblokEditable, StoryblokComponent, SbBlokData } from '@storyblok/react';

export interface SbPageProps {
  blok: {
    _uid: string;
    component: string;
    body?: SbBlokData[];
  };
}

export const SbPage: React.FC<SbPageProps> = ({ blok }) => {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

SbPage.displayName = 'SbPage';

