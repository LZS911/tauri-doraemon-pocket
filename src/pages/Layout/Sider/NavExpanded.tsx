import { QuestionOutlined } from '@ant-design/icons';
import { Menu, MenuProps, Space, Tag } from 'antd';
import { Typography } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import useTheme from '../../../customHooks/useTheme';
import { I18nKey, t as i18nT } from '../../../locale';
import { RouterConfigItem } from '../../../router';
import { routerConfig } from '../../../router/router.config';
const menuItems = (): MenuProps['items'] => {
  return routerConfig.map((v) => {
    if (v.menuType === 'Hidden') {
      return null;
    }
    if (v.children && v.label) {
      return {
        key: v.path as string,
        icon: v.icon ?? <QuestionOutlined />,
        label: <span className="text-sm">{i18nT(v.label)}</span>,
        children: v.children.map((c: RouterConfigItem) => {
          return {
            key: c.path,
            label: <span className="text-sm">{i18nT(v.label as I18nKey)}</span>,
          };
        }),
      };
    }
    return {
      key: v.path as string,
      icon: v.icon ?? <QuestionOutlined />,
      label: <span className="text-sm">{i18nT(v.label as I18nKey)}</span>,
    };
  });
};
const NavExpanded: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentThemeMode } = useTheme();
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };
  const selectedKeys = useMemo(() => {
    return [location.pathname];
  }, [location]);
  return (
    <div className="flex flex-col">
      <Space direction="vertical" align="center" className="py-2">
        <img title="logo" src="/static/images/logo.svg" className="mr-3" />
        <Tag>
          <Typography.Text strong>{t('common.title')}</Typography.Text>
        </Tag>
      </Space>

      <Menu
        theme={currentThemeMode}
        onClick={handleMenuClick}
        selectedKeys={selectedKeys}
        mode="inline"
        items={menuItems()}
        className="text-base"
      />
    </div>
  );
};
export default NavExpanded;
