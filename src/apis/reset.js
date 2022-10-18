import React from "react";
import utils from "./utils";

async function RequestNewPassword(email) {

    const fetchAPI = async () => {

        const options = {
            no_key: true,
            url: "recovers",
            method: "POST",
            body: {email: email}
        };
        return await utils.makeAPIRequest(options);
    };
    return fetchAPI();
}
async function ResetNewPassword(userInfo) {
    const fetchAPI = async () => {
        const options = {
            url: "recovers/resetpassword",
            method: "POST",
            body: {email: userInfo.email, otp: userInfo.otp, password: userInfo.password},
            no_key: true
        };
        return await utils.makeAPIRequest(options);
    };
    return fetchAPI();
}
async function VerifyOTP(email, otp) {
    const fetchAPI = async () => {
        const options = {
            url: "recovers/verifyemail",
            method: "POST",
            body: {email: email, otp: otp},
            no_key: true
        }
        return await utils.makeAPIRequest(options)
    };
    return fetchAPI();
}

export {RequestNewPassword,VerifyOTP,ResetNewPassword};

