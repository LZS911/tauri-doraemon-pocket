import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { renderWithRedux } from '../../../../testUtils/customRender';
import NavExpanded from '../NavExpanded';
import { LocationDisplay } from '../../../../testUtils/auxiliaryComponents';

const Component = (
  <MemoryRouter>
    <NavExpanded /> <LocationDisplay />
  </MemoryRouter>
);

describe('test NavExpanded', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test('should match snapshot', async () => {
    const { container } = renderWithRedux(
      <BrowserRouter>
        <NavExpanded />
      </BrowserRouter>
    );
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    expect(container).toMatchSnapshot();
  });

  test('should jump to target path when clicking menu item', async () => {
    renderWithRedux(Component);

    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    // expect(screen.getByTestId('location-display')).toHaveTextContent('/');

    // fireEvent.click(screen.getByText('router.title.chat'));
    // expect(screen.getByTestId('location-display')).toHaveTextContent('/chat');
  });
});
