import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SupportLanguage } from '../../locale';
import { IReduxState } from '../../store';
import { setCurrentLang } from '../../store/userConfig';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { useState } from 'react';
import { Locale } from 'antd/es/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale(SupportLanguage.zhCN);

const useLanguage = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLanguage = (lang: SupportLanguage) => {
    dispatch(setCurrentLang(lang));
    i18n.changeLanguage(lang);
    setAntdLocale(lang === SupportLanguage.enUS ? enUS : zhCN);
    dayjs.locale(lang === SupportLanguage.enUS ? 'en' : 'zh-cn');
  };

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
