import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Actions = ({
  profile,
  experience,
  education,
  profileLink,
  experienceLink,
  educationLink
}) => (
  <div className="dash-buttons">
    <Link to={profileLink} className="btn btn-dash btn-light">
      <i className="fas fa-user-circle text-primary"></i> {profile}
    </Link>
    <Link to={experienceLink} className="btn btn-dash btn-light">
      <i className="fab fa-black-tie text-primary"></i> {experience}
    </Link>
    <Link to={educationLink} className="btn btn-dash btn-light">
      <i className="fas fa-graduation-cap text-primary"></i> {education}
    </Link>
  </div>
);

Actions.propTypes = {
  profile: PropTypes.string,
  experience: PropTypes.string,
  education: PropTypes.string,
  profileLink: PropTypes.string,
  experienceLink: PropTypes.string,
  educationLink: PropTypes.string
};
Actions.defaultProps = {
  profile: "",
  experience: "",
  education: "",
  profileLink: "",
  experienceLink: "",
  educationLink: ""
};

export default Actions;
