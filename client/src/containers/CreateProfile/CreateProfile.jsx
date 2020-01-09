import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { ROUTES_ACTIONS } from "../../constants/clientRoutes";

import * as profileActions from "../../reduxSources/actions/profileActions";
import * as routeActions from "../../reduxSources/actions/routesActions";

import ProfileForm from "../../components/Forms/Profile";

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  routeActions: bindActionCreators(routeActions, dispatch)
});

class CreateProfile extends Component {
  static propTypes = {
    profileActions: PropTypes.objectOf(PropTypes.func).isRequired,
    routeActions: PropTypes.objectOf(PropTypes.func).isRequired
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      isMediaOpen: false
    };
  }

  socialMediaToggle = () => {
    this.setState({
      ...this.state,
      isMediaOpen: !this.state.isMediaOpen
    });
  };

  onChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { showMedia, ...rest } = this.state;
    const {
      profileActions: { createProfile }
    } = this.props;
    createProfile(rest);
  };

  onGoBack = event => {
    event.preventDefault();
    const {
      routeActions: { changeLocation }
    } = this.props;
    changeLocation(ROUTES_ACTIONS.toDashboard());
  };

  render() {
    const {
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
      isMediaOpen
    } = this.state;
    const values = {
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
      isMediaOpen
    };
    return (
      <div className="page-wrapper">
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
        <ProfileForm
          {...values}
          socialMediaToggle={this.socialMediaToggle}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onGoBack={this.onGoBack}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(CreateProfile);
