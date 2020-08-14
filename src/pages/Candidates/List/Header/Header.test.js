import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Header from '.';
import baseTheme from '../../../../themes';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const mockedOnToggleMenu = jest.fn();
const mockedOnSearch = jest.fn();

const initProps = {
  onToggleMenu: mockedOnToggleMenu,
  onSearch: mockedOnSearch,
};

const renderHeader = (type, props) => {
  const { container, debug, getByTestId } = render(
    <ThemeProvider theme={baseTheme}>
      <MemoryRouter initialEntries={[`/candidates/list/${type}`]}>
        <Route path="/candidates/list/:type">
          <Header {...initProps} {...props} />
        </Route>
      </MemoryRouter>
    </ThemeProvider>,
  );

  return { container, getByTestId, debug };
};

describe('Menu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to simple render', () => {
    const { container } = renderHeader('all');
    expect(container).toBeInTheDocument();
  });

  it('should be able to call onToggleMenu when menu icon is clicked', () => {
    const { getByTestId } = renderHeader('all');
    const menuIcon = getByTestId('menu-icon');
    act(() => {
      fireEvent.click(menuIcon);
    });
    expect(mockedOnToggleMenu).toHaveBeenCalled();
  });

  it('should be able to call onSearch when menu search term is typed', () => {
    const { getByTestId } = renderHeader('all');
    const inputSearch = getByTestId('input-search');
    act(() => {
      fireEvent.change(inputSearch, { target: { value: 'new value' } });
    });
    expect(mockedOnSearch).toHaveBeenCalled();
  });

  it('should be able search input is filled when search term is informed', () => {
    const { getByTestId } = renderHeader('all', { searchTerm: 'search term' });
    const inputSearch = getByTestId('input-search');
    expect(inputSearch).toHaveAttribute('value', 'search term');
  });
});
