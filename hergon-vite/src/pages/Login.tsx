import { 
  LoginLogo, 
  LoginWelcome, 
  LoginForm, 
  WelcomeContainer, 
  ConfidentialityTerms 
} from "@/components/Login";


export function Login() {
  return (
    <> 
      <LoginWelcome />    
      <WelcomeContainer>
        <LoginLogo />
        <LoginForm />  
        <ConfidentialityTerms />
      </WelcomeContainer>
    </>
  );
}

