import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Map } from "immutable";

import Moment from "react-moment";
import PropTypes from "prop-types";

import Button from "../../Button";

const Comment = ({
  user,
  loggedUser,
  id,
  postId,
  link,
  image,
  name,
  comment,
  date,
  deleteComment
}) => (
  <Fragment>
    <div className="post box-shadow p-1 my-1">
      <div className="image-wrapper">
        <Link to={link}>
          <img className="round-img" src={image} alt="user avatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div className="comment-wrapper">
        <p className="my-1">{comment}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {loggedUser !== null && loggedUser.get("_id") === user ? (
          <Button
            className="btn btn-danger btn-to-right"
            onClick={() => deleteComment(postId, id)}
          >
            Delete comment
          </Button>
        ) : null}
      </div>
    </div>
  </Fragment>
);

Comment.propTypes = {
  id: PropTypes.string,
  postId: PropTypes.string,
  user: PropTypes.string,
  loggedUser: PropTypes.instanceOf(Map),
  link: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  comment: PropTypes.string,
  date: PropTypes.string,
  deleteComment: PropTypes.func
};

Comment.defaultProps = {
  id: "",
  postId: "",
  user: "",
  loggedUser: Map(),
  link: "",
  image: "",
  name: "",
  comment: "",
  date: "",
  deleteComment: () => {}
};

export default Comment;
