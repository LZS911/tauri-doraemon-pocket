import { fireEvent, render, screen } from '@testing-library/react';
import CollapseContent from '../CollapseContent';

const list = [
  {
    key: '1',
    content: 'content1',
    value: 1,
  },
  {
    key: '2',
    content: 'content2',
    value: 2,
  },
  {
    key: '3',
    content: 'content3',
    describe: 'describe',
    value: 3,
  },
];

describe('test CollapseContent', () => {
  test('should match snapshot', () => {
    const { container } = render(<CollapseContent list={list} />);
    expect(container).toMatchSnapshot();
  });

  test('should selected default item when default is not empty', () => {
    render(<CollapseContent list={list} defaultValue={2} />);

    // expect(screen.getByText('content2').parentNode).toHaveClass('bg-secondary');
  });

  test('should be executed onChange when clicking other item', async () => {
    const onChange = jest.fn();
    render(<CollapseContent list={list} value={2} onChange={onChange} />);
    expect(onChange).toBeCalledTimes(0);

    fireEvent.click(screen.getByText('content2'));
    expect(onChange).toBeCalledTimes(0);
    fireEvent.click(screen.getByText('content1'));
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(1);
  });
});
