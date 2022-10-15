import {API_URL} from "@env";
import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
function RequestRoutes() {
    const fetchRoutes = async () => {
        try {
            //retrieve api key from storage
            const api_key = "xxxxxxxxx1";
            //const y= await AsyncStorage.getItem("user")
            //const user = JSON.parse(y)
            const response = await fetch(`${API_URL}/v_bus_routes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    //"api_key" : user.api_key
                    "api_key" : api_key
                }
            });
            let data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    return fetchRoutes();
}

// function CreateBooking(bookingInfo) {
//     const booking = {
//         passengerId: bookingInfo?.passengerId,
//         bus_stopId: bookingInfo?.bus_stopId,
//         bus_scheduleId: bookingInfo?.bus_scheduleId,
//         number_of_seats: bookingInfo?.number_of_seats,
//         status: 1,
//     };
//     const fetchAPI = async () => {
//         try {
//             const response = await fetch(`${API_URL}/bookings`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(booking),
//             });
//             let data = await response.json();
//             return data;
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
//     return fetchAPI();
// }

export { RequestRoutes};
