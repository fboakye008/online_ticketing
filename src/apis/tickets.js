
import utils from "./utils";
async function fetchTickets(bookingId) {
    const fetchAPI = async () => {

        const options = {
            url: "v_bus_tickets" ,
            method: "GET"
        }
        if(bookingId){
            options.url = options.url + "/findByBookingId/" + bookingId
        }
        return await utils.makeAPIRequest(options)
    };
    return fetchAPI();
}
async function fetchBusStops(routeId) {
    const fetchAPI = async () => {
        const options = {
            url: "v_bus_stop_2_routes/findByRouteId/" + routeId ,
            method: "GET"
        }
        return await utils.makeAPIRequest(options)
    };
    return fetchAPI();
}
export {fetchTickets,fetchBusStops};
