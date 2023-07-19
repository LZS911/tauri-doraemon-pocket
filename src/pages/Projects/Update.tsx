import { invoke } from '@tauri-apps/api';
import { Card, message } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ResponseCode, ResponseType } from '../../common/enum';
import BackButton from '../../components/BackButton';
import { ProjectConf } from '../../typing/invoke.type';
import ProjectForm, { ProjectFormFields } from './ProjectForm';
const ProjectUpdate: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{
    id: string;
  }>();
  const [defaultData, setDefaultData] = useState<ProjectConf>();
  const submit = (values: ProjectFormFields) => {
    invoke<ResponseType>('edit_project_conf', {
      data: {
        ...values,
        gitlab_url: values.gitlabUrl ?? '',
        gitlab_token: values.gitlabToken ?? '',
      },
    }).then((res) => {
      if (res.code === ResponseCode.SUCCEEDED) {
        message.success(t('common.editSucceeded'));
      }
    });
  };
  useEffect(() => {
    invoke<ProjectConf[]>('get_project_conf').then((res) => {
      setDefaultData(res.find((v) => v.id === id));
    });
  }, [id]);
  return (
    <Card title={t('projects.edit.title')} extra={<BackButton />}>
      <ProjectForm defaultData={defaultData} submit={submit} />
    </Card>
  );
};
export default ProjectUpdate;
