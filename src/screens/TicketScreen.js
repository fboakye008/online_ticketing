import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import { Colors } from '../contents';
import Receipt from '../components/CustomTicket/Receipt'
import {MaterialIcons} from "@expo/vector-icons";
import {fetchTickets} from "../apis/tickets";

const TicketScreen = ({navigation,route}) => {
    const [error, setError] = useState("");
    const [tickets, setTickets] = useState([]);
    const bookingId = route.params.bookingId;
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
              return <Receipt ticketInfo={ticket} key={ticket.ticket_id}></Receipt>
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