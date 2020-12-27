import React,{useState} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/Oldmen-With-Physiotherapist.png";
import logo from "images/logo.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Confirm from "components/misc/alerts.js";
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
// const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
// const IllustrationImage = styled.div`
//   ${props => `background-image: url("${props.imageSrc}");`}
//   ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
// `;

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign In To Asli Doctor",
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign In With Google",
      url: "https://google.com"
    },
    
  ],
  submitButtonText = "Sign In",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "/SignUp",
  setLI

}) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [signedIn,setSignedIn]=React.useState(false);
  const history = useHistory();
  const [gSign,setGSign]=React.useState(false);
  const [emptypass, setEmptypass] = React.useState(false);
  const [emptyemail, setEmptyemail] = React.useState(false);
  const [incompletedetails, setIncompletedetails] = React.useState(false);
  const [validemail, setValidemail] = React.useState(false);
  
  
  const handleEmailInput = e => {
    setEmail(e.target.value);
  };
  const handlePassInput = e => {
    setPass(e.target.value);
  };
  const handleClose =() =>{
    history.push("/");
    
  }

  const handleCloseFail =() =>{
    history.push("/");
    
  }

  const signInWithGoogle =() =>{
    
    setGSign(true);
    
  }



const responseGoogleSuccess = (response) => {
  
  console.log('email', response.profileObj.email)
  localStorage.setItem('loggedIn', response.profileObj.email)
  console.log("hello")
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

  const handleClickOpen = () => {
    setEmptyemail(false);
    setValidemail(false);
    setEmptypass(false);
    setEmail(email.trim());
    if (email ==""){
      setEmptyemail(true)
    } 
    else if(!(re.test(String(email).toLowerCase()))){
      setValidemail(true);
    }
    if (pass.length == ""){
      setEmptypass(true);
    }
    if (pass.length != "" && email != "" && (re.test(String(email).toLowerCase()))){
      axios.post('http://localhost:5000/login',{email: email, secret: pass}).then(res=>{
        
        if (res.data=="login"){
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
                <DividerText>Or Sign in with your e-mail</DividerText>
              </DividerTextContainer>
              
              <Form>
                <Input style = {{width:"320px"}} type="email" placeholder="Email" onChange={handleEmailInput} value={email}/>
                { emptyemail?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter your email address</div>:null}
                 { validemail?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter a valid email address</div>:null}
                <Input type="password" placeholder="Password" onChange={handlePassInput} value={pass}/>
                { emptypass?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter a password</div>:null}
                <SubmitButton type="button" onClick={handleClickOpen}>
                  <SubmitButtonIcon className="icon"/>
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
                {
                !open ?
                null
                :
                !signedIn ?
                <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px", paddingTop: "10px"}}>Sign in failed. Please try again.</div>:
                <Confirm message="Signed in Successfully!" buttonMessage="Continue" handleClick={handleClose}/>
              }
              </Form>
              {/* <p tw="mt-6 text-xs text-gray-600 text-center">
                <a href={FormDialog()} tw="border-b border-gray-500 border-dotted">
                  Forgot Password ?
                </a>
              </p> */}
              <FormDialog/>
              <DividerTextContainer>
                <p tw="mt-4 text-sm text-gray-600 text-center">
                Dont have an account?{" "}
                  {/* <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                    Login
                  </a> */}

                  <Button variant="contained"  style={{
                      // borderRadius: 35,
                      backgroundColor: "#008080",
                      color: "white"
                      // padding: "18px 36px",
                      // fontSize: "18px"
                  }} href={signupUrl}>
                  Sign Up
                  </Button>
                </p>
              </DividerTextContainer>

              {/* <p tw="mt-8 text-sm text-gray-600 text-center">
                Dont have an account?{" "}
                <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                  Sign Up
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


function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [emailz, setEmailz] = useState('');
  const [pass, setPass] = useState('');
  const [emptyemailz, setEmptyemailz] = React.useState(false);
  const [validemailz, setValidemailz] = React.useState(false);

  const history = useHistory();

  const handleEmailInput = e => {
    setEmailz(e.target.value);
  };
  const handleForgot =() =>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailz(emailz.trim());
    console.log('email', emailz)

    setValidemailz(false)
    setEmptyemailz(false)

    if (emailz == ""){
      setEmptyemailz(true);
    }

    else if (!(re.test(String(emailz).toLowerCase()))){
      setValidemailz(true);
    }

    if (emailz!="" && (re.test(String(emailz).toLowerCase()))){
      console.log('hello')
      axios.post('http://localhost:5000/resets',{email: emailz}).then(res=>{
        console.log(res);
      })
      history.push("/");
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div> 
      <p tw="mt-6 text-xs text-gray-600 text-center">
      < Button  color="primary" onClick={handleClickOpen}>
        Forgot password?
      </Button>
      </p>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Have you forgotten your password?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password please enter your email below. A reset link will be sent to your account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            placeholder="Email" 
            onChange={handleEmailInput} 
            value={emailz}
          />
        {
          validemailz?
          <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter a valid email.</div>:null}
        {
          emptyemailz?
          <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter an email address.</div>:null}
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgot} color="primary">
            Reset
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}