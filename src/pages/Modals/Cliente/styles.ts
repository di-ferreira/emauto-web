import styled from 'styled-components';

export const Container = styled.div``;

export const FormEditCliente = styled.form`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FormEditClienteRow = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
`;
export const FormEditClienteColumn = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
`;

export const FormEditClienteInputContainer = styled.div`
  margin: 0 0.5rem;
`;

export const FormEditClienteSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
  & label {
    margin: 0 0.5rem;
    color: ${(props) => props.theme.colors.onSurface};
  }
`;

export const FormFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
