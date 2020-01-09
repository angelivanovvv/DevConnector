import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { List } from "immutable";
import PropTypes from "prop-types";

import { getErrors } from "../../reduxSources/selectors/alertsSelectors";
import {
  getIsAuthenticated,
  getIsLoading
} from "../../reduxSources/selectors/authSelectors";

import * as authActions from "../../reduxSources/actions/authActions";

import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import Alert from "../../components/Alert";

const mapStateToProps = state => ({
  errors: getErrors(state),
  isAuthenticated: getIsAuthenticated(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch)
});

class Layout extends Component {
  static propTypes = {
    authActions: PropTypes.objectOf(PropTypes.func).isRequired,
    errors: PropTypes.instanceOf(List),
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    errors: List(),
    isAuthenticated: false,
    isLoading: false
  };

  render() {
    const {
      errors,
      isAuthenticated,
      isLoading,
      authActions: { logout }
    } = this.props;
    return (
      <Fragment>
        <Navbar
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          logout={logout}
        />
        <div className="container">
          <Alert errors={errors} />
          <Body isAuthenticated={isAuthenticated} isLoading={isLoading} />
        </div>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
