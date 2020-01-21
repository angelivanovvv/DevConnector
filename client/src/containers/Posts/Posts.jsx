import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { List, Map } from "immutable";
import PropTypes from "prop-types";

import {
  getPosts,
  getIsLoading
} from "../../reduxSources/selectors/postSelectors";
import { getUser } from "../../reduxSources/selectors/authSelectors";

import * as routeActions from "../../reduxSources/actions/routesActions";
import * as postActions from "../../reduxSources/actions/postActions";

import { ROUTES_ACTIONS } from "./../../constants/clientRoutes";

import Spinner from "../../components/Spinner";
import Card from "../../components/Card";
import SinglePost from "../../components/SinglePost";
import TextArea from "../../components/FormElements/TextArea";
import Button from "../../components/Button";

const mapStateToProps = state => ({
  user: getUser(state),
  posts: getPosts(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(postActions, dispatch),
  routeActions: bindActionCreators(routeActions, dispatch)
});

class Posts extends Component {
  static propTypes = {
    postActions: PropTypes.objectOf(PropTypes.func).isRequired,
    routeActions: PropTypes.objectOf(PropTypes.func).isRequired,
    user: PropTypes.instanceOf(Map),
    posts: PropTypes.instanceOf(List),
    isLoading: PropTypes.bool
  };
  static defaultProps = {
    user: Map(),
    posts: List(),
    isLoading: true
  };

  constructor(props) {
    super(props);
    this.state = {
      post: ""
    };
  }

  componentDidMount() {
    const {
      postActions: { getPosts }
    } = this.props;
    getPosts();
  }

  onChange = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  likePost = id => {
    const {
      postActions: { addLike }
    } = this.props;
    addLike(id);
  };

  unlikePost = id => {
    const {
      postActions: { removeLike }
    } = this.props;
    removeLike(id);
  };

  createPost = (event, formData) => {
    event.preventDefault();
    const {
      postActions: { createPost }
    } = this.props;
    this.setState({
      ...this.state,
      post: ""
    });
    createPost(formData);
  };

  deletePost = id => {
    const {
      postActions: { deletePost }
    } = this.props;
    deletePost(id);
  };

  discussionPost = id => {
    const {
      routeActions: { changeLocation }
    } = this.props;
    changeLocation(ROUTES_ACTIONS.toDiscussion(id));
  };

  render() {
    const { user, posts, isLoading } = this.props;
    const { post } = this.state;
    return (
      <div className="page-wrapper">
        {isLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary text-uppercase">Posts</h1>
            <p className="lead">
              <i className="fas fa-user"></i>{" "}
              <span className="small">Welcome to the community!</span>
            </p>
            <Card>
              <form className="form clearfix my-1">
                <TextArea
                  placeholder="Create your post..."
                  name="post"
                  value={post}
                  onChange={this.onChange}
                />
                <Button
                  type="button"
                  className="btn btn-primary btn-to-right my-1"
                  onClick={event => this.createPost(event, post)}
                >
                  Submit
                </Button>
              </form>
            </Card>
            {posts.isEmpty() ? (
              <p className="small text-center my-2-top empty-message">
                No posts.
              </p>
            ) : (
              posts.map((post, index) => (
                <SinglePost
                  key={index}
                  post={post}
                  user={user}
                  isLoading={isLoading}
                  onLike={this.likePost}
                  onUnLike={this.unlikePost}
                  onDelete={this.deletePost}
                  onDiscussion={this.discussionPost}
                />
              ))
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
