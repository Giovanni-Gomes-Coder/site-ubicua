import React, { useCallback, ChangeEvent, useRef, useState, InputHTMLAttributes, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/hooks/provider/toast';

import getValidationErrors from '../../utils/getValidationsErros';
import { FormHandles, useField } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { BiText } from 'react-icons/bi';
import { FaTrash, FaImage, FaFileImport, FaPlus, FaFile, FaSave } from 'react-icons/fa';
import Button from '../../components/Shared/Button';
import Header from '../../components/Portal/Header';

import { Badge, Box, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, HStack, Image, Input as InputChakra, Link, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio as RadioChackara, RadioGroup, Textarea, useColorModeValue } from '@chakra-ui/react';
import BoxForms from '../../components/Portal/BoxForms';
import { Panel } from '../../components/Portal/Panel';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { CancelButton, FormFooter } from '../Config/styles';
import { IconBaseProps } from 'react-icons';

import Input from '../../components/Shared/Input';
import Radio from '../../components/Shared/Radio';
import { Loading } from '../../components/Site/WidgetForm/Loading';

interface CreateProjectProps {
  id: string;
  name: string;
  description: string;
  active?: boolean;
  start: Date;
  end: Date;
  progress: string;
  negotiated: string;
  real_cost: string;
  status_id: string;
  user_id: string;
}

const CreateProject: React.FC = () => {
  //style colors customTheme
  const bg = useColorModeValue('hoverDark', 'hoverLight');
  const navigate = useNavigate();
  const { addToast } = useToast();

  // formRef
  const formRef = useRef<FormHandles>(null);
  const [isSendingProject, setIsSendingProject] = useState(false);


  const handleSubmitCreateProject = useCallback(
    async (data: CreateProjectProps) => {
      try {

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          id: Yup.string(),
          name: Yup.string()
            .required('Nome do Projeto é Obrigatório'),
          description: Yup.string().required('Descrição é obrigatório'),
          start: Yup.string(), //Yup.date().required('Data é obrigatório'),
          end: Yup.string(), //Yup.date().required('Data é obrigatório'),
          progress: Yup.string().required('Progresso é obrigatório'),
          negotiated: Yup.string().required('Valor negociado é obrigatório'),
          real_cost: Yup.string().required('Custo real é obrigatório'),
          status_id: Yup.string().required('Status é obrigatório'),
          user_id: Yup.string().required('Usuário é obrigatório')
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          id: data.id,
          name: data.name,
          description: data.description,
          active: data.active,
          date_start: data.start,
          date_end: data.end,
          progress: data.progress,
          negotiated_value: data.negotiated,
          real_cost: data.real_cost,
          status_id: data.status_id,
          user_id: data.user_id
        }

        setIsSendingProject(true);
        const result = await api.post(`/v1/project/create/`, formData);

        console.log("formData", result);

        navigate('/project');

        addToast({
          type: 'success',
          title: 'Cadastro Realizado!',
        });
        setIsSendingProject(false);
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
    [addToast, navigate],
  );



  function handleResetForm(event: React.MouseEvent) {
    event?.preventDefault();
    formRef.current?.reset();
  }

  const radioOptions = [
    { id: 'ativo', value: 'ativo', label: 'Ativo' },
    { id: 'inativo', value: 'inativo', label: 'Inativo' },
  ]

  return (
    <>
      <Header />
      <Panel title="Create a new Project">
        <Flex>
          <Flex flex={1} justify="left" align="center">
            <Flex justifyContent="space-between" borderRadius={10}>
              <Link as={RouterLink} to="/dashboard" bg={bg} mr={1} p={2} borderRadius={10}>
                <FiArrowLeft />
              </Link>
              <Link as={RouterLink} to="/dashboard" bg={bg} mr={1} p={2} borderRadius={10}>
                <FiArrowRight />
              </Link>
            </Flex>
          </Flex>

          <Flex flex={1} justify="right" align="center">
            <Flex borderRadius={10}>

            </Flex>
          </Flex>
        </Flex>

        <Form ref={formRef} onSubmit={handleSubmitCreateProject} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>

          <Flex direction='column' ml={10} mr={10} mt={5} w={585}>
            <Input id='name' type='text' name='name' placeholder='Número do Projeto' />

            <Input id='description' type='text' name='description' placeholder='Descrição' />

            <Input id='progress' type='text' name='progress' placeholder='Progresso' />

            <Input id='status_id' type='text' name='status_id' placeholder='Status do Projeto' />


            {/* <Radio name="active" options={radioOptions} /> */}

          </Flex>

          <Flex direction='column' mr={10} mt={5} w={585}>
            <Flex direction='row' mb={2}>
              <FormLabel htmlFor='start' fontSize={12} mt={2.5}>Data Início:</FormLabel>
              <Input type="date" min="01/01/2021" max="31/12/2030" name='start' />

              <FormLabel htmlFor='end' fontSize={12} ml={4} mt={2.5}>Data Fim:</FormLabel>
              <Input type='date' min="01/01/2021" max="31/12/2030" name='end' />
            </Flex>

            <Input type="number" name="negotiated" placeholder='Valor Negociado' />

            <Input type="number" name="real_cost" placeholder='Custo Real' />

            <Input id='user_id' type='text' name='user_id' placeholder='Responsável' />

          </Flex>

        </Form>

        <FormFooter>
          <Button disabled={isSendingProject} onClick={() => formRef.current?.submitForm()}>
            <FaSave style={{ marginRight: '0.5rem' }} />
            {isSendingProject ? <Loading /> : 'Salvar Registro'}
          </Button>
          <CancelButton onClick={handleResetForm} >
            <FaTrash size={25} />
          </CancelButton>
        </FormFooter>





      </Panel>
    </>
  );
}

export default CreateProject;


/*
EXAMPLE DE FORM CHACARA UI
*/



{/* <Form ref={formRef} onSubmit={handleSubmitCreateProject} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>

<Flex direction='column' ml={10} mr={10} mt={5} w={585}>

  <InputChakra ref={inputRef} id='name' type='name' name='name' mb='2rem' placeholder='Nome' />
  <InputChakra ref={emailRef} id='email' type='email' name='email' mb='2rem' placeholder='Nome' />

</Flex>
</Form> */}

{/* <Flex align='center' ml={10} w='100%'>
<Button type='submit' >
  <FaSave style={{ marginRight: '0.5rem' }} />
  Salvar Registro
</Button>
<CancelButton onClick={handleResetForm} >
  <FaTrash size={25} />
</CancelButton>

</Flex> */}

{/* <NumberInput max={50} min={10} mb='2rem'>
<NumberInputField id='amount' placeholder='valor negociado' />
<NumberInputStepper>
  <NumberIncrementStepper />
  <NumberDecrementStepper />
</NumberInputStepper>
</NumberInput>

<NumberInput max={50} min={10} mb='2rem'>
<NumberInputField id='amount' placeholder='Custo Real' />
<NumberInputStepper>
  <NumberIncrementStepper />
  <NumberDecrementStepper />
</NumberInputStepper>
</NumberInput> */}
