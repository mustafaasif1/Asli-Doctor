// import React from "react";

// import ExampleComponent from "react-rounded-image";
// import MyPhoto from "../images/default-person.png";
// import StarRatings from 'react-star-ratings';
// import Background from '../images/backGrounds.png';
// import RightArrow from '../images/rightArrow.png';
// import Card from './Card'

// const cardStyle = {
//     color: "Grey",
//     padding: "10px",
//     fontFamily: "Arial",
//     boxShadow:"3px",
//     margin: '10px 15px 10px',
//     display: 'flex'
//   };
// const PIstyle={
//     margin: '10px 40px 0px',
//     fontWeight: 'bold'
// }

// const Docs = (props)=>{
//     return(
//         <div style={{backgroundImage: `url(${ Background })`,backgroundRepeat  : 'no-repeat',display:'flex'}}>
//             <div style={cardStyle}>
//                 <ExampleComponent
//                 image={MyPhoto}
//                 roundedColor="#CCCCCC"
//                 imageWidth="120"
//                 imageHeight="120"
//                 roundedSize="15"
//                 />
//                 <div>
                    // <h1 style={PIstyle}>Name: {props.person.Name}</h1>
                    // <h1 style={{margin: '5px 40px 0px'}}>Registeration Number: {props.person.reg}</h1>
                    // <h1 style={{margin: '0px 40px 0px'}}>City: {props.person.City}</h1>
                    // <h1 style={{margin: '0px 40px 0px'}}>Type: {props.person.type}</h1>
                    // <h1 style={{margin: '0px 40px 0px'}}>Father's Name: {props.person['Father Name']}</h1>
                    // <div style={{margin: '10px 35px 0px', display:'flex'}}>
                    //     <StarRatings
                    //     rating={5}
                    //     starRatedColor="gold"
                    //     numberOfStars={5}
                    //     name='rating'
                    //     starDimension="25px"
                    //     starSpacing="2px"
                    //     />
                    //     <h1 style={{margin: '3px 20px 0px'}}>{0} Reviews</h1>
//                     </div>
//                 </div>
//             </div>
//             <div style={{marginLeft:'auto', marginRight:'30px', marginTop:'90px', fontSize:"30px", color:'#c7c6e1'}}>
//                 <p>|</p>
//             </div>
//             <div style={{ marginRight:'100px', marginTop:'70px', cursor:'pointer'}} onClick={()=>alert("Clicked Arrow")}>
//             <ExampleComponent
//                 image={RightArrow}
//                 roundedColor='#c7c6e1'
//                 imageWidth="80"
//                 imageHeight="80"
//                 roundedSize="12"
//                 />
//             </div>
//         </div>);
// }
// export default Docs;


import React from 'react'
import styled from 'styled-components'
import { FaCommentAlt, FaThumbsUp, FaRegEye } from 'react-icons/fa'
import Card from './Card'
import MyPhoto from "../images/default-person.png";
import ImageComponent from "react-rounded-image";



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
    {/* <Title>Name: {props.person.Name}</Title>
    <Date>3/2/2019</Date> */}
    {/* <Description>
      Green apples have a high fiber content which helps in increasing the
      body's metabolism. While consuming an apple, make sure that you're not
      tossing the peel in the trash. Consuming apple with its peel improves the
      overall health. Due to its high fiber content, apple helps in
      detoxification process. It keeps the liver and digestive system away from
      harmful elements.
    </Description> */}
    {/* <ActionButton>0 Reviews</ActionButton> */}

                    <ImageComponent
                image={MyPhoto}
                roundedColor="#CCCCCC"
                imageWidth="120"
                imageHeight="120"
                roundedSize="15"
                
                />
    <dix style={{padding: " 0px 20px"}}>
    <Title >Name: {props.person.Name}</Title>
    <Title>Registration Number: {props.person.reg}</Title>
    <Title>City: {props.person.City}</Title>
    <Title>Type: {props.person.type}</Title>
    <ActionButton>0 Reviews</ActionButton>
    </dix>
    

    

    
  </div>
    )
//   const date = new Date().toLocaleDateString()
//   const onCommentClick = () => alert('You clicked comments')
//   const onLikesClick = () => alert('You clicked comments')
//   const onViewsClick = () => alert('You clicked comments')
//   const buttons = [
//     {
//       label: (
//         <>
//           <FaCommentAlt /> 0 Comments
//         </>
//       ),
//       onClick: onCommentClick,
//     },
//     {
//       label: (
//         <>
//           <FaThumbsUp /> 242 Likes
//         </>
//       ),
//       onClick: onLikesClick,
//     },
//     {
//       label: (
//         <>
//           <FaRegEye /> 187288 Views
//         </>
//       ),
//       onClick: onViewsClick,
//     },
//   ]
//   return (
//     //   <h1> {props.person.Name}</h1>
//     <StyledRoot>
//       {/* <StyledContainer> */}
//         <Card
//           title="The Benefits of Green Apples"
//           date={date}
//           description="Green apples have a high fiber content which helps in increasing the
//       body's metabolism. While consuming an apple, make sure that you're not
//       tossing the peel in the trash. Consuming apple with its peel improves
//       the overall health. Due to its high fiber content, apple helps in
//       detoxification process. It keeps the liver and digestive system away
//       from harmful elements."
          
//         />
//       {/* </StyledContainer> */}
//     </StyledRoot>
//   )
}
export default Docs