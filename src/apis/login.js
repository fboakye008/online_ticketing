import { API_URL } from "@env";
import React, { useEffect, useState } from "react";

function LoginUser(userInfo) {
  const user = {
    contact_number: userInfo?.phone,
    password: userInfo?.password,
  };
  const fetchAPI = async () => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return fetchAPI();
}

export default LoginUser;
