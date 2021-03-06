import React from "react";
import Moment from "react-moment";
import { List } from "immutable";
import PropTypes from "prop-types";

import Card from "../../Card";

const Experience = ({ experience, position }) => (
  <Card className="profile-exp bg-white p-2">
    <h2 className="text-primary">Experience</h2>
    {experience.size > 0 ? (
      experience.map(item => (
        <div key={item.get("_id")}>
          <h3 className="text-dark">{item.get("company")}</h3>
          <p>
            <Moment format="YYYY/MM/DD">{item.get("from")}</Moment> -{" "}
            {item.get("current") ? (
              "Now"
            ) : (
              <Moment format="YYYY/MM/DD">{item.get("to")}</Moment>
            )}
          </p>
          <p>
            <strong>Position: </strong>
            {position}
          </p>
          <p>
            <strong>Description: </strong>
            {item.get("description")}
          </p>
        </div>
      ))
    ) : (
      <p className="small">No experience.</p>
    )}
  </Card>
);

Experience.propTypes = {
  experience: PropTypes.instanceOf(List),
  position: PropTypes.string
};
Experience.defaultProps = {
  experience: List(),
  position: ""
};

export default Experience;
