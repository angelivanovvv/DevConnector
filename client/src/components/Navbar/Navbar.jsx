import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { ROUTES } from "./../../constants/clientRoutes";

const Navbar = ({ isAuthenticated, isLoading, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to={ROUTES.DASHBOARD()}>
          <i className="fas fa-user icon-right" />
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <span className="pointer" onClick={logout}>
          <i className="fas fa-sign-out-alt icon-right" />
          <span className="hide-sm">Logout</span>
        </span>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to={ROUTES.PROFILES()}>Developers</Link>
      </li>
      <li>
        <Link to={ROUTES.REGISTER()}>Register</Link>
      </li>
      <li>
        <Link to={ROUTES.LOGIN()}>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav data-test="ang-navbar" className="ang-navbar navbar bg-dark">
      <h1 data-test="ang-logo">
        <Link to={ROUTES.LANDING()}>
          <i className="fas fa-code" /> DevConnector
        </Link>
      </h1>
      {!isLoading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  logout: PropTypes.func
};

Navbar.defaultProps = {
  isAuthenticated: false,
  isLoading: false,
  logout: () => {}
};

export default Navbar;
