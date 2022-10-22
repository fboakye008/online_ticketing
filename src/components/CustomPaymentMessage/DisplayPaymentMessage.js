import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {Colors} from '../../contents';
import moment from "moment";


const DisplayPaymentMessage = ({paymentInfo}) => {
    const departureTime = moment(paymentInfo.departureTimeObj.departure_time).format("hh:mm A")
    const departureDate = moment(paymentInfo.departureTimeObj.departure_time).format("dddd Do MMM YYYY")
    const totalAmount = paymentInfo.amount + " GHC"
    return (
        <TouchableOpacity>
            <View style={styles.T_container}>
                <Text style={styles.text}>Route : {paymentInfo.departureTimeObj.route}</Text>
                <Text style={styles.text}>Origin : {paymentInfo.departureTimeObj.bus_stop}</Text>
                <Text style={styles.text}>Departure Date : {departureDate}</Text>
                <Text style={styles.text}>Departure Time : {departureTime}</Text>
                <Text style={styles.text}>Passengers : {paymentInfo.numPassengers}</Text>
                <Text style={styles.text}>Total Amount : {totalAmount}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    T_container: {
        width: '100%',
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 20,
        padding: 20,
        paddingTop: 5,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        paddingLeft: 10,
    },
});
export default DisplayPaymentMessage;