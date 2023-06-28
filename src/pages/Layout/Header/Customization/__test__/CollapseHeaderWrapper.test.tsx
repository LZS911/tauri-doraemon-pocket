import { render } from '@testing-library/react';
import CollapseHeaderWrapper from '../CollapseHeaderWrapper';

describe('test CollapseHeaderWrapper', () => {
  test('should match snapshot', () => {
    const { container } = render(
      <CollapseHeaderWrapper
        title="title"
        subTitle="subTitle"
        icon={<>icon</>}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
