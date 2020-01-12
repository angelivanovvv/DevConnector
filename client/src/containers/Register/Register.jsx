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
import Card from "../../components/Card";

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  alertsActions: bindActionCreators(alertsActions, dispatch)
});

class Register extends Component {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
    alertsActions: PropTypes.objectOf(PropTypes.func).isRequired,
    authActions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  onChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    const { name, email, password, password2 } = this.state;
    const {
      authActions: { register }
    } = this.props;
    const {
      alertsActions: { alert }
    } = this.props;

    if (password !== password2) alert("Passwords do not match", "danger");
    else register({ name, email, password });
  };

  render() {
    const { name, email, password, password2 } = this.state;
    return (
      <div className="page-wrapper">
        <Card className="form-container">
          <h1 className="large text-primary text-uppercase text-center">
            Sign Up
          </h1>
          <form className="form">
            <div className="form-group">
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={this.onChange}
                required
              />
              <small className="form-text">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            </div>
            <div className="form-group">
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.onChange}
                minLength="6"
              />
            </div>
            <div className="form-group">
              <Input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="6"
                value={password2}
                onChange={this.onChange}
              />
            </div>
            <div className="link-container">
              <p className="my-1 text-center text-link">
                Already have an account?{" "}
                <Link className="text-underline" to={ROUTES.LOGIN()}>
                  Sign In
                </Link>
              </p>
            </div>
            <div className="button-container">
              <Button
                type="submit"
                className="btn btn-primary"
                onClick={this.onSubmit}
              >
                Register
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Register);
