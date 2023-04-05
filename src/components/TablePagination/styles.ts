import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 9vh;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.onSurface};
  border-top: solid 1px ${(props) => props.theme.colors.secondary};
`;

export const ContainerInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
  font-variant: small-caps;
  margin: 0 1rem;
  strong {
    font-size: 1.8rem;
    margin: 0 0.5rem;
  }
`;

