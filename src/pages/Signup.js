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
import GoogleLogin from 'react-google-login';



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
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [signedIn,setSignedIn]=React.useState(false);
  const [shortpass, setShortpass] = React.useState(false);
  const [emptypass, setEmptypass] = React.useState(false);
  const [emptyemail, setEmptyemail] = React.useState(false);
  const [incompletedetails, setIncompletedetails] = React.useState(false);
  const [gSign,setGSign]=React.useState(false);
  const [validemail, setValidemail] = React.useState(false);
  const [existsemail, setExistsemail] = React.useState(false);
  const [incorrectconfirm, setIncorrectconfirm] = React.useState(false);
  const history = useHistory();

  const handleClose =() =>{

    history.push("/");
    
    
  }


  const handleCloseFail =() =>{
    history.push("/");
    
  }

  const responseGoogleSuccess = (response) => {
  
    console.log('email', response.profileObj.email)
    localStorage.setItem('loggedIn', response.profileObj.email)
    history.push("/")
  }  
    
  const responseGoogle = (response) => {
    console.log(response);
    if (gSign){
      console.log(response);
      alert("Please enable third-party cookies under Privacy and Security section to sign in with Google.");
    }
    setGSign(true);
  }  

  const handleEmailInput = e => {
    setEmail(e.target.value);
  };
  const handlePassInput = e => {
    setPass(e.target.value);
  };

  const handleConfirmPassInput = e => {
    setConfirmpass(e.target.value);
  }

  const handleClickOpen = () => {
    
    setIncompletedetails(false)
    setEmptyemail(false)
    setEmptypass(false)
    setValidemail(false)
    setShortpass(false)
    setExistsemail(false)
    setIncorrectconfirm(false)
    
    if (email == ""){
      setEmptyemail(true);
      setIncompletedetails(true);
    }
    else if(!(re.test(String(email).toLowerCase()))){
      setValidemail(true);
      setIncompletedetails(true);
    }
    if(pass == ""){
      setEmptypass(true);
      setIncompletedetails(true);
    }
    else if(pass.length<8){
      setShortpass(true);
      setIncompletedetails(true);
    }
    else if(pass != confirmpass){
      setIncorrectconfirm(true);
      setIncompletedetails(true);
    }
    if(incompletedetails){
      console.log('oops')
    }
    if (email != 0 && pass != 0 && re.test(String(email).toLowerCase()) && pass.length >= 8 && pass == confirmpass){
      axios.post('/login',{email: email}).then(res=>{
        
        if (res.data=="login"){

          setExistsemail(true);

        } else {
            axios.post('/users',{email: email.trim(), secret: pass}).then(res=>{
            console.log(res);
            if (!res.data.includes('Error')){
              console.log('Hello');
            
              localStorage.setItem('loggedIn', email);
              window.scrollTo({top: document.documentElement.scrollHeight*0, behaviour: 'smooth'});
        
              setSignedIn(true);
              setOpen(true);
    
            
          }
        }).catch(err=>{console.log("Error: ",err)})
        }
      }).catch(err=>{console.log("Error: ",err)})
      
      }
    
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
                   <GoogleLogin
                  clientId="579382187187-v8quleq4c0apcgkoes0t1ocov07rsjgq.apps.googleusercontent.com"
                  render={renderProps => (
                    <SocialButton key={index} style={{cursor: 'pointer'}} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <span className="iconContainer">
                      <img src={socialButton.iconImageSrc} className="icon" alt=""/>
                    </span>
                    <span className="text">{socialButton.text}</span>
                  </SocialButton>
                    
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogleSuccess}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                  
                  
                ))}
              </SocialButtonsContainer>
              <DividerTextContainer>
                <DividerText>Or Sign up with your e-mail</DividerText>
              </DividerTextContainer>
              {
                signedIn?
                <Confirm message="Sign up was Successful!" buttonMessage="Continue" handleClick={handleClose}/>:null
                            }
              <Form>
                <Input style = {{width:"320px"}} type="email" placeholder="Email" onChange={handleEmailInput} value={email} />
                 { emptyemail?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter your email address</div>:null}
                 { validemail?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter a valid email address</div>:null}
                  { existsemail?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>There is already an account with this email address</div>:null}
                <Input type="password" placeholder="Password" onChange={handlePassInput} value={pass}/>
                { emptypass?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter a password</div>:null}
                { shortpass?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Password should be longer than 8 characters</div>:null}
                <Input type="password" placeholder="Confirm Password" onChange={handleConfirmPassInput} value={confirmpass}/>
                { incorrectconfirm?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Passwords don't match</div>:null}
                <SubmitButton type="button" onClick={handleClickOpen}>
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
                { incompletedetails?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px", paddingTop: "10px"}}>Sign up failed. Please try again.</div>:null}
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


