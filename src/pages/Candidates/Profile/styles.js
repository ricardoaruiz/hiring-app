import styled from 'styled-components';

export const Container = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    ${(props) => props.theme.colors.secondary} 50%,
    ${(props) => props.theme.colors.white} 50%,
    white 50%,
    white 50%);
`;

export const CentralCard = styled.div`
  width: 60%;
  height: 80%;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 2px 4px 6px 2px rgba(0,0,0,.3);
  border-radius: 10px;

  @media ${(props) => props.theme.medias.tablet} {
    width: 90%;
    margin-top: 2rem;
  }
  @media ${(props) => props.theme.medias.laptopS} {
    width: 90%;
  }
  @media ${(props) => props.theme.medias.laptop} {
    width: 90%;
  }
`;

export const CardHeader = styled.div`
  position: relative;
  border-radius: 10px 10px 0 0;
  background: ${(props) => props.theme.colors.gray};
  height: 30%;
  box-shadow: 1px 2px 2px 2px rgba(0,0,0,.3);
`;

export const CardBody = styled.div`
  display: flex;
  justify-content: center;
  height: 70%;
`;

export const AvatarContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 1.5rem;
  width: 80%;
  height: 100%;
  margin: 0 auto;

  @media ${(props) => props.theme.medias.tablet} {
    width: 100%;
    padding: 0 0.5rem;
  }
`;

export const DataInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 4rem;
  margin-top: 12rem;
  align-self: stretch;
`;

export const DataInfoLabel = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.lightGray};
  margin-bottom: 1rem;

  @media ${(props) => props.theme.medias.tablet} {
    font-size: 1rem;
  }
`;
export const DataInfoValue = styled.div`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.lightGray};

  @media ${(props) => props.theme.medias.tablet} {
    font-size: 1.5rem;
  }

  @media ${(props) => props.theme.medias.mobileL} {
    font-size: 1.3rem;
    overflow: hidden;
  }
`;

export const DataIcons = styled.div`
  display: flex;
  justify-content: space-between;

  & svg {

    & + svg {
      margin-left: 0.5rem;
    }

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const ProfileNotFound = styled.h2`
  margin-top: 15rem;
`;

export const BackButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 1rem;
  left: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
`;
