import utils from "./utils";

async function CreatePayment(paymentInfo) {
    const fetchAPI = async (payment) => {
        const options = {
            url: "bookings/" + payment.bookingId + "/payment",
            method: "POST",
            body: payment
        }
        return await utils.makeAPIRequest(options)
    };
    const payment = {
        bookingId: paymentInfo.bookingId,
        payment_method: paymentInfo.payment_method,
        amount_paid: paymentInfo.amount_paid,
    };
    return await fetchAPI(payment);
}

async function CreateTickets(payment,numPassengers) {
    const promises = [];

    const fetchAPI = async (ticket) => {
        const options = {
            url: "bookings/" + ticket.bookingId + "/tickets",
            method: "POST",
            body: ticket
        }
        return await utils.makeAPIRequest(options)
    };
    for(let index=0; index < numPassengers; index++){
        const ticket = {
            bookingId: payment.bookingId
        };
        promises.push(fetchAPI(ticket));
    }
    return await Promise.all(promises);
}

export {CreatePayment, CreateTickets};
