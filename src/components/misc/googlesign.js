import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

 
 
const responseGoogle = (response) => {
  console.log(response);
}

class googleSigner extends React.Component{
    render(){
    return(
    <GoogleLogin
      clientId="579382187187-v8quleq4c0apcgkoes0t1ocov07rsjgq.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
    )
  };
}
    
