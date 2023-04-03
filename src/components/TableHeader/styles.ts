import styled from 'styled-components';
import { Black, Light } from '../../colors';

export const TableHeaderCell = styled.th`
  background-color: ${(props) =>
    props.theme.name === 'light' ? Light.surface : Black.text};
  font-weight: 500;
  text-align: center;
  font-size: 1.4rem;
  padding: 1.2rem;
  min-width: 12rem;
  color: ${(props) => props.theme.colors.gray};
  border-bottom: solid 1px ${(props) => props.theme.colors.secondary};
`;

export const TableHeaderRow = styled.tr`
  display: block;
  position: relative;
  height: 2.5rem;
`;
