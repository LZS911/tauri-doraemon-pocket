import { invoke } from '@tauri-apps/api';
import { Button, message, Table } from 'antd';
import Card from 'antd/es/card/Card';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ResponseCode, ResponseType } from '../../common/enum';
import { ProjectConf } from '../../typing/invoke.type';
import { ColumnFactory } from './column';
const ProjectList: React.FC = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<ProjectConf[]>([]);
  const getProjects = useCallback(() => {
    invoke<ProjectConf[]>('get_project_conf').then((res) => {
      setList(res);
    });
  }, []);
  const deleteAction = (id: string) => {
    invoke<ResponseType>('delete_project_conf', {
      data: id,
    }).then((res) => {
      if (res.code === ResponseCode.SUCCEEDED) {
        getProjects();
        message.success(t('common.deleteSucceeded'));
      }
    });
  };
  useEffect(() => {
    getProjects();
  }, [getProjects]);
  return (
    <Card
      title={t('projects.listTitle')}
      bordered={false}
      extra={
        <Button type="primary">
          <Link to="/projects/create">{t('projects.add.buttonText')}</Link>
        </Button>
      }
    >
      <Table
        columns={ColumnFactory(deleteAction)}
        dataSource={list ?? []}
        scroll={{
          x: 'max-content',
        }}
      />
    </Card>
  );
};
export default ProjectList;
