import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import {
  getProfiles,
  getIsLoading
} from "../../reduxSources/selectors/profileSelectors";
import * as profileActions from "../../reduxSources/actions/profileActions";
import * as routesActions from "../../reduxSources/actions/routesActions";

import { ROUTES_ACTIONS } from "./../../constants/clientRoutes";

import Spinner from "../../components/Spinner";
import ProfileCard from "../../components/ProfileCard";

const mapStateToProps = state => ({
  profiles: getProfiles(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  routesActions: bindActionCreators(routesActions, dispatch)
});

class Profiles extends Component {
  static propTypes = {
    profileActions: PropTypes.objectOf(PropTypes.func).isRequired,
    routesActions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  static defaultProps = {};

  componentDidMount() {
    const {
      profileActions: { getProfiles }
    } = this.props;
    getProfiles();
  }

  viewProfile = id => {
    const {
      routesActions: { changeLocation }
    } = this.props;
    changeLocation(ROUTES_ACTIONS.toProfile(id));
  };

  render() {
    const { profiles, isLoading } = this.props;
    return (
      <div className="page-wrapper">
        <h1 className="large text-primary text-uppercase">Developers</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop icon-right"></i>
          <span className="small">Browse and connect with developers</span>
        </p>
        <div className="profiles">
          {isLoading ? (
            <Spinner />
          ) : (
            <Fragment>
              {profiles.size > 0 ? (
                profiles.map(profile => (
                  <ProfileCard
                    key={profile.get("_id")}
                    details={profile}
                    onClick={this.viewProfile}
                  />
                ))
              ) : (
                <p className="text-center small">No profiles found.</p>
              )}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
