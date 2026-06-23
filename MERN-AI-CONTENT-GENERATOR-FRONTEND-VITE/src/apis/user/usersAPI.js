import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://gen-ai-backend.onrender.com";

//=======Registration=====

export const registerAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/users/register`,
    {
      email: userData?.email,
      password: userData?.password,
      username: userData?.username,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======Login=====

export const loginAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/users/login`,
    {
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======Check auth=====

export const checkUserAuthStatusAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/users/auth/check`,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======Logout =====

export const logoutAPI = async () => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/users/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======Logout =====

export const getUserProfileAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/users/profile`,

    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//=======Admin Panel APIs =====
export const getAllUsersAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/admin/users`,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

export const toggleAdminAPI = async (userId) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/admin/toggle-admin`,
    { userId },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

export const deleteUserAPI = async (userId) => {
  const response = await axios.delete(
    `${BASE_URL}/api/v1/admin/user/${userId}`,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
