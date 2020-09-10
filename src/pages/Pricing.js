import React,{useState, Component} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Docs from "./ImprovedDocLayout";
import axios from 'axios';
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { trackPromise } from 'react-promise-tracker';



const Heading = tw(SectionHeading)`mt-4 font-bold text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const PreviewButton = tw(PrimaryButtonBase)` rounded-b-lg py-2 font-semibold`;




const parsedData=(params)=>{
  
  let data=params.split('?')[1].split('+').join(" ");
  
  let toGet=[]
  let j=0
  for (let i = 0; i < data.length; i++) {
    if (data[i]=='='){
      toGet.push(data.slice(j,i));
      j=i+1;
    }
    else if(data[i]=='&'){
      toGet.push(data.slice(j,i));
      j=i+1;
    }
    if(i==(data.length-1)){
      toGet.push(data.slice(j,i));
    }  
  }
  let toFetch={}
   
  for (let i = 0; i < toGet.length; i+=2) {
    if (toGet[i+1]!=""){
    toFetch[toGet[i]]="/.*"+toGet[i+1]+".*/i"; 
    }
    else{
      toFetch[toGet[i]]='/.*/';
    }
  }

  
  return toFetch;
}


class DoctorList extends Component{

  constructor(){
    super()
    this.state={docs:[],
    params: parsedData(window.location.href)};
    
  };

  

  componentDidMount(){
    trackPromise(
    axios.get("http://localhost:5000/sample",{params: this.state.params}).then(res=>{
      this.setState({docs:res.data})
      console.log(this.state.docs)
    })).catch(err=>{console.log(err)})
    console.log(this.state.docs)
    
    
  }
  render(){

    


    return (
      <AnimationRevealPage>
        <Header />
        <div style={{padding: "30px", justifyContent: "center", alignItems: "center", display: "flex"}}>
        <Subheading>
              Do you want a new search? <PreviewButton stlye={{margin: "20px"}}>Click Here</PreviewButton>
        </Subheading>
        </div>
        <div>
          {this.state.docs.map(i=><Docs person={i}/>)}
        </div>
        <Footer/>
      </AnimationRevealPage>
    );
    }
};
export default DoctorList;