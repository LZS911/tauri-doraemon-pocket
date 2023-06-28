import { act, renderHook, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import useUserConfig from '../index';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

const isLogin = true;
const token = 'abcd';
const username = 'Gll';
const emailAddress = 'demo@gamil.com';
const userProfile = 'default user';

describe('test useUserConfig', () => {
  const useSelectorMock: jest.Mock = useSelector as jest.Mock;
  const useDispatchMock: jest.Mock = useDispatch as jest.Mock;
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    useDispatchMock.mockImplementation(() => dispatchMock);
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        userConfig: {
          isLogin,
          token,
          username,
          emailAddress,
          userProfile,
        },
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  test('should match default value', () => {
    const { result } = renderHook(() => useUserConfig());
    expect(result.current.emailAddress).toBe(emailAddress);
    expect(result.current.isLogin).toBe(isLogin);
    expect(result.current.token).toBe(token);
    expect(result.current.userProfile).toBe(userProfile);
    expect(result.current.username).toBe(username);
  });

  test('should get user info when executed getUserConfig', async () => {
    const { result } = renderHook(() => useUserConfig());

    expect(result.current.getUserInfoLoading).toBeFalsy();
    await act(() => {
      result.current.getUserConfig();
    });
    expect(result.current.getUserInfoLoading).toBeTruthy();
    await act(async () => {
      await waitFor(() => {
        jest.advanceTimersByTime(800);
      });
    });
    expect(result.current.getUserInfoLoading).toBeFalsy();
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setLoginUserInfo',
      //todo
      payload: {
        username: 'Gll Ly',
        emailAddress: 'demo@gamil.com',
        userProfile: 'Default user',
      },
    });
  });

  test('should be expected when executed setLoginState、setLoginUserInfo and signOut', () => {
    const { result } = renderHook(() => useUserConfig());

    result.current.setLoginState({ token, isLogin });
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setLoginState',
      payload: { token, isLogin },
    });

    result.current.setLoginUserInfo({ username, userProfile, emailAddress });
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setLoginUserInfo',
      payload: { username, userProfile, emailAddress },
    });

    result.current.signOut();
    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock.mock.calls[2][0]).toEqual({
      type: 'userConfig/setLoginUserInfo',
      payload: { username: '', userProfile: '', emailAddress: '' },
    });
    expect(dispatchMock.mock.calls[3][0]).toEqual({
      type: 'userConfig/setLoginState',
      payload: { token: '', isLogin: false },
    });
  });
});
