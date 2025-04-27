'use client';

import { Theme, ThemeProps } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import React from 'react';

interface CustomThemeProps extends Partial<ThemeProps> {
  children: React.ReactNode;
}

export function CustomTheme({ children, ...props }: CustomThemeProps) {
  return (
    <Theme 
      {...props} 
      accentColor="plum" 
      grayColor="sand"
      style={{
        '--plum-9': '#6C4AB6',
        '--plum-10': '#5d3fa0',
        '--green-9': '#8CB369',
        '--green-10': '#7aa055',
        '--orange-9': '#F4B393',
        '--orange-10': '#e5977d',
        backgroundColor: '#f0eeee'
      } as React.CSSProperties}
    >
      {children}
    </Theme>
  );
}