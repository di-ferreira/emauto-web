import { create } from 'zustand';
import api from '../../services/index';
import { iCliente } from '../../@types';

interface iFilter {
  filter?: string;
  orderBy?: string;
  top: number;
  skip: number;
}

interface iUseCliente {
  isLoading: boolean;
  isError: boolean;
  ErrorMessage: string;
  GetClientes: () => iCliente[];
  GetCliente: (id: number) => iCliente;
  UpdateCliente: (value: iCliente) => iCliente;
}

const ROUTE_CLIENTE = '/ClientesService/Listar';

const CreateFilter = ({ filter, orderBy, skip, top }: iFilter): string => {
  let ResultRoute: string = ROUTE_CLIENTE;
  return ResultRoute;
};

const GetClientes = async ({
  filter,
  orderBy,
  skip = 0,
  top = 15,
}: iFilter): Promise<iCliente[]> => {
  const ROUTE = CreateFilter({ filter, orderBy, skip, top });
  const response = await api.get(ROUTE);
  return response.data.Dados;
};

// const UpdateSolicitante = async (
//   SolicitanteValue: iSolicitante
// ): Promise<iSolicitante> => {
//   const response = await api.put(
//     `solicitante/${SolicitanteValue.ID}`,
//     SolicitanteValue
//   );
//   console.log(response);
//   return response.data;
// };

const useClientes = create<iUseCliente>((set) => ({}));

export default useClientes;
