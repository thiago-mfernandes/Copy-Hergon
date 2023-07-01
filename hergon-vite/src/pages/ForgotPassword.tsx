import { 
  ConfidentialityTerms, 
  ForgotPasswordForm, 
  LoginLogo, 
  LoginWelcome, 
  WelcomeContainer
} from "@/components/Login";

export function ForgotPassword() {
  return (
    <>
      <LoginWelcome />
      <WelcomeContainer>
        <LoginLogo />
        <ForgotPasswordForm />
        <ConfidentialityTerms />
      </WelcomeContainer>
    </>
  );
}