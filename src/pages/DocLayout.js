import React from "react";

import ExampleComponent from "react-rounded-image";
import MyPhoto from "../images/default-person.png";
import StarRatings from 'react-star-ratings';
import Background from '../images/backGrounds.png';
import RightArrow from '../images/rightArrow.png';

const cardStyle = {
    color: "Grey",
    padding: "10px",
    fontFamily: "Arial",
    boxShadow:"3px",
    margin: '10px 15px 10px',
    display: 'flex'
  };
const PIstyle={
    margin: '10px 40px 0px',
    fontWeight: 'bold'
}

const Docs = (props)=>{
    return(
        <div style={{backgroundImage: `url(${ Background })`,backgroundRepeat  : 'no-repeat',display:'flex'}}>
            <div style={cardStyle}>
                <ExampleComponent
                image={MyPhoto}
                roundedColor="#CCCCCC"
                imageWidth="120"
                imageHeight="120"
                roundedSize="15"
                />
                <div>
                    <h1 style={PIstyle}>Name: {props.person.Name}</h1>
                    <h1 style={{margin: '5px 40px 0px'}}>Registeration Number: {props.person.reg}</h1>
                    <h1 style={{margin: '0px 40px 0px'}}>City: {props.person.City}</h1>
                    <h1 style={{margin: '0px 40px 0px'}}>Type: {props.person.type}</h1>
                    <h1 style={{margin: '0px 40px 0px'}}>Father's Name: {props.person['Father Name']}</h1>
                    <div style={{margin: '10px 35px 0px', display:'flex'}}>
                        <StarRatings
                        rating={5}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name='rating'
                        starDimension="25px"
                        starSpacing="2px"
                        />
                        <h1 style={{margin: '3px 20px 0px'}}>{0} Reviews</h1>
                    </div>
                </div>
            </div>
            <div style={{marginLeft:'auto', marginRight:'30px', marginTop:'90px', fontSize:"30px", color:'#c7c6e1'}}>
                <p>|</p>
            </div>
            <div style={{ marginRight:'100px', marginTop:'70px', cursor:'pointer'}} onClick={()=>alert("Clicked Arrow")}>
            <ExampleComponent
                image={RightArrow}
                roundedColor='#c7c6e1'
                imageWidth="80"
                imageHeight="80"
                roundedSize="12"
                />
            </div>
        </div>);
}
export default Docs;