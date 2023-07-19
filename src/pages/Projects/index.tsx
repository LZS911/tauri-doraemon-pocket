import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* <PageHeader
        title={t('router.title.projects')}
        desc={t('projects.pageDesc')}
        className="mb-6"
      ></PageHeader> */}

      <Outlet />
    </>
  );
};
export default Projects;
