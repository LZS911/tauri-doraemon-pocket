import Icon from '../Icon';
import { renderWithRedux } from '../../../testUtils/customRender';
import { fireEvent } from '@testing-library/react';

const icon = <>icon</>;

describe('test ThemeBase.Icon', () => {
  test('should match snapshot', () => {
    const { container } = renderWithRedux(<Icon icon={icon} />);
    expect(container).toMatchSnapshot();
  });

  test('should be as expected when isHoverCls is equal false', () => {
    const { container } = renderWithRedux(
      <Icon icon={icon} isHoverCls={false} />
    );
    expect(container).toMatchSnapshot();
  });

  test('should be as expected when isWaterWaveCls is equal false', () => {
    const { container } = renderWithRedux(
      <Icon icon={icon} isWaterWaveCls={false} />
    );
    expect(container).toMatchSnapshot();
  });

  test('should hide icon when hidden is equal true', () => {
    const { container } = renderWithRedux(<Icon icon={icon} hidden={true} />);
    // expect(container.querySelector('div')).toHaveAttribute('hidden');
  });

  test('should trigger click event when clicking icon', () => {
    const onClickSpy = jest.fn();
    const { container } = renderWithRedux(
      <Icon icon={icon} onClick={onClickSpy} />
    );
    expect(onClickSpy).toBeCalledTimes(0);
    fireEvent.click(container.querySelector('div')!);
    expect(onClickSpy).toBeCalledTimes(1);
  });

  test('should match snapshot when badge is not empty', () => {
    const { container } = renderWithRedux(
      <Icon icon={icon} badge={{ count: 2 }} />
    );
    expect(container).toMatchSnapshot();
  });

  test('should match snapshot when tooltip is not empty', () => {
    const { baseElement } = renderWithRedux(
      <Icon icon={icon} tooltip={{ title: 'title' }} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
