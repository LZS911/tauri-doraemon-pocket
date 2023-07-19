import { ProjectConf } from '../../typing/invoke.type';
import { TableColumn } from '../../typing/common.type';
import { t } from '../../locale';
import { RepositoryKind } from '../../common/enum';
import { Button, Popconfirm, Space } from 'antd';
import { Link } from 'react-router-dom';
export const ColumnFactory: (
  deleteAction: (id: string) => void
) => TableColumn<ProjectConf> = (deleteAction) => {
  return [
    {
      dataIndex: 'id',
      title: 'ID',
    },
    {
      dataIndex: 'name',
      title: t('projects.column.name'),
    },
    {
      dataIndex: 'token',
      title: 'Token',
    },
    {
      dataIndex: 'category',
      title: t('projects.column.category'),
      render(category: RepositoryKind) {
        return category;
      },
    },
    {
      dataIndex: 'path',
      title: t('projects.column.path'),
    },
    {
      dataIndex: 'gitlab_url',
      title: t('projects.column.gitlabUrl'),
    },
    {
      dataIndex: 'gitlab_token',
      title: 'Gitlab Token',
    },
    {
      dataIndex: 'operator',
      title: t('common.operator'),
      fixed: 'right',
      render(_, record: ProjectConf) {
        return (
          <Space>
            <Button type="link">
              <Link to={`/projects/update/${record.id}`}>
                {t('common.edit')}
              </Link>
            </Button>
            <Popconfirm
              onConfirm={() => deleteAction(record.id)}
              placement="topLeft"
              okText={t('common.ok')}
              title={t('common.deleteConfirm', {
                id: record.id,
              })}
            >
              <Button danger type="link">
                {t('common.delete')}
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
};
