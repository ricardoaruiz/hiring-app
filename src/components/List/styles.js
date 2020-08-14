import styled, { css } from 'styled-components';

export const List = styled.ul`
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 2px 4px 6px 2px rgba(0,0,0,.3);
`;

export const ListRow = styled.li`
  position: relative;
  display: flex;
  align-items: center;

  & + li {
    border-top: 1px solid ${(props) => props.theme.colors.borders};
  }

  ${(props) => props.hasId
    && css`
      cursor: pointer;

      &:hover {
        background: ${props.theme.colors.secondary};
        color: ${props.theme.colors.white};
      }
    `};

  @media ${(props) => props.theme.medias.laptopS} {
    flex-direction: column;
    padding: 0.5rem;
  }
`;

export const ListCol = styled.div`
  padding: 1rem 0.3rem;
  align-self: stretch;
  display: flex;
  align-items: center;

  ${(props) => (props.width
    ? css`
      width: ${props.width};
    `
    : css`
      width: 100%;
    `)};
  ${(props) => props.isId
    && css`
      display: none;
    `}

  &:nth-child(1)  {
    padding-left: .5rem;
  }
  &:nth-child(2) {
    padding-left: .5rem;
  }
  &:last-child {
    padding-right: .5rem;
  }

  &.actionCol {
    display: flex;
    justify-content: flex-end;
    max-width: 10rem;
  }

  @media ${(props) => props.theme.medias.laptop} {
    font-size: 0.9rem;
  }

  @media ${(props) => props.theme.medias.laptopS} {
    font-size: 0.9rem;
    padding: .225rem 0;

    &.actionCol {
      position: absolute;
      top: 1rem;
      right: 0;
    }
  }
`;

export const ListAction = styled.div`
  cursor: pointer;

  & + div {
    margin-left: 0.5rem;
  }

  & svg:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const EmptyList = styled.div`
  font-size: 1.4rem;
  text-align: center;
`;
