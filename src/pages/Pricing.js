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


const Heading = tw(SectionHeading)`mt-4 font-bold text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const PreviewButton = tw(PrimaryButtonBase)` rounded-b-lg py-2 font-semibold`;

const styles = theme => ({
  root: {
    maxWidth: '100%'
  }
})

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
//   container: {
//     maxHeight: 440,
//   },
// });

// function createData(registration_id, name, fathers_name, gender, type, city) {
//   return { registration_id, name, fathers_name, gender, type, city };
// }

// const rows = [
//   createData('13342-F', 'Mustafa Asif', 'Asif', 'Male', 'Doctor', 'Karachi',),
//   createData('13342-F', 'Maroof Saleemi', 'Saleemi', 'Male', 'Doctor', 'Lahore',),
//   createData('13442-F', 'Omer Shakeel', 'Shakeel', 'Male', 'Doctor', 'Lahore',),
//   createData('13332-F', 'Shayan', 'Irfan', 'Male', 'Dentist', 'Lahore',),
//   createData('13754-F', 'Sheraz Hasan', 'Hasan', 'Male', 'Doctor', 'Multan',),
// ];

function BasicTable() {
  // const classes = useStyles();

  // return (
  //   <TableContainer component={Paper}>
  //     <Table className={classes.table} >
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>Registration Number</TableCell>
  //           <TableCell align="right">Full Name</TableCell>
  //           <TableCell align="right">Fathers name</TableCell>
  //           <TableCell align="right">Gender</TableCell>
  //           <TableCell align="right">Type</TableCell>
  //           <TableCell align="right">City</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {rows.map((row) => (
  //           <TableRow key={row.registration_id}>
              
  //             <TableCell align="right">{row.registration_id}</TableCell>
  //             <TableCell align="right">{row.name}</TableCell>
  //             <TableCell align="right">{row.fathers_name}</TableCell>
  //             <TableCell align="right">{row.gender}</TableCell>
  //             <TableCell align="right">{row.type}</TableCell>
  //             <TableCell align="right">{row.city}</TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // );

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
        <Table stickyHeader aria-label="sticky table">
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