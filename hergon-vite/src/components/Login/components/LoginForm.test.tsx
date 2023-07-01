import '@testing-library/jest-dom'
import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

/**
 * 1. sempre que o teste executa um componente, e esse componente executa algo externo a ele (Hooks, Roteadores, outras dependencias), preciso simular essa mesma funcao
 */

const handleForm = jest.fn();
const showToast = jest.fn();

//a funcao setup vai renderizer
function setup(jsx: JSX.Element) {
  return {
    //o objeto user vai poder executar acoes de preencher input e clicar no botao do elemento jsx renderizado... é uma simulacao de interacao
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe('<LoginForm />', () => {
  test('should render all the form components', () => {
    render(
      /**
       * 1.O componente FormLogin possui um componente Link;
       * 2.Se o LoginForm for renderizado sem seu contexto, vai acusar erro. 
       * 3.A solução é usar este componente MemoryRouter
       * --> erro: https://stackoverflow.com/questions/75735931/cannot-pass-props-object-to-reacttypescript-component
       */
      
      <MemoryRouter>
        <LoginForm handleForm={handleForm} />
      </MemoryRouter>
    )

    screen.debug();


    const formHeader = screen.getByText('Entrar');
    const inputEmail = screen.getByPlaceholderText('Digite seu e-mail');
    const inputPassword = screen.getByPlaceholderText('Digite sua senha');
    const loginButton = screen.getByText('Login');
    const cancelButton = screen.getByText('Cadastrar');

    //https://claritydev.net/blog/testing-react-hook-form-with-react-testing-library
    expect(formHeader).toBeVisible();
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeVisible();
    expect(loginButton).toBeVisible();
    expect(cancelButton).toBeVisible();
  });

  test.skip('it should validate form fields', async () => {
    //essa const salva os dados dos inputs apos o submit
    const mockSave = jest.fn();

    //renderizomeu form
    const { user } = setup(
      <MemoryRouter>
        <LoginForm handleForm={handleForm} />
      </MemoryRouter>
    );
    screen.debug();

    //interacao -> user.type === "entrada de texto do usuario":
    await user.type(
      //pego o input
      screen.getByPlaceholderText('Digite seu e-mail'),
      //por esse texto
      "user@gmail.com"
    );

    await user.type(
      //pego o input
      screen.getByPlaceholderText('Digite sua senha'),
      //por esse texto
      "123456"
    );

    //interacao -> user.click === "usuario clicou no botao"
    await user.click(
      screen.getByText('Login')
    );

    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledWith({
        email: "user@gmail.com",
        password: "123456"
      })
    });
  });
});
