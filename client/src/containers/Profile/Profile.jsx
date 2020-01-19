import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Map, List } from "immutable";
import PropTypes from "prop-types";

import {
  getProfile,
  getRepos,
  getIsLoading
} from "../../reduxSources/selectors/profileSelectors";

import {
  getIsAuthenticated,
  getUser
} from "../../reduxSources/selectors/authSelectors";

import * as profileActions from "../../reduxSources/actions/profileActions";
import * as routesActions from "../../reduxSources/actions/routesActions";

import { ROUTES_ACTIONS } from "../../constants/clientRoutes";

import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import Details from "../../components/Profile/Details";
import Description from "../../components/Profile/Description";
import Experience from "../../components/Profile/Experience";
import Education from "../../components/Profile/Education";
import GitHubRepos from "../../components/Profile/Repos";

const mapStateToProps = state => ({
  profile: getProfile(state),
  repos: getRepos(state),
  isLoading: getIsLoading(state),
  isAuthenticated: getIsAuthenticated(state),
  user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  routesActions: bindActionCreators(routesActions, dispatch)
});

class Profile extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.instanceOf(Map),
    profileActions: PropTypes.objectOf(PropTypes.func).isRequired,
    routesActions: PropTypes.objectOf(PropTypes.func).isRequired,
    profile: PropTypes.instanceOf(Map),
    repos: PropTypes.instanceOf(List),
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    isAuthenticated: false,
    user: Map(),
    profile: Map(),
    isLoading: true
  };

  componentDidMount() {
    const {
      match,
      profileActions: { getProfileById }
    } = this.props;
    getProfileById(match.params.userId);
  }

  componentDidUpdate(prevProps) {
    const {
      profile,
      profileActions: { getGithubRepos }
    } = this.props;
    if (prevProps.profile !== this.props.profile) {
      getGithubRepos(profile.get("githubusername"));
    }
  }

  render() {
    const {
      isAuthenticated,
      user,
      isLoading,
      profile,
      repos,
      routesActions: { changeLocation }
    } = this.props;

    return (
      <div className="page-wrapper">
        {!isLoading && profile !== null ? (
          <div className="profile-grid">
            <div className="buttons-top">
              <Button
                className="btn btn-light btn-right"
                onClick={() => changeLocation(ROUTES_ACTIONS.toProfiles())}
              >
                Back to profiles
              </Button>
              {!isLoading &&
              isAuthenticated &&
              user.get("_id") !== null &&
              Profile !== null &&
              user.get("_id") === profile.getIn(["user", "_id"]) ? (
                <Button
                  className="btn btn-primary btn-right"
                  onClick={() => changeLocation(ROUTES_ACTIONS.toEditProfile())}
                >
                  Edit profile
                </Button>
              ) : null}
            </div>
            <Details
              user={profile.get("user")}
              position={profile.get("status")}
              company={profile.get("company")}
              location={profile.get("location")}
              links={profile.get("social")}
            />
            <Description
              user={profile.get("user")}
              bio={profile.get("bio")}
              skills={profile.get("skills")}
            />
            <Experience
              experience={profile.get("experience")}
              position={profile.get("status")}
            />
            <Education education={profile.get("education")} />
            <GitHubRepos repos={repos} />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
