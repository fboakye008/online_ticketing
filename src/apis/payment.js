import utils from "./utils";

async function CreatePayment(paymentInfo,num_passengers) {
    const fetchAPI = async (payment) => {
        const options = {
            url : "bookings/" + payment.bookingId + "/payment",
            method : "POST",
            body: payment
        }
        return await utils.makeAPIRequest(options)
    };
    const promises = [];
    for(let index=0; index < num_passengers; index++){
        const payment = {
            bookingId: paymentInfo.bookingId,
            payment_method: paymentInfo.payment_method,
            amount_paid: paymentInfo.amount_paid,
        };
        promises.push(fetchAPI(payment));
    }
    return await Promise.all(promises);
}
async function CreateTickets(payments){
    const promises = [];


    const fetchAPI = async (ticket) => {
        const options = {
            url : "bookings/" + ticket.bookingId + "/tickets",
            method : "POST",
            body: ticket
        }
        return await utils.makeAPIRequest(options)
    };

    for(let payment of payments){
        const ticket ={
            bookingId: payment.bookingId
        };
        promises.push(fetchAPI(ticket));
    }
    return await Promise.all(promises);
}
export {CreatePayment,CreateTickets};
