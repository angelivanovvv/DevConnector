import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Map, List } from "immutable";
import PropTypes from "prop-types";

import {
  getIsAuthenticated,
  getUser
} from "../../reduxSources/selectors/authSelectors";
import {
  getProfile,
  getExperience,
  getEducation,
  getIsLoading
} from "../../reduxSources/selectors/profileSelectors";

import * as profileActions from "../../reduxSources/actions/profileActions";
import { ROUTES } from "../../constants/clientRoutes";

import Spinner from "../../components/Spinner";
import DashboardActions from "../../components/Dashboard/Actions";
import DashboardTable from "../../components/Dashboard/Table";

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  user: getUser(state),
  isLoading: getIsLoading(state),
  profile: getProfile(state),
  experience: getExperience(state),
  education: getEducation(state)
});

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch)
});

class Dashbooard extends Component {
  static propTypes = {
    profileActions: PropTypes.objectOf(PropTypes.func).isRequired,
    user: PropTypes.instanceOf(Map),
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    profile: PropTypes.instanceOf(Map),
    experience: PropTypes.instanceOf(List),
    education: PropTypes.instanceOf(List)
  };
  static defaultProps = {
    user: Map(),
    isAuthenticated: true,
    isLoading: true,
    profile: Map(),
    experience: List(),
    education: List()
  };

  componentDidMount() {
    const {
      profileActions: { getProfile }
    } = this.props;
    getProfile();
  }

  render() {
    const { user, profile, isLoading, experience } = this.props;
    return (
      <div className="page-wrapper">
        {isLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
              <i className="fas fa-user"> </i>
              Welcome {user && user !== null ? user.get("name") : null}
            </p>
            {profile !== null ? (
              <Fragment>
                <DashboardActions
                  profile="Edit Profile"
                  experience="Add Experience"
                  education="Add Education"
                  profileLink={ROUTES.EDIT_PROFILE()}
                  experienceLink={ROUTES.ADD_EXPERIENCE()}
                  educationLink={ROUTES.ADD_EDUCATION()}
                />
                <DashboardTable experience={experience} />
              </Fragment>
            ) : (
              <Fragment>
                <p>You haven't yet setup profile, lease add some info</p>
                <Link
                  className="btn btn-primary my-1"
                  to={ROUTES.CREATE_PROFILE()}
                >
                  Create Profile
                </Link>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbooard);
