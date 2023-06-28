import { act, renderHook } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SupportLanguage } from '../../../locale';
import useLanguage from '../index';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.mock('react-i18next', () => {
  return {
    ...jest.requireActual('react-i18next'),
    useTranslation: jest.fn(),
  };
});

describe('test useInitFontFamily and useFontFamily', () => {
  const useSelectorMock: jest.Mock = useSelector as jest.Mock;
  const useDispatchMock: jest.Mock = useDispatch as jest.Mock;
  const useTranslationMock: jest.Mock = useTranslation as jest.Mock;
  const dispatchMock = jest.fn();
  const changeLanguageMock = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => dispatchMock);
    useTranslationMock.mockImplementation(() => {
      return {
        i18n: {
          changeLanguage: changeLanguageMock,
        },
      };
    });
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        userConfig: {
          lang: SupportLanguage.enUS,
        },
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should be get current language  and change language', async () => {
    const { result } = renderHook(() => useLanguage());

    expect(result.current.currentLanguage).toBe(SupportLanguage.enUS);

    await act(() => {
      result.current.changeLanguage(SupportLanguage.zhCN);
    });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setCurrentLang',
      payload: SupportLanguage.zhCN,
    });
    expect(changeLanguageMock).toBeCalledTimes(1);
    expect(changeLanguageMock).toBeCalledWith(SupportLanguage.zhCN);
  });
});
