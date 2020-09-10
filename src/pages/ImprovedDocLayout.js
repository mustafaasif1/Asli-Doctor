import React from 'react'
import styled from 'styled-components'
import { FaCommentAlt, FaThumbsUp, FaRegEye } from 'react-icons/fa'
import Card from './Card'
import MyPhoto from "../images/default-person.png";
// import ImageComponent from "react-rounded-image";
import Avatar from 'react-avatar';



const StyledRoot = styled.div`
  padding: 50px 12px;
`
const StyledContainer = styled.div`
  max-width: 550px;
  width: 100%;
  margin: auto;
`
const Docs = (props) => {

    const Title = styled.h2`
  color: #000;
  font-weight: 300;
  margin: 6px 0;
`
const Date = styled.div`
color: #000;
  font-weight: 300;
  margin: 6px 0;
`
const Description = styled.p`
color: #000;
  font-weight: 300;
`

const ActionButton = styled.button`
  margin: 0 5px;
  padding: 8px 14px;
  background: #37BC9B;
  color: #fff;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 20px;
  outline: 0;
  font-weight: 300;
  :hover {
    opacity: 0.8;
  }
` 

var divStyle = {
    background: "#eee",
    padding: "20px",
    margin: "20px",
    display: 'flex'
  };

    return (
        <div style={divStyle}>
          <Avatar name={props.person.Name} size="100" round={true}/>
            <dix style={{padding: " 0px 20px"}}>
              <Title >Name: {props.person.Name}</Title>
              <Title>Registration Number: {props.person.reg}</Title>
              <Title>City: {props.person.City}</Title>
              <Title>Gender: {props.person.Gender}</Title>
              <Title>Fathers name: {props.person['Father Name']}</Title>
              <Title>Type: {props.person.type}</Title>
              <div>
              <ActionButton style={{margin: "10px"}}>0 Reviews</ActionButton>
              <ActionButton>Add a new Review</ActionButton>
              </div>
            </dix>
        </div>
    )

}
export default Docs