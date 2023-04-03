import styled from 'styled-components';

export const TableWrapper = styled.table`
  border-collapse: collapse;
  border: none;
  width: 100%;
  table-layout: fixed;
`;

export const TableBody = styled.tbody`
  display: block;
  margin-top: 1rem;
  width: 100%;
  height: 55vh;
  overflow: hidden auto;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.gray};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.onSurface};
  }
`;

