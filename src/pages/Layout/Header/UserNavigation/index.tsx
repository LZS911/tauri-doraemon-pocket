import {
  EditOutlined,
  FormOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import i18n from '../../../../locale';
import UserNavigation from './UserNavigation';
export interface ITabWrapperDataSource {
  icon: JSX.Element;
  onClick: () => void;
  text: string;
  hidden?: boolean;
}
export interface UserNavigationTabWrapperProps {
  dataSource: ITabWrapperDataSource[];
}
export enum UserNavigationTabsKeyEnum {
  profile,
  settings,
}
export const UserProfileTabDataSource: () => ITabWrapperDataSource[] = () => [
  {
    icon: <EditOutlined />,
    onClick: () => undefined,
    text: i18n.t('layout.header.userNavigation.profile.editProfile'),
  },
  {
    icon: <UserOutlined />,
    onClick: () => undefined,
    text: i18n.t('layout.header.userNavigation.profile.viewProfile'),
  },
  {
    icon: <MailOutlined />,
    onClick: () => undefined,
    text: i18n.t('layout.header.userNavigation.profile.bindEmail'),
  },
];
export const UserSettingsTabDataSource: () => ITabWrapperDataSource[] = () => [
  {
    icon: <UserOutlined />,
    onClick: () => undefined,
    text: i18n.t('layout.header.userNavigation.settings.accountSetting'),
  },
  {
    icon: <LockOutlined />,
    onClick: () => undefined,
    text: i18n.t('layout.header.userNavigation.settings.permissionSetting'),
  },
  {
    icon: <FormOutlined />,
    onClick: () => undefined,
    text: i18n.t('layout.header.userNavigation.profile.modifyPassword'),
  },
];

export default UserNavigation;
