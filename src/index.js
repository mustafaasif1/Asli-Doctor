import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
   return (
    promiseInProgress && 
    <div
          style={{
            width: "100%",
            height: "100",
           display: "flex",
           justifyContent: "center",
            alignItems: "center"
          }}
       >
          <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
       </div>
  );  
}

Modal.setAppElement("#root");

ReactDOM.render(
  <div>
  <App />,
  <LoadingIndicator/>
  </div>,
  document.getElementById("root")
);
