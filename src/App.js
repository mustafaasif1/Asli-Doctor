import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React, { useState } from "react";
import { css } from "styled-components/macro"; //eslint-disable-line

import SaaSProductLandingPage from "demos/SaaSProductLandingPage.js";

/* Inner Pages */
import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import FakeDoctorReport from "pages/FakeDoctorReport.js";
// import PricingPage from "pages/Pricing.js";
import AboutUsPage from "pages/AboutUs.js";
import ContactUsPage from "pages/ContactUs.js";
import Dashboard from "Dashboard1.js";

import ComponentRenderer from "ComponentRenderer.js";
import DoctorList from "pages/Pricing.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "pages/Login.js";
import FakeDoctorForm from "components/forms/FakeDoctorForm";

export default function App() {

  return (
    <Router>
      <Switch>

        <Route path="/SignUp" component={SignupPage} />
        <Route path="/LogIn" component={LoginPage} />
        <Route path="/Doctors" component={DoctorList} />
        <Route path="/ContactUs" component={ContactUsPage} />
        <Route path="/FakeDoctorReport" component={FakeDoctorReport} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route exact path="/" component={SaaSProductLandingPage} />

      </Switch>
    </Router>
  );
}

// export default EventLandingPage;
// export default HotelTravelLandingPage;
// export default AgencyLandingPage;
// export default SaaSProductLandingPage;
// export default RestaurantLandingPage;
// export default ServiceLandingPage;
// export default HostingCloudLandingPage;

// export default LoginPage;
// export default SignupPage;
// export default PricingPage;
// export default AboutUsPage;
// export default ContactUsPage;
// export default BlogIndexPage;
// export default TermsOfServicePage;
// export default PrivacyPolicyPage;

// export default MainLandingPage;
