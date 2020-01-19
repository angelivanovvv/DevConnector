import React from "react";
import { Map } from "immutable";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { ROUTES } from "../../constants/clientRoutes";

import Button from "../Button";
import Card from "../Card";

const SinglePost = ({
  post,
  user,
  isLoading,
  onLike,
  onUnLike,
  onDelete,
  onDiscussion
}) => {
  return (
    <Card className="post bg-white p-1 my-1">
      <div className="post-details">
        <Link to={ROUTES.PROFILE(post.get("user"))}>
          <img className="round-img" src={post.get("avatar")} />
          <h4>{post.get("name")}</h4>
        </Link>
      </div>
      <div className="post-description">
        <p className="my-1">{post.get("text")}</p>
        <p className="post-date">
          Posted on {<Moment format="YYYY/MM/DD">{post.get("date")}</Moment>}
        </p>
        <div className="button-group">
          <div className="group">
            <Button
              type="button"
              className="btn btn-light btn-right"
              onClick={() => onLike(post.get("_id"))}
            >
              <i className="fas fa-thumbs-up"></i>
              <span className="text-left">
                {!post.get("likes").isEmpty() && post.get("likes").size}
              </span>
            </Button>
            <Button
              type="button"
              className="btn btn-light"
              onClick={() => onUnLike(post.get("_id"))}
            >
              <i className="fas fa-thumbs-down"></i>
            </Button>
          </div>
          <div className="group">
            <Button
              type="button"
              className="btn btn-primary btn-right"
              onClick={() => onDiscussion(post.get("_id"))}
            >
              Discussion
              {!post.get("comments").isEmpty() && (
                <span className="comment-count text-left">
                  {post.get("comments").size}
                </span>
              )}
            </Button>
            {!isLoading && !!user && user.get("_id") === post.get("user") ? (
              <Button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(post.get("_id"))}
              >
                <i className="fas fa-times"></i>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
};

SinglePost.propTypes = {
  post: PropTypes.instanceOf(Map).isRequired,
  user: PropTypes.instanceOf(Map),
  isLoading: PropTypes.bool,
  onLike: PropTypes.func,
  onUnLike: PropTypes.func,
  onDiscussion: PropTypes.func
};

SinglePost.defaultProps = {
  user: Map(),
  isLoading: true,
  onLike: () => {},
  onUnLike: () => {},
  onDiscussion: () => {}
};

export default SinglePost;
