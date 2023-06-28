import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ThemeBase from '../../../components/ThemeBase';
import useLayoutRedux from '../useLayoutRedux';
import useResizeObserver from 'use-resize-observer';
import { useBoolean } from 'ahooks';
import useThrottle from '../../../hooks/useThrottle';
import ToggleLanguage from './ToggleLanguage';
import Customization from './Customization';
import Notification from './Notification';
import UserNavigation from './UserNavigation';

const Header: React.FC = () => {
  const { isExpandSider, setIsExpandSider } = useLayoutRedux();
  const headerWidthObserver = useThrottle(
    ({ width }: { width?: number }) => {
      if ((width ?? 0) < 460) {
        hideUserInfo();
      } else {
        showUserInfo();
      }
    },
    [],
    100
  );
  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize: headerWidthObserver,
  });
  const [
    userInfoVisibility,
    { setFalse: hideUserInfo, setTrue: showUserInfo },
  ] = useBoolean(true);

  const handleClickMenuIcon = (isExpand: boolean) => {
    setIsExpandSider(!isExpand);
  };

  return (
    <header
      ref={ref}
      className="sticky right-0 top-0 z-[1000] border-b border-stone-100 dark:border-stone-800"
    >
      <ThemeBase.Paper
        className={`flex w-full items-center justify-between py-2 pl-2 pr-6`}
      >
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
          className="bg-slate-100 dark:bg-black"
        />

        <div className="flex items-center">
          <ToggleLanguage />

          {/* <Notification /> */}

          <Customization />

          {userInfoVisibility && <UserNavigation />}
        </div>
      </ThemeBase.Paper>
    </header>
  );
};

export default Header;
