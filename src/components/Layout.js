import React from "react";
import Helmet from "react-helmet";

import Navbar from "../components/Navbar";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Gatsby + Netlify CMS" />
    <Navbar />
    <div>{children}</div>
  </div>
);

export default TemplateWrapper;