import { Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormLayout } from '../../common/data';
import { RepositoryKind } from '../../common/enum';
import { ProjectConf } from '../../typing/invoke.type';
export type ProjectFormFields = {
  id: string;
  name: string;
  token: string;
  category: RepositoryKind;
  path: string;
  gitlabUrl: string;
  gitlabToken: string;
};
export type ProjectFormProps = {
  submit: (values: ProjectFormFields) => void;
  defaultData?: ProjectConf;
};
const ProjectForm: React.FC<ProjectFormProps> = ({ submit, defaultData }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<ProjectFormFields>();
  const projectCategory = Form.useWatch('category', form);
  useEffect(() => {
    if (defaultData) {
      form.setFieldsValue({
        id: defaultData.id,
        name: defaultData.name,
        category: defaultData.category,
        token: defaultData.token,
        path: defaultData.path,
      });
    }
  }, [defaultData, form]);
  return (
    <Form<ProjectFormFields>
      form={form}
      {...FormLayout}
      onFinish={submit}
      labelWrap
    >
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name="id"
        label={t('projects.form.id')}
      >
        <Input disabled={!!defaultData} />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name="name"
        label={t('projects.form.name')}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name="token"
        label={t('projects.form.token')}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name="path"
        label={t('projects.form.path')}
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name="category"
        label={t('projects.form.category')}
      >
        <Select
          onChange={() => {
            form.setFieldsValue({
              gitlabToken: '',
              gitlabUrl: '',
            });
          }}
          options={Object.keys(RepositoryKind).map((key) => ({
            label: key,
            value: RepositoryKind[key as keyof typeof RepositoryKind],
          }))}
        />
      </Form.Item>

      {projectCategory === RepositoryKind.GitLab && (
        <>
          <Form.Item
            rules={[
              {
                required: true,
                type: 'url',
              },
            ]}
            name="gitlabUrl"
            label={t('projects.form.gitlabUrl')}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="gitlabToken"
            label="Gitlab Token"
            initialValue=""
          >
            <Input />
          </Form.Item>
        </>
      )}

      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          {t('common.submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ProjectForm;
