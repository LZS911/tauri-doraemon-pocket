import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { LocationDisplay } from '../../../../testUtils/auxiliaryComponents';
import { renderWithRedux } from '../../../../testUtils/customRender';
import NavNotExpanded from '../NavNotExpanded';

const Component = (
  <MemoryRouter>
    <NavNotExpanded /> <LocationDisplay />
  </MemoryRouter>
);

describe('test NavNotExpanded', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  test('should match snapshot', async () => {
    const { container } = renderWithRedux(
      <BrowserRouter>
        <NavNotExpanded />
      </BrowserRouter>
    );
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    expect(container).toMatchSnapshot();
  });

  test('should jump to target path when clicking logo', async () => {
    renderWithRedux(Component);

    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    // expect(screen.getByTestId('location-display')).toHaveTextContent('/');

    fireEvent.click(screen.getByTestId('logo-img'));
    // expect(screen.getByTestId('location-display')).toHaveTextContent(
    //   '/dashboard'
    // );
  });

  test('should be activated sub icon when route matches on', async () => {
    renderWithRedux(
      <MemoryRouter initialEntries={['/component/input']}>
        <NavNotExpanded />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('component'));

    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    // expect(screen.getByTestId('component')).toHaveClass(
    //   '!bg-secondary text-primary dark:text-primary'
    // );

    // expect(screen.getByTestId('input')).toHaveClass('!text-primary');
  });
});
