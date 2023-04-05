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

const GetClientes = async (
  filter?: iFilter<iCliente>
): Promise<iDataCliente> => {
  const response = await api.get(
    `${ROUTE_CLIENTE}Listar${
      filter ? `${CreateFilter(filter)}&` : '?'
    }$expand=Telefones`
  );
  console.log(response);
  return response.data;
};

const useClientes = create<iUseCliente>((set) => ({
  GetClientes: (filter) => GetClientes(filter),
}));

export default useClientes;
