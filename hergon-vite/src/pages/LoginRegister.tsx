import { 
  ConfidentialityTerms, 
  LoginLogo, 
  LoginWelcome, 
  RegisterForm, 
  WelcomeContainer
} from "@/components/Login";

export function LoginRegister() {

  return (
    <>
      <LoginWelcome />
      <WelcomeContainer>
        <LoginLogo />
        <RegisterForm />
        <ConfidentialityTerms />
      </WelcomeContainer>
    </>
  );
}

