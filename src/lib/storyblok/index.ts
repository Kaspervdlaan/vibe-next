// ============================================================================
// STORYBLOK CONFIGURATION
// ============================================================================

import { storyblokInit, apiPlugin } from '@storyblok/react';
import { components } from './components';
import { SbFallback } from './bloks';

let initialized = false;

/**
 * Initialize Storyblok SDK
 * Call this once in your app entry point
 */
export const initStoryblok = () => {
  if (initialized) {
    return;
  }

  const accessToken = process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN;

  storyblokInit({
    accessToken,
    use: accessToken ? [apiPlugin] : [],
    components,
    enableFallbackComponent: true,
    customFallbackComponent: SbFallback,
    apiOptions: {
      region: 'eu', // Use 'us' if your space is in the US region
    },
  });

  initialized = true;
};

// Re-export everything from Storyblok React SDK
export {
  StoryblokComponent,
  storyblokEditable,
  useStoryblok,
  useStoryblokApi,
  getStoryblokApi,
} from '@storyblok/react';

// Re-export bloks
export * from './bloks';

