import React from 'react';
import { Box } from '../../atoms/Box';
import './_card.scss';

type CardVariant = 'elevated' | 'outlined' | 'flat';
type CardPadding = 'sm' | 'md' | 'lg';

// ----------------------------------------------------------------------------
// CARD HEADER
// ----------------------------------------------------------------------------

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
  /** Header content */
  children?: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  className = '',
  children,
  ...props
}) => {
  const classNames = ['card__header', className].filter(Boolean).join(' ');

  return (
    <Box className={classNames} {...props}>
      {children}
    </Box>
  );
};

CardHeader.displayName = 'Card.Header';

// ----------------------------------------------------------------------------
// CARD BODY
// ----------------------------------------------------------------------------

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
  /** Body content */
  children?: React.ReactNode;
}

const CardBody: React.FC<CardBodyProps> = ({
  className = '',
  children,
  ...props
}) => {
  const classNames = ['card__body', className].filter(Boolean).join(' ');

  return (
    <Box className={classNames} {...props}>
      {children}
    </Box>
  );
};

CardBody.displayName = 'Card.Body';

// ----------------------------------------------------------------------------
// CARD FOOTER
// ----------------------------------------------------------------------------

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
  /** Footer content */
  children?: React.ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = ({
  className = '',
  children,
  ...props
}) => {
  const classNames = ['card__footer', className].filter(Boolean).join(' ');

  return (
    <Box className={classNames} display="flex" align="center" gap="sm" {...props}>
      {children}
    </Box>
  );
};

CardFooter.displayName = 'Card.Footer';

// ----------------------------------------------------------------------------
// CARD
// ----------------------------------------------------------------------------

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: CardVariant;
  /** Internal padding */
  padding?: CardPadding;
  /** Additional CSS classes */
  className?: string;
  /** Card content */
  children?: React.ReactNode;
}

interface CardComponent extends React.FC<CardProps> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

const CardBase: React.FC<CardProps> = ({
  variant = 'flat',
  padding = 'md',
  className = '',
  children,
  ...props
}) => {
  const classNames = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Box
      className={classNames}
      display="flex"
      direction="column"
      radius="lg"
      {...props}
    >
      {children}
    </Box>
  );
};

CardBase.displayName = 'Card';

// Compose the Card component with subcomponents
export const Card = CardBase as CardComponent;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
