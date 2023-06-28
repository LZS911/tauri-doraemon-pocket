import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { SupportLanguage } from '../../../../../locale';
import { layoutInitialState } from '../../../../../store/layout';
import { userConfigInitialState } from '../../../../../store/userConfig';
import ToggleLanguage from '../index';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});

describe('test Customization', () => {
  const useSelectorMock: jest.Mock = useSelector as jest.Mock;
  const useDispatchMock: jest.Mock = useDispatch as jest.Mock;
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => dispatchMock);
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        userConfig: userConfigInitialState,
        layout: layoutInitialState,
      });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should match snapshot', () => {
    const { container } = render(<ToggleLanguage />);
    fireEvent.click(screen.getByTestId('open-language-options'));
    expect(container).toMatchSnapshot();
  });

  test('should modify language when click option', () => {
    render(<ToggleLanguage />);
    fireEvent.click(screen.getByTestId('open-language-options'));
    expect(dispatchMock).toBeCalledTimes(0);
    fireEvent.click(screen.getByText('common.english'));
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      payload: SupportLanguage.enUS,
      type: 'userConfig/setCurrentLang',
    });
  });
});
