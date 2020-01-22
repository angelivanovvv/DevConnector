import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
import { getIsModalOpen } from "../../reduxSources/selectors/modalSelectors";

import * as profileActions from "../../reduxSources/actions/profileActions";
import * as routesActions from "../../reduxSources/actions/routesActions";
import * as modalActions from "../../reduxSources/actions/modalActions";

import { ROUTES_ACTIONS } from "../../constants/clientRoutes";
import { experienceRows, educationRows } from "../../constants/config";

import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import DashboardActions from "../../components/Dashboard/Actions";
import DashboardTable from "../../components/Dashboard/Table";

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  user: getUser(state),
  isLoading: getIsLoading(state),
  profile: getProfile(state),
  experience: getExperience(state),
  education: getEducation(state),
  isModalOpen: getIsModalOpen(state)
});

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  routesActions: bindActionCreators(routesActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch)
});

class Dashbooard extends Component {
  static propTypes = {
    profileActions: PropTypes.objectOf(PropTypes.func).isRequired,
    routesActions: PropTypes.objectOf(PropTypes.func).isRequired,
    modalActions: PropTypes.objectOf(PropTypes.func).isRequired,
    user: PropTypes.instanceOf(Map),
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    profile: PropTypes.instanceOf(Map),
    experience: PropTypes.instanceOf(List),
    education: PropTypes.instanceOf(List),
    isModalOpen: PropTypes.bool
  };
  static defaultProps = {
    user: Map(),
    isAuthenticated: true,
    isLoading: true,
    profile: Map(),
    experience: List(),
    education: List(),
    isModalOpen: false
  };

  constructor(props) {
    super(props);
    this.state = {
      modalType: "",
      id: null
    };
  }

  componentDidMount() {
    const {
      profileActions: { getProfile }
    } = this.props;
    getProfile();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.isModalOpen !== this.props.isModalOpen) {
  //     this.setState({
  //       modalType: "",
  //       id: null
  //     });
  //     return true;
  //   }
  //   return true;
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.isModalOpen !== this.props.isModalOpen) {
  //     this.setState({
  //       modalType: "",
  //       id: null
  //     });
  //   }
  // }

  createProfile = () => {
    const {
      routesActions: { changeLocation }
    } = this.props;
    changeLocation(ROUTES_ACTIONS.toCreateProfile());
  };

  openModal = (event, id) => {
    const {
      modalActions: { openModal }
    } = this.props;
    openModal();
    this.setState({
      ...this.state,
      modalType: event.currentTarget.name,
      id: !!id ? id : null
    });
  };

  colseModal = () => {
    const {
      modalActions: { closeModal }
    } = this.props;
    closeModal();
  };

  deleteExperience = id => {
    const {
      profileActions: { deleteExperience }
    } = this.props;
    deleteExperience(id);
  };

  deleteEducation = id => {
    const {
      profileActions: { deleteEducation }
    } = this.props;
    deleteEducation(id);
  };

  deleteProfile = () => {
    const {
      profileActions: { deleteProfile }
    } = this.props;
    deleteProfile();
  };

  render() {
    const {
      user,
      profile,
      isLoading,
      experience,
      education,
      isModalOpen,
      routesActions
    } = this.props;
    return (
      <div className="page-wrapper">
        {isLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary text-uppercase my-1-bottom">
              Dashboard
            </h1>
            {profile !== null ? (
              <Fragment>
                <Card className="my-2-bottom">
                  <p className="lead">
                    <i className="fas fa-user icon-right"></i>
                    <span className="small">
                      Welcome {user && user !== null ? user.get("name") : null}!
                    </span>
                  </p>
                  <DashboardActions
                    profile="Edit Profile"
                    experience="Add Experience"
                    education="Add Education"
                    router={routesActions}
                  />
                </Card>
                <Card className="my-2-bottom">
                  <h2 className="my-2-bottom text-uppercase">
                    Your experience
                  </h2>
                  {experience.size === 0 ? (
                    <h2 className="my-2 empty-message">
                      You don't have any experience added to your profile.
                    </h2>
                  ) : (
                    <DashboardTable
                      rows={experienceRows}
                      results={experience}
                      onClick={this.openModal}
                      buttonName="experience"
                    />
                  )}
                </Card>
                <Card className="my-2-bottom">
                  <h2 className="my-2-bottom text-uppercase">Your education</h2>
                  {education.size === 0 ? (
                    <h2 className="my-2 empty-message">
                      You don't have any education added to your profile.
                    </h2>
                  ) : (
                    <DashboardTable
                      rows={educationRows}
                      results={education}
                      onClick={this.openModal}
                      buttonName="education"
                    />
                  )}
                </Card>
                <Card className="my-2-bottom">
                  <h2 className="my-2-bottom text-uppercase">Your Account</h2>
                  <h2 className="my-2 empty-message">
                    You don't want to have your account anymore? You can delete
                    account here.
                  </h2>
                  <div className="button-container">
                    <Button
                      className="btn btn-danger my-2-top"
                      name="account"
                      onClick={event => this.openModal(event)}
                    >
                      <i className="fas fa-user icon-right"></i>
                      <span>Delete my accont</span>
                    </Button>
                  </div>
                </Card>
              </Fragment>
            ) : (
              <Card>
                <p className="lead text-center">
                  <i className="fas fa-user icon-right"></i>
                  <span className="small">
                    Welcome {user && user !== null ? user.get("name") : null}!
                  </span>
                </p>
                <p className="small text-center empty-message">
                  You haven't yet setup profile, click to "Create Profile".
                </p>
                <div className="button-container">
                  <Button
                    className="btn btn-primary my-1"
                    onClick={this.createProfile}
                  >
                    Create Profile
                  </Button>
                </div>
              </Card>
            )}
            <Modal show={isModalOpen}> Dashboard </Modal>
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbooard);
