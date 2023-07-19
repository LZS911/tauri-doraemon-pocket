import {
  AutoUpdateEnum,
  ColorSchemeEnum,
  RepositoryKind,
  ThemeModeEnum,
} from '../common/enum';
import { SupportLanguage } from '../locale';

export type ProjectConf = {
  name: string;
  id: string;
  token: string;
  category: RepositoryKind;
  path: string;
  gitlab_url: string;
  gitlab_token: string;
};

export type AppConfType = {
  theme: ThemeModeEnum;
  color_schema: ColorSchemeEnum;
  lang: SupportLanguage;

  auto_update: AutoUpdateEnum;

  swagger_path: string;

  projects: ProjectConf[];
};
