import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Menu from '.';
import baseTheme from '../../../../themes';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const renderMenu = (type, props) => {
  const { container } = render(
    <ThemeProvider theme={baseTheme}>
      <MemoryRouter initialEntries={[`/candidates/list/${type}`]}>
        <Route path="/candidates/list/:type">
          <Menu {...props} />
        </Route>
      </MemoryRouter>
    </ThemeProvider>,
  );

  return { container };
};

describe('Menu', () => {
  it('should be able to simple render', () => {
    const { container } = renderMenu('all');
    expect(container).toBeInTheDocument();
  });

  it('should be able active "all" menu item when route in all candidates', () => {
    const { container } = renderMenu('all');
    const activeItemLink = container.querySelector('.active');
    expect(activeItemLink.querySelector('span').innerHTML).toEqual('all');
  });

  it('should be able active "attended" menu item when route in attended candidates', () => {
    const { container } = renderMenu('attended');
    const activeItemLink = container.querySelector('.active');
    expect(activeItemLink.querySelector('span').innerHTML).toEqual('attended');
  });

  it('should be able active "trash" menu item when route in trash candidates', () => {
    const { container } = renderMenu('trash');
    const activeItemLink = container.querySelector('.active');
    expect(activeItemLink.querySelector('span').innerHTML).toEqual('trash');
  });

  it('should be able call item click when a menu item is clicked', () => {
    const handleMenuItemClick = jest.fn();
    const { container } = renderMenu('all', { onMenuItemClick: handleMenuItemClick });
    const menuItems = container.querySelectorAll('li');
    act(() => {
      fireEvent.click(menuItems[0]);
    });
    expect(handleMenuItemClick).toHaveBeenCalled();
  });
});
