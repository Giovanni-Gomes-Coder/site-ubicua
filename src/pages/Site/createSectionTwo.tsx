import React, { useCallback, ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/hooks/provider/toast';

import getValidationErrors from '../../utils/getValidationsErros';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import Input from '../../components/Shared/Input';
import { BiText } from 'react-icons/bi';
import { FaTrash, FaImage } from 'react-icons/fa';
import Button from '../../components/Shared/Button';
import Header from '../../components/Portal/Header';
import { CancelButton, Container, FormFooter } from './styles';
import data from '../../data';
import CreateSectionTopics from './createSectionTopics';

interface CreateMenuProps {
  title: string;
  description_one: string;
  image_one?: string;
  description_two: string;
}

const CreateSectionTwo: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [selectedFile, setSelectedFile] = useState('');
  const [selectedFileTwo, setSelectedFileTwo] = useState('');

  const [isActiveForm, setIsActiveForm] = useState(0);

  function showActiveForm(id: number) {
    setIsActiveForm(id)
  }
  //const fileInput = useRef(null)


  const fileSelectedHandlerInputOne = (event: any) => {
    // handle validations
    //console.log("img handle one", event.target.files[0]);
    setSelectedFile(event.target.files[0])
  }

  const fileSelectedHandlerInputTwo = (event: any) => {
    // handle validations
    //console.log("img handle two", event.target.files[0]);
    setSelectedFileTwo(event.target.files[0])
  }




  const handleSubmitCreateMenu = useCallback(
    async (data: CreateMenuProps) => {

      try {
        const imageData = new FormData();
        imageData.append('image_one', (selectedFile as any).name);
        imageData.append('image_two', (selectedFileTwo as any).name);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string()
            .required('T??tulo ?? Obrigat??rio'),
          description_one: Yup.string(),
          image_one: Yup.string(),
          description_two: Yup.string(),
          image_two: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          title: data.title,
          description_one: data.description_one
        }

        await api.post('/v1/sectionTwo/create', formData);

        navigate('/dashboard');

        addToast({
          type: 'success',
          title: 'Cadastro Realizado!',
        });
      } catch (err) {
        console.log(err);
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
    [addToast, navigate, selectedFile, selectedFileTwo],
  );


  function handleResetForm(event: React.MouseEvent) {
    event?.preventDefault();
    formRef.current?.reset();
  }

  return (
    <>
      <Header />
      <Container>
        <ul>
          <li>
            <button type="button"
              className={isActiveForm === 0 ? "active": undefined}
              onClick={() => showActiveForm(0)}
            >Principal</button>
          </li>
          <li>
            <button type="button"
              className={isActiveForm === 1 ? "active": undefined}
              onClick={() => showActiveForm(1)}
            >Secund??rio</button>
          </li>
        </ul>
        {isActiveForm === 0 &&
          <Form ref={formRef} onSubmit={handleSubmitCreateMenu}>
            <h1>Cadastrar | Alterar 2?? Sec????o</h1>
            <span className='subtitle'>preencha o formul??rio abaixo</span>

            <Input name="title" type="text" placeholder='T??tulo' icon={BiText} />
            <Input name="description_one" type="text" placeholder='First Description' icon={BiText} />
            {/* <Input name="image_one" type="file" placeholder='First Image' icon={BiText} onChange={fileSelectedHandlerInputOne} /> */}
            {/* <Input name="description_two" type="text" placeholder='Second Description' icon={BiText} /> */}
            {/* <Input name="image_two" type="file" placeholder='Second Image' icon={BiText} onChange={fileSelectedHandlerInputTwo} /> */}

            <FormFooter>
              <Button type="submit">Salvar Registro</Button>
              <CancelButton onClick={handleResetForm}>
                <FaTrash />
              </CancelButton>
            </FormFooter>
          </Form>
          || isActiveForm === 1 &&
          <CreateSectionTopics />
        }
        
      </Container>
    </>
  );
}

export default CreateSectionTwo;

