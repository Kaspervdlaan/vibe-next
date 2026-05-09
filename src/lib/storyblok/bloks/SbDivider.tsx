import React from 'react';
import { Divider } from '../../../components/atoms/Divider';
import { storyblokEditable } from '@storyblok/react';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'solid' | 'dashed' | 'dotted';
type DividerWeight = 'thin' | 'medium' | 'thick';
type DividerSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type DividerColor = 'default' | 'muted' | 'primary' | 'secondary';

export interface SbDividerProps {
  blok: {
    _uid: string;
    component: string;
    orientation?: DividerOrientation;
    variant?: DividerVariant;
    weight?: DividerWeight;
    spacing?: DividerSpacing;
    color?: DividerColor;
    label?: string;
  };
}

export const SbDivider: React.FC<SbDividerProps> = ({ blok }) => {
  return <Divider {...storyblokEditable(blok)} />;
};

SbDivider.displayName = 'SbDivider';