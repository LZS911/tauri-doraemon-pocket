import {
  ApiOutlined,
  ProjectOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
import { RouterConfigItem } from '.';

const Setting = lazy(() => import('../pages/Setting'));
const ApiGenerator = lazy(() => import('../pages/ApiGenerator'));
const Projects = lazy(() => import('../pages/Projects'));
const ProjectList = lazy(() => import('../pages/Projects/List'));
const ProjectCreate = lazy(() => import('../pages/Projects/Create'));
const ProjectUpdate = lazy(() => import('../pages/Projects/Update'));

export const routerConfig: RouterConfigItem[] = [
  {
    path: '/',
    key: 'setting',
    label: 'router.title.setting',
    element: <Setting />,
    icon: <SettingOutlined />,
  },
  {
    path: '/api-generator',
    key: 'apiGenerator',
    label: 'router.title.apiGenerator',
    element: <ApiGenerator />,
    icon: <ApiOutlined />,
  },
  {
    path: '/projects',
    key: 'projects',
    label: 'router.title.projects',
    element: <Projects />,
    icon: <ProjectOutlined />,
    hideChildrenInSliderMenu: true,
    children: [
      {
        index: true,
        key: 'projects',
        element: <ProjectList />,
      },
      {
        path: 'create',
        key: 'ProjectCreate',
        element: <ProjectCreate />,
      },
      {
        path: 'update/:id',
        key: 'ProjectUpdate',
        element: <ProjectUpdate />,
      },
    ],
  },
];
