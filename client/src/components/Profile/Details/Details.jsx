import React from "react";
import { Map } from "immutable";
import PropTypes from "prop-types";

import { media } from "../../../constants/config";
import Card from "../../Card";

const Details = ({ user, position, company, location, links }) => (
  <Card className="profile-top bg-primary opacity-8 p-2">
    <img className="round-img my-1" src={user.get("avatar")} alt="" />
    <h1 className="large">{user.get("name")}</h1>
    <p className="lead">
      {position} at {company}
    </p>
    <p>{location}</p>
    <div className="icons my-1">
      {links.entrySeq().map((link, linkIndex) => (
        <a key={linkIndex} href={link[1]} target="blank">
          {media.map((item, itemIndex) => {
            if (item.get(link[0]) !== undefined) {
              return (
                <i
                  key={itemIndex}
                  className={`fab ${item.get(link[0])} fa-2x`}
                ></i>
              );
            }
          })}
        </a>
      ))}
    </div>
  </Card>
);

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
