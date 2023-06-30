import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import HeaderProgress from '../components/HeaderProgress';
import Layout from '../pages/Layout';
import { routerConfig } from './router.config';

const RouterComponent: React.FC = () => {
  const elements = useRoutes(routerConfig);

  const renderDocument = () => {
    return (
      <Suspense fallback={<HeaderProgress />}>
        <Layout>{elements}</Layout>
      </Suspense>
    );
  };

  return renderDocument();
};

export default RouterComponent;
