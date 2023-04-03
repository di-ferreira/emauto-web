import { create } from 'zustand';
import api from '../../services/index';
import { iCliente, iFilter } from '../../@types';

interface iUseCliente {
  isLoading: boolean;
  isError: boolean;
  ErrorMessage: string;
  TotalRegisters: number;
  RegistersPerPage: number;
  CurrentPage: number;
  data: iCliente[];
  GetClientes: (filter?: iFilter<iCliente>) => void;
  // GetCliente: (id: number) => iCliente;
  // UpdateCliente: (value: iCliente) => iCliente;
}

const ROUTE_CLIENTE = '/ClientesService/';

const CreateFilter = (filter: iFilter<iCliente>): string => {
  let ResultFilter = filter.filter
    ? typeof filter.filter.value === 'string'
      ? `$filter=${filter.filter.key} like %${filter.filter.value}%`
      : `$filter=${filter.filter.key} eq ${filter.filter.value}`
    : '';

  let ResultOrderBy = filter.orderBy ? `&$orderby=${filter.orderBy}` : '';

  let ResultSkip = filter.skip ? `&$skip=${filter.skip}` : '&$skip=0';

  let ResultTop = filter.top ? `$top=${filter.top}` : '$top=15';

  ResultFilter !== '' ? (ResultTop = `&${ResultTop}`) : (ResultTop = ResultTop);

  let ResultRoute: string = `?${ResultFilter}${ResultTop}${ResultSkip}${ResultOrderBy}`;
  return ResultRoute;
};

const GetClientes = (
  state: iUseCliente,
  filter?: iFilter<iCliente>
): iUseCliente => {
  let dataCliente: iCliente[] = [];
  state.ErrorMessage = '';
  state.isError = false;
  state.isLoading = true;
  state.data = [];
  state.TotalRegisters = 0;
  state.RegistersPerPage = filter?.top ? filter.top : 15;
  state.CurrentPage =
    filter?.top && filter?.skip ? filter.skip / filter.top : 1;

  let NewFilter: iFilter<iCliente> = {
    ...filter,
    skip: (state.CurrentPage - 1) * state.RegistersPerPage,
  };

  api
    .get(
      `${ROUTE_CLIENTE}Listar${
        filter ? CreateFilter(NewFilter) : CreateFilter({} as iFilter<iCliente>)
      }`
    )
    .then(async (response) => {
      let data: any;
      data = await response.data;
      state.TotalRegisters = data.Qtd_Registros;
      dataCliente = data.Dados;
      state.data = dataCliente;
    })
    .catch((error) => {
      state.ErrorMessage = error.message;
      state.isError = true;
    })
    .finally(() => {
      state.isLoading = false;
    });
  console.log(state);
  return state;
};

const useClientes = create<iUseCliente>((set) => ({
  ErrorMessage: '',
  isError: false,
  isLoading: false,
  TotalRegisters: 0,
  RegistersPerPage: 0,
  CurrentPage: 1,
  data: [],
  GetClientes: (filter) => {
    set((state) => GetClientes(state, filter));
  },
}));

export default useClientes;
