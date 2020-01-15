import React from "react";
import { Map, List } from "immutable";
import PropTypes from "prop-types";

import Card from "../../Card";

const Description = ({ user, bio, skills }) => (
  <Card className="profile-about bg-light p-2">
    <h2 className="text-primary">{user.get("name")} Bio</h2>
    <p>{bio}</p>
    <div className="line"></div>
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {skills.map((skill, index) => (
        <div key={index} className="p-1">
          <i className="fa fa-check"></i> {skill}
        </div>
      ))}
    </div>
  </Card>
);

Description.propTypes = {
  user: PropTypes.instanceOf(Map),
  bio: PropTypes.string,
  skills: PropTypes.instanceOf(List)
};

Description.defaultProps = {
  user: Map(),
  bio: "",
  skills: List()
};

export default Description;
