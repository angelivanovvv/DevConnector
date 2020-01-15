import { createSelector } from "reselect";

export const post = state => state.get("post");

export const getPosts = createSelector(post, post => post.get("posts"));

export const getIsLoading = createSelector(post, post => post.get("loading"));
