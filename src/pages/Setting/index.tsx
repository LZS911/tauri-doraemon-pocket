import {
  AutoUpdateEnum,
  ColorSchemeEnum,
  ThemeModeEnum,
} from '../../common/enum';
import { SupportLanguage } from '../../locale';
import Setting from './Setting';

export type SettingFormFields = {
  theme: ThemeModeEnum;
  themeColorScheme: ColorSchemeEnum;
  // fontFamily: FontFamilyEnum; todo
  language: SupportLanguage;
  autoUpdate: AutoUpdateEnum;
};

export default Setting;
