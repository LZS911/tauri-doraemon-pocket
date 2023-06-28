/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';

export default function useThrottle(
  fn: (...args: any) => void,
  dep: Array<unknown> = [],
  delay = 600
) {
  const { current } = useRef<{
    fn: (...args: any) => void;
    timer?: NodeJS.Timeout | null;
  }>({
    fn,
    timer: null,
  });
  useEffect(() => {
    current.fn = fn;
  }, [fn, current]);
  return useCallback((...args: any) => {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current['timer'];
      }, delay);
      current.fn(...args);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dep);
}
