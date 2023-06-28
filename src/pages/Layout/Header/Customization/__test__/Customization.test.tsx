import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ColorSchemeEnum,
  FontFamilyEnum,
  ThemeModeEnum,
} from '../../../../../common/enum';
import { layoutInitialState } from '../../../../../store/layout';
import { userConfigInitialState } from '../../../../../store/userConfig';
import { renderWithRedux } from '../../../../../testUtils/customRender';
import Customization from '../index';

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
        layout: {
          ...layoutInitialState,
          isExpandSider: false,
        },
      });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should match snapshot', () => {
    const { container } = renderWithRedux(<Customization />);
    fireEvent.click(screen.getByTestId('draw-switch-icon'));
    expect(container).toMatchSnapshot();
  });

  test('should modify layout theme to mini when clicking panel and layout is default', () => {
    render(<Customization />);
    expect(dispatchMock).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('draw-switch-icon'));

    fireEvent.click(
      screen.getByText(
        'layout.header.customization.themeLayoutPanel.defaultType'
      )
    );
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      payload: true,
      type: 'layout/setIsExpandSider',
    });
  });

  test('should modify layout theme to default when clicking panel and layout is mini', () => {
    useSelectorMock.mockImplementation((selector) => {
      return selector({
        userConfig: userConfigInitialState,
        layout: {
          ...layoutInitialState,
          isExpandSider: true,
        },
      });
    });
    render(<Customization />);
    expect(dispatchMock).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('draw-switch-icon'));

    fireEvent.click(
      screen.getByText('layout.header.customization.themeLayoutPanel.miniType')
    );
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      payload: false,
      type: 'layout/setIsExpandSider',
    });
  });

  test('should modify theme mode when clicking panel', () => {
    render(<Customization />);
    expect(dispatchMock).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('draw-switch-icon'));

    fireEvent.click(
      screen.getByText('layout.header.customization.themeModePanel.dark')
    );
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      payload: ThemeModeEnum.Dark,
      type: 'userConfig/setCurrentThemeMode',
    });
  });

  test('should modify color scheme when clicking panel', () => {
    render(<Customization />);
    expect(dispatchMock).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('draw-switch-icon'));

    fireEvent.click(
      screen.getByText('layout.header.customization.colorSchemePanel.theme2')
    );
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      payload: ColorSchemeEnum.Purple,
      type: 'userConfig/setCurrentColorScheme',
    });
  });

  test('should modify font family when clicking panel', () => {
    render(<Customization />);
    expect(dispatchMock).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('draw-switch-icon'));

    fireEvent.click(
      screen.getByText('layout.header.customization.fontFamilyPanel.serif')
    );
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({
      payload: FontFamilyEnum.Serif,
      type: 'userConfig/setFontFamily',
    });
  });
});
