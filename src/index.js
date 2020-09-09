import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
   return (
    promiseInProgress && 
    <h1>Hey some async call in progress ! </h1>
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
