import { useUpdate } from 'ahooks';
import { isFunction } from 'lodash-es';
import { SetStateAction, useRef } from 'react';
export type usePropsValueOptions<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (value?: T) => void;
};

const usePropsValue = <T>({
  value,
  defaultValue,
  onChange,
}: usePropsValueOptions<T>): [
  T | undefined,
  (v: SetStateAction<T | undefined>) => void
] => {
  const isControlled = value !== undefined;
  const update = useUpdate();
  const stateRef = useRef<T | undefined>(isControlled ? value : defaultValue);

  if (isControlled) {
    stateRef.current = value;
  }

  const setState = (v: SetStateAction<T | undefined>) => {
    const nextValue = isFunction(v) ? v(stateRef.current) : v;

    if (nextValue === stateRef.current) {
      return;
    }

    stateRef.current = nextValue;
    update();
    onChange?.(nextValue);
  };
  return [stateRef.current, setState];
};

export default usePropsValue;
