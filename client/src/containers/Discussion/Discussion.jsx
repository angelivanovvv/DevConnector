import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Map } from "immutable";
import PropTypes from "prop-types";

import {
  getPost,
  getIsLoading
} from "../../reduxSources/selectors/postSelectors";
import { getUser } from "../../reduxSources/selectors/authSelectors";

import * as postActions from "../../reduxSources/actions/postActions";
import * as routeActions from "../../reduxSources/actions/routesActions";

import { ROUTES, ROUTES_ACTIONS } from "./../../constants/clientRoutes";

import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import TextArea from "../../components/FormElements/TextArea";
import Post from "../../components/Discussion/Post";
import Comment from "../../components/Discussion/Comment";

const mapStateToProps = state => ({
  user: getUser(state),
  post: getPost(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(postActions, dispatch),
  routeActions: bindActionCreators(routeActions, dispatch)
});

class Discussion extends Component {
  static propTypes = {
    postActions: PropTypes.objectOf(PropTypes.func).isRequired,
    routeActions: PropTypes.objectOf(PropTypes.func).isRequired,
    user: PropTypes.instanceOf(Map),
    post: PropTypes.instanceOf(Map),
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    user: Map(),
    post: Map(),
    isLoading: true
  };

  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  componentDidMount() {
    const {
      match,
      postActions: { getPostById }
    } = this.props;
    getPostById(match.params.postId);
  }

  onChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  createComment = (event, id, formData) => {
    event.preventDefault();
    const {
      postActions: { createComment }
    } = this.props;
    createComment(id, formData);
    this.setState({
      ...this.state,
      comment: ""
    });
  };

  deleteComment = (postId, commentId) => {
    console.log("postId ", postId);
    console.log("commentId ", commentId);
    const {
      postActions: { deleteComment }
    } = this.props;
    deleteComment(postId, commentId);
  };

  goToPosts = () => {
    const {
      routeActions: { changeLocation }
    } = this.props;
    changeLocation(ROUTES_ACTIONS.toPosts());
  };

  render() {
    const { user, post, isLoading, match } = this.props;
    const { comment } = this.state;
    const postID = match.params.postId;
    if (user !== null) console.log(user.toJS());
    if (post !== null) console.log(post.toJS());
    return (
      <div className="page-wrapper">
        {isLoading || post === null ? (
          <Spinner />
        ) : (
          <Fragment>
            <Button className="btn" onClick={this.goToPosts}>
              Back To Posts
            </Button>
            <div className="post bg-white box-shadow p-1 my-1">
              <Post
                link={ROUTES.PROFILE(post.get("user"))}
                image={post.get("avatar")}
                name={post.get("name")}
                post={post.get("text")}
              />
            </div>
            <div className="post-form">
              <form className="form clearfix my-1">
                <TextArea
                  placeholder="Create your post..."
                  name="comment"
                  value={comment}
                  onChange={this.onChange}
                ></TextArea>
                <Button
                  type="button"
                  className="btn btn-primary btn-to-right my-1"
                  onClick={event => this.createComment(event, postID, comment)}
                >
                  Submit
                </Button>
              </form>
            </div>
            <div className="comments">
              {post.get("comments").isEmpty() ? (
                <p className="small text-center">No Comments</p>
              ) : (
                post
                  .get("comments")
                  .map((comment, index) => (
                    <Comment
                      id={comment.get("_id")}
                      postId={post.get("_id")}
                      key={index}
                      user={comment.get("user")}
                      loggedUser={user}
                      link={ROUTES.PROFILE(comment.get("user"))}
                      image={comment.get("avatar")}
                      name={comment.get("name")}
                      comment={comment.get("text")}
                      date={comment.get("date")}
                      deleteComment={this.deleteComment}
                    />
                  ))
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);
