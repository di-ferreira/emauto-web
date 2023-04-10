import React, { useEffect, useState } from 'react';
import {
  FormEditCliente,
  FormEditClienteColumn,
  FormEditClienteInputContainer,
  FormEditClienteRow,
  FormEditClienteSwitchContainer,
  FormFooter,
} from './styles';
import useModal from '../../../hooks/useModal';
import { iCliente } from '../../../@types';
import { InputCustom } from '../../../components/InputCustom';
import { CustomSwitch } from '../../../components/CustomSwitch';
import Button from '../../../components/Button';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { MaskCnpjCpf } from '../../../utils';

interface iModalCliente {
  Cliente: iCliente;
}
export const ModalCliente: React.FC<iModalCliente> = ({ Cliente }) => {
  const [cliente, setCliente] = useState<iCliente>(Cliente);

  const { Modal, showModal } = useModal();

  useEffect(() => {
    showModal();
    setCliente(Cliente);
  }, [Cliente]);

  const ClearFields = () => {
    setCliente({} as iCliente);
  };

  return (
    <>
      {Modal && (
        <Modal Title={'Cliente - ' + cliente.NOME}>
          <FormEditCliente>
            <FormEditClienteColumn>
              <FormEditClienteRow>
                <FormEditClienteInputContainer>
                  <InputCustom
                    onChange={() => {}}
                    label='ID'
                    name='CLIENTE'
                    value={Cliente.CLIENTE}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='NOME'
                    onChange={() => {}}
                    name='NOME'
                    value={Cliente.NOME}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='E-MAIL'
                    onChange={() => {}}
                    name='EMAIL'
                    value={Cliente.EMAIL}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='TELEFONE'
                    onChange={() => {}}
                    name='TELEFONE'
                    value={Cliente.TELEFONE}
                  />
                </FormEditClienteInputContainer>
              </FormEditClienteRow>
              <FormEditClienteRow>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='CNPJ'
                    onChange={() => {}}
                    name='Cliente.CIC'
                    value={MaskCnpjCpf(Cliente.CIC)}
                  />
                </FormEditClienteInputContainer>
              </FormEditClienteRow>
              <FormEditClienteRow>
                <FormEditClienteSwitchContainer>
                  <CustomSwitch
                    label='BLOQUEADO'
                    checked={Cliente.BLOQUEADO === 'S' ? true : false}
                    onClick={() => {}}
                  />
                </FormEditClienteSwitchContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='MOTIVO BLOQUEIO'
                    onChange={() => {}}
                    name='Cliente.MOTIVO'
                    value={Cliente.MOTIVO}
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
              />
            </FormFooter>
          </FormEditCliente>
        </Modal>
      )}
    </>
  );
};

