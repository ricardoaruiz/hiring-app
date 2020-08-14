import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import baseTheme from '../../themes';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import Input from '.';

const initialProps = {
  icon: undefined,
  value: '',
  placeholder: '',
  onChange: () => { },
};

describe('Avatar', () => {
  it('should be able to simple render', () => {
    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <Input {...initialProps} />
      </ThemeProvider>,
    );
    expect(container).toBeInTheDocument();
  });
  it('should be able to call onChange when fill input', () => {
    const handleChange = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={baseTheme}>
        <Input {...initialProps} onChange={handleChange} />
      </ThemeProvider>,
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should be able to render input whith value', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={baseTheme}>
        <Input {...initialProps} value="filled-value" />
      </ThemeProvider>,
    );
    const input = getByTestId('input');
    expect(input).toHaveAttribute('value', 'filled-value');
  });

  it('should be able to render input whith placeholder', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={baseTheme}>
        <Input {...initialProps} placeholder="informed-placeholder" />
      </ThemeProvider>,
    );
    const input = getByTestId('input');
    expect(input).toHaveAttribute('placeholder', 'informed-placeholder');
  });

  it('should be able to render input whith icon', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={baseTheme}>
        <Input {...initialProps} icon={Logo} />
      </ThemeProvider>,
    );
    const icon = getByTestId('image');
    expect(icon).toBeInTheDocument();
  });
});
