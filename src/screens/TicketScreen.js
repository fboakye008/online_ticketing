import {View, Text, StyleSheet, ScrollView, SafeAreaView, Image, Pressable,TouchableOpacity, StatusBar} from 'react-native'
import React, {useEffect, useState} from 'react'
import { Colors } from '../contents';
import Receipt from '../components/CustomTicket/Receipt'
import {MaterialIcons} from "@expo/vector-icons";
import imagePath from '../constants/imagePath';
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
     <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
        {error ? (
            <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                {error}
            </Text>
        ) : null}


        <View style={styles.header}>
      <Pressable  
              onPress={() => navigation.navigate('Help')}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
          </View>
       </Pressable>
            <View><Text style={styles.Headertopic}>App Info</Text></View>
            <View>
               <Image source={imagePath.projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
</View>

        {/* <View style={styles.header}>
         <Pressable  
                    onPress={() => navigation.replace('Home')}>
              <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                <MaterialIcons name="close" size={25} color="#000" />     
              </View>
        </Pressable>
            <View>
            <Text style={styles.Headertopic}>Ticket</Text>
            </View>
            <View>
            <Image source={imagePath.projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
            </View>
       */}
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
        justifyContent: "space-between",
        width: "100%",
        borderBottomWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        marginLeft: 1,
        paddingTop: 25,
        paddingHorizontal: 12,
        backgroundColor: Colors.DEFAULT_WHITE,
      },
      headerTopic: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "bold",
    },
      Image: {
        height: 30,
        width: 30,
        marginRight: 20,
    },

});
export default TicketScreen;
