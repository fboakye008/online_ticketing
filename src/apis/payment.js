import {API_URL} from "@env";
//import AsyncStorage from '@react-native-async-storage/async-storage';


async function CreatePayment(paymentInfo) {
    const payment = {
        bookingId: paymentinfo?.bookingId,
        payment_method: paymentinfo?.payment_method,
        amount_paid: paymentInfo?.amount_paid,
    };
    const fetchAPI = async () => {
        try {
            const response = await fetch(`${API_URL}/payments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payment),
            });
            let data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    return fetchAPI();
}

export {CreatePayment};
