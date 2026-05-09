import React from 'react';
import './_container.scss';

type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';
type ContainerBackground = 'none' | 'subtle' | 'primary';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: ContainerMaxWidth;
  padding?: ContainerPadding;
  background?: ContainerBackground;
  className?: string;
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  maxWidth = 'lg',
  padding = 'md',
  background = 'none',
  className = '',
  children,
  ...props
}) => {
  const classNames = [
    'container',
    `container--${maxWidth}`,
    `container--padding-${padding}`,
    `container--bg-${background}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

Container.displayName = 'Container';

export default Container;

