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
import * as postActions from "../../reduxSources/actions/postActions";

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
  postActions: bindActionCreators(postActions, dispatch)
});

class Posts extends Component {
  static propTypes = {
    postActions: PropTypes.objectOf(PropTypes.func).isRequired,
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
              <form className="form my-1">
                <TextArea
                  placeholder="Create your post..."
                  name="post"
                  value={post}
                  onChange={this.onChange}
                />
                <Button
                  type="button"
                  className="btn btn-primary my-1"
                  onClick={() => console.log("submited")}
                >
                  Submit
                </Button>
              </form>
            </Card>
            {posts.isEmpty() ? (
              <p className="small">No posts.</p>
            ) : (
              posts.map((post, index) => (
                <SinglePost
                  key={index}
                  post={post}
                  user={user}
                  isLoading={isLoading}
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
