import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from '../../contents';
import QRCode from "react-native-qrcode-svg";



const TicketContainer = ({ticketInfo}) => {
  return (
        <View style = {styles.T_container}>
            <Text style={styles.title}>VIP Bus Ticket</Text>
            <Text style={styles.text}>Route : {ticketInfo.route}</Text>
            <Text style={styles.text}>Bus Stop : {ticketInfo.bus_stop}</Text>
            <Text style={styles.text}>Departure Time : {ticketInfo.departure_time}</Text>
            <Text style={styles.text}>Fare : {ticketInfo.fare}</Text>
            <Text style={styles.text}>Bus no : {ticketInfo.bus_no}</Text>
            <Text style={styles.text}>Serial no: {ticketInfo.serial_no}</Text>
            <QRCode
                value={ticketInfo.serial_no}
                size={20}
                bgColor='#000000'
                fgColor='#FFFFFF'/>
    </View>

  )
}


const styles = StyleSheet.create({
    T_container:{
        width: '40%',
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 20,
        padding: 20,
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