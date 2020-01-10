import React from "react";
import PropTypes from "prop-types";

import { ROUTES_ACTIONS } from "../../../constants/clientRoutes";

import Button from "../../Button";

const Actions = ({ profile, experience, education, router }) => {
  const { changeLocation } = router;
  const { toEditProfile, toAddExperience, toAddEducation } = ROUTES_ACTIONS;
  return (
    <div className="dash-buttons">
      <Button
        onClick={() => changeLocation(toEditProfile())}
        className="btn btn-right btn-light"
      >
        <i className="fas fa-user-circle text-primary"></i> {profile}
      </Button>
      <Button
        onClick={() => changeLocation(toAddExperience())}
        className="btn btn-right btn-light"
      >
        <i className="fab fa-black-tie text-primary"></i> {experience}
      </Button>
      <Button
        onClick={() => changeLocation(toAddEducation())}
        className="btn btn-right btn-light"
      >
        <i className="fas fa-graduation-cap text-primary"></i> {education}
      </Button>
    </div>
  );
};

Actions.propTypes = {
  profile: PropTypes.string,
  experience: PropTypes.string,
  education: PropTypes.string,
  router: PropTypes.objectOf(PropTypes.func).isRequired
};
Actions.defaultProps = {
  profile: "",
  experience: "",
  education: ""
};

export default Actions;
