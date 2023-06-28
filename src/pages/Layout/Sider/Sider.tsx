import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import classNames from 'classnames';
import { useMemo } from 'react';
import CONSTANT from '../../../common/constant';
import ThemeBase from '../../../components/ThemeBase';
import useLayoutRedux from '../useLayoutRedux';
import NavExpanded from './NavExpanded';
import NavNotExpanded from './NavNotExpanded';

const Sider: React.FC = () => {
  const { isExpandSider, isDrawerSider, setIsExpandSider } = useLayoutRedux();

  const closeDrawerSider = () => {
    setIsExpandSider(false);
  };

  const siderWidth = useMemo(() => {
    if (isDrawerSider) {
      return 0;
    }

    if (isExpandSider) {
      return CONSTANT.SIDER_WIDTH_WHEN_EXPAND;
    }

    return CONSTANT.SIDER_WIDTH;
  }, [isDrawerSider, isExpandSider]);

  const handleClickMenuIcon = (isExpand: boolean) => {
    setIsExpandSider(!isExpand);
  };
  return (
    <nav
      className="sticky top-0 flex min-h-full flex-col items-center justify-center overflow-y-auto pb-3 pl-1 transition-[width]"
      style={{
        width: siderWidth,
      }}
    >
      {isDrawerSider ? (
        <Drawer
          closable={false}
          placement="left"
          visible={isExpandSider}
          onClose={closeDrawerSider}
          bodyStyle={{
            padding: 0,
            width: CONSTANT.SIDER_WIDTH_WHEN_EXPAND,
          }}
          contentWrapperStyle={{
            width: CONSTANT.SIDER_WIDTH_WHEN_EXPAND,
          }}
        >
          <ThemeBase.Paper className="h-full w-full">
            <NavExpanded />
          </ThemeBase.Paper>
        </Drawer>
      ) : (
        <ThemeBase.Paper className="h-full w-full">
          {isExpandSider ? <NavExpanded /> : <NavNotExpanded />}
        </ThemeBase.Paper>
      )}

      <ThemeBase.Icon
        data-testid="menu-icon"
        icon={
          isExpandSider ? (
            <MenuFoldOutlined className="text-[1rem]" />
          ) : (
            <MenuUnfoldOutlined className="text-[1rem]" />
          )
        }
        onClick={() => handleClickMenuIcon(isExpandSider)}
        className={classNames(
          {
            'w-[40%]': !isExpandSider,
            'w-[20%]': isExpandSider,
          },
          'bg-slate-100 dark:bg-black'
        )}
      />
    </nav>
  );
};

export default Sider;
