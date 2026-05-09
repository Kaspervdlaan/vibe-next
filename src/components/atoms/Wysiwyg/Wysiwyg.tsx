import React from 'react';
import { Box } from '../Box';
import './_wysiwyg.scss';

type WysiwygSize = 'sm' | 'md' | 'lg';

export interface WysiwygProps extends React.HTMLAttributes<HTMLDivElement> {
  /** HTML content to render */
  html?: string;
  /** Size variant affecting typography scale */
  size?: WysiwygSize;
  /** Additional CSS classes */
  className?: string;
  /** Children content (alternative to html prop) */
  children?: React.ReactNode;
}

export const Wysiwyg: React.FC<WysiwygProps> = ({
  html,
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const classNames = [
    'wysiwyg',
    `wysiwyg--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (html) {
    return (
      <Box
        className={classNames}
        dangerouslySetInnerHTML={{ __html: html }}
        {...props}
      />
    );
  }

  return (
    <Box className={classNames} {...props}>
      {children}
    </Box>
  );
};

Wysiwyg.displayName = 'Wysiwyg';

export default Wysiwyg;

