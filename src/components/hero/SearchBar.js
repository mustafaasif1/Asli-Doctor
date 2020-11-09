import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
// import { css } from "styled-components/macro";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Confirm from "components/misc/alerts.js";

import { useHistory } from "react-router-dom";


import Header from "../headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../images/Pediatrician-Check-A-Healthy-Cheerful-Kid.png";
// import GetInformationForm from "components/forms/TwoColGetInformationWithIllustrationFullForm.js";

import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import { trackPromise } from 'react-promise-tracker';

// import CustomersLogoStripImage from "../../images/customers-logo-strip.png";


import { makeStyles, withStyles  } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles2 = makeStyles((theme) => ({
  root: {
    // width: '100%',
    padding: theme.spacing(3, 2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-16 md:py-16`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col`;

// const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Heading = tw(SectionHeading)`mt-4 font-bold text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const Paragraph = tw.p`my-5 lg:my-8 text-gray-500 text-base xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

// const CustomersLogoStrip = styled.div`
//   ${tw`mt-12 lg:mt-20`}
//   p {
//     ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`}
//   }
//   img {
//     ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-50`}
//   }
// `;

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
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-teal-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`


export default ({ roundedHeaderButton, setLI, LI,submitButtonText = "Submit",
formAction = "/Doctors",
formMethod = "get", }) => {

  const [gender, setGender] = React.useState('');
  const [type, setType] = React.useState('');

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const history = useHistory();
  

  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const [open,setOpen]=React.useState(false);
  
  const handleClose = () => {
    history.push("/");
    window.location.reload(false);
    setOpen(false);
  };

  const classes = useStyles2();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          style={{flexGrow: 0}}
        >
          <div className={classes.column}>
          <Subheading>Search more Doctors</Subheading>
          </div>
          {/* <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Search for more doctors</Typography>
          </div> */}
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        <LeftColumn>
          {/* <Subheading>Search Doctors</Subheading> */}
            {/* <Heading>
              Do you want a new Search?
            </Heading> */}
            
            {/* <Paragraph style={{padding: "0px 70px 0px 0px"}}>Pakistan has seen a rapid influx of Fake Doctors, especially in low income areas. With no one to check their credentials, they have exploited the population and taken large sums of money form them only to put their lives at risk. This is an inititave to expose such doctors and report them. Find out if the doctor in your locality is authentic by searching them below</Paragraph> */}
            <Form action={formAction} method={formMethod}>
              <Input type="text" name="registration" placeholder="Registration Number" />
              <Input type="text" name="name" placeholder="Full Name" />
              {/* <Input type="text" name="gender" placeholder="Gender" /> */}
              <Input type="text" name="fathersName" placeholder="Father's Name" />
              <Input type="text" name="city" placeholder="City" />
              
              {/* <Input type="text" name="type" placeholder="Type" /> */}
              
              <SubmitButton type="Search">{submitButtonText}</SubmitButton>
            </Form>
            
        
           
          </LeftColumn>
          
        </AccordionDetails>
        {/* <Divider /> */}
        <AccordionActions>
          {/* <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button> */}
        </AccordionActions>
      </Accordion>
    </div>
  );



  return (
    <>
      {/* <Header roundedHeaderButton={roundedHeaderButton}/> */}
      {/* < GetInformationForm/> */}
      
      <Container>
       
          <LeftColumn>
          <Subheading>Search Doctors</Subheading>
            {/* <Heading>
              Do you want a new Search?
            </Heading> */}
            
            {/* <Paragraph style={{padding: "0px 70px 0px 0px"}}>Pakistan has seen a rapid influx of Fake Doctors, especially in low income areas. With no one to check their credentials, they have exploited the population and taken large sums of money form them only to put their lives at risk. This is an inititave to expose such doctors and report them. Find out if the doctor in your locality is authentic by searching them below</Paragraph> */}
            <Form action={formAction} method={formMethod}>
              <Input type="text" name="registration" placeholder="Registration Number" />
              <Input type="text" name="name" placeholder="Full Name" />
              {/* <Input type="text" name="gender" placeholder="Gender" /> */}
              <Input type="text" name="fathersName" placeholder="Father's Name" />
              <Input type="text" name="city" placeholder="City" />
              
              {/* <Input type="text" name="type" placeholder="Type" /> */}
              
              <SubmitButton type="Search">{submitButtonText}</SubmitButton>
            </Form>
            
        
           
          </LeftColumn>
          {/* <RightColumn>

          </RightColumn> */}

          
       
        <DecoratorBlob1 />
      </Container>
    </>
  );
};


function DetailedAccordion() {
  const classes = useStyles2();

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Location</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Chip label="Barbados" onDelete={() => {}} />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Select your destination of choice
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}>
                Learn more
              </a>
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}