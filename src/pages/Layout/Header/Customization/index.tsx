import React from 'react';
import {
  ThemeModeEnum,
  ColorSchemeEnum,
  FontFamilyEnum,
} from '../../../../common/enum';
import i18n from '../../../../locale';
import Customization from './Customization';
export interface CollapseContentProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (val?: T) => void;
  list: Array<{
    imgSrc?: string;
    content?: React.ReactNode;
    describe?: string;
    value: T;
    key: string;
    imgClass?: string;
  }>;
}
export enum CollapseKeyEnum {
  THEME_LAYOUT,
  THEME_MODE,
  COLOR_SCHEME,
  FONT_FAMILY,
}
export enum ThemeLayoutTypeEnum {
  DEFAULT,
  MINI,
}
export const themeLayoutTypeList: () => CollapseContentProps<ThemeLayoutTypeEnum>['list'] =
  () => [
    {
      key: 'default',
      describe: i18n.t(
        'layout.header.customization.themeLayoutPanel.defaultType'
      ),
      value: ThemeLayoutTypeEnum.DEFAULT,
      content: <img src="/static/images/layout-default.svg" />,
    },
    {
      key: 'mini',
      describe: i18n.t('layout.header.customization.themeLayoutPanel.miniType'),
      value: ThemeLayoutTypeEnum.MINI,
      content: <img src="/static/images/layout-mini.svg" />,
    },
  ];
export const themeModeList: () => CollapseContentProps<ThemeModeEnum>['list'] =
  () => [
    {
      key: 'light',
      describe: i18n.t('layout.header.customization.themeModePanel.light'),
      value: ThemeModeEnum.Light,
      content: <img src="/static/images/theme-light.svg" />,
    },
    {
      key: 'dark',
      describe: i18n.t('layout.header.customization.themeModePanel.dark'),
      value: ThemeModeEnum.Dark,
      imgSrc: '/static/images/theme-dark.svg',
      content: <img src="/static/images/theme-dark.svg" />,
    },
  ];
export const colorSchemeList: () => CollapseContentProps<ColorSchemeEnum>['list'] =
  () => {
    return [
      {
        key: 'blue',
        describe: i18n.t(
          'layout.header.customization.colorSchemePanel.default'
        ),
        value: ColorSchemeEnum.Blue,
        content: (
          <img
            src="/static/images/color-scheme-blue.svg"
            className="bg-[#1890ff] dark:bg-[#177ddc]"
          />
        ),
      },
      {
        key: 'green',
        describe: i18n.t('layout.header.customization.colorSchemePanel.theme1'),
        value: ColorSchemeEnum.Green,
        content: (
          <img
            src="/static/images/color-scheme-green.svg"
            className="bg-[#00a854] dark:bg-[#03934c]"
          />
        ),
      },
      {
        key: 'purple',
        describe: i18n.t('layout.header.customization.colorSchemePanel.theme2'),
        value: ColorSchemeEnum.Purple,
        content: (
          <img
            src="/static/images/color-scheme-purple.svg"
            className="bg-[#7265e6] dark:bg-[#6559c7]"
          />
        ),
      },
    ];
  };
export const fontFamilyList: () => CollapseContentProps<FontFamilyEnum>['list'] =
  () => [
    {
      key: 'default',
      describe: i18n.t('layout.header.customization.fontFamilyPanel.default'),
      value: FontFamilyEnum.Default,
      content: (
        <>
          <div className="w-14 font-sans font-bold">Aa</div>
        </>
      ),
    },
    {
      key: 'inter',
      describe: i18n.t('layout.header.customization.fontFamilyPanel.inter'),
      value: FontFamilyEnum.Inter,
      content: (
        <>
          <div className="w-14 font-inter font-bold">Aa</div>
        </>
      ),
    },
    {
      key: 'poppins',
      describe: i18n.t('layout.header.customization.fontFamilyPanel.poppins'),
      value: FontFamilyEnum.Poppins,
      content: (
        <>
          <div className="w-14 font-poppins font-bold">Aa</div>
        </>
      ),
    },
    {
      key: 'roboto',
      describe: i18n.t('layout.header.customization.fontFamilyPanel.roboto'),
      value: FontFamilyEnum.Roboto,
      content: (
        <>
          <div className="w-14 font-roboto font-bold">Aa</div>
        </>
      ),
    },
    {
      key: 'serif',
      describe: i18n.t('layout.header.customization.fontFamilyPanel.serif'),
      value: FontFamilyEnum.Serif,
      content: (
        <>
          <div className="w-14 font-serif font-bold">Aa</div>
        </>
      ),
    },
    {
      key: 'mono',
      describe: i18n.t('layout.header.customization.fontFamilyPanel.mono'),
      value: FontFamilyEnum.Mono,
      content: (
        <>
          <div className="w-14 font-mono font-bold">Aa</div>
        </>
      ),
    },
    {
      key: 'publicSans',
      describe: i18n.t(
        'layout.header.customization.fontFamilyPanel.publicSans'
      ),
      value: FontFamilyEnum.PublicSans,
      content: (
        <>
          <div className="font-publicSans font-bold">Aa</div>
        </>
      ),
    },
  ];
export default Customization;
