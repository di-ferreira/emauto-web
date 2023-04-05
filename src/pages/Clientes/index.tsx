import React, { useCallback, useEffect, useState } from 'react';
import { iCliente, iColumnType, iFilter, iOption } from '../../@types';
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
import useSelect from '../../hooks/UseSelect';
import Button from '../../components/Button';
import { InputCustom } from '../../components/InputCustom';
import { CustomSwitch } from '../../components/CustomSwitch';
import useClientes from '../../hooks/useClientes';

export const Clientes: React.FC = () => {
  const { GetClientes } = useClientes();

  const [ClienteList, setClienteList] = useState<iCliente[]>([]);

  /* PAGINAÇÃO */
  const [RegistersPerPage, setRegistersPerPage] = useState<number>(15);

  const [CurrentPage, setCurrentPage] = useState<number>(1);

  const [SkipPerPage, setSkipPerPage] = useState<number>(0);

  const [TotalPages, setTotalPages] = useState<number>(1);

  /* STATUS LISTA CLIENTES */

  const [ErrorMessage, setErrorMessage] = useState<string>('');

  const [IsLoading, setIsLoading] = useState<boolean>(false);

  /* OUTROS */
  const [cliente, setCliente] = useState<iCliente>({} as iCliente);

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

  useEffect(() => {
    ListClientes({ top: RegistersPerPage });
  }, []);

  const ListClientes = async (filter?: iFilter<iCliente>) => {
    setErrorMessage('');
    try {
      setIsLoading(true);
      const Data = await GetClientes(filter);
      console.log(Data);
      setClienteList(Data.Dados);
      setTotalPages(Math.ceil(Data.Qtd_Registros / RegistersPerPage));
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const ChangeRowsPerPage = (value: iOption) => {
    setRegistersPerPage((oldValue) => {
      oldValue = Number(value.value);
      return oldValue;
    });
    ListClientes({ top: Number(value.value), orderBy: 'CLIENTE' });
  };

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
      key: 'CLIENTE',
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
      key: 'ENDERECO',
      title: 'ENDEREÇO',
      width: 200,
    },
    {
      key: 'BAIRRO',
      title: 'BAIRRO',
      width: 200,
    },
    {
      key: 'CIDADE',
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
        <Modal Title={'Cliente - ' + cliente.NOME}>
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
      {IsLoading && <Loading />}
      {ClienteList && !IsLoading && (
        <Table
          messageNoData={ErrorMessage}
          columns={headers}
          data={ClienteList}
          CurrentPage={CurrentPage}
          TotalPages={TotalPages}
          RowsPerPage={RegistersPerPage}
          onChange={ChangeRowsPerPage}
        />
      )}
      {ClienteList.length === 0 && !IsLoading && ErrorMessage === '' && (
        <p>Não há registros</p>
      )}
    </Container>
  );
};

