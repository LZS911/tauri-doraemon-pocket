import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SupportLanguage } from '../../locale';
import { IReduxState } from '../../store';
import { setCurrentLang } from '../../store/config';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { useCallback, useEffect, useState } from 'react';
import { Locale } from 'antd/es/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { invoke } from '@tauri-apps/api';

dayjs.locale(SupportLanguage.zhCN);

export const useInitLanguage = () => {
  const { changeLanguage } = useLanguage();

  useEffect(() => {
    const getLanguage = () => {
      invoke<SupportLanguage>('get_lang').then((lang) => {
        changeLanguage(lang);
      });
    };
    getLanguage();
  }, [changeLanguage]);
};

const useLanguage = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLanguage = useCallback(
    (lang: SupportLanguage) => {
      dispatch(setCurrentLang(lang));
      i18n.changeLanguage(lang);
      setAntdLocale(lang === SupportLanguage.enUS ? enUS : zhCN);
      dayjs.locale(lang === SupportLanguage.enUS ? 'en' : 'zh-cn');
    },
    [dispatch, i18n]
  );

  const currentLanguage = useSelector((state: IReduxState) => {
    return state.userConfig.lang;
  });

  const [antdLocale, setAntdLocale] = useState<Locale>(
    SupportLanguage.enUS === currentLanguage ? enUS : zhCN
  );

  return {
    changeLanguage,
    currentLanguage,
    antdLocale,
  };
};

export default useLanguage;
