import styled from 'styled-components';

export const SideMenu = styled.aside`
  grid-area: menu;
  height: calc(100vh - ${(props) => props.theme.dimensions.header.height});
  box-shadow: 2px 4px 6px 2px rgba(0,0,0,.2);
  background: ${(props) => props.theme.colors.white};
  transition: all 0.3s;

  @media ${(props) => props.theme.medias.laptopS} {
    position: absolute;
    top: 0;
    left: ${(props) => (props.isOpen ? '0rem' : '-12rem')};
    z-index: 2;
  }
`;

export const SideMenuOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.3);
  z-index: 1;
  overflow: hidden;
  display: none;

  @media ${(props) => props.theme.medias.laptopS} {
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
  }

`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.li`
  padding: 1rem;

  & a {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    text-decoration: none;
    font-size: 1.3rem;
    color: ${(props) => props.theme.colors.lightGray};

    &.active {
      color: ${(props) => props.theme.colors.primary};
    }

    & span {
      margin-left: 1rem;
    }
  }

`;
