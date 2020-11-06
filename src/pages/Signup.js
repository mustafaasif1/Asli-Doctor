import React,{useState} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "images/signup-illustration.svg";
import logo from "images/logo.png";
import googleIconImageSrc from "images/google-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Confirm from "components/misc/alerts.js";
import Button from '@material-ui/core/Button';



const Container = tw(ContainerBase)`min-h-screen bg-teal-600 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-teal-500 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-teal-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign Up For Asli Doctor",
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign Up With Google",
      url: "https://google.com"
    },
    
  ],
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "#",
  privacyPolicyUrl = "#",
  signInUrl = "LogIn",
  setLI,
  toggleLogin
}) => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [signedIn,setSignedIn]=React.useState(false);
  const history = useHistory();

  const handleClose =() =>{
    history.push("/");
    
  }


  const handleCloseFail =() =>{
    history.push("/");
    
  }

  const handleEmailInput = e => {
    setEmail(e.target.value);
  };
  const handlePassInput = e => {
    setPass(e.target.value);
  };

  const handleClickOpen = () => {
    
    if (email!="" && pass.length>8){
      axios.post('/users',{email: email.trim(), secret: pass}).then(res=>{
        console.log(res);
        if (!res.data.includes('Error')){
          console.log('Hello');
          
          localStorage.setItem('loggedIn', email);
          setSignedIn(true);
          
          
        }
      }).catch(err=>{console.log("Error: ",err)})
      }
    setOpen(true);
    
  };
  
  return(
  <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
          <LogoLink href={logoLinkUrl}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
              <SocialButtonsContainer>
                {socialButtons.map((socialButton, index) => (
                  <SocialButton key={index} href={socialButton.url}>
                    <span className="iconContainer">
                      <img src={socialButton.iconImageSrc} className="icon" alt="" />
                    </span>
                    <span className="text">{socialButton.text}</span>
                  </SocialButton>
                ))}
              </SocialButtonsContainer>
              <DividerTextContainer>
                <DividerText>Or Sign up with your e-mail</DividerText>
              </DividerTextContainer>
              {
                !open ?
                null
                :
                !signedIn ?
                <Confirm message="Password Length should be more than 8 characters" buttonMessage="Try Again" handleClick={handleCloseFail}/> :
                <Confirm message="Sign up was Successful!" buttonMessage="Continue" handleClick={handleClose}/>
                            }
              <Form>
                <Input type="email" placeholder="Email" onChange={handleEmailInput} value={email} />
                <Input type="password" placeholder="Password" onChange={handlePassInput} value={pass}/>
                <SubmitButton type="button" onClick={handleClickOpen}>
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
              </Form>
                

                <DividerTextContainer>
                <p style={{fontSize: "14px", color: "grey"}}>
                Already have an account?{" "}
                  {/* <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                    Login
                  </a> */}

                  <Button variant="contained" style={{
                      // borderRadius: 35,
                      backgroundColor: "#008080",
                      color: "white"
                      // padding: "18px 36px",
                      // fontSize: "18px"
                  }} href={signInUrl}>
                  Login
                  </Button>
                </p>
              </DividerTextContainer>

                {/* <p tw="mt-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                    Sign In
                  </a>
                </p> */}
              
            </FormContainer>
          </MainContent>
        </MainContainer>
        {/* <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer> */}
      </Content>
    </Container>
  </AnimationRevealPage>
)};


