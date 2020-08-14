import styled from 'styled-components';

export const Container = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: 12rem auto;
  grid-template-areas:
    "header header"
    "menu content";

  @media ${(props) => props.theme.medias.laptopS} {
    grid-template-columns: 0 auto;
  }

`;

export const Content = styled.main`
  grid-area: content;
  height: calc(100vh - ${(props) => props.theme.dimensions.header.height});
  padding: 3rem;
  overflow-y: scroll;
  overflow-x: hidden;

  @media ${(props) => props.theme.medias.laptopS} {
    padding: 1rem;
  }

`;

export const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  & button {
    border:none;
    padding: 1rem 2rem;
    background: ${(props) => props.theme.colors.primary};
    border-radius: 25px;
    min-width: 20rem;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;
    outline: none;

    @media ${(props) => props.theme.medias.laptopS} {
      width: 100%;
    }
  }

`;
