import { Breadcrumb } from 'antd';
import React, { ReactNode, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const Main: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { pathname } = useLocation();
  const breadcrumbList = useMemo(() => {
    return pathname.slice(1).split('/');
  }, [pathname]);

  return (
    <main
      className={`min-h-[100vh] overflow-auto bg-slate-100 p-6 dark:!bg-black`}
    >
      {breadcrumbList.length > 1 && (
        <Breadcrumb
          className="mb-2"
          separator={<span className="opacity-50 dark:text-white">/</span>}
        >
          {breadcrumbList.map((v, index) => {
            return index === breadcrumbList.length - 1 ? (
              <Breadcrumb.Item key={v}>
                <span className="dark:text-white">{v}</span>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={v}>
                <span className="opacity-50 dark:!text-white">{v}</span>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      )}

      {children}
    </main>
  );
};

export default Main;
