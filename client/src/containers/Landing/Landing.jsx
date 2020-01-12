import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { getIsAuthenticated } from "../../reduxSources/selectors/authSelectors";

import * as routesActions from "../../reduxSources/actions/routesActions";
import { ROUTES, ROUTES_ACTIONS } from "../../constants/clientRoutes";

import Button from "../../components/Button";

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
  routesActions: bindActionCreators(routesActions, dispatch)
});

class Landing extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    routesActions: PropTypes.objectOf(PropTypes.func).isRequired
  };
  static defaultProps = {
    isAuthenticated: false
  };

  register = () => {
    const {
      routesActions: { changeLocation }
    } = this.props;
    changeLocation(ROUTES_ACTIONS.toRegister());
  };

  login = () => {
    const {
      routesActions: { changeLocation }
    } = this.props;
    changeLocation(ROUTES_ACTIONS.toLogin());
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
              <Button
                className="btn btn-primary btn-right"
                onClick={this.register}
              >
                Sign Up
              </Button>
              <Button className="btn btn-light" onClick={this.login}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
