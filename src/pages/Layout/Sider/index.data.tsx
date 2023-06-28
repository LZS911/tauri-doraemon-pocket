import { NavigateFunction } from 'react-router-dom';
import { I18nKey } from '../../../locale';
import { RouterConfigItem } from '../../../router';
import { routerConfig } from '../../../router/router.config';
import { INavIconList } from './index';

export const genNavIconList: (
  navigate: NavigateFunction
) => Array<INavIconList | null> = (navigate) => {
  return routerConfig.map((v) => {
    if (v.menuType === 'Hidden') {
      return null;
    }
    if (!v.children) {
      return {
        name: v.key,
        title: v.label as I18nKey,
        path: v.path as string,
        icon: v.icon,
        onClick: () => {
          navigate(v.path as string);
        },
      };
    }

    return {
      name: v.key,
      path: v.path as string,
      title: v.label as I18nKey,
      icon: v.icon,
      children: v.children.map((c: RouterConfigItem) => {
        return {
          name: c.key,
          path: c.path as string,
          title: c.label as I18nKey,
          onClick: () => {
            navigate(c.path as string);
          },
        };
      }),
    };
  });
};
