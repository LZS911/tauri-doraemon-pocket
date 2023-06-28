import { AppTheme } from './invoke.enum';

export type AppConfType = {
  titlebar: boolean;
  hide_dock_icon: boolean;

  theme: AppTheme;
  speech_lang: string;

  // Main Window
  isinit: boolean;
  popup_search: boolean;
  main_close: boolean;
  main_dashboard: boolean;
  main_width: number;
  main_height: number;

  //app conf
  username: string;
  show_welcome: boolean;
};
