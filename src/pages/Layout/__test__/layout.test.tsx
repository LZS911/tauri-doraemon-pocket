import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useResizeObserver from 'use-resize-observer';
import { userConfigInitialState } from '../../../store/userConfig';
import { layoutInitialState } from '../../../store/layout';
import { renderWithRouter } from '../../../testUtils/customRender';
import Layout from '../index';
import { waitFor } from '@testing-library/react';

const children = <>children</>;

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.mock('use-resize-observer', () => {
  return {
    default: jest.fn(),
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('test Layout', () => {
  const useSelectorMock: jest.Mock = useSelector as jest.Mock;
  const useDispatchMock: jest.Mock = useDispatch as jest.Mock;
  const useResizeObserverMock: jest.Mock = useResizeObserver as jest.Mock;
  const useNavigateMock: jest.Mock = useNavigate as jest.Mock;
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    useDispatchMock.mockImplementation(() => dispatchMock);
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        userConfig: userConfigInitialState,
        layout: layoutInitialState,
      });
    });
    useNavigateMock.mockReturnValue(navigateMock);
    useResizeObserverMock.mockImplementation(() => {
      return {
        ref: useRef(),
      };
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render Layout to match snapshot', async () => {
    const { container } = renderWithRouter(<Layout>{children}</Layout>);
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    expect(container).toMatchSnapshot();
  });
});
