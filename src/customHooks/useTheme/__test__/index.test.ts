import { act, renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANT from '../../../common/constant';
import { ColorSchemeEnum, ThemeModeEnum } from '../../../common/enum';
import useTheme, { getCurrentColorSchemeStrings, useInitTheme } from '../index';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

describe('test useTheme', () => {
  const useSelectorMock: jest.Mock = useSelector as jest.Mock;
  const useDispatchMock: jest.Mock = useDispatch as jest.Mock;
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => dispatchMock);
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        userConfig: {
          currentThemeMode: ThemeModeEnum.Light,
          currentColorScheme: ColorSchemeEnum.Blue,
        },
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should match snapshot for getCurrentColorSchemeStrings', () => {
    expect(
      getCurrentColorSchemeStrings(true, ColorSchemeEnum.Blue)
    ).toMatchSnapshot();
    expect(
      getCurrentColorSchemeStrings(true, ColorSchemeEnum.Green)
    ).toMatchSnapshot();
    expect(
      getCurrentColorSchemeStrings(true, ColorSchemeEnum.Purple)
    ).toMatchSnapshot();
    expect(
      getCurrentColorSchemeStrings(false, ColorSchemeEnum.Blue)
    ).toMatchSnapshot();
    expect(
      getCurrentColorSchemeStrings(false, ColorSchemeEnum.Green)
    ).toMatchSnapshot();
    expect(
      getCurrentColorSchemeStrings(false, ColorSchemeEnum.Purple)
    ).toMatchSnapshot();
  });

  test('should set theme mode and color scheme use default value', () => {
    renderHook(() => useInitTheme());
    expect(dispatchMock).toBeCalledTimes(0);
    expect(
      document.documentElement.classList.contains(ColorSchemeEnum.Blue)
    ).toBeTruthy();
    expect(
      document.documentElement.classList.contains(ThemeModeEnum.Dark)
    ).toBeFalsy();
  });

  test('should be expected change theme when theme mode is light', async () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.currentThemeMode).toBe(ThemeModeEnum.Light);
    expect(result.current.currentColorScheme).toBe(ColorSchemeEnum.Blue);
    expect(result.current.isDark).toBeFalsy();

    await act(() => {
      result.current.changeThemeMode(ThemeModeEnum.Light);
    });

    expect(dispatchMock).toBeCalledTimes(0);
    expect(
      document.documentElement.classList.contains(ThemeModeEnum.Dark)
    ).toBeFalsy();

    await act(() => {
      result.current.changeColorScheme(ColorSchemeEnum.Blue);
    });
    expect(dispatchMock).toBeCalledTimes(0);
    expect(
      document.documentElement.classList.contains(ColorSchemeEnum.Blue)
    ).toBeTruthy();

    await act(() => {
      result.current.changeColorScheme(ColorSchemeEnum.Green);
    });
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setCurrentColorScheme',
      payload: ColorSchemeEnum.Green,
    });
    expect(
      document.documentElement.classList.contains(ColorSchemeEnum.Green)
    ).toBeTruthy();
    expect(
      document.documentElement.classList.contains(ColorSchemeEnum.Blue)
    ).toBeFalsy();
    dispatchMock.mockClear();

    await act(() => {
      result.current.changeColorScheme(ColorSchemeEnum.Purple);
    });
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setCurrentColorScheme',
      payload: ColorSchemeEnum.Purple,
    });
    expect(
      document.documentElement.classList.contains(ColorSchemeEnum.Purple)
    ).toBeTruthy();
    expect(
      document.documentElement.classList.contains(ColorSchemeEnum.Green)
    ).toBeFalsy();
    dispatchMock.mockClear();

    await act(() => {
      result.current.changeThemeMode(ThemeModeEnum.Dark);
    });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setCurrentThemeMode',
      payload: ThemeModeEnum.Dark,
    });
    expect(
      document.documentElement.classList.contains(ThemeModeEnum.Dark)
    ).toBeTruthy();
    expect(
      document.documentElement.classList.contains(ColorSchemeEnum.Purple)
    ).toBeFalsy();
    expect(
      document.documentElement.classList.contains(
        `dark-${ColorSchemeEnum.Purple}`
      )
    ).toBeTruthy();
    dispatchMock.mockClear();
  });

  test('should set theme mode when default mode is dark', () => {
    localStorage.setItem(CONSTANT.THEME_MODE, ThemeModeEnum.Dark);
    renderHook(() => useInitTheme());
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setCurrentThemeMode',
      payload: ThemeModeEnum.Dark,
    });
    expect(
      document.documentElement.classList.contains(ThemeModeEnum.Dark)
    ).toBeTruthy();

    localStorage.setItem(CONSTANT.THEME_MODE, ThemeModeEnum.Light);
    document.documentElement.classList.remove(ThemeModeEnum.Dark);
    document.documentElement.classList.remove(`dark-${ColorSchemeEnum.Blue}`);
  });

  test('should be expected change theme when theme mode is dark', async () => {
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        userConfig: {
          currentThemeMode: ThemeModeEnum.Dark,
          currentColorScheme: ColorSchemeEnum.Green,
        },
      });
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.currentThemeMode).toBe(ThemeModeEnum.Dark);
    expect(result.current.currentColorScheme).toBe(ColorSchemeEnum.Green);
    expect(result.current.isDark).toBeTruthy();

    await act(() => {
      result.current.changeColorScheme(ColorSchemeEnum.Blue);
    });
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setCurrentColorScheme',
      payload: ColorSchemeEnum.Blue,
    });
    expect(
      document.documentElement.classList.contains(
        `dark-${ColorSchemeEnum.Blue}`
      )
    ).toBeTruthy();
    expect(
      document.documentElement.classList.contains(ColorSchemeEnum.Blue)
    ).toBeFalsy();

    dispatchMock.mockClear();

    await act(() => {
      result.current.changeThemeMode(ThemeModeEnum.Light);
    });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setCurrentThemeMode',
      payload: ThemeModeEnum.Light,
    });
    expect(
      document.documentElement.classList.contains(ThemeModeEnum.Dark)
    ).toBeFalsy();
  });
});
