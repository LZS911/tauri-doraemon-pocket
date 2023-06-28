import {
  ColorSchemeEnum,
  FontFamilyEnum,
  ThemeModeEnum,
} from '../../../common/enum';
import { SupportLanguage } from '../../../locale';
import reducer, {
  userConfigInitialState,
  setLoginUserInfo,
  setLoginState,
  setCurrentThemeMode,
  setCurrentColorScheme,
  setCurrentLang,
  setFontFamily,
} from '../index';

const username = 'test';
const emailAddress = 'test';
const userProfile = 'test';

const isLogin = true;
const token = 'test';

const currentThemeMode = ThemeModeEnum.Dark;
const currentColorScheme = ColorSchemeEnum.Purple;
const lang = SupportLanguage.enUS;
const fontFamily = FontFamilyEnum.Mono;

describe('test store/userConfig', () => {
  test('should create actions', () => {
    expect(setLoginUserInfo({ username, emailAddress, userProfile })).toEqual({
      type: 'userConfig/setLoginUserInfo',
      payload: { username, emailAddress, userProfile },
    });
    expect(setLoginState({ isLogin, token })).toEqual({
      type: 'userConfig/setLoginState',
      payload: { isLogin, token },
    });
    expect(setCurrentThemeMode(currentThemeMode)).toEqual({
      type: 'userConfig/setCurrentThemeMode',
      payload: currentThemeMode,
    });
    expect(setCurrentColorScheme(currentColorScheme)).toEqual({
      type: 'userConfig/setCurrentColorScheme',
      payload: currentColorScheme,
    });
    expect(setCurrentLang(lang)).toEqual({
      type: 'userConfig/setCurrentLang',
      payload: lang,
    });
    expect(setFontFamily(fontFamily)).toEqual({
      type: 'userConfig/setFontFamily',
      payload: fontFamily,
    });
  });

  test('should modify user info when dispatch setLoginUserInfo action', () => {
    const newState = reducer(
      userConfigInitialState,
      setLoginUserInfo({ username, emailAddress, userProfile })
    );

    expect(newState).not.toEqual(userConfigInitialState);
    expect(newState).toEqual({
      ...userConfigInitialState,
      username,
      userProfile,
      emailAddress,
    });
  });

  test('should modify user login state when dispatch setLoginState action', () => {
    const newState = reducer(
      userConfigInitialState,
      setLoginState({ isLogin, token })
    );

    expect(newState).not.toEqual(userConfigInitialState);
    expect(newState).toEqual({
      ...userConfigInitialState,
      isLogin,
      token,
    });
  });

  test('should modify currentThemeMode when dispatch setCurrentThemeMode action', () => {
    const newState = reducer(
      userConfigInitialState,
      setCurrentThemeMode(currentThemeMode)
    );

    expect(newState).not.toEqual(userConfigInitialState);
    expect(newState).toEqual({
      ...userConfigInitialState,
      currentThemeMode,
    });
  });

  test('should modify currentColorScheme when dispatch setCurrentColorScheme action', () => {
    const newState = reducer(
      userConfigInitialState,
      setCurrentColorScheme(currentColorScheme)
    );

    expect(newState).not.toEqual(userConfigInitialState);
    expect(newState).toEqual({
      ...userConfigInitialState,
      currentColorScheme,
    });
  });

  test('should modify lang when dispatch setCurrentLang action', () => {
    const newState = reducer(userConfigInitialState, setCurrentLang(lang));

    expect(newState).not.toEqual(userConfigInitialState);
    expect(newState).toEqual({
      ...userConfigInitialState,
      lang,
    });
  });

  test('should modify fontFamily when dispatch setFontFamily action', () => {
    const newState = reducer(userConfigInitialState, setFontFamily(fontFamily));

    expect(newState).not.toEqual(userConfigInitialState);
    expect(newState).toEqual({
      ...userConfigInitialState,
      fontFamily,
    });
  });
});
