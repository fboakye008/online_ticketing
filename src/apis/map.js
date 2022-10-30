import {fetchTickets, fetchBusStops} from "./tickets";
import _ from "underscore";
import {decode} from "@mapbox/polyline";
import utils from "./utils";
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
/**
 *
 * @returns {Promise<null>}
 */
const findUpComingTripTicket = async function () {
    const tickets = await fetchTickets();
    if (tickets) {
        let upcomingTrip = tickets[0];
        let futureTickets = _.filter(tickets, function (ticket) {
            const t = moment(ticket.departure_time);
            if (!t.isBefore(moment(upcomingTrip.departure_time))) {
                upcomingTrip = ticket;
            }
            return !t.isBefore(moment(), "hour");
        });
        if (futureTickets && futureTickets.length > 0) {
            const t = moment();
            if (t.isBefore(moment(upcomingTrip.departure_time))) {
                return upcomingTrip;
            }
        }
    }
    return null;
}
const findTicketRoute = async function () {
    try {
        const ticket = await findUpComingTripTicket();
        if (!ticket) {
            return null;
        }
        const ticket_routes = await fetchBusStops(ticket.route_id);
        if (ticket_routes && ticket_routes.length > 0) {
            const maxSeq = _.max(_.pluck(ticket_routes,"seq_order"));

            const origin = _.findWhere(ticket_routes, {seq_order: 1});
            const lastStop = _.findWhere(ticket_routes, {seq_order: maxSeq});
            const lastStopLoc = {latitude: lastStop.gps_location.lat, longitude: lastStop.gps_location.lng};

            const originLoc = {latitude: origin.gps_location.lat, longitude: origin.gps_location.lng};
            const destination = _.findWhere(ticket_routes, {bus_stop: ticket.bus_stop});
            const destinationLoc = {latitude: destination.gps_location.lat, longitude: destination.gps_location.lng};
            const departureTime = ticket.departure_time;

            return {
                origin: originLoc,
                destination: destinationLoc,
                lastStop: lastStopLoc,
                departureTime: departureTime,
                originBusStop : origin.bus_stop,
                destinationBusStop: destination.bus_stop,
                lastStopBusStop: lastStop.bus_stop
            }
        }
    }catch(err){
        console.log(err);
    }
    return null;
}
const findMapRoute = async function () {
    try {
        const ticketInfo = await findTicketRoute();
        if (!ticketInfo) {
            return null;
        }

        if (Object.keys(ticketInfo).length > 0) {
            const resp = await utils.makeMapAPIRequest(ticketInfo.origin, ticketInfo.lastStop, ticketInfo.departureTime);
            const encodedPolyline = resp.routes[0].polyline.encodedPolyline;
            const points = decode(encodedPolyline, 5);
            const coordinates = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                };
            });
            return {
                origin: ticketInfo.origin,
                destination:  ticketInfo.destination,
                lastStop: ticketInfo.lastStop,
                distance: resp.routes[0].distanceMeters,
                duration: resp.routes[0].duration,
                originBusStop : ticketInfo.originBusStop,
                destinationBusStop: ticketInfo.destinationBusStop,
                lastStopBusStop: ticketInfo.lastStopBusStop,
                coordinates: coordinates
            }
        }
    }catch(err){
        console.log(err);
    }
    return null;
}
export {findMapRoute,findTicketRoute,findUpComingTripTicket};
