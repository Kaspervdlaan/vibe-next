import React, { createContext, useContext, useState, useCallback, useId } from 'react';
import { Box } from '../../atoms/Box';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import './_accordion.scss';

// ============================================================================
// TYPES
// ============================================================================

type AccordionVariant = 'default' | 'bordered' | 'separated';
type AccordionSize = 'sm' | 'md' | 'lg';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: AccordionVariant;
  /** Size of the accordion */
  size?: AccordionSize;
  /** Allow multiple items to be open at once */
  allowMultiple?: boolean;
  /** Default expanded item(s) - use item value */
  defaultExpanded?: string | string[];
  /** Controlled expanded state */
  expanded?: string | string[];
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: string[]) => void;
  /** Additional CSS classes */
  className?: string;
  /** Accordion items */
  children: React.ReactNode;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique value for this item */
  value: string;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Item content (header and panel) */
  children: React.ReactNode;
}

export interface AccordionHeaderProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** Custom icon (replaces default chevron) */
  icon?: React.ReactNode;
  /** Hide the expand/collapse icon */
  hideIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Header content */
  children: React.ReactNode;
}

export interface AccordionPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
  /** Panel content */
  children: React.ReactNode;
}

// ============================================================================
// CONTEXT
// ============================================================================

interface AccordionContextValue {
  variant: AccordionVariant;
  size: AccordionSize;
  expandedItems: string[];
  toggleItem: (value: string) => void;
  registerItem: (value: string) => void;
}

interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
  isDisabled: boolean;
  headerId: string;
  panelId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionItem components must be used within an AccordionItem');
  }
  return context;
};

// ============================================================================
// CHEVRON ICON
// ============================================================================

const ChevronIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ============================================================================
// ACCORDION
// ============================================================================

export const Accordion: React.FC<AccordionProps> & {
  Item: typeof AccordionItem;
  Header: typeof AccordionHeader;
  Panel: typeof AccordionPanel;
} = ({
  variant = 'default',
  size = 'md',
  allowMultiple = false,
  defaultExpanded,
  expanded: controlledExpanded,
  onExpandedChange,
  className = '',
  children,
  ...props
}) => {
  // Initialize state
  const getInitialExpanded = (): string[] => {
    if (controlledExpanded !== undefined) {
      return Array.isArray(controlledExpanded) ? controlledExpanded : [controlledExpanded];
    }
    if (defaultExpanded !== undefined) {
      return Array.isArray(defaultExpanded) ? defaultExpanded : [defaultExpanded];
    }
    return [];
  };

  const [internalExpanded, setInternalExpanded] = useState<string[]>(getInitialExpanded);
  
  const isControlled = controlledExpanded !== undefined;
  const expandedItems = isControlled 
    ? (Array.isArray(controlledExpanded) ? controlledExpanded : [controlledExpanded])
    : internalExpanded;

  const toggleItem = useCallback((value: string) => {
    const newExpanded = expandedItems.includes(value)
      ? expandedItems.filter((item) => item !== value)
      : allowMultiple
        ? [...expandedItems, value]
        : [value];

    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }
    onExpandedChange?.(newExpanded);
  }, [expandedItems, allowMultiple, isControlled, onExpandedChange]);

  const registerItem = useCallback(() => {
    // Placeholder for future functionality
  }, []);

  const classNames = [
    'accordion',
    `accordion--variant-${variant}`,
    `accordion--size-${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <AccordionContext.Provider value={{ variant, size, expandedItems, toggleItem, registerItem }}>
      <Box className={classNames} {...props}>
        {children}
      </Box>
    </AccordionContext.Provider>
  );
};

// ============================================================================
// ACCORDION ITEM
// ============================================================================

const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const { expandedItems } = useAccordion();
  const uniqueId = useId();
  const headerId = `accordion-header-${uniqueId}`;
  const panelId = `accordion-panel-${uniqueId}`;
  const isExpanded = expandedItems.includes(value);

  const classNames = [
    'accordion__item',
    isExpanded && 'accordion__item--expanded',
    disabled && 'accordion__item--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <AccordionItemContext.Provider value={{ value, isExpanded, isDisabled: disabled, headerId, panelId }}>
      <Box className={classNames} {...props}>
        {children}
      </Box>
    </AccordionItemContext.Provider>
  );
};

// ============================================================================
// ACCORDION HEADER
// ============================================================================

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  icon,
  hideIcon = false,
  className = '',
  children,
  ...props
}) => {
  const { toggleItem, size } = useAccordion();
  const { value, isExpanded, isDisabled, headerId, panelId } = useAccordionItem();

  const handleClick = () => {
    if (!isDisabled) {
      toggleItem(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const classNames = [
    'accordion__header',
    className,
  ].filter(Boolean).join(' ');

  const iconSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';

  return (
    <button
      id={headerId}
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-expanded={isExpanded}
      aria-controls={panelId}
      disabled={isDisabled}
      type="button"
      {...props}
    >
      <span className="accordion__header-content">{children}</span>
      {!hideIcon && (
        <Icon 
          size={iconSize} 
          className={`accordion__icon ${isExpanded ? 'accordion__icon--expanded' : ''}`}
          color="neutral"
          variant="ghost"
        >
          {icon || <ChevronIcon />}
        </Icon>
      )}
    </button>
  );
};

// ============================================================================
// ACCORDION PANEL
// ============================================================================

const AccordionPanel: React.FC<AccordionPanelProps> = ({
  className = '',
  children,
  ...props
}) => {
  const { isExpanded, headerId, panelId } = useAccordionItem();

  const classNames = [
    'accordion__panel',
    isExpanded && 'accordion__panel--expanded',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      id={panelId}
      className={classNames}
      role="region"
      aria-labelledby={headerId}
      hidden={!isExpanded}
      {...props}
    >
      <div className="accordion__panel-content">
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// ATTACH SUBCOMPONENTS
// ============================================================================

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'Accordion.Item';
AccordionHeader.displayName = 'Accordion.Header';
AccordionPanel.displayName = 'Accordion.Panel';

export { AccordionItem, AccordionHeader, AccordionPanel };

