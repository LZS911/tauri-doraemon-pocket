import { waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { layoutInitialState } from '../../../../store/layout';
import { userConfigInitialState } from '../../../../store/userConfig';
import { renderWithRouter } from '../../../../testUtils/customRender';
import Sider from '../index';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});

describe('test Layout/Sider', () => {
  const useSelectorMock: jest.Mock = useSelector as jest.Mock;
  const useDispatchMock: jest.Mock = useDispatch as jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    useDispatchMock.mockImplementation(() => jest.fn());
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        layout: layoutInitialState,
        userConfig: userConfigInitialState,
      });
    });
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test('should match snapshot', () => {
    const { container } = renderWithRouter(<Sider />);
    expect(container).toMatchSnapshot();
  });

  test('should match snapshot when modified isDrawerSider', async () => {
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        layout: {
          ...layoutInitialState,
          isDrawerSider: true,
        },
        userConfig: userConfigInitialState,
      });
    });

    const { container } = renderWithRouter(<Sider />);
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    expect(container).toMatchSnapshot();
  });

  test('should match snapshot when modified isExpandSider', async () => {
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        layout: {
          ...layoutInitialState,
          isExpandSider: true,
        },
        userConfig: userConfigInitialState,
      });
    });

    const { container } = renderWithRouter(<Sider />);
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    expect(container).toMatchSnapshot();
  });
});
