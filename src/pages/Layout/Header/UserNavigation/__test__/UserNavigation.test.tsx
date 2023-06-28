import { fireEvent, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { renderWithRedux } from '../../../../../testUtils/customRender';
import UserNavigation from '../index';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
  };
});

describe('test UserNavigation', () => {
  const useDispatchMock = useDispatch as jest.Mock;
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => dispatchMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should match snapshot', () => {
    const { container } = renderWithRedux(<UserNavigation />);
    fireEvent.click(screen.getByTestId('open-popover-icon'));
    expect(container).toMatchSnapshot();
  });
  test('should sign out when clicking sign icon', () => {
    renderWithRedux(<UserNavigation />);
    expect(dispatchMock).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('open-popover-icon'));
    fireEvent.click(screen.getByTestId('sign-out-icon'));
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setLoginUserInfo',
      payload: {
        emailAddress: '',
        userProfile: '',
        username: '',
      },
    });

    expect(dispatchMock).toBeCalledWith({
      type: 'userConfig/setLoginState',
      payload: {
        isLogin: false,
        token: '',
      },
    });
  });
});
