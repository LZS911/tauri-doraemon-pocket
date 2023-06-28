import { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import HeaderProgress from '../components/HeaderProgress';
import useUserConfig from '../customHooks/useUserConfig';
import Layout from '../pages/Layout';
import { routerConfig } from './router.config';

const RouterComponent: React.FC = () => {
  const { getUserConfig, getUserInfoLoading } = useUserConfig();
  useEffect(() => {
    getUserConfig();
  }, [getUserConfig]);

  const elements = useRoutes(routerConfig);

  const renderDocument = () => {
    if (getUserInfoLoading) {
      return <HeaderProgress />;
    }

    return (
      <Suspense fallback={<HeaderProgress />}>
        <Layout>{elements}</Layout>
      </Suspense>
    );
  };

  return renderDocument();
};

export default RouterComponent;
