import utils from './utils'

/**
 *
 * @returns {Promise<any|undefined>}
 * @constructor
 */
function RequestRoutes() {
    const fetchRoutes = async () => {
        const options = {
            url : "bookings",
            method : "GET"
        }
        return await utils.makeAPIRequest(options)
    };
    return fetchRoutes();
}

function CreateBooking(bookingInfo) {
    const booking = {
        bus_stopId: bookingInfo?.bus_stopId,
        bus_scheduleId: bookingInfo?.bus_scheduleId,
        number_of_seats: bookingInfo?.number_of_seats,
        status: 1,
    };
    const fetchAPI = async () => {
        const options = {
            url : "bookings",
            method : "POST",
            body: booking
        }
        return await utils.makeAPIRequest(options)
    };

    return fetchAPI();
}

export {CreateBooking};
