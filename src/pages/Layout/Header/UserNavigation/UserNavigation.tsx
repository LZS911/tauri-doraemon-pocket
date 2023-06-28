import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Popover, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  UserNavigationTabsKeyEnum,
  UserProfileTabDataSource,
  UserSettingsTabDataSource,
} from '.';
import ThemeBase from '../../../../components/ThemeBase';
import useUserConfig from '../../../../customHooks/useUserConfig';
import UserNavigationTabWrapper from './UserNavigationTabWrapper';

const UserNavigation: React.FC = () => {
  const { t } = useTranslation();
  const { username, userProfile, signOut } = useUserConfig();
  return (
    <Popover
      trigger="click"
      content={
        <div className="w-72">
          <header className="flex items-center justify-between p-6">
            <div className="flex">
              <img
                title="logo"
                className="h-8 w-8 rounded-[50%] bg-primary"
                src="https://joeschmoe.io/api/v1/random"
              />
              <div className="ml-3 font-bold">
                <div>{username}</div>
                <div className="text-xs opacity-50">{userProfile}</div>
              </div>
            </div>

            <ThemeBase.Icon
              data-testid="sign-out-icon"
              onClick={signOut}
              icon={<LogoutOutlined />}
              className="text-[1.25rem]"
            />
          </header>
          <div>
            <Tabs centered={true}>
              <Tabs.TabPane
                key={UserNavigationTabsKeyEnum.profile}
                tab={
                  <div className="flex items-center px-4">
                    <UserOutlined />
                    <span>
                      {t('layout.header.userNavigation.profile.title')}
                    </span>
                  </div>
                }
              >
                <UserNavigationTabWrapper
                  dataSource={UserProfileTabDataSource()}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                key={UserNavigationTabsKeyEnum.settings}
                tab={
                  <div className="flex items-center px-4">
                    <SettingOutlined />
                    <span>
                      {t('layout.header.userNavigation.settings.title')}
                    </span>
                  </div>
                }
              >
                <UserNavigationTabWrapper
                  dataSource={UserSettingsTabDataSource()}
                />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      }
    >
      <ThemeBase.Icon
        data-testid="open-popover-icon"
        icon={
          <>
            <img
              title="logo"
              className="h-6 w-6 rounded-[50%] bg-primary"
              src="https://joeschmoe.io/api/v1/random"
            />
            <span className="ml-3 font-bold">{username}</span>
          </>
        }
        className="bg-slate-100 px-2 py-1 text-base dark:bg-black"
      />
    </Popover>
  );
};

export default UserNavigation;
