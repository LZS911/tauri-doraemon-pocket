import viteWatchI18nPrettierConfig from 'vite-plugin-watch-i18/dist/prettier.config';

export default {
  plugins: [require('prettier-plugin-tailwindcss')],
  ...viteWatchI18nPrettierConfig,
};
