import HeaderProgress from '..';
import { render } from '@testing-library/react';
describe('test HeaderProgress', () => {
  it('should render HeaderProgress to match snapshot', () => {
    const { container } = render(<HeaderProgress />);
    expect(container).toMatchSnapshot();
  });
});
