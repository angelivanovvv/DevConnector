import React from "react";
import { Map } from "immutable";
import PropTypes from "prop-types";

import { mediaLinks } from "../../../constants/config";
import Card from "../../Card";

const Details = ({ user, position, company, location, links }) => {
  return (
    <Card className="profile-top bg-primary opacity-8 p-2">
      <img className="round-img my-1" src={user.get("avatar")} alt="" />
      <h1 className="large">{user.get("name")}</h1>
      <p className="lead">
        {position} at {company}
      </p>
      <p>{location}</p>
      <div className="icons my-1">
        {mediaLinks.map(item => (
          <a
            key={item.get("key")}
            href={
              links.get(item.get("name")) !== undefined
                ? links.get(item.get("name"))
                : "#"
            }
            target={links.get(item.get("name")) !== undefined ? "blank" : ""}
          >
            <i className={`fab ${item.get("icon")} fa-2x`}></i>
          </a>
        ))}
      </div>
    </Card>
  );
};

Details.propTypes = {
  user: PropTypes.instanceOf(Map),
  position: PropTypes.string,
  company: PropTypes.string,
  location: PropTypes.string,
  links: PropTypes.instanceOf(Map)
};

Details.defaultProps = {
  user: Map(),
  position: "",
  company: "",
  location: "",
  links: Map()
};

export default Details;
