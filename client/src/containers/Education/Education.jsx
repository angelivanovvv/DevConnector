import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { ROUTES_ACTIONS } from "../../constants/clientRoutes";

import * as profileActions from "../../reduxSources/actions/profileActions";
import * as routeActions from "../../reduxSources/actions/routesActions";

import SkillsForm from "../../components/Forms/Skills";

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  routeActions: bindActionCreators(routeActions, dispatch)
});

class Education extends Component {
  static propTypes = {
    profileActions: PropTypes.objectOf(PropTypes.func).isRequired,
    routeActions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: ""
    };
  }

  onChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  onCheck = event => {
    this.setState({
      ...this.state,
      [event.target.name]: !this.state.current
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const {
      school,
      degree,
      fieldofstudy,
      from,
      current,
      to,
      description
    } = this.state;
    const {
      profileActions: { addEducation }
    } = this.props;
    const formData = {
      school,
      degree,
      fieldofstudy,
      from,
      current,
      to,
      description
    };
    addEducation(formData);
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
      school,
      degree,
      fieldofstudy,
      from,
      current,
      to,
      description
    } = this.state;
    const values = {
      school,
      degree,
      fieldofstudy,
      from,
      current,
      to,
      description
    };
    return (
      <div className="page-wrapper">
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add any school,bootcamp, etc
          that you have attended
        </p>
        <SkillsForm
          fields={values}
          onChange={this.onChange}
          onCheck={this.onCheck}
          onSubmit={this.onSubmit}
          onGoBack={this.onGoBack}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Education);
