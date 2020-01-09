import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { getIsAuthenticated } from "../../reduxSources/selectors/authSelectors";

import { ROUTES } from "../../constants/clientRoutes";

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state)
});

class Landing extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  static defaultProps = {
    isAuthenticated: false
  };

  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated && isAuthenticated !== null) {
      return <Redirect to={ROUTES.DASHBOARD()} />;
    }

    return (
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <div className="buttons">
              <Link className="btn btn-primary" to={ROUTES.REGISTER()}>
                Sign Up
              </Link>
              <Link className="btn btn-light" to={ROUTES.LOGIN()}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, null)(Landing);
