import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Map } from "immutable";
import PropTypes from "prop-types";

import {
  getProfile,
  getIsLoading
} from "../../reduxSources/selectors/profileSelectors";
import * as profileActions from "../../reduxSources/actions/profileActions";

import Spinner from "../../components/Spinner";
import Details from "../../components/Profile/Details";
import Description from "../../components/Profile/Description";
import Experience from "../../components/Profile/Experience";

const mapStateToProps = state => ({
  profile: getProfile(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch)
});

class Profile extends Component {
  static propTypes = {
    profileActions: PropTypes.objectOf(PropTypes.func).isRequired,
    profile: PropTypes.instanceOf(Map),
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    profile: Map(),
    isLoading: true
  };

  componentWillMount() {
    const {
      match,
      profileActions: { getProfileById }
    } = this.props;
    getProfileById(match.params.userId);
  }

  render() {
    const { isLoading, profile } = this.props;
    return (
      <div className="page-wrapper">
        {!isLoading && profile !== null ? (
          <div className="profile-grid">
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
            <Experience experience={profile.get("experience")} />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
