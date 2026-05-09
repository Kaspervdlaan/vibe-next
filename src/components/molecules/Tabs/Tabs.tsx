import React, { useState, useId } from 'react';
import { Box } from '../../atoms/Box';
import { Typography } from '../../atoms/Typography';
import './_tabs.scss';

type TabsOrientation = 'horizontal' | 'vertical';
type TabsSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
  content?: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tab items */
  items: TabItem[];
  /** Default selected tab value */
  defaultValue?: string;
  /** Controlled selected tab value */
  value?: string;
  /** Callback when tab changes */
  onChange?: (value: string) => void;
  /** Orientation */
  orientation?: TabsOrientation;
  /** Size */
  size?: TabsSize;
  /** Show content panels (default: true) */
  showPanels?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultValue,
  value: controlledValue,
  onChange,
  orientation = 'horizontal',
  size = 'md',
  showPanels = true,
  className = '',
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || items[0]?.value || '');
  const tabsId = useId();

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleTabChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const currentTab = items.find((item) => item.value === currentValue);
  const currentIndex = items.findIndex((item) => item.value === currentValue);

  const classNames = [
    'tabs',
    `tabs--${orientation}`,
    `tabs--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (e: React.KeyboardEvent, item: TabItem, index: number) => {
    if (item.disabled) return;

    let targetIndex = index;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') {
        targetIndex = index > 0 ? index - 1 : items.length - 1;
      } else if (e.key === 'ArrowRight') {
        targetIndex = index < items.length - 1 ? index + 1 : 0;
      }
    } else {
      if (e.key === 'ArrowUp') {
        targetIndex = index > 0 ? index - 1 : items.length - 1;
      } else if (e.key === 'ArrowDown') {
        targetIndex = index < items.length - 1 ? index + 1 : 0;
      }
    }

    if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = items.length - 1;
    }

    if (targetIndex !== index) {
      e.preventDefault();
      const targetItem = items[targetIndex];
      if (!targetItem.disabled) {
        handleTabChange(targetItem.value);
      }
    }
  };

  return (
    <Box className={classNames} display="flex" direction={orientation === 'vertical' ? 'row' : 'column'} {...props}>
      <Box
        className="tabs__list"
        role="tablist"
        aria-orientation={orientation}
        display="flex"
        direction={orientation === 'vertical' ? 'column' : 'row'}
        gap="xs"
      >
        {items.map((item, index) => {
          const isSelected = item.value === currentValue;
          const tabId = `${tabsId}-tab-${item.value}`;
          const panelId = `${tabsId}-panel-${item.value}`;

          return (
            <button
              key={item.value}
              id={tabId}
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              aria-disabled={item.disabled}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              className={[
                'tabs__tab',
                isSelected && 'tabs__tab--active',
                item.disabled && 'tabs__tab--disabled',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => !item.disabled && handleTabChange(item.value)}
              onKeyDown={(e) => handleKeyDown(e, item, index)}
            >
              <Typography variant="body" weight={isSelected ? 'bold' : 'medium'}>
                {item.label}
              </Typography>
            </button>
          );
        })}
      </Box>

      {showPanels && currentTab && (
        <Box
          id={`${tabsId}-panel-${currentTab.value}`}
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-${currentTab.value}`}
          className="tabs__panel"
          padding="md"
        >
          {currentTab.content}
        </Box>
      )}
    </Box>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;

