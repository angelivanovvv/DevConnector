import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const Post = ({ link, image, name, post }) => (
  <Fragment>
    <div className="image-wrapper">
      <Link to={link}>
        <img className="round-img" src={image} alt="user image" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div className="post-wrapper post-description">
      <p className="description my-1 text-center-mobile">{post}</p>
    </div>
  </Fragment>
);

Post.propTypes = {
  link: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  post: PropTypes.string
};

Post.defaultProps = {
  link: "",
  image: "",
  name: "",
  post: ""
};

export default Post;
