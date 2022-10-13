import { API_URL } from "@env";
import React, { useEffect, useState } from "react";

function ResetUser(userInfo) {
  const user = {
    email: userInfo?.email,
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

export default ResetUser;
