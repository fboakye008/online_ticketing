import utils from "./utils";

async function CreatePayment(paymentInfo) {
    const payment = {
        bookingId: paymentInfo?.bookingId,
        payment_method: paymentInfo?.payment_method,
        amount_paid: paymentInfo?.amount_paid,
    };
    const fetchAPI = async () => {
        const options = {
            url : "payments",
            method : "POST",
            body: payment
        }
        return await utils.makeAPIRequest(options)
    };
    return fetchAPI();
}

export {CreatePayment};
