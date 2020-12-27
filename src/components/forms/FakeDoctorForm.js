import React,{useState, useRef} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/Oldmen-With-Physiotherapist.png";
import '../../styles/popup.css'
import MapContainer from "components/misc/googlemap.js";
import Confirm from "components/misc/alerts.js";
import axios from 'axios';
import { useHistory } from "react-router-dom";


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-6 md:py-6`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-teal-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`


function RadioButtonsGroup() {
  const [value, setValue] = React.useState('Doctor does not have a proper medical degree');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Frequent Issues with the doctors</FormLabel>
      <RadioGroup aria-label="issue" name="issue" value={value} onChange={handleChange}>
        <FormControlLabel value="Doctor does not have a proper medical degree" control={<Radio />} label="Doctor does not have a proper medical degree" />
        <FormControlLabel value="Doctor is not showing his/her degree" control={<Radio />} label="Doctor is not showing his/her degree" />
        <FormControlLabel value="Doctor is giving fake medicines" control={<Radio />} label="Doctor is giving fake medicines" />
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
      </RadioGroup>
    </FormControl>
  );
}

export default ({
  subheading = <><span tw="text-teal-500">Report a fake doctor</span></>,
  heading = <>Do you think a doctor is not authentic? <span tw="text-teal-500">Report the doctor</span><wbr/> now!</>,
  //description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  description = "Although there has been a rapid rise in the number of doctors in Pakistan, unfortunately the number of doctors with fake registrations have also appeared. People who seek treatment from such individuals are at a high risk. If you have encountered such a doctor please fill the form below",
  submitButtonText = "Report!",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  var myEmail = localStorage.getItem('loggedIn')
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [open, setOpen] = React.useState(false);
  const [popup, setpup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fake_doctor_name, setFakeDoctorName] = useState('');
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('');
  const [longon, setLongon]=useState(false);
  const [emptyemail, setEmptyemail] = useState(false);
  const [emptyname, setEmptyname] = useState(false);
  const [emptydoctor, setEmptydoctor] = useState(false);
  const [emptyreason, setEmptyreason] = useState(false);
  const [emptylocation, setEmptylocation] = useState(false);
  const [incompletedetails,setIncompletedetails] = useState(false);
  const [wrongemail, setWrongemail] = useState(false);
  
  const longlat=useRef([0,0]);
  const history = useHistory();

  const handleNameInput = e => {
    setName(e.target.value);
  };

  const UpdateLatLong = (lat, Long) => {
    longlat.current=[lat, Long];
  };

  const handleEmailInput = e => {
    setEmail(e.target.value);
  };

  const handleFakeDoctorInput = e => {
    setFakeDoctorName(e.target.value);
  };

  const handleMessageInput = e => {
    setMessage(e.target.value);
  };

  const setPopUp=()=>{
    window.scrollTo({top: document.documentElement.scrollHeight*(0.2), behaviour: 'smooth'});

    setpup(true);
  };
  
  const handleClosePop=()=>{
    setLongon(true);
    setpup(false);
  };

  const handleClickOpen = () => {
    setEmptyname(false)
    setEmptyemail(false)
    setEmptydoctor(false)
    setEmptyreason(false)
    setIncompletedetails(false)
    setWrongemail(false)
    if (email == ""){
      setEmptyemail(true)
      setIncompletedetails(true)
    }
    else if (email != myEmail){
      setWrongemail(true)
      setIncompletedetails(true)
    }
    if (name == ""){
      setEmptyname(true)
      setIncompletedetails(true)
    }
    if (fake_doctor_name == ""){
      setEmptydoctor(true)
      setIncompletedetails(true)
    }
    if (value == ""){
      setEmptyreason(true)
      setIncompletedetails(true)
    }
    if (email!="" &&  name != "" && fake_doctor_name != "" && value != ""){
      if (value=="Other"){
          axios.post('http://localhost:5000/report',{name: name, email: email, fake_doctor_name: fake_doctor_name, message: message, GoogleLocation: longlat}).then(res=>{
          console.log(res);
          setOpen(true);
        }).catch(err=>{console.log("Error: ",err)})
      } else {
        axios.post('http://localhost:5000/report',{name: name, email: email, fake_doctor_name: fake_doctor_name, message: value, GoogleLocation: longlat}).then(res=>{
          console.log(res);
          setOpen(true);
        }).catch(err=>{console.log("Error: ",err)})
      } 
    }
  };


  const handleClose = () => {
    history.push("/");
    setOpen(false);
  };

  const mystyle = {
    // color: "white",
    // backgroundColor: "DodgerBlue",
    padding: "10px",
    // fontFamily: "Arial"
  };

  

  const handleChange = (event) => {
    setValue(event.target.value);
  };

 
  return (
    <Container>
      <TwoColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
            <Form action={formAction} method={formMethod}>
              <Input type="email" name="email" placeholder="Your Email Address" onChange={handleEmailInput} value={email}/>
               { emptyemail?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter your email address</div>:null}
              {wrongemail?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter your correct email address</div>:null}

              <Input type="text" name="name" placeholder="Your Full Name" onChange={handleNameInput} value={name}/>
             { emptyname?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter your name</div>:null}
              <Input type="text" name="fake_doctor_name" placeholder="Fake Doctor's Name" onChange={handleFakeDoctorInput} value={fake_doctor_name}/>
              {/* <div style={mystyle}><h1>Frequent Issues with the doctor</h1></div> */}
              { emptydoctor?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please enter doctor's name</div>:null}
              <div style={{padding: '20px'}}></div>
              {/* <RadioButtonsGroup/> */}
              <FormControl component="fieldset">
              <FormLabel component="legend">Frequent Issues with the doctors</FormLabel>
              <RadioGroup aria-label="issue" name="issue" value={value} onChange={handleChange}>
                <FormControlLabel value="Doctor does not have a proper medical degree" control={<Radio />} label="Doctor does not have a proper medical degree" />
                <FormControlLabel value="Doctor is not showing his/her degree" control={<Radio />} label="Doctor is not showing his/her degree" />
                <FormControlLabel value="Doctor is giving fake medicines" control={<Radio />} label="Doctor is giving fake medicines" />
                <FormControlLabel value="Doctor is extremely rude" control={<Radio />} label="Doctor is extremely rude" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                
              </RadioGroup>

              </FormControl>

              { value == 'Other'? 
                <Textarea name="message" placeholder="Enter your issue if the above reasons do not apply" onChange={handleMessageInput} value={message}/>
                :
                null
              }

              {emptyreason?
                  <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px"}}>Please select an option</div>:null}
                
            
              { popup ?
               <div className='popup'>
                <div className='popup_inner'>
                  <MapContainer updLoc={UpdateLatLong}/>
                </div>
                <div className='popup_inner_lower'>
                  <PrimaryButtonBase onClick={handleClosePop} type="button">Add Location</PrimaryButtonBase>
                </div>

              </div>
                :
                null
              }
              {
                !open ?
                null
                :
                <Confirm message="Your report has been submitted!" buttonMessage="Continue" handleClick={handleClose}/>
              }
              <PrimaryButtonBase style={{backgroundColor: "#9400D3", marginTop:'20px'}} onClick={setPopUp} type="button">Add Location of Doctor To Report</PrimaryButtonBase>
              { !longon ?
              <div style={mystyle}><h1>You currently do not have any location selected</h1></div> : 
              <div style={mystyle}><h1>The location you selected is: {longlat.current[0].toFixed(4)}° N, {longlat.current[1].toFixed(4)}° E</h1></div>

              }
              <SubmitButton type="button" onClick={handleClickOpen}>{submitButtonText}</SubmitButton>
              {
                incompletedetails?
                 <div style = {{color: 'red', fontSize: 13,paddingLeft: "10px", paddingTop:"10px"}}>Please fill the required details</div>:null
              }
              
            </Form>
          </TextContent>
        </TextColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
      </TwoColumn>
    </Container>
  );
};