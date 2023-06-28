import { renderHook, waitFor } from '@testing-library/react';
import useDebounce from '../index';

const fn = jest.fn();
const dep: any[] = [];
const delay = 400;
const defaultDelay = 300;

describe('test useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should wait for default delay time', async () => {
    const { result } = renderHook((f: any = fn) => useDebounce(f));
    result.current();
    expect(fn).toBeCalledTimes(0);

    await waitFor(() => {
      jest.advanceTimersByTime(defaultDelay);
    });

    expect(fn).toBeCalledTimes(1);
  });

  test('should refresh delay time when waiting less than delay time', async () => {
    const { result } = renderHook((f: any = fn, d = dep, de = delay) =>
      useDebounce(f, d, de)
    );
    result.current();
    expect(fn).toBeCalledTimes(0);

    await waitFor(() => {
      jest.advanceTimersByTime(delay / 2);
    });

    result.current();

    await waitFor(() => {
      jest.advanceTimersByTime(delay / 2);
    });
    expect(fn).toBeCalledTimes(0);

    await waitFor(() => {
      jest.advanceTimersByTime(delay / 2);
    });
    expect(fn).toBeCalledTimes(1);
  });
});
