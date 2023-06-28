import { SettingOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import { RouterConfigItem } from '.';

const Setting = lazy(() => import('../pages/Setting'));

export const routerConfig: RouterConfigItem[] = [
  {
    path: '/',
    key: 'setting',
    label: 'router.title.setting',
    element: <Setting />,
    icon: <SettingOutlined />,
  },
];
