// ============================================================================
// STORYBLOK CONTAINER WRAPPER
// ============================================================================
// Generic container that renders nested children

import React from 'react';
import { storyblokEditable, StoryblokComponent, SbBlokData } from '@storyblok/react';
import { Container } from '../../../components/atoms/Container';

export interface SbContainerProps {
  blok: {
    _uid: string;
    component: string;
    children?: SbBlokData[];
    max_width?: 'sm' | 'md' | 'lg' | 'xl';
    background?: 'none' | 'subtle' | 'primary';
    padding?: 'none' | 'sm' | 'md' | 'lg';
  };
}

export const SbContainer: React.FC<SbContainerProps> = ({ blok }) => {
  return (
    <Container
      {...storyblokEditable(blok)}
      maxWidth={blok.max_width}
      padding={blok.padding}
      background={blok.background}
    >
      {blok.children?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </Container>
  );
};

SbContainer.displayName = 'SbContainer';

