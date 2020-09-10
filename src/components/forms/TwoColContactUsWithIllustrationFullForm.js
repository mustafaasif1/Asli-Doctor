import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/Female Caretaker.png";
import Popup from "reactjs-popup";
import Content from "./PopUpContent.js";
import "./PopUp.css";


import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';



import {
  PopupboxManager,
  PopupboxContainer
} from 'react-popupbox';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          {/* <CloseIcon /> */}
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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
  subheading = <><span tw="text-teal-500">Contact Us</span></>,
  heading = <>Feel free to <span tw="text-teal-500">get in touch</span><wbr/> with us.</>,
  description = "We are a team of three students from Lahore University of Management Sciences who are working on finding the fake doctors in Pakistan. If you have any queries please contact us. We will reach you in with 24 hours",
  submitButtonText = "Send",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
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
              <Input type="email" name="email" placeholder="Your Email Address" />
              <Input type="text" name="name" placeholder="Full Name" />
              <Input type="text" name="subject" placeholder="Subject" />
              <Textarea name="message" placeholder="Your Message Here" />
              {/* <SubmitButton type="submit">{submitButtonText}</SubmitButton> */}
              <div>
      {/* <Button variant="outlined" color="teal" onClick={handleClickOpen}>
        Open dialog
      </Button> */}

      <SubmitButton type="submit" onClick={handleClickOpen} >{submitButtonText}</SubmitButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Congratulations!
        </DialogTitle>
        <DialogContent dividers>
          
          <Typography gutterBottom>
          Your message has been sent to us. We will get back to you in a while.
          </Typography>
        </DialogContent>
        <DialogActions>
        <SubmitButton type="submit" onClick={handleClose}>Okay</SubmitButton>
        </DialogActions>
      </Dialog>
    {/* </div>
              <Popup
    trigger={<SubmitButton type="submit">{submitButtonText}</SubmitButton>}
    modal
    nested
  >
    {close => (
      <div className="modal" style={{fontSize: "12px", padding: "25px", backgroundColor: "#20B2AA", borderRadius: "10px", margin: "20px"}}>
        <button className="close" style={{cursor: "pointer",position: 'absolute',display: 'block',padding: '2px 5px',}} onClick={close}>
          &times;
        </button>
        <div className="header" style={{width: "80%",
        fontSize: "18px",
        textAlign: "center",
        padding: "5px", color:"#FFFFFF"}}> Congratulations! </div>
        <div className="content" style={{color:"#FFFFFF"}}>
          {' '}
          Your message has been sent to us. We will get back to you in a while
        </div>
        
      </div>
    )}
  </Popup>

              <div> */}
            
          </div>
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
