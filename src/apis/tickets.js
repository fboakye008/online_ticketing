
import utils from "./utils";
async function fetchTickets(bookingId) {
    const fetchAPI = async () => {

        const options = {
            url: "v_bus_tickets/" ,
            method: "GET"
        }
        if(bookingId){
            options.url = options.url + "findByBookingId/" + bookingId
        }else{
            options.url = options.url + "find"
        }
        return await utils.makeAPIRequest(options)
    };
    return fetchAPI();
}
export {fetchTickets};
