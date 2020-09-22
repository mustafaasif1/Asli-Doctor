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

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const Heading = tw(SectionHeading)`mt-4 font-bold text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const PreviewButton = tw(PrimaryButtonBase)` rounded-b-lg py-2 font-semibold`;

const styles = theme => ({
  root: {
    maxWidth: '100%'
  }
})


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(registration_id, name, fathers_name, gender, type, city) {
  return { registration_id, name, fathers_name, gender, type, city };
}

const rows = [
  createData('13342-F', 'Mustafa Asif', 'Asif', 'Male', 'Doctor', 'Karachi',),
  createData('13342-F', 'Maroof Saleemi', 'Saleemi', 'Male', 'Doctor', 'Lahore',),
  createData('13442-F', 'Omer Shakeel', 'Shakeel', 'Male', 'Doctor', 'Lahore',),
  createData('13332-F', 'Shayan', 'Irfan', 'Male', 'Dentist', 'Lahore',),
  createData('13754-F', 'Sheraz Hasan', 'Hasan', 'Male', 'Doctor', 'Multan',),
];

function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} >
        <TableHead>
          <TableRow>
            <TableCell>Registration Number</TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Fathers name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.registration_id}>
              
              <TableCell align="right">{row.registration_id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.fathers_name}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

class CustomTabs extends React.Component {

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


  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {value} = this.state;
    return (
      <div style={{ width: '100%' }}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
          >
            <Tab classes={this.props.classes} label="Cards View" />
            <Tab classes={this.props.classes} label="Tabular View" />
          </Tabs>
        </AppBar>
        {value === 0 && <div>
          {this.state.docs.map(i=><Docs person={i}/>)}
        </div>}
        {value === 1 && <BasicTable></BasicTable>}
      </div>
    );
  }
}

const TabsWithStyles = withStyles(styles)(CustomTabs)




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

  // constructor(){
  //   super()
  //   this.state={docs:[],
  //   params: parsedData(window.location.href)};
    
  // };

  // componentDidMount(){
  //   trackPromise(
  //   axios.get("http://localhost:5000/sample",{params: this.state.params}).then(res=>{
  //     this.setState({docs:res.data})
  //     console.log(this.state.docs)
  //   })).catch(err=>{console.log(err)})
  //   console.log(this.state.docs)
    
    
  // }


  render(){

    return (
      
      <AnimationRevealPage>
        
        <Header />
        {/* <div style={{padding: "30px", justifyContent: "center", alignItems: "center", display: "flex"}}>
        <Subheading>
              Do you want a new search? <PreviewButton stlye={{margin: "20px"}}>Click Here</PreviewButton>
        </Subheading>

        
        </div> */}
        <div style={{padding: "40px 10px", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <TabsWithStyles />
        </div> 

        
        
        {/* <div>
          {this.state.docs.map(i=><Docs person={i}/>)}
        </div> */}

        
        <Footer/>
       
      </AnimationRevealPage>
     
    );
    }
};
export default DoctorList;