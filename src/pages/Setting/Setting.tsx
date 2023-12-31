import { invoke } from '@tauri-apps/api';
import { Button, Form, Popconfirm, Space, Tabs, TabsProps } from 'antd';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingFormFields } from '.';
import { FormLayout } from '../../common/data';
import FilePath from '../../components/FilePath';
import PageHeader from '../../components/PageHeader';
import useLanguage from '../../customHooks/useLanguage';
import useTheme from '../../customHooks/useTheme';
import { AppConfType } from '../../typing/invoke.type';
import { APP_CONF_PATH } from '../../utils/path';
import GeneralForm from './GeneralForm';
import GenerateForm from './GenerateForm';

console.log((window as any).generate_api);

const Setting: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<SettingFormFields>();
  const { changeColorScheme, changeThemeMode } = useTheme();
  const { changeLanguage } = useLanguage();
  const tabItems: TabsProps['items'] = useMemo(() => {
    const e: TabsProps['items'] = [
      {
        key: 'general',
        label: t('setting.title.general'),
        children: <GeneralForm />,
      },
      {
        key: 'genApi',
        label: t('setting.title.generateApi'),
        children: <GenerateForm />,
      },
    ];
    return e;
  }, [t]);
  const onReset = async () => {
    try {
      const conf = await invoke<AppConfType>('reset_app_conf');
      setConf(conf);
      changeColorScheme(conf.color_schema);
      changeThemeMode(conf.theme);
      changeLanguage(conf.lang);
    } catch (err) {
      console.error(err);
    }
  };
  const onApply = async (values: SettingFormFields) => {
    const params: AppConfType = {
      theme: values.theme,
      color_schema: values.themeColorScheme,
      lang: values.language,
      auto_update: values.autoUpdate,
      swagger_path: values.defaultSwaggerPath,
      projects: values.projects ?? [],
    };
    await invoke('form_confirm', {
      data: params,
    });
    changeColorScheme(values.themeColorScheme);
    changeThemeMode(values.theme);
    changeLanguage(values.language);
    getConf();
  };
  const setConf = useCallback(
    (conf: AppConfType) => {
      form.setFieldsValue({
        theme: conf.theme,
        themeColorScheme: conf.color_schema,
        language: conf.lang,
        autoUpdate: conf.auto_update,
        defaultSwaggerPath: conf.swagger_path,
      });
    },
    [form]
  );
  const getConf = useCallback(() => {
    invoke<AppConfType>('get_app_conf')
      .then((conf) => {
        setConf(conf);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setConf]);
  useEffect(() => {
    getConf();
  }, [getConf]);
  return (
    <section>
      <PageHeader
        title={t('router.title.setting')}
        desc={t('setting.pageDesc')}
      >
        <FilePath paths={APP_CONF_PATH} />
      </PageHeader>

      <Form<SettingFormFields> form={form} {...FormLayout} onFinish={onApply}>
        <Tabs items={tabItems} />

        <Form.Item label=" " colon={false}>
          <Space>
            <Button type="primary" htmlType="submit">
              {t('common.apply')}
            </Button>

            <Popconfirm
              okText={t('common.yes')}
              cancelText={t('common.no')}
              title={<span>{t('setting.resetConfirmTips')}</span>}
              onConfirm={onReset}
            >
              <Button>{t('setting.reset')}</Button>
            </Popconfirm>
          </Space>
        </Form.Item>
      </Form>
    </section>
  );
};
export default Setting;
