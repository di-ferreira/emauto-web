import { create } from 'zustand';
import api from '../../services/index';
import { iCliente, iFilter } from '../../@types';

interface iDataCliente {
  Qtd_Registros: number;
  Dados: iCliente[];
}
interface iUseCliente {
  GetClientes: (filter?: iFilter<iCliente>) => Promise<iDataCliente>;
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

// const GetClientes = (
//   state: iUseCliente,
//   filter?: iFilter<iCliente>
// ): iUseCliente => {
//   let dataCliente: iCliente[] = [];
//   state.ErrorMessage = '';
//   state.isError = false;
//   state.isLoading = true;
//   state.data = [];
//   state.TotalRegisters = 0;
//   state.RegistersPerPage = filter?.top ? filter.top : 15;
//   state.CurrentPage =
//     filter?.top && filter?.skip ? filter.skip / filter.top : 1;

//   let NewFilter: iFilter<iCliente> = {
//     ...filter,
//     skip: (state.CurrentPage - 1) * state.RegistersPerPage,
//   };

//   api
//     .get(
//       `${ROUTE_CLIENTE}Listar${
//         filter ? CreateFilter(NewFilter) : CreateFilter({} as iFilter<iCliente>)
//       }&$expand=Telefones`
//     )
//     .then(async (response) => {
//       let data: any;
//       data = await response.data;
//       state.TotalRegisters = data.Qtd_Registros;
//       state.TotalPages = Math.ceil(
//         state.TotalRegisters / state.RegistersPerPage
//       );
//       dataCliente = data.Dados;
//       state.data = dataCliente;
//     })
//     .catch((error) => {
//       state.ErrorMessage = error.message;
//       state.isError = true;
//     })
//     .finally(() => {
//       state.isLoading = false;
//     });
//   console.log(state);
//   return state;
// };

const GetClientes = async (
  filter?: iFilter<iCliente>
): Promise<iDataCliente> => {
  const response = await api.get(
    `${ROUTE_CLIENTE}Listar${
      filter ? `${CreateFilter(filter)}&` : '?'
    }$expand=Telefones`
  );

  return response.data;
};

const useClientes = create<iUseCliente>((set) => ({
  GetClientes: (filter) => GetClientes(filter),
}));

export default useClientes;
