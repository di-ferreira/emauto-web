import React, { useEffect, useState } from 'react';
import {
  iCliente,
  iColumnType,
  iFilter,
  iFilterQuery,
  iOption,
} from '../../@types';
import Table from '../../components/Table';
import {
  Container,
  ContainerInput,
  FilterContainer,
  SwitchContainer,
} from './styles';
import {
  faBan,
  faCheck,
  faEdit,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { Loading } from '../../components/Loading';
import { Icon } from '../../components/Icon';
import useSelect from '../../hooks/UseSelect';
import Button from '../../components/Button';
import { InputCustom } from '../../components/InputCustom';
import { CustomSwitch } from '../../components/CustomSwitch';
import useClientes from '../../hooks/useClientes';
import { ModalCliente } from '../Modals/Cliente';
import { MaskCnpjCpf } from '../../utils';

interface iSearchCliente {
  filterBy: string;
  value: string;
  actives: boolean;
}

export const Clientes: React.FC = () => {
  const { GetClientes } = useClientes();

  const OptionsSelect: iOption[] = [
    { label: 'NOME', value: 'NOME' },
    { label: 'CÓDIGO', value: 'CLIENTE' },
    { label: 'CPF/CNPJ', value: 'CIC' },
    { label: 'BAIRRO', value: 'BAIRRO' },
    { label: 'CIDADE', value: 'CIDADE' },
  ];

  const [ClienteList, setClienteList] = useState<iCliente[]>([]);
  const [Cliente, setCliente] = useState<iCliente | null>(null);

  /* PAGINAÇÃO */
  const [RegistersPerPage, setRegistersPerPage] = useState<number>(15);

  const [CurrentPage, setCurrentPage] = useState<number>(1);

  const [TotalPages, setTotalPages] = useState<number>(1);

  const [TotalRegister, setTotalRegister] = useState<number>(1);

  const SkipPage = (
    NextPage: boolean = true,
    RegPerPage: number = RegistersPerPage
  ): number => {
    let CurPage = NextPage ? CurrentPage + 1 : CurrentPage - 1;
    const Skip = RegPerPage * CurPage - RegPerPage;
    return Skip;
  };

  /* STATUS LISTA CLIENTES */

  const [ErrorMessage, setErrorMessage] = useState<string>('');

  const [IsLoading, setIsLoading] = useState<boolean>(false);

  /* OUTROS */
  const [SearchCliente, setSearchCliente] = useState<iSearchCliente>({
    filterBy: OptionsSelect[0].value,
    value: '',
    actives: false,
  } as iSearchCliente);

  const { Select } = useSelect();

  const [checkedSwitchFilter, setCheckedSwitchFilter] =
    useState<boolean>(false);

  useEffect(() => {
    ListClientes({
      top: RegistersPerPage,
      orderBy: 'CLIENTE',
    });
  }, []);

  const RenderIconBloqueado = (value: string): JSX.Element => {
    if (value === 'S') return <Icon Icon={faBan} Type='danger' key={value} />;
    return <Icon Icon={faCheck} Type='success' key={value} />;
  };

  const MountQueryFilter = (
    filter: iSearchCliente
  ): iFilterQuery<iCliente>[] => {
    let listFilter: iFilterQuery<iCliente>[] = [];

    if (filter.value !== '') {
      if (filter.filterBy === 'CLIENTE' || filter.filterBy === 'CIC')
        listFilter = [
          {
            key: SearchCliente.filterBy as keyof iCliente,
            value: SearchCliente.value,
            typeSearch: 'eq',
          },
        ];
      else
        listFilter = [
          {
            key: SearchCliente.filterBy as keyof iCliente,
            value: SearchCliente.value,
          },
        ];

      if (filter.actives)
        listFilter = [
          ...listFilter,
          {
            key: 'BLOQUEADO',
            value: 'N',
            typeSearch: 'eq',
          },
        ];
    }
    return listFilter;
  };

  const SearchForFilter = () => {
    console.log(SearchCliente);

    ListClientes({
      top: RegistersPerPage,
      skip: 0,
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const ListClientes = async (filter?: iFilter<iCliente>) => {
    setErrorMessage('');
    try {
      setIsLoading(true);
      const Data = await GetClientes(filter);
      setClienteList(Data.Dados);
      setTotalPages(Math.ceil(Data.Qtd_Registros / RegistersPerPage));
      setTotalRegister(Data.Qtd_Registros);
    } catch (error: any) {
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

    ListClientes({
      top: Number(value.value),
      skip: RegistersPerPage * CurrentPage - RegistersPerPage,
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const GoToFirstPage = () => {
    setCurrentPage(1);
    ListClientes({
      top: RegistersPerPage,
      skip: 0,
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const GoToNextPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage + 1);
    ListClientes({
      top: RegistersPerPage,
      skip: SkipPage(),
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const GoToPrevPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage - 1);
    ListClientes({
      top: RegistersPerPage,
      skip: SkipPage(false),
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const GoToLastPage = () => {
    setCurrentPage(TotalPages);
    ListClientes({
      top: RegistersPerPage,
      skip: TotalRegister - RegistersPerPage,
      orderBy: 'CLIENTE',
      filter: MountQueryFilter(SearchCliente),
    });
  };

  const onOpenModalCliente = (value: iCliente) => {
    setCliente(value);
  };

  const headers: iColumnType<iCliente>[] = [
    {
      key: 'CLIENTE',
      title: 'ID',
      width: 50,
    },
    {
      key: 'NOME',
      title: 'NOME',
      width: 200,
    },
    {
      key: 'BLOQUEADO',
      title: 'BLOQUEADO',
      width: 110,
      render: (_, item) =>
        item.BLOQUEADO && <>{RenderIconBloqueado(String(item.BLOQUEADO))}</>,
    },
    {
      key: 'CIC',
      title: 'CPF/CNPJ',
      width: 200,
      render: (_, item) => <>{MaskCnpjCpf(item.CIC)}</>,
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
          onclick: onOpenModalCliente,
          Icon: faEdit,
          Rounded: true,
          Title: 'Editar',
          Type: 'warn',
        },
        // {
        //   onclick: () => {},
        //   Icon: faTrashAlt,
        //   Rounded: true,
        //   Title: 'Excluír',
        //   Type: 'danger',
        // },
      ],
    },
  ];

  return (
    <Container>
      <FilterContainer>
        <Select
          options={OptionsSelect}
          onChange={(SingleValue) =>
            SingleValue &&
            setSearchCliente({
              ...SearchCliente,
              filterBy: String(SingleValue.value),
            })
          }
        />
        <ContainerInput>
          <InputCustom
            onChange={(e) =>
              setSearchCliente({
                ...SearchCliente,
                value: e.target.value,
              })
            }
            placeholder='Digite sua busca'
          />
        </ContainerInput>

        <Button
          Icon={faSearch}
          onclick={() => SearchForFilter()}
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
            onClick={() => {
              setCheckedSwitchFilter(!checkedSwitchFilter);
              setSearchCliente({
                ...SearchCliente,
                actives: !checkedSwitchFilter,
              });
            }}
          />
        </SwitchContainer>
      </FilterContainer>
      {Cliente && <ModalCliente Cliente={Cliente} />}

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
          onNextPage={GoToNextPage}
          onFirstPage={GoToFirstPage}
          onLastPage={GoToLastPage}
          onPrevPage={GoToPrevPage}
        />
      )}
      {ClienteList.length === 0 && !IsLoading && ErrorMessage === '' && (
        <p>Não há registros</p>
      )}
    </Container>
  );
};

