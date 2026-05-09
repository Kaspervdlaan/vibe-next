// ============================================================================
// STORYBLOK CONTAINER SECTION
// ============================================================================

import React from 'react';
import { storyblokEditable, StoryblokComponent, SbBlokData } from '@storyblok/react';
import { ContainerSection } from '../../../components/organisms/ContainerSection';

export interface SbContainerSectionProps {
  blok: {
    _uid: string;
    component: string;
    // Section settings
    align?: 'left' | 'center' | 'right';
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
    section_background?: 'none' | 'subtle' | 'primary' | 'dark' | 'secondary';
    // Container settings
    container_background?: 'none' | 'subtle' | 'primary';
    container_max_width?: 'sm' | 'md' | 'lg' | 'xl' ;
    container_padding?: 'none' | 'sm' | 'md' | 'lg';
    // Additional content
    body?: SbBlokData[];
  };
}

export const SbContainerSection: React.FC<SbContainerSectionProps> = ({ blok }) => {
  return (
    <ContainerSection
      {...storyblokEditable(blok)}
      align={blok.align}
      spacing={blok.spacing}
      sectionBackground={blok.section_background}
      containerBackground={blok.container_background}
      containerMaxWidth={blok.container_max_width}
      containerPadding={blok.container_padding}
    >
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </ContainerSection>
  );
};

SbContainerSection.displayName = 'SbContainerSection';

