import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CONSTANT from '../../common/constant';
import {
  ThemeModeEnum,
  ColorSchemeEnum,
  FontFamilyEnum,
} from '../../common/enum';
import { SupportLanguage } from '../../locale';
import LocalStorageWrapper from '../../utils/LocalStorageWrapper';
export interface IUserConfigState {
  username: string;
  emailAddress: string;
  userProfile: string;
  isLogin: boolean;
  token: string;
  currentThemeMode: ThemeModeEnum;
  currentColorScheme: ColorSchemeEnum;
  lang: SupportLanguage;
  fontFamily: FontFamilyEnum;
}
export type IUserLoginInfo = Pick<
  IUserConfigState,
  'username' | 'emailAddress' | 'userProfile'
>;
export type IUserLoginState = Pick<IUserConfigState, 'token' | 'isLogin'>;
const localToken = LocalStorageWrapper.get(CONSTANT.TOKEN);
export const userConfigInitialState: IUserConfigState = {
  username: '',
  emailAddress: '',
  userProfile: '',
  isLogin: !!localToken,
  token: localToken ?? '',
  currentThemeMode: LocalStorageWrapper.getOrDefault(
    CONSTANT.THEME_MODE,
    ThemeModeEnum.Light
  ),
  currentColorScheme: LocalStorageWrapper.getOrDefault(
    CONSTANT.COLOR_SCHEME,
    ColorSchemeEnum.Blue
  ),
  lang: LocalStorageWrapper.getOrDefault(
    CONSTANT.LANGUAGE_STORAGE_KEY,
    SupportLanguage.zhCN
  ),
  fontFamily: LocalStorageWrapper.getOrDefault(
    CONSTANT.FONT_FAMILY,
    FontFamilyEnum.Inter
  ),
};
const userConfig = createSlice({
  name: 'userConfig',
  initialState: userConfigInitialState,
  reducers: {
    setLoginUserInfo: (state, action: PayloadAction<IUserLoginInfo>) => {
      state.username = action.payload.username;
      state.emailAddress = action.payload.emailAddress;
      state.userProfile = action.payload.userProfile;
    },
    setLoginState: (state, action: PayloadAction<IUserLoginState>) => {
      state.isLogin = action.payload.isLogin;
      state.token = action.payload.token;
      localStorage.setItem(CONSTANT.TOKEN, action.payload.token);
    },
    setCurrentThemeMode: (state, action: PayloadAction<ThemeModeEnum>) => {
      state.currentThemeMode = action.payload;
      LocalStorageWrapper.set(CONSTANT.THEME_MODE, action.payload);
    },
    setCurrentColorScheme: (state, action: PayloadAction<ColorSchemeEnum>) => {
      state.currentColorScheme = action.payload;
      LocalStorageWrapper.set(CONSTANT.COLOR_SCHEME, action.payload);
    },
    setCurrentLang: (state, action: PayloadAction<SupportLanguage>) => {
      state.lang = action.payload;
      LocalStorageWrapper.set(CONSTANT.LANGUAGE_STORAGE_KEY, action.payload);
    },
    setFontFamily: (state, action: PayloadAction<FontFamilyEnum>) => {
      state.fontFamily = action.payload;
      LocalStorageWrapper.set(CONSTANT.FONT_FAMILY, action.payload);
    },
  },
});
export const {
  setLoginUserInfo,
  setLoginState,
  setCurrentThemeMode,
  setCurrentColorScheme,
  setCurrentLang,
  setFontFamily,
} = userConfig.actions;
export default userConfig.reducer;
