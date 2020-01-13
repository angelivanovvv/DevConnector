import React from "react";

import spinner from "../../img/spinner.gif";

const Spinner = () => (
  <div className="spinner">
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "100px", margin: "auto", display: "block" }}
    />
  </div>
);

export default Spinner;
