import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import { Colors } from '../contents';
import Receipt from '../components/CustomTicket/Receipt'
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {fetchTickets} from "../apis/tickets";
import moment from "moment";

const TicketScreen = ({navigation,route}) => {
    const [error, setError] = useState("");
    const [tickets, setTickets] = useState([]);
    const bookingId = route.params.bookingId;
    // const tickets = [
    //     {
    //         "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
    //         "bus_no": "AZ 1234",
    //         "departure_time": "2022-10-12T12:28:13.000Z",
    //         "fare": 45.35,
    //         "serial_no": "SN-123456",
    //         "route": "KUMASI-ACCRA",
    //         "route_id": 1,
    //         "barcode" : "some_barcode_1"
    //     },
    //     {
    //         "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
    //         "bus_no": "AZ 1234",
    //         "departure_time": "2022-10-12T12:28:13.000Z",
    //         "fare": 45.35,
    //         "serial_no": "SN-123455",
    //         "route": "KUMASI-ACCRA",
    //         "route_id": 2,
    //         "barcode" : "some_barcode_2"
    //     }
    //     ,
    //     {
    //         "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
    //         "bus_no": "AZ 1234",
    //         "departure_time": "2022-10-12T12:28:13.000Z",
    //         "fare": 45.35,
    //         "serial_no": "SN-123454",
    //         "route": "KUMASI-ACCRA",
    //         "route_id": 3,
    //         "barcode" : "some_barcode_3"
    //     }
    // ];

    useEffect(() => {
        async function populateData() {
            const userTickets = await fetchTickets(bookingId);
            setTickets(userTickets);
        }
        populateData().catch();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
        {error ? (
            <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                {error}
            </Text>
        ) : null}
     <ScrollView>
         <TouchableOpacity
             style={styles.arrowContainer}
             onPress={() => navigation.goBack()}
         >
             <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>
         </TouchableOpacity>
              <Text style={styles.title}>Ticket</Text>
      <View>
          {tickets.map(ticket => {
              return <Receipt ticketInfo={ticket} key={ticket.route_id}></Receipt>
          })}

      </View>
     </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.ticketbg,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: 5,
      },
});
export default TicketScreen;