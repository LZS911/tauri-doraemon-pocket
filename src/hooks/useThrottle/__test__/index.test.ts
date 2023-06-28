import { renderHook, waitFor } from '@testing-library/react';
import useThrottle from '../index';

const fn = jest.fn();
const delay = 800;
const defaultDelay = 600;
const dep: any[] = [];

describe('test useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  test('should set default delay time', async () => {
    const { result } = renderHook((f: any = fn) => useThrottle(f));
    result.current();
    result.current();
    await waitFor(() => {
      jest.advanceTimersByTime(defaultDelay);
    });
    expect(fn).toBeCalledTimes(1);
    result.current();
    result.current();
    await waitFor(() => {
      jest.advanceTimersByTime(defaultDelay);
    });
    expect(fn).toBeCalledTimes(2);
  });

  test('should be executed fn only once in delay time', async () => {
    const { result } = renderHook((f: any = fn, d = dep, de = delay) =>
      useThrottle(f, d, de)
    );
    result.current();
    result.current();
    result.current();
    await waitFor(() => {
      jest.advanceTimersByTime(delay / 2);
    });
    expect(fn).toBeCalledTimes(1);

    result.current();
    result.current();
    result.current();
    await waitFor(() => {
      jest.advanceTimersByTime(delay / 2);
    });
    expect(fn).toBeCalledTimes(1);
    result.current();
    result.current();
    result.current();
    result.current();
    result.current();
    result.current();
    await waitFor(() => {
      jest.advanceTimersByTime(delay);
    });
    expect(fn).toBeCalledTimes(2);
  });
});
