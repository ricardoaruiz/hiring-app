import React from 'react';
import { render } from '@testing-library/react';

import NotFound from '.';

describe('NoutFound page', () => {
  it('should be able to simple render', () => {
    const { container } = render(<NotFound />);
    expect(container).toBeInTheDocument();
    expect(container.querySelector('h1').innerHTML).toEqual('Not Found');
  });
});
