import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from '../contents';
import Receipt from '../components/CustomTicket/Receipt'
import {MaterialIcons} from "@expo/vector-icons";

const Ticket = () => {

    const tickets = [
        {
            "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
            "bus_bo": "AZ 1234",
            "departure_time": "2022-10-12T12:28:13.000Z",
            "fare": 45.35,
            "serial_no": "SN-123456",
            "route": "KUMASI-ACCRA",
            "route_id": 1,
            "barcode" : "some_barcode_1"
        },
        {
            "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
            "bus_bo": "AZ 1234",
            "departure_time": "2022-10-12T12:28:13.000Z",
            "fare": 45.35,
            "serial_no": "SN-123455",
            "route": "KUMASI-ACCRA",
            "route_id": 2,
            "barcode" : "some_barcode_2"
        }
        ,
        {
            "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
            "bus_bo": "AZ 1234",
            "departure_time": "2022-10-12T12:28:13.000Z",
            "fare": 45.35,
            "serial_no": "SN-123454",
            "route": "KUMASI-ACCRA",
            "route_id": 3,
            "barcode" : "some_barcode_3"
        }
    ];

    useEffect(() => {
        //fetch all of my trips sort by most recent and grab the first three
        // const fare = _.findWhere(allRoutes, {route_id: selectedRouteId});
        // if (fare && fare.fare) {
        //   setFare(fare.fare);
        //   setAmount(fare.fare);
        // }
        // const busStops = extractBusStops(allRoutes, selectedRouteId);
        // setBusStops(busStops);
        // const times = extractTimes(allRoutes, selectedRouteId);
        // setTimes(times);
    }, []);

  return (
    <SafeAreaView style={styles.container}>
     <ScrollView>
         <TouchableOpacity
             style={styles.arrowContainer}
             onPress={() => navigation.goBack()}
         >
             <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>
         </TouchableOpacity>
      <View>
          {tickets.map(ticket => {
              return <Receipt title={ticket} key={ticket.route_id}></Receipt>
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
});
export default Ticket;