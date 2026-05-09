// ============================================================================
// STORYBLOK CARD
// ============================================================================

import React from 'react';
import { storyblokEditable, StoryblokComponent, SbBlokData } from '@storyblok/react';
import { Card } from '../../../components/molecules/Card';
import { Typography } from '../../../components/atoms/Typography';
import { Media } from '../../../components/atoms/Media';

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

export interface SbCardProps {
  blok: {
    _uid: string;
    component: string;
    // Content
    title?: string;
    description?: string;
    image?: StoryblokAsset;
    // Styling
    variant?: 'elevated' | 'outlined' | 'flat';
    padding?: 'sm' | 'md' | 'lg';
    // Footer content (buttons, etc.)
    footer?: SbBlokData[];
  };
}

export const SbCard: React.FC<SbCardProps> = ({ blok }) => {
  return (
    <Card
      {...storyblokEditable(blok)}
      variant={blok.variant}
      padding={blok.padding}
    >
      {/* Image Header */}
      {blok.image?.filename && (
        <Card.Header>
          <Media
            type="image"
            src={blok.image.filename}
            alt={blok.image.alt || blok.title || ''}
            aspectRatio="video"
            radius="none"
          />
        </Card.Header>
      )}

      {/* Body */}
      {(blok.title || blok.description) && (
        <Card.Body>
          {blok.title && (
            <Typography variant="h3" weight="bold">
              {blok.title}
            </Typography>
          )}
          {blok.description && (
            <Typography variant="bodySm" tone="muted" style={{ marginTop: '0.5rem' }}>
              {blok.description}
            </Typography>
          )}
        </Card.Body>
      )}

      {/* Footer */}
      {blok.footer && blok.footer.length > 0 && (
        <Card.Footer>
          {blok.footer.map((footerBlok) => (
            <StoryblokComponent blok={footerBlok} key={footerBlok._uid} />
          ))}
        </Card.Footer>
      )}
    </Card>
  );
};

SbCard.displayName = 'SbCard';

