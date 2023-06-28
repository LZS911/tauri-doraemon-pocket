import { fireEvent, render, screen } from '@testing-library/react';
import { ITabWrapperDataSource } from '..';
import UserNavigationTabWrapper from '../UserNavigationTabWrapper';

const onClick = jest.fn();

const dataSource: ITabWrapperDataSource[] = [
  {
    icon: <>icon1</>,
    onClick: onClick,
    text: 'text1',
  },
  {
    icon: <>icon2</>,
    onClick: jest.fn(),
    text: 'text2',
    hidden: true,
  },
];

describe('test UserNavigationTabWrapper', () => {
  test('should match snapshot', () => {
    const { container } = render(
      <UserNavigationTabWrapper dataSource={dataSource} />
    );
    expect(container).toMatchSnapshot();
  });

  test('should be executed onClick when click icon', () => {
    render(<UserNavigationTabWrapper dataSource={dataSource} />);
    expect(onClick).toBeCalledTimes(0);

    fireEvent.click(screen.getByText('icon1'));
    expect(onClick).toBeCalledTimes(1);
  });
});
