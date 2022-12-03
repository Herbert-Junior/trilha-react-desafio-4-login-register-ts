import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate  } from "react-router-dom";
import { api } from '../../services/api';

import { Container, LoginContainer, Column, Spacing, Title, Form } from "./styles";
import { defaultValues, IFormLogin } from "./types";

const schema = yup
  .object({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "No minimo 6 caracteres")
      .required("Campo obrigatório"),
  })
  .required();

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async (formData: IFormLogin) => {
    try{
      console.log(formData);
        const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.password}`);
        console.log(data);
        if(data.length && data[0].id){
          navigate("/home");
          return;
        }

        alert('Usuário ou senha inválido')
    }catch(e){
        //TODO: HOUVE UM ERRO
    }
  };  

  return (
    <Container>
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          <Spacing />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="email"
              placeholder="Email"
              control={control}
              errorMessage={errors?.email?.message}
            />
            <Spacing />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              control={control}
              errorMessage={errors?.password?.message}
            />
            <Spacing />
            <Button title="Entrar" type="submit" />
          </Form>            
          
        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;
