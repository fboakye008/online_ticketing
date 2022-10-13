import { API_URL } from "@env";
import React, { useEffect, useState } from "react";


function CreateBooking(bookingInfo) {
  const booking = {
    passengerId: bookingInfo?.passengerId,
    bus_stopId: bookingInfo?.bus_stopId,
    bus_scheduleId: bookingInfo?.bus_scheduleId,
    number_of_seats:bookingInfo?.number_of_seats,
    status: 1,
  };
  const fetchAPI = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return fetchAPI();
}

export default CreateBooking;
