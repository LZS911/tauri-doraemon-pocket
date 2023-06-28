import { act, renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANT from '../../../common/constant';
import { FontFamilyEnum } from '../../../common/enum';
import LocalStorageWrapper from '../../../utils/LocalStorageWrapper';
import { useInitFontFamily, useFontFamily } from '../index';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

describe('test useInitFontFamily and useFontFamily', () => {
  const useSelectorMock: jest.Mock = useSelector as jest.Mock;
  const useDispatchMock: jest.Mock = useDispatch as jest.Mock;
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => dispatchMock);
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        userConfig: {
          fontFamily: FontFamilyEnum.Default,
        },
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should use the default font family, that does not have any fonts class', async () => {
    renderHook(() => useInitFontFamily());

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setFontFamily',
      payload: FontFamilyEnum.Default,
    });

    expect(document.body.classList.length).toBe(0);

    const { result } = renderHook(() => useFontFamily());

    await act(() => {
      result.current.changeFontFamily(FontFamilyEnum.Inter);
    });

    expect(document.body.classList.length).toBe(1);
    expect(document.body.classList[0]).toBe(`font-${FontFamilyEnum.Inter}`);

    renderHook(() => useInitFontFamily());
    expect(document.body.classList.length).toBe(0);
  });

  test('should be get current font family and change font family', async () => {
    const { result } = renderHook(() => useFontFamily());

    expect(result.current.currentFontFamily).toBe(FontFamilyEnum.Default);

    await act(() => {
      result.current.changeFontFamily(FontFamilyEnum.Mono);
    });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setFontFamily',
      payload: FontFamilyEnum.Mono,
    });
    expect(document.body.classList.length).toBe(1);
    expect(document.body.classList[0]).toBe(`font-${FontFamilyEnum.Mono}`);

    await act(() => {
      result.current.changeFontFamily(FontFamilyEnum.Default);
    });
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setFontFamily',
      payload: FontFamilyEnum.Default,
    });
    expect(document.body.classList.length).toBe(0);
  });

  test('should initial font family when local is not default', () => {
    LocalStorageWrapper.set(CONSTANT.FONT_FAMILY, FontFamilyEnum.Inter);
    renderHook(() => useInitFontFamily());
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setFontFamily',
      payload: FontFamilyEnum.Inter,
    });
    expect(document.body.classList.contains(`font-${FontFamilyEnum.Inter}`))
      .toBeTruthy;

    LocalStorageWrapper.set(CONSTANT.FONT_FAMILY, FontFamilyEnum.Default);
  });
});
