// ============================================================================
// STORYBLOK COMPONENT MAPPING
// ============================================================================
// Maps Storyblok component names to React components

import type { SbReactComponentsMap } from '@storyblok/react';

import {
  SbDivider,
  SbPage,
  SbSection,
  SbContainer,
  SbHeadingSection,
  SbMediaSection,
  SbGridSection,
  SbContainerSection,
  SbIconCard,
  SbButton,
  SbButtonGroup,
  SbCard,
  SbQuote,
  SbRichText,
  SbFallback,
} from './bloks';

/**
 * Component mapping for Storyblok
 * Keys should match the technical names of your Storyblok components
 */
export const components: SbReactComponentsMap = {
  // Divider
  divider: SbDivider,
  Divider: SbDivider,
  
  // Page wrapper
  page: SbPage,
  Page: SbPage,
  
  // Generic wrappers (for nesting)
  section: SbSection,
  Section: SbSection,
  container: SbContainer,
  Container: SbContainer,
  
  // Organisms - underscore versions
  heading_section: SbHeadingSection,
  media_section: SbMediaSection,
  grid_section: SbGridSection,
  container_section: SbContainerSection,
  
  // Organisms - hyphen versions (Storyblok often uses hyphens)
  'heading-section': SbHeadingSection,
  'media-section': SbMediaSection,
  'grid-section': SbGridSection,
  'container-section': SbContainerSection,
  
  // Organisms - PascalCase versions
  HeadingSection: SbHeadingSection,
  MediaSection: SbMediaSection,
  GridSection: SbGridSection,
  ContainerSection: SbContainerSection,
  
  // Common aliases
  hero: SbHeadingSection,
  Hero: SbHeadingSection,
  'hero-section': SbHeadingSection,
  hero_section: SbHeadingSection,
  
  // Molecules
  icon_card: SbIconCard,
  'icon-card': SbIconCard,
  IconCard: SbIconCard,
  feature: SbIconCard,
  Feature: SbIconCard,
  'feature-card': SbIconCard,
  feature_card: SbIconCard,
  
  // Card
  card: SbCard,
  Card: SbCard,
  
  // Quote / Testimonial
  quote: SbQuote,
  Quote: SbQuote,
  testimonial: SbQuote,
  Testimonial: SbQuote,
  
  // Button Group
  button_group: SbButtonGroup,
  'button-group': SbButtonGroup,
  ButtonGroup: SbButtonGroup,
  buttons: SbButtonGroup,
  Buttons: SbButtonGroup,
  
  // Atoms
  button: SbButton,
  Button: SbButton,
  
  rich_text: SbRichText,
  'rich-text': SbRichText,
  RichText: SbRichText,
  text: SbRichText,
  Text: SbRichText,
  
  // Fallback
  fallback: SbFallback,
};
