import fastApiInterceptor from "../lib/fast-api-interceptors";

//------------------ Community APIs ------------------//

/**
 * Create a new community.
 * @param {object} communityData - The data for the new community.
 * @returns {Promise<object>} The created community.
 */
export const createCommunity = async (communityData) => {
  try {
    const response = await fastApiInterceptor.post(
      "/communities",
      communityData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating community:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Get all communities.
 * @returns {Promise<object[]>} A list of communities.
 */
export const getCommunities = async () => {
  try {
    const response = await fastApiInterceptor.get("/communities");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching communities:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

//------------------ Post APIs ------------------//

/**
 * Create a new post in a community.
 * @param {string} communityId - The ID of the community.
 * @param {object} postData - The data for the new post.
 * @returns {Promise<object>} The created post.
 */
export const createPost = async (communityId, postData) => {
  try {
    const response = await fastApiInterceptor.post(
      `/communities/${communityId}/posts`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating post:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Get posts from a community.
 * @param {string} communityId - The ID of the community.
 * @param {object} params - The query parameters for filtering posts.
 * @returns {Promise<object[]>} A list of posts.
 */
export const getPosts = async (communityId, params) => {
  try {
    const response = await fastApiInterceptor.get(
      `/communities/${communityId}/posts`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching posts:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Get a post by its ID, including the comments tree.
 * @param {string} postId - The ID of the post.
 * @returns {Promise<object>} The post and its comments.
 */
export const getPostById = async (postId) => {
  try {
    const response = await fastApiInterceptor.get(
      `/posts/${postId}?tree=true&limit=50&skip=0`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching post ${postId}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Create a new comment on a post.
 * @param {string} postId - The ID of the post.
 * @param {object} commentData - The data for the new comment.
 * @returns {Promise<object>} The created comment.
 */
export const createComment = async (postId, commentData) => {
  try {
    const response = await fastApiInterceptor.post(
      `/posts/${postId}/comments`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error creating comment on post ${postId}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};
