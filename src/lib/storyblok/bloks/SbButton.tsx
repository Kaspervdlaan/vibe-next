// ============================================================================
// STORYBLOK BUTTON
// ============================================================================

import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import { Button } from '../../../components/atoms/Button';

interface StoryblokLink {
  id?: string;
  url?: string;
  linktype?: string;
  fieldtype?: string;
  cached_url?: string;
  story?: {
    full_slug: string;
  };
}

export interface SbButtonProps {
  blok: {
    _uid: string;
    component: string;
    label: string;
    link?: StoryblokLink;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    full_width?: boolean;
    shadow?: boolean;
    border?: boolean;
  };
}

/**
 * Resolves a Storyblok link to a URL string
 */
const resolveLink = (link?: StoryblokLink): string | undefined => {
  if (!link) return undefined;
  
  if (link.linktype === 'story' && link.story) {
    return `/${link.story.full_slug}`;
  }
  
  if (link.linktype === 'url') {
    return link.url || link.cached_url;
  }
  
  return link.cached_url || link.url;
};

export const SbButton: React.FC<SbButtonProps> = ({ blok }) => {
  const href = resolveLink(blok.link);
  const isExternal = href?.startsWith('http');

  // If there's a link, render as anchor
  if (href) {
    return (
      <Button
        {...storyblokEditable(blok)}
        as="a"
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        variant={blok.variant}
        size={blok.size}
        fullWidth={blok.full_width}
        shadow={blok.shadow}
        border={blok.border}
      >
        {blok.label}
      </Button>
    );
  }

  return (
    <Button
      {...storyblokEditable(blok)}
      variant={blok.variant}
      size={blok.size}
      fullWidth={blok.full_width}
      shadow={blok.shadow}
      border={blok.border}
    >
      {blok.label}
    </Button>
  );
};

SbButton.displayName = 'SbButton';

