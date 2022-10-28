import React from "react";
import utils from './utils'

function CreateUser(userInfo) {
  const user = {
    full_name: userInfo?.fullName,
    contact_number: userInfo?.phone,
    email: userInfo?.email,
    username:
      userInfo?.fullName.split(" ")[0] +
      Math.floor(1000 + Math.random() * 9000),
    password: userInfo?.password
  };
  const fetchAPI = async () => {
    const options = {
      url : "users",
      method : "POST",
      no_key : true,
      body: user
    }
    return await utils.makeAPIRequest(options);
  };
  return fetchAPI();
}

export default CreateUser;
