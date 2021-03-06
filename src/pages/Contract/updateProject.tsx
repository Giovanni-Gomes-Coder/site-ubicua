import React, { useCallback, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../components/hooks/provider/toast';

import getValidationErrors from '../../utils/getValidationsErros';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { FaTrash, FaSave } from 'react-icons/fa';
import Button from '../../components/Shared/Button';
import Header from '../../components/Portal/Header';

import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Panel } from '../../components/Portal/Panel';

import { CancelButton } from '../Config/styles';
import Input from '../../components/Shared/Input';

import { Loading } from '../../components/Site/WidgetForm/Loading';
import { useUsers } from '../User/useUsers';
import Select from '../../components/Shared/Select';
import { useStatus } from '../Config/useStatus';
import { useContract } from './useContracts';

interface UpdateContractProps {
  id: string;
  name: string;
  description: string;
  active?: boolean;
  date_start: string;
  date_end: string;
  negotiated_value: string;
  user_id: string;
}

const UpdateContract: React.FC = () => {
  //style colors customTheme
  const bg = useColorModeValue('hoverDark', 'hoverLight');
  const formRef = useRef<FormHandles>(null);
  const [isSendingContract, setIsSendingContract] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { id } = useParams();
  const { data } = useUsers();
  const { data: dataContract } = useContract(String(id));

  const selectOptionsUsers = data?.users;

  formRef.current?.setFieldValue('name', dataContract?.name);
  formRef.current?.setFieldValue('description', dataContract?.description);
  formRef.current?.setFieldValue('date_start', dataContract?.date_start);
  formRef.current?.setFieldValue('date_end', dataContract?.date_end);
  formRef.current?.setFieldValue('negotiated_value', dataContract?.negotiated_value);
  formRef.current?.setFieldValue('user_id', dataContract?.user.id);

  const selectOptions = [{ value: 'USER' }, { value: 'ADMIN' }, { value: 'SUPER_ADMIN' }, { value: 'CLIENT' }, { value: 'OPERATOR' }, { value: 'COMERCIAL' }];

  const handleSubmitUpdateContract = useCallback(
    async (data: UpdateContractProps) => {
      try {

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          id: Yup.string(),
          name: Yup.string()
            .required('Nome do Projeto ?? Obrigat??rio'),
          description: Yup.string().required('Descri????o ?? obrigat??rio'),
          date_start: Yup.string(), //Yup.date().required('Data ?? obrigat??rio'),
          date_end: Yup.string(), //Yup.date().required('Data ?? obrigat??rio'),
          negotiated_value: Yup.string().required('Valor negociado ?? obrigat??rio'),
          user_id: Yup.string().required('Usu??rio ?? obrigat??rio')
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          id: data.id,
          name: data.name,
          description: data.description,
          active: data.active,
          date_start: data.date_start,
          date_end: data.date_end,
          negotiated_value: data.negotiated_value,
          user_id: data.user_id
        }

        setIsSendingContract(true);
        await api.post(`/v1/contract/update/${id}`, formData);

        navigate('/contract');

        addToast({
          type: 'success',
          title: 'Cadastro Realizado!',
        });
        setIsSendingContract(false);


      } catch (err) {
        console.log("error", err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro cadastro, tente novamente',
        });

      }
    },
    [addToast, navigate, formRef],
  );

  function handleResetForm(event: React.MouseEvent) {
    event?.preventDefault();
    formRef.current?.reset();
  }

  return (
    <>
      <Header />
      <Panel title={dataContract?.name ? dataContract.name : 'Atualize o Projeto'} back='/contract'>

        <Form ref={formRef} initialData={dataContract} onSubmit={handleSubmitUpdateContract} style={{ width: '90%', margin: '0rem auto 0' }}>
          <Flex w='100%' gap='2rem' justify='center' align='center' mb='0.5rem'>
            <Flex direction='column' w='100%'>
              <Input id='name' type='text' name='name' placeholder='Name | Number Contract' label='Nome do Projeto' />
              <Input id='progress' type='text' name='progress' placeholder='Progress' label='Progresso' />
              <Select name="phase_contract" label="Tipo de Usu??rio">
                {selectOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </Select>

              <Input type="date" min="01/01/2021" max="31/12/2030" name='date_start' label='Data In??cio:' />
              {/* <Radio name="active" options={radioOptions} /> */}
            </Flex>

            <Flex direction='column' w='100%'>
              <Input type="number" name="negotiated_value" placeholder='Valor Negociado' label='Valor Negociado' />

              <Input type="number" name="real_cost" placeholder='Custo Real' label='Custo Real' />

              <Select name="user_id" label="Respons??vel" defaultValue={dataContract?.user.id}>
                <option key={0} value='Select a user'>Select a user</option>
                {selectOptionsUsers?.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Select>

              <Input type='date' min="01/01/2021" max="31/12/2030" name='date_end' label='Data Fim:' />
              {/* <Input id='user_id' type='text' name='user_id' placeholder='Respons??vel' /> */}
            </Flex>
          </Flex>
          <Input id='description' type='text' name='description' placeholder='Description' label='Descri????o' />


          <Flex align='center' w='100%' justify='space-between'>
            <Button disabled={isSendingContract} onClick={() => formRef.current?.submitForm()}>
              <FaSave style={{ marginRight: '0.5rem' }} />
              {isSendingContract ? <Loading /> : 'Save Register'}
            </Button>
            <CancelButton onClick={handleResetForm} >
              <FaTrash size={25} />
            </CancelButton>
          </Flex>
        </Form>
      </Panel>
      {/* ))} */}

    </>
  );
}

export default UpdateContract;
