import {
  BgColorsOutlined,
  CloseCircleOutlined,
  FontColorsOutlined,
  HighlightOutlined,
  LayoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useToggle } from 'ahooks';
import { Collapse, Drawer } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CollapseContentProps,
  CollapseKeyEnum,
  colorSchemeList,
  fontFamilyList,
  ThemeLayoutTypeEnum,
  themeLayoutTypeList,
  themeModeList,
} from '.';
import {
  ColorSchemeEnum,
  FontFamilyEnum,
  ThemeModeEnum,
} from '../../../../common/enum';
import ThemeBase from '../../../../components/ThemeBase';
import { useFontFamily } from '../../../../customHooks/useFontFamily';
import useTheme from '../../../../customHooks/useTheme';
import useLayoutRedux from '../../useLayoutRedux';
import CollapseContent from './CollapseContent';
import CollapseHeaderWrapper from './CollapseHeaderWrapper';

const Customization: React.FC = () => {
  const { t } = useTranslation();
  const [customDrawVisibility, { toggle: toggleCustomDrawVisibility }] =
    useToggle(false);
  const { isExpandSider, setIsExpandSider } = useLayoutRedux();
  const {
    currentThemeMode,
    changeThemeMode,
    currentColorScheme,
    changeColorScheme,
  } = useTheme();

  const { currentFontFamily, changeFontFamily } = useFontFamily();

  const themeLayoutPanelChangeEvent: CollapseContentProps<ThemeLayoutTypeEnum>['onChange'] =
    (val) => {
      if (val === ThemeLayoutTypeEnum.DEFAULT && !isExpandSider) {
        setIsExpandSider(true);
        return;
      }

      if (val === ThemeLayoutTypeEnum.MINI && isExpandSider) {
        setIsExpandSider(false);
        return;
      }
    };

  const themeModePanelChangeEvent: CollapseContentProps<ThemeModeEnum>['onChange'] =
    (mode) => {
      mode && changeThemeMode(mode);
    };

  const colorSchemePanelChangeEvent: CollapseContentProps<ColorSchemeEnum>['onChange'] =
    (mode) => {
      mode && changeColorScheme(mode);
    };

  const fontFamilyPanelChangeEvent: CollapseContentProps<FontFamilyEnum>['onChange'] =
    (font) => {
      font && changeFontFamily(font);
    };

  return (
    <>
      <ThemeBase.Icon
        data-testid="draw-switch-icon"
        icon={<SettingOutlined className="text-[1rem]" />}
        onClick={toggleCustomDrawVisibility}
        className="mr-7 bg-slate-100 dark:bg-black"
      />

      <Drawer
        closable={false}
        placement="right"
        visible={customDrawVisibility}
        onClose={toggleCustomDrawVisibility}
        bodyStyle={{
          padding: 0,
          width: '100%',
        }}
        contentWrapperStyle={{
          width: '30%',
          minWidth: 200,
          maxWidth: 340,
        }}
      >
        <ThemeBase.Paper className="h-full w-full ">
          <div className="sticky top-0 z-[1000] flex items-center justify-between bg-primary p-5 text-lg font-medium text-white dark:text-black">
            {t('layout.header.customization.title')}
            <CloseCircleOutlined
              className="cursor-pointer"
              onClick={toggleCustomDrawVisibility}
            />
          </div>
          <Collapse
            expandIconPosition="end"
            defaultActiveKey={Object.values(CollapseKeyEnum)}
          >
            <Collapse.Panel
              key={CollapseKeyEnum.THEME_LAYOUT}
              header={
                <CollapseHeaderWrapper
                  icon={<LayoutOutlined />}
                  title={t(
                    'layout.header.customization.themeLayoutPanel.title'
                  )}
                  subTitle={t(
                    'layout.header.customization.themeLayoutPanel.subTitle'
                  )}
                />
              }
            >
              <CollapseContent<ThemeLayoutTypeEnum>
                value={
                  isExpandSider
                    ? ThemeLayoutTypeEnum.DEFAULT
                    : ThemeLayoutTypeEnum.MINI
                }
                list={themeLayoutTypeList()}
                onChange={themeLayoutPanelChangeEvent}
              />
            </Collapse.Panel>

            <Collapse.Panel
              header={
                <CollapseHeaderWrapper
                  icon={<HighlightOutlined />}
                  title={t('layout.header.customization.themeModePanel.title')}
                  subTitle={t(
                    'layout.header.customization.themeModePanel.subTitle'
                  )}
                />
              }
              key={CollapseKeyEnum.THEME_MODE}
            >
              <CollapseContent<ThemeModeEnum>
                value={currentThemeMode}
                list={themeModeList()}
                onChange={themeModePanelChangeEvent}
              />
            </Collapse.Panel>

            <Collapse.Panel
              header={
                <CollapseHeaderWrapper
                  icon={<BgColorsOutlined />}
                  title={t(
                    'layout.header.customization.colorSchemePanel.title'
                  )}
                  subTitle={t(
                    'layout.header.customization.colorSchemePanel.subTitle'
                  )}
                />
              }
              key={CollapseKeyEnum.COLOR_SCHEME}
            >
              <CollapseContent<ColorSchemeEnum>
                value={currentColorScheme}
                list={colorSchemeList()}
                onChange={colorSchemePanelChangeEvent}
              />
            </Collapse.Panel>

            <Collapse.Panel
              header={
                <CollapseHeaderWrapper
                  icon={<FontColorsOutlined />}
                  title={t('layout.header.customization.fontFamilyPanel.title')}
                  subTitle={t(
                    'layout.header.customization.fontFamilyPanel.subTitle'
                  )}
                />
              }
              key={CollapseKeyEnum.FONT_FAMILY}
            >
              <CollapseContent<FontFamilyEnum>
                value={currentFontFamily}
                list={fontFamilyList()}
                onChange={fontFamilyPanelChangeEvent}
              />
            </Collapse.Panel>
          </Collapse>
        </ThemeBase.Paper>
      </Drawer>
    </>
  );
};

export default Customization;
