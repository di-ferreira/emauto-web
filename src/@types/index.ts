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

export interface iTableProps<T> {
  data: T[];
  columns: iColumnType<T>[];
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
  Cliente: number;
  Nome: string;
  Apelido: string;
  Endereco: string;
  Endereco_Num: string;
  Endereco_Cpl: string;
  Bairro: string;
  Cidade: string;
  UF: string;
  Cep: string;
  CIC: string;
  Insc_Ident: string;
  Identidade: string;
  Inscricao_M: string;
  DT_Cadastro: string;
  DT_Nascimento: string;
  Telefone: string;
  Email: string;
  Vendedor: number;
  Vendedor_Interno: number;
}