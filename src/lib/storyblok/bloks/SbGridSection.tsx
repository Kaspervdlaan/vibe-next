// ============================================================================
// STORYBLOK GRID SECTION
// ============================================================================

import React from 'react';
import { storyblokEditable, StoryblokComponent, SbBlokData } from '@storyblok/react';
import { GridSection } from '../../../components/organisms/GridSection';

export interface SbGridSectionProps {
  blok: {
    _uid: string;
    component: string;
    // Heading fields
    title?: string;
    subtitle?: string;
    eyebrow?: string;
    heading_size?: 'sm' | 'md' | 'lg' | 'xl';
    heading_align?: 'left' | 'center' | 'right';
    // Grid settings
    columns?: '1' | '2' | '3' | '4' | '5' | '6';
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    // Section settings
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
    background?: 'none' | 'subtle' | 'primary' | 'dark' | 'secondary';
    container_width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    // Grid items
    items?: SbBlokData[];
  };
}

export const SbGridSection: React.FC<SbGridSectionProps> = ({ blok }) => {
  // Build heading props if title is provided
  const heading = blok.title
    ? {
        title: blok.title,
        subtitle: blok.subtitle,
        eyebrow: blok.eyebrow,
        size: blok.heading_size,
        align: blok.heading_align,
      }
    : undefined;

  // Parse columns as number
  const columns = blok.columns ? (parseInt(blok.columns, 10) as 1 | 2 | 3 | 4 | 5 | 6) : 1;

  return (
    <GridSection
      {...storyblokEditable(blok)}
      heading={heading}
      columns={columns}
      gap={blok.gap}
      spacing={blok.spacing}
      background={blok.background}
      containerWidth={blok.container_width}
    >
      {blok.items?.map((itemBlok) => (
        <StoryblokComponent blok={itemBlok} key={itemBlok._uid} />
      ))}
    </GridSection>
  );
};

SbGridSection.displayName = 'SbGridSection';

