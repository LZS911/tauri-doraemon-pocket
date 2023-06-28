/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme';

export const corePlugins = {
  preflight: false,
};
export const darkMode = 'class';
export const content = ['./index.html', './src/**/*.{ts,tsx}'];
export const theme = {
  textColor: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    ...colors,
    white: '#ffffffcc',
  },
  borderColor: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    ...colors,
  },
  backgroundColor: {
    darkMode: '#141414',
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    ...colors,
  },
  fontFamily: {
    inter: ['Inter', 'sans-serif'],
    roboto: ['Roboto', 'san-serif'],
    poppins: ['Poppins', 'sans-serif'],
    publicSans: ['"Public Sans"', 'sans-serif'],
    ..._fontFamily,
  },
  extend: {},
};
export const plugins = [];
