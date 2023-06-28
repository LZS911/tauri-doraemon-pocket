import zhCN from './zh-CN';
import enUS from './en-US';
import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LocalStorageWrapper from '../utils/LocalStorageWrapper';
import { Dictionary, TemplateKeyPath } from '../typing/common.type';
import CONSTANT from '../common/constant';

export type I18nKey = TemplateKeyPath<typeof zhCN.translation>;

enum SupportLanguage {
  zhCN = 'zh-CN',
  enUS = 'en-US',
}

i18n.use(initReactI18next).init({
  resources: {
    [SupportLanguage.zhCN]: zhCN,
    [SupportLanguage.enUS]: enUS,
  },
  lng: LocalStorageWrapper.getOrDefault(
    CONSTANT.LANGUAGE_STORAGE_KEY,
    SupportLanguage.zhCN
  ),
  fallbackLng: SupportLanguage.zhCN,
  interpolation: {
    escapeValue: false,
  },
});

const t = (key: I18nKey, dic?: Dictionary) => {
  return i18n.t(key, dic);
};

export { SupportLanguage, t };
export default i18n;
