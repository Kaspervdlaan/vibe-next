// ============================================================================
// STORYBLOK RICH TEXT
// ============================================================================

import React from 'react';
import { storyblokEditable, renderRichText } from '@storyblok/react';
import { Wysiwyg } from '../../../components/atoms/Wysiwyg';

interface RichTextContent {
  type: string;
  content?: RichTextContent[];
  text?: string;
  marks?: { type: string }[];
  attrs?: Record<string, unknown>;
}

export interface SbRichTextProps {
  blok: {
    _uid: string;
    component: string;
    content?: RichTextContent;
    size?: 'sm' | 'md' | 'lg';
  };
}

export const SbRichText: React.FC<SbRichTextProps> = ({ blok }) => {
  // Render the rich text to HTML
  const rendered = blok.content
    ? renderRichText(blok.content as Parameters<typeof renderRichText>[0])
    : '';
  const html = typeof rendered === 'string' ? rendered : '';

  if (!html) {
    return null;
  }

  return (
    <Wysiwyg
      {...storyblokEditable(blok)}
      html={html}
      size={blok.size}
    />
  );
};

SbRichText.displayName = 'SbRichText';

