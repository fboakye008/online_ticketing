import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import { Colors } from '../contents';
import Receipt from '../components/CustomTicket/Receipt'
import {MaterialIcons} from "@expo/vector-icons";
import {fetchTickets} from "../apis/tickets";
import { updateError } from '../utils';

const TicketScreen = ({navigation,route}) => {
    const [error, setError] = useState("");
    const [tickets, setTickets] = useState([]);
    const bookingId = route.params.bookingId;


    useEffect(() => {
        async function populateData() {
            try {
                const userTickets = await fetchTickets(bookingId);
                setTickets(userTickets);
            }catch(err){
                return updateError(err.toString(), setError);
            }
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
        <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.replace('Home')}>
          <MaterialIcons name="close" size={30} color="#000" />
          <View style={styles.titleContainer}>
               <Text style={styles.title}>Ticket</Text>
       
        </View>
        </TouchableOpacity>
        
              <ScrollView>
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
    header:{
        borderBottomColor: '#eee',
        borderBottomWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        paddingHorizontal: 12,
        backgroundColor: Colors.DEFAULT_WHITE,
      },
      titleContainer:{
        flex: 1,
      },
      title:{
        fontSize: 18,
        marginLeft: -38,
        fontWeight:'bold',
        textAlign: 'center',
      },
});
export default TicketScreen;