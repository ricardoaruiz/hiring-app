import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.theme.colors.white};
  padding: 0.2rem 0.8rem;
  border-radius: 1.5rem;
  width: 100%;
`;

export const Image = styled.div`
  margin-right: 0.1rem;
  color: ${(props) => props.theme.colors.primary};
`;

export const Input = styled.input`
  border: none;
  padding: .5rem;
  outline: none;
  font-size: 1.3rem;
  font-family: ${(props) => props.theme.font};
  width: 100%;
`;
