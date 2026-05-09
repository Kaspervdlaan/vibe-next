// ============================================================================
// STORYBLOK QUOTE
// ============================================================================

import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import { Quote } from '../../../components/molecules/Quote';

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

// Built-in icon options
const AUTHOR_ICONS: Record<string, React.ReactNode> = {
  verified: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  none: null,
};

export interface SbQuoteProps {
  blok: {
    _uid: string;
    component: string;
    quote: string;
    author: string;
    role?: string;
    avatar?: StoryblokAsset;
    author_icon?: string;
    variant?: 'default' | 'elevated' | 'minimal';
    size?: 'sm' | 'md' | 'lg';
    layout?: 'horizontal' | 'vertical';
  };
}

export const SbQuote: React.FC<SbQuoteProps> = ({ blok }) => {
  const authorIcon = blok.author_icon ? AUTHOR_ICONS[blok.author_icon] : undefined;

  return (
    <Quote
      {...storyblokEditable(blok)}
      quote={blok.quote}
      author={blok.author}
      role={blok.role}
      avatar={blok.avatar?.filename}
      authorIcon={authorIcon}
      variant={blok.variant}
      size={blok.size}
      layout={blok.layout}
    />
  );
};

SbQuote.displayName = 'SbQuote';

