import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as profileActions from "../../reduxSources/actions/profileActions";

import ProfileCard from "../../components/ProfileCard";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch)
});

class Profiles extends Component {
  static propTypes = {
    profileActions: PropTypes.objectOf([PropTypes.func]).isRequired
  };
  static defaultProps = {};

  componentDidMount() {
    const {
      profileActions: { getProfiles }
    } = this.props;
    getProfiles();
  }

  render() {
    return (
      <div className="page-wrapper">
        <h1 class="large text-primary text-uppercase">Developers</h1>
        <p class="lead">
          <i class="fab fa-connectdevelop icon-right"></i>
          <span className="small">Browse and connect with developers</span>
        </p>
        <div className="profiles">
          <ProfileCard />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
