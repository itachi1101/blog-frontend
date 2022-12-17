import axios from 'axios'
import { getApiUrl } from './rootFile'


export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" })
  try {
    const res = await axios.post(getApiUrl("login"), userCredentials)
    dispatch({ type: "LOGIN_SUCCESS", payload: res })
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error })
  }

}

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(getApiUrl("login"), {
      email: email,
      password: password,
    });
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err.response);
  }
};

export const getUserById = async (id) => {
  try {
    const { data } = await axios.get(getApiUrl(`user/${id}/`))
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error.message)
  }
}
export const createPost = async (config, d) => {
  try {
    const { data } = await axios.post(getApiUrl("post/create"), d, config)
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error.message)
  }
}



export const getPostById = async (id) => {
  try {
    const { data } = await axios.get(getApiUrl(`post/${id}`))

    return Promise.resolve(data)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

export const updatePostById = async (config, data, id) => {
  try {
    await axios.put(getApiUrl(`post/${id}`), data, config)
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error.message)
  }
}


export const deletePostById = async (id, config) => {
  try {
    await axios.delete(getApiUrl(`post/${id}`), config)
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getAllPosts = async (pageNumber) => {
  try {
    const { data } = await axios.get(getApiUrl(`post/allposts?page=${pageNumber}`))
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getPostByUser = async (config) => {
  try {
    const { data } = await axios.get(getApiUrl("post/myposts/"), config)
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getRecentPosts = async () => {
  try {
    const { data } = await axios.get(getApiUrl("post/recent"))
    return Promise.resolve(data)

  } catch (error) {
    return Promise.reject(error.message)

  }
}
export const getFreePostById = async (id) => {
  try {
    const {data}  = await axios.get(getApiUrl(`post/public/${id}`))
    return Promise.resolve(data)

  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const createActivity = async (data) => {
  try {
    await axios.post(getApiUrl("activity/create"), data)
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const getActivity = async () => {
  try {
    const { data } = await axios.get(getApiUrl("activity/trending"))
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error.message)
  }
}


export const signupUser = async (data) => {
  try {
    await axios.post(getApiUrl("signup/"), data)
  } catch (error) {
    return Promise.reject(error.message)
  }
}