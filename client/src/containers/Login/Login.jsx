import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { ROUTES } from "../../constants/clientRoutes";

import * as authActions from "../../reduxSources/actions/authActions";
import * as alertsActions from "../../reduxSources/actions/alertActions";

import Input from "../../components/FormElements/Input";
import Button from "../../components/Button";

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  alertsActions: bindActionCreators(alertsActions, dispatch)
});

class Login extends Component {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
    alertsActions: PropTypes.objectOf(PropTypes.func).isRequired,
    authActions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = event =>
    this.setState({ ...this.state, [event.target.name]: event.target.value });

  onSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const {
      authActions: { login }
    } = this.props;
    login(email, password);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="page-wrapper">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Sign Into Your Account
        </p>
        <form className="form" action="create-profile.html">
          <div className="form-group">
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.onChange}
            />
          </div>
          <Button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSubmit}
          >
            Login
          </Button>
        </form>
        <p className="my-1">
          Don't have an account? <Link to={ROUTES.REGISTER()}>Sign Up</Link>
        </p>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);
