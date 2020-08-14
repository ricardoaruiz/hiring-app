import styled, { css } from 'styled-components';

export const Container = styled.div`
  & img {
    border-radius: 50%;
    box-shadow: 2px 4px 6px 2px rgba(0,0,0,.3);
    background: ${(props) => props.theme.colors.white};
    ${(props) => {
    const { size } = props;
    switch (size) {
      case 'small':
        return css`
            width: 32px;
          `;
      case 'medium':
        return css`
            width: 48px;
          `;
      case 'large':
        return css`
            width: 64px;
          `;
      case 'xlarge':
        return css`
            width: 300px;
          `;
      default:
        return css`
            width: 32px;
          `;
    }
  }}}
`;

export const Teste = styled.div``;
