import { render } from '@testing-library/react';
import Paper from '../Paper';

describe('test Paper', () => {
  test('should match snapshot', () => {
    const { container } = render(
      <Paper>
        <div>children</div>
      </Paper>
    );

    expect(container).toMatchSnapshot();
  });
});
