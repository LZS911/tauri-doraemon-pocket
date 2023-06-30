import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ThemeBase from '../../../components/ThemeBase';
import useLayoutRedux from '../useLayoutRedux';
import ToggleLanguage from './ToggleLanguage';
import Customization from './Customization';

const Header: React.FC = () => {
  const { isExpandSider, setIsExpandSider } = useLayoutRedux();

  const handleClickMenuIcon = (isExpand: boolean) => {
    setIsExpandSider(!isExpand);
  };

  return (
    <header className="sticky right-0 top-0 z-[1000] border-b border-stone-100 dark:border-stone-800">
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
        </div>
      </ThemeBase.Paper>
    </header>
  );
};

export default Header;
