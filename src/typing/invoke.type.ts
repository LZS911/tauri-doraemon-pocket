import { AutoUpdateEnum, ColorSchemeEnum, ThemeModeEnum } from '../common/enum';
import { SupportLanguage } from '../locale';

export type AppConfType = {
  // titlebar: boolean;
  // hide_dock_icon: boolean;
  // stay_on_top: boolean;

  theme: ThemeModeEnum;
  color_schema: ColorSchemeEnum;
  lang: SupportLanguage;

  auto_update: AutoUpdateEnum;

  // Main Window
  // isinit: boolean;
  // popup_search: boolean;
  // main_close: boolean;
  // main_dashboard: boolean;
  // main_width: number;
  // main_height: number;

  // //app conf
  // show_welcome: boolean;
};
