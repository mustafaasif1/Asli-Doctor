import React,{useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/Oldmen-With-Physiotherapist.png";
import axios from 'axios';

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

export default ({
  subheading = <><span tw="text-teal-500">Report a fake doctor</span></>,
  heading = <>Do you think a doctor is not authentic? <span tw="text-teal-500">Report the doctor</span><wbr/> now!</>,
  //description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  description = "Although there has been a rapid rise in the number of doctors in Pakistan, unfortunately the number of doctors with fake registration have also appeared. People who seek treatment from such individuals are at a high risk. If you have encountered such a doctor please fll the form below",
  submitButtonText = "Report!",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleNameInput = e => {
    setName(e.target.value);
  };

  const handleEmailInput = e => {
    setEmail(e.target.value);
  };

  const handleSubjectInput = e => {
    setSubject(e.target.value);
  };

  const handleMessageInput = e => {
    setMessage(e.target.value);
  };
  

  const handleClickOpen = () => {
    if (email!=""){
      axios.post('http://localhost:5000/report',{name: name, email: email, subject: subject, message: message}).then(res=>{
        console.log(res);
      }).catch(err=>{console.log("Error: ",err)})
      }
    setOpen(true);
    
  };
  const handleClose = () => {
    
    setOpen(false);
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
              <Input type="text" name="name" placeholder="Full Name" onChange={handleNameInput} value={name}/>
              <Input type="text" name="subject" placeholder="Subject" onChange={handleSubjectInput} value={subject}/>
              <Textarea name="message" placeholder="Your Message Here" onChange={handleMessageInput} value={message}/>
              <SubmitButton type="submit" onClick={handleClickOpen}>{submitButtonText}</SubmitButton>
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