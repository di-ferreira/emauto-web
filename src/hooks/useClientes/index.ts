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
  let ResultFilter: string = '';

  if (filter.filter && filter.filter.length >= 1) {
    ResultFilter = '$filter=';
    let andStr = ' and ';
    filter.filter.map((itemFilter) => {
      if (itemFilter.typeSearch)
        itemFilter.typeSearch === 'like'
          ? (ResultFilter = `${ResultFilter}${itemFilter.key} like '%${String(
              itemFilter.value
            ).toUpperCase()}%'${andStr}`)
          : itemFilter.typeSearch === 'eq' &&
            (ResultFilter = `${ResultFilter}${itemFilter.key} eq '${itemFilter.value}'${andStr}`);
      else
        ResultFilter = `${ResultFilter}${itemFilter.key} like '%${String(
          itemFilter.value
        ).toUpperCase()}%'${andStr}`;
    });
    ResultFilter = ResultFilter.slice(0, -andStr.length);
  }

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
  return response.data;
};

const useClientes = create<iUseCliente>((set) => ({
  GetClientes: (filter) => GetClientes(filter),
}));

export default useClientes;
