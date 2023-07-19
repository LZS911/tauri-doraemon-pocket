import { Breadcrumb, BreadcrumbProps } from 'antd';
import React, { ReactNode, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Main: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { pathname } = useLocation();

  const items: BreadcrumbProps['items'] = useMemo(() => {
    const breadcrumbList = pathname.slice(1).split('/');
    return breadcrumbList.map((v, index) => ({
      title: index === 0 ? <Link to={`/${v}`}>{v}</Link> : v,
    }));
  }, [pathname]);
  return (
    <main
      className={`min-h-[100vh] overflow-auto bg-slate-100 p-6 dark:!bg-black`}
    >
      {items.length > 1 && (
        <Breadcrumb
          className="mb-6"
          separator={<span className="opacity-50 dark:text-white">/</span>}
          items={items}
        />
      )}

      {children}
    </main>
  );
};

export default Main;
