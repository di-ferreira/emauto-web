import React, { useEffect, useState } from 'react';
import { iCliente, iColumnType, iEmpresa, iSolicitante } from '../../@types';
import Table from '../../components/Table';
import {
  Container,
  ContainerInput,
  FilterContainer,
  FormEditCliente,
  FormEditClienteColumn,
  FormEditClienteInputContainer,
  FormEditClienteRow,
  FormEditClienteSwitchContainer,
  FormFooter,
  SwitchContainer,
} from './styles';
import {
  faBan,
  faCheck,
  faEdit,
  faSave,
  faSearch,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Loading } from '../../components/Loading';
import { Icon } from '../../components/Icon';
import useModal from '../../hooks/useModal';
import useSelect, { iOption } from '../../hooks/UseSelect';
import Button from '../../components/Button';
import { InputCustom } from '../../components/InputCustom';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useIsFetching,
} from 'react-query';
import { CustomSwitch } from '../../components/CustomSwitch';
import { useClientes } from '../../hooks/useClientes';

export const Clientes: React.FC = () => {
  const { GetClientes } = useClientes();

  const [cliente, setCliente] = useState<iCliente>({} as iCliente);

  const { data, isLoading } = useQuery('cliente-list', GetClientes);

  const queryClient = useQueryClient();

  // const MutateEdit = useMutation(
  //   () => UpdateSolicitante(solicitante ? solicitante : ({} as iSolicitante)),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries('solicitantes-list');
  //       showModal();
  //     },
  //   }
  // );

  const { Modal, showModal } = useModal();

  const { Select } = useSelect();

  const [checkedSwitchFilter, setCheckedSwitchFilter] =
    useState<boolean>(false);

  const OptionsSelect: iOption[] = [
    { label: 'NOME', value: 'nome' },
    { label: 'CÓDIGO', value: 'codigo' },
    { label: 'CPF/CNPJ', value: 'cic' },
    { label: 'BAIRRO', value: 'bairro' },
    { label: 'CIDADE', value: 'cidade' },
  ];

  const LoadSolicitante = (value: iCliente) => {
    setCliente(value);
    showModal();
  };

  // const onSaveCliente = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   MutateEdit.mutate();
  //   ClearFields();
  //   showModal();
  // };

  const OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    console.log(`${name}=>${value}`);
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const ClearFields = () => {
    setCliente({} as iCliente);
  };

  const headers: iColumnType<iCliente>[] = [
    {
      key: 'ID',
      title: 'ID',
      width: 200,
    },
    {
      key: 'NOME',
      title: 'NOME',
      width: 200,
    },
    {
      key: 'CIC',
      title: 'CPF/CNPJ',
      width: 200,
    },
    {
      key: 'Endereco',
      title: 'ENDEREÇO',
      width: 200,
    },
    {
      key: 'Bairro',
      title: 'BAIRRO',
      width: 200,
    },
    {
      key: 'Cidade',
      title: 'CIDADE',
      width: 200,
    },
    {
      key: 'UF',
      title: 'UF',
      width: 70,
    },
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: 200,
      action: [
        {
          onclick: () => {},
          Icon: faEdit,
          Rounded: true,
          Title: 'Editar',
          Type: 'warn',
        },
        {
          onclick: () => {},
          Icon: faTrashAlt,
          Rounded: true,
          Title: 'Excluír',
          Type: 'danger',
        },
      ],
    },
  ];

  return (
    <Container>
      <FilterContainer>
        <Select
          options={OptionsSelect}
          onChange={(SingleValue) => console.log(SingleValue)}
        />
        <ContainerInput>
          <InputCustom
            onChange={(e) => console.log(e.target.value)}
            placeholder='Digite sua busca'
          />
        </ContainerInput>

        <Button
          Icon={faSearch}
          onclick={() => console.log('search')}
          Text='Buscar'
          Type='secondary'
          Title='Buscar'
          Height={'40px'}
        />
        <SwitchContainer>
          <CustomSwitch
            label='Ativos'
            checked={checkedSwitchFilter}
            style='secondary'
            onClick={() => setCheckedSwitchFilter(!checkedSwitchFilter)}
          />
        </SwitchContainer>
      </FilterContainer>
      {Modal && cliente && (
        <Modal Title={'Cliente - ' + cliente.Nome}>
          {/* <FormEditCliente>
            <FormEditClienteColumn>
              <FormEditClienteRow>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='ID'
                    onChange={OnChangeInput}
                    name='ID'
                    value={solicitante.ID}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='NOME'
                    onChange={OnChangeInput}
                    name='NOME'
                    value={solicitante.NOME}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='E-MAIL'
                    onChange={OnChangeInput}
                    name='EMAIL'
                    value={solicitante.EMAIL}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='TELEFONES'
                    onChange={OnChangeInput}
                    name='TELEFONES'
                    value={solicitante.TELEFONES}
                  />
                </FormEditClienteInputContainer>
              </FormEditClienteRow>
              <FormEditClienteRow>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='EMPRESA'
                    onChange={OnChangeInput}
                    name='EMPRESA.NOME'
                    value={solicitante.EMPRESA.NOME}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='CNPJ'
                    onChange={OnChangeInput}
                    name='EMPRESA.CNPJ'
                    value={solicitante.EMPRESA.CNPJ}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='RAZÃO SOCIAL'
                    onChange={OnChangeInput}
                    name='EMPRESA.RAZAO_SOCIAL'
                    value={solicitante.EMPRESA.RAZAO_SOCIAL}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='TELEFONES EMPRESA'
                    onChange={OnChangeInput}
                    name='EMPRESA.TELEFONES'
                    value={solicitante.EMPRESA.TELEFONES}
                  />
                </FormEditClienteInputContainer>
              </FormEditClienteRow>
              <FormEditClienteRow>
                <FormEditClienteSwitchContainer>
                  <CustomSwitch
                    label='BLOQUEADO'
                    checked={checkedSwitchSolicitante}
                    onClick={() => handdleCheckSolicitanteBloqueado()}
                  />
                </FormEditClienteSwitchContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='MOTIVO BLOQUEIO'
                    onChange={OnChangeInput}
                    name='EMPRESA.MOTIVO_BLOQUEADO'
                    value={solicitante.EMPRESA.MOTIVO_BLOQUEADO}
                  />
                </FormEditClienteInputContainer>
              </FormEditClienteRow>
            </FormEditClienteColumn>
            <FormFooter>
              <Button
                Text='ATUALIZAR'
                Type='success'
                Icon={faSave}
                Height='3.5rem'
                TypeButton='submit'
              />
            </FormFooter>
          </FormEditCliente> */}
        </Modal>
      )}
      {isLoading && <Loading />}
      {data && !isLoading && <Table columns={headers} data={data} />}
      {!data && !isLoading && <p>Não há registros</p>}
    </Container>
  );
};

