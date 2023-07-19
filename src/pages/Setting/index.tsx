import {
  AutoUpdateEnum,
  ColorSchemeEnum,
  ThemeModeEnum,
} from '../../common/enum';
import { SupportLanguage } from '../../locale';
import { ProjectConf } from '../../typing/invoke.type';
import Setting from './Setting';

export type SettingFormFields = {
  theme: ThemeModeEnum;
  themeColorScheme: ColorSchemeEnum;
  language: SupportLanguage;
  autoUpdate: AutoUpdateEnum;

  defaultSwaggerPath: string;
  projects?: ProjectConf[];
};

export default Setting;
