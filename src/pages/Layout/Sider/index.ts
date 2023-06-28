import React from 'react';
import { I18nKey } from '../../../locale';
import Sider from './Sider';
export interface INavIconList {
  name: string;
  path: string;
  title: I18nKey;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: Array<Omit<INavIconList, 'icon' | 'children'>>;
}

export default Sider;
