import React from 'react';

import { Container, ContainerButtons, ContainerInfo, Label } from './styles';
import Button from '../Button';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import useSelect, { iOption } from '../../hooks/UseSelect';

export const TablePagination: React.FC = () => {
  const { Select } = useSelect();
  const OptionsSelect: iOption[] = [
    { label: '15', value: 15 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ];
  /*
  top = qtd registros por página
  skip = qtd de registro "pulados"
  currentPage = skip/top
  totalPages = total de páginas
  */
  return (
    <Container>
      <ContainerInfo>
        <Label>qtd página</Label>
        <Select
          menuPosition='top'
          options={OptionsSelect}
          onChange={(SingleValue) => console.log(SingleValue)}
        />
      </ContainerInfo>
      <ContainerButtons>
        <Button
          Icon={faAngleDoubleLeft}
          Title='Primeiro'
          Type='secondary'
          Height='75%'
          Width='7rem'
        />
        <Button
          Icon={faAngleLeft}
          Title='Anterior'
          Type='secondary'
          Height='75%'
          Width='7rem'
        />
        <Label>
          página atual <strong>1</strong>
        </Label>
        <Button
          Icon={faAngleRight}
          Title='Próximo'
          Type='secondary'
          Height='75%'
          Width='7rem'
        />
        <Button
          Icon={faAngleDoubleRight}
          Title='Último'
          Type='secondary'
          Height='75%'
          Width='7rem'
        />
      </ContainerButtons>
    </Container>
  );
};

