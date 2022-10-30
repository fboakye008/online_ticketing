import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from '../../contents';
import QRCode from "react-native-qrcode-svg";
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');



const TicketContainer = ({ticketInfo}) => {
  const departureTime = moment(ticketInfo.departure_time).format("hh:mm A")
    const departureDate = moment(ticketInfo.departure_time).format("dddd Do MMM YYYY")
  return (
        <View style = {styles.T_container}>
            <Text style={styles.title}>VIP Bus Ticket</Text>
            <Text style={styles.text}>Route : {ticketInfo.route}</Text>
            <Text style={styles.text}>Origin : {ticketInfo.bus_stop}</Text>
            <Text style={styles.text}>Departure Date : {departureDate}</Text>
            <Text style={styles.text}>Departure Time : {departureTime}</Text>
            <View style={styles.qrcode}><QRCode
                value={ticketInfo.serial_no}
                size={27}
                bgColor='#000000'
                fgColor='#FFFFFF'/>
                </View>
            <Text style={styles.text}>Fare : {ticketInfo.fare}</Text>
            <Text style={styles.t_s}>Bus no : {ticketInfo.bus_no}  Seat no : {ticketInfo.seat_no}</Text>
            <Text style={styles.text}>Serial no: {ticketInfo.serial_no}</Text>

    </View>

  )
}


const styles = StyleSheet.create({
  qrcode:{
    marginLeft: "80%"
  },
    T_container:{
        width: '100%',
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 20,
        padding: 20,
        paddingTop: 5,
       marginTop: 10,
        marginBottom: 10
    },
    t_s:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      colors: Colors.DEFAULT_BLACK,
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
      paddingHorizontal: 10,

    },
    text: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        paddingLeft: 10,
      },
      title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 10,
      },
});
export default TicketContainer;
