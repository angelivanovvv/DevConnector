import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Map } from "immutable";
import PropTypes from "prop-types";

import { ROUTES_ACTIONS } from "../../constants/clientRoutes";
import { getProfileState } from "../../common/helpers";

import {
  getIsLoading,
  getProfile
} from "../../reduxSources/selectors/profileSelectors";

import * as profileActions from "../../reduxSources/actions/profileActions";
import * as routeActions from "../../reduxSources/actions/routesActions";

import Spinner from "../../components/Spinner";
import ProfileForm from "../../components/Forms/Profile";

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  profile: getProfile(state)
});

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  routeActions: bindActionCreators(routeActions, dispatch)
});

class EditProfile extends Component {
  static propTypes = {
    profileActions: PropTypes.objectOf(PropTypes.func).isRequired,
    routeActions: PropTypes.objectOf(PropTypes.func).isRequired,
    isLoading: PropTypes.bool,
    profile: PropTypes.instanceOf(Map)
  };

  static defaultProps = {
    isLoading: true,
    profile: Map()
  };

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

  componentDidMount() {
    const {
      profileActions: { getProfile }
    } = this.props;
    getProfile();
  }

  componentDidUpdate(prevProps) {
    const { isLoading, profile } = this.props;
    if (prevProps.isLoading !== isLoading) {
      getProfileState(this, isLoading, profile);
    }
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
    createProfile(rest, true);
  };

  onGoBack = event => {
    event.preventDefault();
    const {
      routeActions: { changeLocation }
    } = this.props;
    changeLocation(ROUTES_ACTIONS.toDashboard());
  };

  render() {
    const { isLoading } = this.props;
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
        {isLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary">Edit Your Profile</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Let's edit some information to
              make you profile even better
            </p>
            <ProfileForm
              {...values}
              socialMediaToggle={this.socialMediaToggle}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onGoBack={this.onGoBack}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
