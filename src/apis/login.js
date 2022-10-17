
import React from "react";
import utils from "./utils";

function LoginUser(userInfo) {
  const user = {
    contact_number: userInfo?.phone,
    password: userInfo?.password,
  };
  const fetchAPI = async () => {
    const options = {
      url : "users/login",
      method : "POST",
      no_key : "no_key",
      "body" : user
    }
    return await utils.makeAPIRequest(options);
  };

  return fetchAPI();
}

export default LoginUser;
