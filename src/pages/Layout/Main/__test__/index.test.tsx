import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../../../../testUtils/customRender';
import Main from '../index';

const children = <>children</>;

describe('test Main', () => {
  test('should match snapshot', () => {
    const { container } = renderWithRouter(<Main>{children}</Main>);
    expect(container).toMatchSnapshot();
  });

  test('should show breadcrumb by router', () => {
    render(
      <MemoryRouter initialEntries={['/component/table']}>
        <Main>{children}</Main>
      </MemoryRouter>
    );

    // expect(screen.queryByText('component')).toBeInTheDocument();
    // expect(screen.queryByText('table')).toBeInTheDocument();
  });
});
