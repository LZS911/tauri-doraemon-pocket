import { QuestionOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeBase from '../../../components/ThemeBase';
import { genNavIconList } from './index.data';

const NavNotExpanded: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('dashboard');
  };

  const genNavIcon = () => {
    return genNavIconList(navigate).map((nav) => {
      if (!nav) {
        return null;
      }
      return (
        <div key={nav.name} className={`p-3`}>
          {nav.children ? (
            <Popover
              placement="rightTop"
              overlayClassName={`dark:bg-darkMode`}
              trigger="click"
              content={
                <ThemeBase.Paper className="py-2 pl-2 pr-8">
                  {nav.children.map((v) => (
                    <ThemeBase.Icon
                      data-testid={v.name}
                      isHoverCls={false}
                      className={classNames(
                        {
                          ['!text-primary']: location.pathname === v.path,
                        },
                        'mb-1',
                        'py-1',
                        'dark:bg-transparent'
                      )}
                      icon={<span>{v.name}</span>}
                      key={v.name}
                      onClick={v.onClick}
                    />
                  ))}
                </ThemeBase.Paper>
              }
            >
              <ThemeBase.Icon
                data-testid={nav.name}
                className={classNames(
                  {
                    ['!bg-secondary text-primary dark:text-primary']:
                      nav.children
                        .map((v) => v.path)
                        .includes(location.pathname),
                  },
                  'text-xl',
                  'dark:bg-darkMode'
                )}
                icon={nav.icon ?? <QuestionOutlined />}
                onClick={nav.onClick}
              />
            </Popover>
          ) : (
            <ThemeBase.Icon
              data-testid={nav.name}
              className={classNames(
                {
                  ['!bg-secondary text-primary dark:text-primary']:
                    location.pathname === nav.path,
                },
                'text-xl',
                'dark:bg-darkMode'
              )}
              icon={nav.icon ?? <QuestionOutlined />}
              onClick={nav.onClick}
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col">
      <img
        title="logo-img"
        data-testid="logo-img"
        src="/static/images/logo.svg"
        className="mx-auto my-2 h-10 w-10 cursor-pointer"
        onClick={handleLogoClick}
      />
      {genNavIcon()}
    </div>
  );
};

export default NavNotExpanded;
