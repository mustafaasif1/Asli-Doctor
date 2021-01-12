import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button';
import axios from 'axios';

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const curr = React.useRef();
  const { tableHead, tableData, tableHeaderColor, type} = props;

  const acceptor = (val) =>{
    if (type=="reviews"){
    axios.post("/setaccept", {reg: val[1],name: val[2], review: val[3]})
    }
    else if(type=="reports"){
      axios.post("/acceptreport", {email: val[1], name: val[2], fake_doctor_name: val[3], message: val[5]})
      console.log({email: val[1], name: val[2], fake_doctor_name: val[3], message: val[5]})
      
    }

    window.location.reload();
  }

  const deletor = (val) =>{
    if (type=="reviews"){
    axios.post("/setdelete", {reg: val[1],name: val[2], review: val[3]})
    }
    else if(type=="reports"){
      axios.post("/rejectreport", {email: val[1], name: val[2], fake_doctor_name: val[3], message: val[5]})
    
    }

    window.location.reload()
  }
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            curr.current = prop
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
                { !prop[6] ? (
                  <div style={{justifyContent:'center'}}>
                <Button variant="contained" color="primary" onClick={()=>{acceptor(prop)}}>
                  Accept
                </Button>
                <Button variant="contained" color="secondary" onClick={()=>{deletor(prop)}}>
                  Reject
                </Button>
                </div>
                )
                : <p style={{justifyContent:'center'}}>Accepted</p>
          }
                {/* <div>
                  Action Taken
                </div> */}
              </TableRow>
            );
            
          })}
          
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
