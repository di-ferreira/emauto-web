import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { ReactNode } from 'react';

export interface iButtonAction<T> {
  Text?: string;
  Title?: string;
  Icon?: IconProp;
  Size?: SizeProp;
  Rounded?: boolean;
  Type?: iButtonType;
  onclick: (item: T) => void;
}

export interface iColumnType<T> {
  key: string;
  title: string;
  width?: number;
  isHideMobile?: boolean;
  render?: (column: iColumnType<T>, item: T) => void;
  action?: iButtonAction<T>[];
}

export interface iOption {
  label: string;
  value: string | number;
}

export interface iTablePagination {
  CurrentPage: number;
  TotalPages: number;
  RowsPerPage: number;
  onFirstPage: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  onLastPage: () => void;
  onChange: (value: iOption) => void;
}

export interface iTableProps<T> extends iTablePagination {
  messageNoData?: string;
  data: T[];
  columns: iColumnType<T>[];
}

export interface iFilterQuery<T> {
  key: keyof T;
  value: string | number;
  typeSearch?: 'eq' | 'like';
}

export interface iFilter<T> {
  filter?: iFilterQuery<T>[];
  orderBy?: keyof T;
  top?: number;
  skip?: number;
}

export interface iModalRender {
  Title: string;
  OnClose: () => void;
  children?: ReactNode;
}
export interface iModal {
  Title: string;
  children?: ReactNode;
}
export interface iButton {
  Text?: string;
  TypeButton?: 'button' | 'reset' | 'submit';
  Title?: string;
  Height?: string;
  Width?: string;
  Icon?: IconProp;
  Size?: SizeProp;
  Rounded?: boolean;
  Type?: iButtonType;
  background?: string;
  textColor?: string;
  disabled?: boolean;
  AnimationSpin?: boolean;
  AnimationPulse?: boolean;
  onclick?: () => void;
}

export type iButtonType =
  | 'default'
  | 'success'
  | 'warn'
  | 'danger'
  | 'primary'
  | 'secondary';

export type iIconType = iButtonType;

export type iSwitchType = iButtonType;

export type iTabData = {
  Icon: IconProp;
  TitleTab: string;
  Link: string;
  Closable?: boolean;
  isActive: boolean;
};

export interface iUserLogin {
  usuario: string;
  senha: string;
}

export interface iCurrentUser {
  Usuario: string;
  Master: boolean;
  Libera: boolean;
  NivelLibera: string;
}

export interface iTokenPayload {
  Usuario: string;
  Master: boolean;
  Libera: boolean;
  NivelLibera: string;
  Validade: string;
  iss: string;
}

export interface iSolicitante {
  ID: number;
  NOME: string;
  TELEFONES: string;
  EMAIL: string;
  SENHA: string;
  EMPRESA: iEmpresa;
}

export interface iEmpresa {
  ID: number;
  RAZAO_SOCIAL: string;
  NOME: string;
  CNPJ: string;
  TELEFONES: string;
  BLOQUEADO: string | JSX.Element | null;
  MOTIVO_BLOQUEADO: string;
}

export interface iCliente {
  CLIENTE: number;
  NOME: string;
  ENDERECO: string;
  BAIRRO: string;
  CIDADE: string;
  UF: string;
  CEP: string;
  CIC: string;
  DT_CADASTRO: string;
  DT_NASCIMENTO: string;
  DT_ULT_COMPRA: string;
  INSC_IDENT: string | null;
  TELEFONE: string;
  FAX: string | null;
  EMAIL: string | null;
  BLOQUEADO: string;
  MOTIVO: string | null;
  P1_DE: number;
  P1_ATE: number;
  P1_VENCIMENTO: number;
  P2_DE: number;
  P2_ATE: number;
  P2_VENCIMENTO: number;
  USARLIMITE: string;
  LIMITE: number;
  DESCONTO: string;
  OBS: string | null;
  VALOR_DESCONTO: number;
  ECF: string;
  BOLETO: string;
  CARTEIRA: string;
  ROTA: number;
  TAXA_ENTREGA: string | null;
  CLASSIFICACAO: number;
  FRETE_POR_CONTA: string | null;
  FRETE_TIPO: string | null;
  ACRESCIMO_NOTA: number;
  VENDEDOR: number;
  OS: string;
  TIPO_FAT: string | null;
  MESSAGEM_FINANCEIRO: string | null;
  ENDERECO_NUM: string;
  ENDERECO_CPL: string | null;
  ENDERECO_COD_MUN: number;
  ENDERECO_COD_UF: number;
  Tabela: string;
  ATUALIZAR: string;
  CONDICAO_PAGAMENTO: string | null;
  APELIDO: string | null;
  EMAIL_FINANCEIRO: string | null;
  DESCONTO_AVISTA: string | null;
  TRANSPORTADORA: string | null;
  ID_CONDICAO: string | null;
  FROTA: string | null;
  IDENTIDADE: string | null;
  MENSAGEM_FINANCEIRO: string | null;
  GRUPO: number;
  END_ENTREGA: string | null;
  INSCRICAO_M: string | null;
  LIMITE_CHEQUE: string | null;
  META: string | null;
  SOMENTE_NFE: string;
  VENDEDOR_INTERNO: string | null;
  DATA_ATUALIZACAO: string;
  GEO_LAT: string | null;
  GEO_LNG: string | null;
  DDA: string;
  V100: string | null;
  TIPO_CLIENTE: string;
  AtualizarRegiao: string | null;
  SENHA: string | null;
  EMAIL_VENDA_DIRETA: string | null;
  SENHA_VENDA_DIRETA: string | null;
  PERC_VENDA_DIRETA: string | null;
  ConsumidorFinal: string | null;
  DESCONTO_BOLETO: string | null;
  REGIAO: string | null;
  OFICINA: string | null;
  'Telefones@xdata.proxy': string;
  'FollowUpList@xdata.proxy': string;
  'AgendamentosList@xdata.proxy': string;
  'PendenciasList@xdata.proxy': string;
}
