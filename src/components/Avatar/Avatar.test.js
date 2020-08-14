import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import baseTheme from '../../themes';
import Avatar from '.';
import avatar from '../../assets/avatar.png';

const initProps = {
  image: avatar,
};

describe('Avatar', () => {
  it('should be able to simple render', () => {
    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <Avatar {...initProps} size="medium" />
      </ThemeProvider>,
    );
    expect(container).toBeInTheDocument();
  });

  it('should be able to click on avatar', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={baseTheme}>
        <Avatar
          {...initProps}
          size="large"
          onClick={handleClick}
        />
      </ThemeProvider>,
    );
    const container = getByTestId('avatar');
    fireEvent.click(container);
    expect(handleClick).toHaveBeenCalled();
  });
});
