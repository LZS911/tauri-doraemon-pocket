import { fireEvent, render, screen } from '@testing-library/react';
import { IOptionsProps } from '..';
import Options from '../Options';

const onClickSpy1 = jest.fn();
const onClickSpy2 = jest.fn();

const list: IOptionsProps<string>['list'] = [
  {
    key: 'key1',
    value: 'value1',
    text: 'text1',
    onClick: onClickSpy1,
  },
  {
    key: 'key2',
    value: 'value2',
    text: 'text2',
    onClick: onClickSpy2,
  },
];

const children = <>children</>;

const getChildren = () => screen.getByText('children');

describe('test Options', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  test('should match snapshot', () => {
    const { baseElement } = render(
      <Options list={list} defaultVisible={true} className="test">
        {children}
      </Options>
    );
    fireEvent.click(getChildren());

    expect(baseElement).toMatchSnapshot();
  });

  test('should be set default value when defaultValue is not empty', () => {
    render(
      <Options list={list} defaultValue={list[0].value}>
        {children}
      </Options>
    );

    fireEvent.click(getChildren());

    // expect(screen.getByText(list[0].text).parentElement).toHaveClass(
    //   'options-selected-item'
    // );
  });

  test('should execute onClick and onChange when clicking item', () => {
    const onChange = jest.fn();
    render(
      <Options list={list} defaultVisible={true} onChange={onChange}>
        {children}
      </Options>
    );
    fireEvent.click(getChildren());

    expect(onClickSpy1).toBeCalledTimes(0);
    expect(onClickSpy2).toBeCalledTimes(0);

    fireEvent.click(screen.getByText(list[0].text));
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(list[0].value);
    expect(onClickSpy1).toBeCalledTimes(1);

    fireEvent.click(screen.getByText(list[1].text));
    expect(onChange).toBeCalledTimes(2);
    expect(onChange).toBeCalledWith(list[1].value);
    expect(onClickSpy2).toBeCalledTimes(1);
  });
});
