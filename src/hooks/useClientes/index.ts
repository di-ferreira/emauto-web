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
  // GetCliente: (id: number) => iCliente;
  // UpdateCliente: (value: iCliente) => iCliente;
}

const ROUTE_CLIENTE = '/ClientesService/';

const CreateFilter = ({ filter, orderBy, skip, top }: iFilter): string => {
  let ResultRoute: string = ROUTE_CLIENTE;
  return ResultRoute;
};

const GetClientes = (): iCliente[] => {
  api.get(`${ROUTE_CLIENTE}Listar`).then((response) => {});
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

const useClientes = create<iUseCliente>((set) => ({
  ErrorMessage: '',
  isError: false,
  isLoading: false,
  GetClientes: () => {
    set(state => ({
      let data: iCliente[] = [];
    api
      .get(`${ROUTE_CLIENTE}Listar`)
      .then(async (response) => {
        data = await response.data.Dados;
      })
      .catch(error => {
        
      })
      .finally();
    }))
  },
}));

export default useClientes;
