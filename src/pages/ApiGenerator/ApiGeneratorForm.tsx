import { Form, Input, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ApiGeneratorFields, ApiGeneratorFormProps } from '.';
import { FormLayout } from '../../common/data';
import BranchSelect from '../../components/BranchSelect';
import { BranchSelectProps } from '../../components/BranchSelect/index.type';
import useCommonSelectData from '../../hooks/useCommonSelectData';
const ApiGeneratorForm: React.FC<ApiGeneratorFormProps> = ({ submit }) => {
  const { t } = useTranslation();
  const { updateProjects, projectOptions, projects } = useCommonSelectData();

  const [form] = Form.useForm<ApiGeneratorFields>();
  const projectChangeHandle = (id: string) => {
    const currentProject = projects.find((v) => v.id === id);
    form.setFieldsValue({
      outputPath: currentProject?.path ? `${currentProject.path}/src/api` : '',
      token: currentProject?.token ?? '',
      branch: undefined,
    });
  };

  const currentProjectID = Form.useWatch('project', form);
  const branchSelectProps: BranchSelectProps | undefined = useMemo(() => {
    const currentProject = projects.find((v) => v.id === currentProjectID);
    if (currentProject) {
      const param: BranchSelectProps = {
        projectID: currentProjectID,
        projectRepositoryKind: currentProject.category,
        token: currentProject.token,
        gitlabToken: currentProject.gitlab_token,
        gitlabUrl: currentProject.gitlab_url,
      };
      return param;
    }
  }, [currentProjectID, projects]);
  useEffect(() => {
    updateProjects();
  }, [updateProjects]);
  return (
    <Form<ApiGeneratorFields>
      className="w-1/2"
      form={form}
      onFinish={submit}
      {...{
        ...FormLayout,
        wrapperCol: {
          md: {
            span: 18,
            offset: 1,
          },
        },
      }}
    >
      <Form.Item
        name="project"
        label={t('apiGenerate.form.project')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          onChange={projectChangeHandle}
          options={projectOptions}
          allowClear
        />
      </Form.Item>
      <Form.Item
        name="token"
        label="Token"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="outputPath"
        label={t('apiGenerate.form.output')}
        rules={[
          {
            required: true,
            type: 'url',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {branchSelectProps && (
        <Form.Item
          name="branch"
          label={t('apiGenerate.form.branch')}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <BranchSelect {...branchSelectProps} />
        </Form.Item>
      )}
    </Form>
  );
};
export default ApiGeneratorForm;
