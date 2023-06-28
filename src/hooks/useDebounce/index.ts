/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';

export default function useDebounce(
  fn: (...args: any) => void,
  dep: Array<unknown> = [],
  delay = 300
) {
  const { current } = useRef<{
    fn: (...args: any) => void;
    timer: NodeJS.Timeout | null;
  }>({
    fn,
    timer: null,
  });
  useEffect(() => {
    current.fn = fn;
  }, [fn, current]);
  return useCallback(
    (...args: any) => {
      if (current.timer) {
        clearTimeout(current.timer);
      }

      current.timer = setTimeout(() => {
        current.fn(...args);
      }, delay);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    dep
  );
}
