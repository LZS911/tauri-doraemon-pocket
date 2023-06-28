import { act, renderHook } from '@testing-library/react';
import usePropsValue from '../index';

describe('test usePropsValue', () => {
  test('should be equivalent to useState when the parameter is empty', async () => {
    const { result } = renderHook(() => usePropsValue({}));

    expect(result.current[0]).toBeUndefined();

    act(() => {
      result.current[1](1);
    });
    expect(result.current[0]).toEqual(1);

    act(() => {
      result.current[1]((v: number) => v + 1);
    });
    expect(result.current[0]).toEqual(2);
  });

  test('should set defaultValue when the defaultValue is defined', () => {
    const defaultValue = 'default';
    const { result } = renderHook(() => usePropsValue({ defaultValue }));

    expect(result.current[0]).toEqual(defaultValue);
  });

  test('should be as expected when value and onChange is defined', () => {
    const value = 'value';
    const onChange = jest.fn();

    const { result } = renderHook(() => usePropsValue({ value, onChange }));
    expect(onChange).toBeCalledTimes(0);

    expect(result.current[0]).toEqual(value);

    act(() => {
      result.current[1](value);
    });
    expect(onChange).toBeCalledTimes(0);

    act(() => {
      result.current[1]('modify');
    });
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('modify');

    /**
     * why the internal value is still the initial value ?
     *
     * because internal value will always be the same as the outer value.(is controlled)
     * onChange is just a mock function, Did not modify outer value
     */
    expect(result.current[0]).toEqual(value);
  });
});
