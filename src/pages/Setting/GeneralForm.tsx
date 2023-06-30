import { QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Radio, Space, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  AutoUpdateEnum,
  ColorSchemeEnum,
  ThemeModeEnum,
} from '../../common/enum';
import { SupportLanguage } from '../../locale';
const GeneralForm: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Form.Item name="theme" label={t('setting.generalForm.theme')}>
        <Radio.Group>
          <Radio value={ThemeModeEnum.Light}>
            {t('setting.generalForm.light')}
          </Radio>
          <Radio value={ThemeModeEnum.Dark}>
            {t('setting.generalForm.dark')}
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="themeColorScheme"
        label={t('setting.generalForm.colorTheme')}
      >
        <Radio.Group>
          <Radio value={ColorSchemeEnum.Blue}>
            {t('setting.generalForm.blue')}
          </Radio>
          <Radio value={ColorSchemeEnum.Green}>
            {t('setting.generalForm.green')}
          </Radio>
          <Radio value={ColorSchemeEnum.Purple}>
            {t('setting.generalForm.purple')}
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="language" label={t('setting.generalForm.language')}>
        <Radio.Group>
          <Radio value={SupportLanguage.zhCN}>
            {t('setting.generalForm.zhCN')}
          </Radio>
          <Radio value={SupportLanguage.enUS}>
            {t('setting.generalForm.enUS')}
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="autoUpdate"
        label={
          <Space size={2}>
            {t('setting.generalForm.autoUpdate')}
            <Tooltip
              title={
                <div>
                  <div>{t('setting.generalForm.autoUpdatePolicy')}</div>
                  <div>
                    <strong>Prompt</strong>:
                    {t('setting.generalForm.promptToInstall')}
                  </div>
                  <div>
                    <strong>Silent: </strong>
                    {t('setting.generalForm.silentToInstall')}
                  </div>
                </div>
              }
            >
              <QuestionCircleOutlined className="text-primary dark:text-primary" />
            </Tooltip>
          </Space>
        }
      >
        <Radio.Group>
          <Radio value={AutoUpdateEnum.Prompt}>Prompt</Radio>
          <Radio value={AutoUpdateEnum.Silent}>Silent</Radio>
        </Radio.Group>
      </Form.Item>
    </>
  );
};
export default GeneralForm;
