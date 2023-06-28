import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import useResizeObserver from 'use-resize-observer';
import { renderWithRedux } from '../../../../testUtils/customRender';
import Header from '../index';

jest.mock('use-resize-observer', () => {
  return {
    default: jest.fn(),
  };
});

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
  };
});

describe('test Header', () => {
  const useResizeObserverMock: jest.Mock = useResizeObserver as jest.Mock;
  const useDispatchMock: jest.Mock = useDispatch as jest.Mock;
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    useDispatchMock.mockImplementation(() => dispatchMock);
    useResizeObserverMock.mockImplementation(() => {
      return {
        ref: useRef(),
      };
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  test('should match snapshot', async () => {
    const { container } = renderWithRedux(<Header />);
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    expect(container).toMatchSnapshot();
  });

  test('should dispatch setIsExpandSider action when clicking menu icon', async () => {
    renderWithRedux(<Header />);

    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });

    expect(dispatchMock).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('menu-icon'));
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      payload: true,
      type: 'layout/setIsExpandSider',
    });
  });
});
