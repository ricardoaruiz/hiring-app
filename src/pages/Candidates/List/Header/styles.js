import styled from 'styled-components';

export const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: ${(props) => props.theme.dimensions.header.height};
  background: ${(props) => props.theme.colors.secondary};
  box-shadow: 0px 2px 4px 2px rgba(0,0,0,.3);
`;

export const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & img {
    width: 5rem;
  }
  & .menu {
    display: none;
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;

    @media ${(props) => props.theme.medias.laptopS} {
      grid-template-columns: 0 auto;
      display: block;
    }
  }
`;

export const Search = styled.div`
  width: 100%;
  margin: 0 1rem;
  max-width: 60rem;
`;

export const Avatar = styled.div`
  & svg {
    color: ${(props) => props.theme.colors.white};
  }
`;
