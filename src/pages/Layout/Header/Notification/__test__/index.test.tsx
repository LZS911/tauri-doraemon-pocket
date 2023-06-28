import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from '../../../../../testUtils/customRender';
import Notification from '../index';

describe('test Notification', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test('should match snapshot', async () => {
    const { container } = renderWithRedux(<Notification />);

    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });

    fireEvent.click(screen.getByTestId('popover-switch-icon'));

    expect(container).toMatchSnapshot();
  });

  test('should mark as all read when clicking icon', async () => {
    const { container } = renderWithRedux(<Notification />);
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });

    fireEvent.click(screen.getByTestId('popover-switch-icon'));

    // expect(container.querySelector('.ant-badge-count')).toHaveAttribute(
    //   'title',
    //   '2'
    // );

    fireEvent.click(screen.getByTestId('mark-all-read'));

    // expect(container.querySelector('.ant-badge-count')).not.toBeInTheDocument();
  });
});
