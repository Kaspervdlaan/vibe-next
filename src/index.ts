// ============================================================================
// VIBE DESIGN SYSTEM
// ============================================================================

// Atoms
export { Typography, type TypographyProps } from './components/atoms/Typography';
export { Button, type ButtonProps } from './components/atoms/Button';
export { Box, type BoxProps } from './components/atoms/Box';
export { Icon, type IconProps } from './components/atoms/Icon';
export { Media, type MediaProps } from './components/atoms/Media';
export { Input, type InputProps } from './components/atoms/Input';
export { Divider, type DividerProps } from './components/atoms/Divider';
export { Wysiwyg, type WysiwygProps } from './components/atoms/Wysiwyg';
export { Container, type ContainerProps } from './components/atoms/Container';
export { Section, type SectionProps } from './components/atoms/Section';
export { Stack, type StackProps } from './components/atoms/Stack';
export { Badge, type BadgeProps } from './components/atoms/Badge';
export { Textarea, type TextareaProps } from './components/atoms/Textarea';
export { Checkbox, type CheckboxProps } from './components/atoms/Checkbox';
export { Radio, type RadioProps } from './components/atoms/Radio';
export { Switch, type SwitchProps } from './components/atoms/Switch';
export { Spinner, type SpinnerProps } from './components/atoms/Spinner';
export { Progress, type ProgressProps } from './components/atoms/Progress';
export { Slider, type SliderProps } from './components/atoms/Slider';

// Molecules
export {
  Card,
  type CardProps,
  type CardHeaderProps,
  type CardBodyProps,
  type CardFooterProps,
} from './components/molecules/Card';

export { IconCard, type IconCardProps } from './components/molecules/IconCard';

export { Heading, type HeadingProps } from './components/molecules/Heading';

export { Quote, type QuoteProps } from './components/molecules/Quote';

export {
  Accordion,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionHeaderProps,
  type AccordionPanelProps,
} from './components/molecules/Accordion';

export { ButtonGroup, type ButtonGroupProps } from './components/molecules/ButtonGroup';

export { Modal, type ModalProps } from './components/molecules/Modal';

export { Alert, type AlertProps } from './components/molecules/Alert';

export { Tabs, type TabsProps, type TabItem } from './components/molecules/Tabs';

export { Select, type SelectProps, type SelectOption } from './components/molecules/Select';

export { RadioGroup, type RadioGroupProps, type RadioOption } from './components/molecules/RadioGroup';

export { Breadcrumbs, type BreadcrumbsProps, type BreadcrumbItem } from './components/molecules/Breadcrumbs';

export { Pagination, type PaginationProps } from './components/molecules/Pagination';

export { FormGroup, type FormGroupProps } from './components/molecules/FormGroup';

// Organisms
export { MediaSection, type MediaSectionProps } from './components/organisms/MediaSection';
export { HeadingSection, type HeadingSectionProps } from './components/organisms/HeadingSection';
export { GridSection, type GridSectionProps } from './components/organisms/GridSection';
export { ContainerSection, type ContainerSectionProps } from './components/organisms/ContainerSection';

// Providers
export {
  ThemeProvider,
  useTheme,
  type ThemeProviderProps,
  type ThemeContextValue,
  type ThemeName,
  type ThemeMode,
} from './components/providers/Theme';

// Styles
// Import these in your app's entry point:
// import 'vibe-design-system/src/styles/_globals.scss';

