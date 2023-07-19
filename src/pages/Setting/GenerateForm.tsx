import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
const GenerateForm: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Form.Item
        name="defaultSwaggerPath"
        label={t('setting.generateForm.swaggerPath')}
      >
        <Input placeholder={t('setting.generateForm.swaggerPlaceholder')} />
      </Form.Item>
    </>
  );
};
export default GenerateForm;
