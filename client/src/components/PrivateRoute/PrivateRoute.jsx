import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { PATHS } from "./../../constants/clientRoutes";

const PrivateRoute = ({
  component: Component,
  auth: { isLoading, isAuthenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !isLoading ? (
        <Redirect to={PATHS.LOGIN} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  isLoading: PropTypes.bool,
  isAuthenticated: PropTypes.bool
};

PrivateRoute.defaultProps = {
  isLoading: true,
  isAuthenticated: false
};

export default PrivateRoute;
