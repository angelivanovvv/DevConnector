import React from "react";
import { Map } from "immutable";
import PropTypes from "prop-types";

import Button from "../Button";

const SingleProfile = ({ details, onClick }) => {
  return (
    <div className="profile bg-light box-shadow">
      <div className="image-wrapper">
        <img
          className="round-img"
          src={details.getIn(["user", "avatar"])}
          alt=""
        />
      </div>
      <div className="user-wrapper">
        <h2>{details.getIn(["user", "name"])}</h2>
        <p>
          {details.get("status")} at {details.get("company")}
        </p>
        <p>{details.get("location")}</p>
        <Button
          className="btn btn-primary my-1-top"
          onClick={() => onClick(details.getIn(["user", "_id"]))}
        >
          View Profile
        </Button>
      </div>
      <div className="skills-wrapper">
        <ul>
          {details.get("skills").size > 0 ? (
            details
              .get("skills")
              .slice(0, 4)
              .map((skill, index) => (
                <li key={index} className="text-primary">
                  <i className="fas fa-check"></i> {skill}
                </li>
              ))
          ) : (
            <p className="small">no skills</p>
          )}
        </ul>
      </div>
    </div>
  );
};

SingleProfile.propTypes = {
  details: PropTypes.instanceOf(Map),
  onClick: PropTypes.func
};

SingleProfile.defaultProps = {
  details: Map(),
  onClick: () => {}
};

export default SingleProfile;
