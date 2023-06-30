import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CONSTANT from '../../common/constant';
import {
  ThemeModeEnum,
  ColorSchemeEnum,
  FontFamilyEnum,
} from '../../common/enum';
import { SupportLanguage } from '../../locale';
export interface IUserConfigState {
  currentThemeMode: ThemeModeEnum;
  currentColorScheme: ColorSchemeEnum;
  lang: SupportLanguage;
  fontFamily: FontFamilyEnum;
}

export const userConfigInitialState: IUserConfigState = {
  currentThemeMode: ThemeModeEnum.Light,
  currentColorScheme: ColorSchemeEnum.Blue,
  lang: SupportLanguage.zhCN,
  fontFamily: FontFamilyEnum.Inter,
};
const config = createSlice({
  name: 'config',
  initialState: userConfigInitialState,
  reducers: {
    setCurrentThemeMode: (state, action: PayloadAction<ThemeModeEnum>) => {
      state.currentThemeMode = action.payload;
    },
    setCurrentColorScheme: (state, action: PayloadAction<ColorSchemeEnum>) => {
      state.currentColorScheme = action.payload;
    },
    setCurrentLang: (state, action: PayloadAction<SupportLanguage>) => {
      state.lang = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<FontFamilyEnum>) => {
      state.fontFamily = action.payload;
    },
  },
});
export const {
  setCurrentThemeMode,
  setCurrentColorScheme,
  setCurrentLang,
  setFontFamily,
} = config.actions;
export default config.reducer;
