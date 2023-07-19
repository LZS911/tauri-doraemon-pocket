import { invoke } from '@tauri-apps/api';
import { Card, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { ResponseCode, ResponseType } from '../../common/enum';
import BackButton from '../../components/BackButton';
import ProjectForm, { ProjectFormFields } from './ProjectForm';
const ProjectCreate: React.FC = () => {
  const { t } = useTranslation();
  const submit = (values: ProjectFormFields) => {
    invoke<ResponseType>('add_project_conf', {
      data: {
        ...values,
        gitlab_url: values.gitlabUrl ?? '',
        gitlab_token: values.gitlabToken ?? '',
      },
    }).then((res) => {
      if (res.code === ResponseCode.SUCCEEDED) {
        message.success(t('common.addSucceeded'));
      }
    });
  };
  return (
    <Card title={t('projects.add.title')} extra={<BackButton />}>
      <ProjectForm submit={submit} />
    </Card>
  );
};
export default ProjectCreate;
