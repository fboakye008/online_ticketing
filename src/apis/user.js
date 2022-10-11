import { API_URL } from "@env";
import { generateToken } from "../helpers/tokenGenerator";
import React, { useEffect, useState } from "react";

function CreateUser(userInfo) {
  const user = {
    full_name: userInfo?.fullName,
    contact_number: userInfo?.phone,
    email: userInfo?.email,
    username:
      userInfo?.fullName.split(" ")[0] +
      Math.floor(1000 + Math.random() * 9000),
    password: userInfo?.password,
    account_status: 1,
    api_key: generateToken(),
  };
  const fetchAPI = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
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

export default CreateUser;
