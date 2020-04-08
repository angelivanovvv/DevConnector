import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { List } from "immutable";
import PropTypes from "prop-types";

import { getErrors } from "../../reduxSources/selectors/alertsSelectors";
import { getIsModalOpen } from "../../reduxSources/selectors/modalSelectors";
import {
  getIsAuthenticated,
  getIsLoading,
} from "../../reduxSources/selectors/authSelectors";

import * as authActions from "../../reduxSources/actions/authActions";
import * as modalActions from "../../reduxSources/actions/modalActions";

import Navbar from "../../components/Navbar";
import Alert from "../../components/Alert";
import Body from "../../components/Body";
import Backdrop from "../../components/Backdrop";

const mapStateToProps = (state) => ({
  errors: getErrors(state),
  isAuthenticated: getIsAuthenticated(state),
  isLoading: getIsLoading(state),
  isModalOpen: getIsModalOpen(state),
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
});

class Layout extends Component {
  static propTypes = {
    authActions: PropTypes.objectOf(PropTypes.func).isRequired,
    modalActions: PropTypes.objectOf(PropTypes.func).isRequired,
    errors: PropTypes.instanceOf(List),
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    isModalOpen: PropTypes.bool,
  };

  static defaultProps = {
    errors: List(),
    isAuthenticated: false,
    isLoading: false,
    isModalOpen: false,
  };

  render() {
    const {
      errors,
      isAuthenticated,
      isLoading,
      isModalOpen,
      authActions: { logout },
      modalActions: { closeModal },
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
          <Backdrop isOpen={isModalOpen} clicked={closeModal} />
          <Body isAuthenticated={isAuthenticated} isLoading={isLoading} />
        </div>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
