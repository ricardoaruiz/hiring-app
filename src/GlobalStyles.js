import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: ${(props) => props.theme.font};
    font-size: 100%;
  }
  h1, h2, h3, h4, h5, p, ul, li {
    margin: 0;
    padding: 0;
  }
`;
