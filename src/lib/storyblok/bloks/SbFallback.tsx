// ============================================================================
// STORYBLOK FALLBACK COMPONENT
// ============================================================================
// Renders when a component is not mapped

import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

export interface SbFallbackProps {
  blok: SbBlokData;
}

export const SbFallback: React.FC<SbFallbackProps> = ({ blok }) => {
  // Log the unmapped component for debugging
  console.warn(`⚠️ Unmapped Storyblok component: "${blok.component}"`, blok);

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        padding: '2rem',
        margin: '1rem',
        background: '#fff3cd',
        border: '3px solid #ee9b00',
        borderRadius: '0.6rem',
        fontFamily: 'Sora, sans-serif',
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#001219' }}>
        ⚠️ Component not mapped: <code style={{ background: '#001219', color: '#ee9b00', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>{blok.component}</code>
      </div>
      <div style={{ fontSize: '0.875rem', color: '#5c5a52' }}>
        Add this to <code>src/lib/storyblok/components.ts</code>
      </div>
      <pre style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: '#001219', 
        color: '#e9d8a6', 
        borderRadius: '0.5rem',
        fontSize: '0.75rem',
        overflow: 'auto'
      }}>
{JSON.stringify(blok, null, 2)}
      </pre>
    </div>
  );
};

SbFallback.displayName = 'SbFallback';

