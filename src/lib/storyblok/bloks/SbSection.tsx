// ============================================================================
// STORYBLOK SECTION WRAPPER
// ============================================================================
// Generic section that renders nested children

import React from 'react';
import { storyblokEditable, StoryblokComponent, SbBlokData } from '@storyblok/react';
import { Section } from '../../../components/atoms/Section';

export interface SbSectionProps {
  blok: {
    _uid: string;
    component: string;
    children?: SbBlokData[];
    background?: 'none' | 'subtle' | 'primary' | 'dark' | 'secondary';
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
  };
}

export const SbSection: React.FC<SbSectionProps> = ({ blok }) => {
  return (
    <Section
      {...storyblokEditable(blok)}
      background={blok.background}
      spacing={blok.spacing || 'md'}
    >
      {blok.children?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </Section>
  );
};

SbSection.displayName = 'SbSection';

