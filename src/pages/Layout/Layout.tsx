import { ILayoutProps } from '.';
import ThemeBase from '../../components/ThemeBase';
import Main from './Main';
import Sider from './Sider';

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <ThemeBase.Paper className="flex min-h-full w-full">
      <Sider />
      <div className="flex-auto overflow-scroll transition-[width]">
        <Main>{children}</Main>
      </div>
    </ThemeBase.Paper>
  );
};

export default Layout;
