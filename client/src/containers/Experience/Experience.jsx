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

class Experience extends Component {
  static propTypes = {
    profileActions: PropTypes.objectOf(PropTypes.func).isRequired,
    routeActions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      current: false,
      to: "",
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
      title,
      company,
      location,
      from,
      current,
      to,
      description
    } = this.state;
    const {
      profileActions: { addExperience }
    } = this.props;
    const formData = {
      title,
      company,
      location,
      from,
      current,
      to,
      description
    };
    addExperience(formData);
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
      title,
      company,
      location,
      from,
      current,
      to,
      description
    } = this.state;
    const values = { title, company, location, from, current, to, description };
    return (
      <div className="page-wrapper">
        <h1 className="large text-primary text-uppercase">
          Add Your Experience
        </h1>
        <p className="lead">
          <i className="fas fa-code-branch icon-right"></i>
          <span className="small">
            Add any developer/programming positions that you have had in the
            past
          </span>
        </p>
        <SkillsForm
          fields={values}
          formType="experience"
          onChange={this.onChange}
          onCheck={this.onCheck}
          onSubmit={this.onSubmit}
          onGoBack={this.onGoBack}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Experience);
