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

import TablePagination from '@material-ui/core/TablePagination';
import { Button } from "@material-ui/core";


const Heading = tw(SectionHeading)`mt-4 font-bold text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const PreviewButton = tw(PrimaryButtonBase)` rounded-b-lg py-2 font-semibold`;

const styles = theme => ({
  root: {
    maxWidth: '100%'
  }
})

const columns = [
  { id: 'reg_num', label: 'Registration Number', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'gender',
    label: 'Gender',
    minWidth: 170,
    // align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 170,
    // align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'fathers_name',
    label: 'Father\'s Name',
    minWidth: 170,
    // align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 170,
    // align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 170,
    // align: 'right',
    // format: (value) => value.toFixed(2),
  },
  // {
  //   id: 'reviews',
  //   label: 'See Reviews',
  //   minWidth: 170,
  //   // align: 'right',
  //   // format: (value) => value.toFixed(2),
  // },
];

function createData(reg_num, name, gender, city, fathers_name, type) {

  return { reg_num, name, gender, city, fathers_name, type };
}

const rows = [
  createData('1234-F', 'Maroof Saleemi', 'Male', 'Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  createData('1234-F', 'Maroof Saleemi', 'Male','Lahore', 'Saleemi', 'Doctor'),
  
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});



function BasicTable(props) {
  

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                      
                    );
                  })}
                  <Button variant="contained" color="primary">
                    Reviews
                  </Button>

                  
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

class CustomTabs extends React.Component {

  constructor(){
    super()
    this.state={docs:[],
      allDocs:[],
      val:0,
      maxToDisplay:10,
      minToDisplay:0,
    params: parsedData(window.location.href)};
  };
  
  componentDidMount(){
    trackPromise(
    axios.get("http://localhost:5000/sample",{params: this.state.params}).then(res=>{
      
      this.setState({allDocs: res.data});
      if (res.data.length>this.state.maxToDisplay){
        this.setState({docs: res.data.slice(this.state.minToDisplay, this.state.maxToDisplay)});
      }
      
    })).catch(err=>{console.log(err)})
    
  }


  handleUpdate = (event)=> {
        var toAdd=0;
        if (this.state.allDocs.length>=this.state.maxToDisplay){
          toAdd=10;
        }
        else{
          toAdd=this.state.allDocs.length-this.state.maxToDisplay;
        }
        this.setState({maxToDisplay: this.state.maxToDisplay+10});
        this.setState({docs: this.state.allDocs.slice(this.state.minToDisplay, this.state.maxToDisplay)});
        window.scrollTo({top: document.documentElement.scrollHeight*(this.state.docs.length*0.001+0.7), behaviour: 'smooth'});
  }

  handleChange = (event, value) => {
    this.setState({ val: value });
  };

  render() {
    const value = this.state.val;
    return (
      <div style={{ width: '100%' }} onScroll={this.handleScroll}>
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
          <button onClick={this.handleUpdate}>Load More</button>
          
        </div>}
        {value === 1 && <BasicTable  data={this.state.docs}></BasicTable>}
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