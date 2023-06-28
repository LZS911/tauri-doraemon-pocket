import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';
import { I18nKey } from '../locale';
import RouterComponent from './Router';

export default RouterComponent;

export type MenuType = 'Authentication' | 'SASS' | 'Other' | 'Hidden';

export type RouterConfigItem = RouteObject & {
  label?: I18nKey;
  icon?: ReactNode;
  hideInMenu?: boolean;
  key: string;
  children?: RouterConfigItem[];
  menuType?: MenuType;
};
