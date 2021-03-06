import axios from 'axios';
import {
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  POSTS_LOADED,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT_POST,
  DELETE_COMMENT,
} from './types';

import tokenConfig from './tokenConfig';
import { returnErrors } from './errorActions';
import { loadUser } from './authActions';

const getPosts = () => async (dispatch) => {
  dispatch({ type: POSTS_LOADING });
  try {
    const res = await axios.get('http://localhost:5000/api/posts');
    dispatch({ type: POSTS_LOADED, payload: res.data });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

const addPost = (post) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/posts',
      { ...post, username: getState().auth.user.username },
      tokenConfig(getState),
    );
    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(loadUser());
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

const deletePost = (postID) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/posts/${postID}`,
      tokenConfig(getState),
    );

    dispatch({ type: DELETE_POST, payload: res.data });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

const likePost = (postID) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/posts/${postID}/like`,
      {},
      tokenConfig(getState),
    );
    dispatch({ type: LIKE_POST, payload: res.data });
    dispatch(loadUser());
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

const unlikePost = (postID) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/posts/${postID}/unlike/`,
      tokenConfig(getState),
    );
    dispatch({ type: UNLIKE_POST, payload: res.data });
    dispatch(loadUser());
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

const commentPost = (postID, comment) => async (
  dispatch,
  getState,
) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/posts/${postID}/comment/${
        getState().auth.user.username
      }`,
      { comment },
      tokenConfig(getState),
    );
    dispatch({ type: COMMENT_POST, payload: res.data });
    dispatch(loadUser());
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

const deleteComment = (postID, commentID) => async (
  dispatch,
  getState,
) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/posts/${postID}/delComment/${commentID}`,
      tokenConfig(getState),
    );
    dispatch({ type: DELETE_COMMENT, payload: res.data });
    dispatch(loadUser());
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

export {
  getPosts,
  addPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteComment,
};
