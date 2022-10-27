import {fetchTickets, fetchBusStops} from "./tickets";
import _ from "underscore";
import moment from "moment";
import {decode} from "@mapbox/polyline";
import utils from "./utils";

/**
 *
 * @returns {Promise<null>}
 */
const findUpComingTripTicket = async function () {
    const tickets = await fetchTickets();
    if (tickets) {
        let upcomingTrip = null;
        let futureTickets = _.filter(tickets, function (ticket) {
            const t = moment(ticket.departure_time);
            if (!upcomingTrip) {
                upcomingTrip = t;
            }
            if (t.isBefore(upcomingTrip)) {
                upcomingTrip = t;
            }
            return !t.isBefore(moment(), "hour");
        });
        if (futureTickets && futureTickets.length > 0) {
            return upcomingTrip;
        }
    }
    return null;
}
const findMapRoute = async function () {
    try {
        const ticket = await findUpComingTripTicket();
        if (!ticket) {
            return null;
        }
        const ticket_routes = await fetchBusStops(ticket.route_id);
        if (ticket_routes && ticket_routes.length > 0) {
            const origin = _.findWhere(ticket_routes, {seq_order: 1})
            const originLoc = {latitude: origin.gps_location.lat, longitude: origin.gps_location.lng};
            const destination = _.findWhere(ticket_routes, {route_name: ticket.route});
            const destinationLoc = {latitude: destination.gps_location.lat, longitude: destination.gps_location.lng}
            const departureTime = ticket.departure_time;
            const resp = await utils.makeMapAPIRequest(originLoc, destinationLoc, departureTime);
            const encodedPolyline = resp.routes[0].polyline.encodedPolyline;
            const points = decode(encodedPolyline, 5);
            const coordinates = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                };
            });
            return {
                origin: originLoc,
                destination: destinationLoc,
                distance: resp.routes[0].distanceMeters,
                duration: resp.routes[0].duration,
                coordinates: coordinates
            }
        }
    }catch(err){
        console.log(err);
    }
    return null;
}
export {findMapRoute};
