import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import PropTypes from "prop-types";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class Profiles extends Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <div>Developers</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
