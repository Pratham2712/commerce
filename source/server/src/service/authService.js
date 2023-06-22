import userModel from "../Models/userModel.js";

export const checkUserService = async (data) => {
  const res = await userModel.find({ username: data });

  return res;
};

export const loginService = async (data) => {
  const res = await userModel.create(data);
  return res;
};
