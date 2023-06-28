import i18n, { SupportLanguage } from '../../../../locale';
import ToggleLanguage from './ToggleLanguage';

export default ToggleLanguage;

export const genLanguageOptions = () => {
  return [
    {
      key: 'zhCN',
      value: SupportLanguage.zhCN,
      text: i18n.t('common.chinese'),
    },
    {
      key: 'enUS',
      value: SupportLanguage.enUS,
      text: i18n.t('common.english'),
    },
  ];
};
