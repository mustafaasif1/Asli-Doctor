import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithInput.js";
import Footer from "components/footers/MiniCenteredFooter.js";

export default ({ }) => {

  return (
    <AnimationRevealPage disabled={true}>
      <Hero roundedHeaderButton={true} />
      <Footer />
    </AnimationRevealPage>
  );
}
