import React, { Fragment } from "react";

const NotFound = () => (
  <div className="not-found">
    <h1 className="x-large text-primary text-center">
      <i className="fas fa-exclamation-triangle icon-right"></i>
      <span className="text-uppercase">Page Not Found</span>
    </h1>
    <p className="small text-center"> Sorry, this page does not exist</p>
  </div>
);

export default NotFound;
