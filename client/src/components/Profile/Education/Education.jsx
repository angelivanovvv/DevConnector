import React from "react";
import Moment from "react-moment";
import { List } from "immutable";
import PropTypes from "prop-types";

import Card from "../../Card";

const Education = ({ education }) => (
  <Card className="profile-edu bg-white p-2">
    <h2 className="text-primary">Education</h2>
    {education.size > 0 ? (
      education.map(item => (
        <div key={item.get("_id")}>
          <h3>{item.get("school")}</h3>
          <p>
            <Moment format="YYYY/MM/DD">{item.get("from")}</Moment> -{" "}
            {item.get("current") ? (
              "Now"
            ) : (
              <Moment format="YYYY/MM/DD">{item.get("to")}</Moment>
            )}
          </p>
          <p>
            <strong>Degree: </strong>
            {item.get("degree")}
          </p>
          <p>
            <strong>Field Of Study: </strong>
            {item.get("fieldofstudy")}
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

Education.propTypes = {
  education: PropTypes.instanceOf(List)
};
Education.defaultProps = {
  education: List()
};

export default Education;
