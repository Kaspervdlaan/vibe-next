// ============================================================================
// STORYBLOK BUTTON GROUP
// ============================================================================

import React from 'react';
import { storyblokEditable, StoryblokComponent, SbBlokData } from '@storyblok/react';
import { ButtonGroup } from '../../../components/molecules/ButtonGroup';

export interface SbButtonGroupProps {
  blok: {
    _uid: string;
    component: string;
    buttons?: SbBlokData[];
    variant?: 'default' | 'attached';
    size?: 'sm' | 'md' | 'lg';
    direction?: 'row' | 'column';
    gap?: 'none' | 'xs' | 'sm' | 'md';
    full_width?: boolean;
  };
}

export const SbButtonGroup: React.FC<SbButtonGroupProps> = ({ blok }) => {
  return (
    <ButtonGroup
      {...storyblokEditable(blok)}
      variant={blok.variant}
      size={blok.size}
      direction={blok.direction}
      gap={blok.gap}
      fullWidth={blok.full_width}
    >
      {blok.buttons?.map((buttonBlok) => (
        <StoryblokComponent blok={buttonBlok} key={buttonBlok._uid} />
      ))}
    </ButtonGroup>
  );
};

SbButtonGroup.displayName = 'SbButtonGroup';

