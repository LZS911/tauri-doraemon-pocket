import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DarkColorSchemeEnum,
  ThemeModeEnum,
  ColorSchemeEnum,
} from '../../common/enum';
import { IReduxState } from '../../store';
import {
  setCurrentThemeMode as _setCurrentThemeMode,
  setCurrentColorScheme as _setCurrentColorScheme,
} from '../../store/config';
import { IColorSchemeKey } from '../../typing/common.type';
import { baseTypeMatch } from 'rust-like-match';
import { invoke } from '@tauri-apps/api';

const parseTheme = (theme: string) => {
  if (theme.toLocaleLowerCase() === 'dark') {
    return ThemeModeEnum.Dark;
  }

  if (theme.toLocaleLowerCase() === 'light') {
    return ThemeModeEnum.Light;
  }

  return ThemeModeEnum.System;
};

const addClass = (className: string) => {
  if (document.documentElement.classList.contains(className)) {
    return;
  }

  document.documentElement.classList.add(className);
};

const removeClass = (className: string) => {
  if (!document.documentElement.classList.contains(className)) {
    return;
  }

  document.documentElement.classList.remove(className);
};

const themePrimaryToDark = () => {
  const cls = document.documentElement.classList;
  cls.forEach((v) => {
    if (Object.values(ColorSchemeEnum).includes(v as ColorSchemeEnum)) {
      removeClass(v);
      addClass(`dark-${v}`);
    }
  });
};

const themePrimaryToLight = () => {
  const cls = document.documentElement.classList;
  cls.forEach((v) => {
    if (Object.values(DarkColorSchemeEnum).includes(v as DarkColorSchemeEnum)) {
      removeClass(v);
      addClass(v.replace('dark-', ''));
    }
  });
};

export const getCurrentColorSchemeStrings = (
  isDark: boolean,
  currentColorScheme: ColorSchemeEnum
) => {
  const colorSchemeMap = new Map<ColorSchemeEnum, IColorSchemeKey>([
    [
      ColorSchemeEnum.Blue,
      {
        primary: '#1890ff',
        secondary: '#e6f6ff',
        darkPrimary: '#177ddc',
        darkSecondary: '#213752',
      },
    ],
    [
      ColorSchemeEnum.Purple,
      {
        primary: '#7265e6',
        secondary: '#eeedfc',
        darkPrimary: '#6559c7',
        darkSecondary: '#424062',
      },
    ],
    [
      ColorSchemeEnum.Green,
      {
        primary: '#00a854',
        secondary: '#e3f0e7',
        darkPrimary: '#03934c',
        darkSecondary: '#3a5649',
      },
    ],
  ]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const colors = colorSchemeMap.get(currentColorScheme)!;

  if (isDark) {
    return [colors.darkPrimary, colors.darkSecondary];
  }
  return [colors.primary, colors.secondary];
};

export const useInitTheme = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getTheme = async () => {
      invoke<string>('get_theme').then((res) => {
        dispatch(_setCurrentThemeMode(parseTheme(res)));
        if (parseTheme(res) === ThemeModeEnum.Dark) {
          _setDark();
        }
      });

      invoke<ColorSchemeEnum>('get_color_schema').then((res) => {
        dispatch(_setCurrentColorScheme(res));
      });
    };
    const _setDark = () => {
      addClass(ThemeModeEnum.Dark);
      themePrimaryToDark();
    };

    getTheme();
  }, [dispatch]);
};

const useTheme = () => {
  const dispatch = useDispatch();
  const { currentThemeMode, currentColorScheme } = useSelector(
    (state: IReduxState) => {
      return {
        currentThemeMode: state.userConfig.currentThemeMode,
        currentColorScheme: state.userConfig.currentColorScheme,
      };
    }
  );
  const isDark = useMemo(
    () => currentThemeMode === ThemeModeEnum.Dark,
    [currentThemeMode]
  );

  const setCurrentThemeMode = (theme: ThemeModeEnum) => {
    dispatch(_setCurrentThemeMode(theme));
  };

  const setCurrentColorScheme = (theme: ColorSchemeEnum) => {
    dispatch(_setCurrentColorScheme(theme));
  };

  const _setDark = () => {
    addClass(ThemeModeEnum.Dark);
    themePrimaryToDark();
    setCurrentThemeMode(ThemeModeEnum.Dark);
  };

  const _setLight = () => {
    removeClass(ThemeModeEnum.Dark);
    themePrimaryToLight();
    setCurrentThemeMode(ThemeModeEnum.Light);
  };

  const _setColorScheme = (mode: keyof typeof ColorSchemeEnum) => {
    if (isDark) {
      Object.keys(DarkColorSchemeEnum).forEach((key) => {
        if (key === mode) {
          addClass(DarkColorSchemeEnum[key]);
        } else {
          removeClass(
            DarkColorSchemeEnum[key as keyof typeof DarkColorSchemeEnum]
          );
        }
      });
    } else {
      Object.keys(ColorSchemeEnum).forEach((key) => {
        if (key === mode) {
          addClass(ColorSchemeEnum[key]);
        } else {
          removeClass(ColorSchemeEnum[key as keyof typeof ColorSchemeEnum]);
        }
      });
    }

    setCurrentColorScheme(ColorSchemeEnum[mode]);
  };

  const changeThemeMode = (themeMode: ThemeModeEnum) => {
    if (themeMode === currentThemeMode) {
      return;
    }
    if (themeMode === ThemeModeEnum.Dark) {
      _setDark();
    } else {
      _setLight();
    }
  };

  const changeColorScheme = (colorScheme: ColorSchemeEnum) => {
    if (colorScheme === currentColorScheme) {
      return;
    }

    baseTypeMatch(colorScheme, {
      [ColorSchemeEnum.Blue]: () => _setColorScheme('Blue'),
      [ColorSchemeEnum.Green]: () => _setColorScheme('Green'),
      [ColorSchemeEnum.Purple]: () => _setColorScheme('Purple'),
    });
  };

  return {
    currentThemeMode,
    currentColorScheme,
    changeThemeMode,
    changeColorScheme,
    isDark,
  };
};

export default useTheme;
