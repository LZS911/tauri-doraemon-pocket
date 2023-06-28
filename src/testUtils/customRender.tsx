/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  MemoryRouter,
  MemoryRouterProps,
  Router,
  RouterProps,
} from 'react-router-dom';
import { Dictionary } from '../typing/common.type';
import { storeFactory } from './mockRedux';
type RenderParams = Parameters<typeof render>;

export const renderWithRedux: (arg: any) => ReturnType<typeof render> = (
  ...[ui, option, initStore]: [...RenderParams, Dictionary?]
) => {
  return render(
    <Provider store={storeFactory(initStore)}>{ui}</Provider>,
    option
  );
};
export const renderWithRouter: any = (...[ui, option]: [...RenderParams]) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>, option);
};

export const renderHooksWithRedux = <TProps, TResult>(
  hooks: (props: TProps) => TResult,
  storeState: Dictionary = {}
) => {
  return renderHook(hooks, {
    wrapper: Provider,
    initialProps: {
      store: storeFactory(storeState),
    },
  } as any);
};

export const renderWithServerRouter: any = (
  ...[ui, option, props]: [...RenderParams, RouterProps]
) => {
  return render(<Router {...props}>{ui}</Router>, option);
};

export const renderWithServerRouterAndRedux: any = (
  ...[ui, option, props]: [...RenderParams, RouterProps]
) => {
  return render(
    <Router {...props}>
      {' '}
      <Provider store={storeFactory()}>{ui}</Provider>,
    </Router>,
    option
  );
};

export const renderWithMemoryRouter: any = (
  ...[ui, option, props]: [...RenderParams, MemoryRouterProps?]
) => {
  return render(<MemoryRouter {...props}>{ui}</MemoryRouter>, option);
};
