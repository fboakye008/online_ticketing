import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Image,
    SafeAreaView,
    ScrollView,
} from "react-native";
import {
    MaterialIcons,
  } from "@expo/vector-icons";
  import {Display} from './utils';
  import { Colors } from "../contents";
  import imagePath from '../constants/imagePath';

const FAQScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate('Help')}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
                 <Text style={styles.Headertopic}>FAQ</Text>
           <View>
               <Image source={imagePath.projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView>
        <View style={styles.messageBox}>
        <Text style={styles.title}> What are the requirements for creating an account?</Text>
                <Text style={styles.text}>
                Full name </Text>
                    <Text style={styles.text}>Telephone number</Text>
                    <Text style={styles.text}>Email</Text>
                    <Text style={styles.text}>Strong Password.</Text>
                    
                <Text style={styles.title}> Why do I need an account in order to purchase a ticket?</Text>
                <Text style={styles.text}>
                 To make the app more personalized for the users. To ensure Non-repudiations.
                </Text>
                <Text style={styles.title}>Do I need an account to view the available schedules?</Text>
                <Text style={styles.text}>
                    No, Customers do not need to create an account before viewing the available schedules.
                </Text>
                <Text style={styles.title}> What information should I look for on the schedule page?</Text>
                <Text style={styles.text}>
                    Buses available.
                    </Text>
                    <Text style={styles.text}>Their Route, and Fare</Text>
                    <Text style={styles.text}>Time of departure, and Available Seats</Text>
             

                <Text style={styles.title}> How do I purchase a ticket?</Text>
                <Text style={styles.text}>
                <Text></Text>
                    <Text style={styles.text}>
                    From the home page, click on Buy ticket
                        Select your route and click on Next
                            Select your bus stop, time and number of passengers
                                click on Next
                                    Select momo network and enter MoMo number
                                Click on Pay
                            Enter MoMo PIN and confirm payment.</Text>
                </Text>
                <Text style={styles.title}>Why do I need to choose an origin bus stop when purchasing a ticket ?</Text>
                <Text style={styles.text}>
                    The preferred bus stop is the point of pick-up location.
                </Text>
                <Text style={styles.title}>If my boarding location is not on the list what should I do?</Text>
                <Text style={styles.text}>
                    There are two options to go by: either to choose a location that is closest to you or 
                    you purchase the ticket physically at the Bus station.
                </Text>
                <Text style={styles.title}> What types of payment options are available for purchasing a ticket?</Text>
                <Text style={styles.text}>
                    Mobile Money.
                </Text>
                <Text style={styles.title}> How do I print a ticket?</Text>
                <Text style={styles.text}>
                    Select target ticket and click on print.
                </Text>
                <Text style={styles.title}>How do I track the bus that I just purchased a ticket for?</Text>
                <Text style={styles.text}>
                    After purchasing the ticket, live location of the Bus will be displayed on the home page.
                </Text>
                <Text style={styles.title}> If I am traveling with friends and family, can i use more than one ticket on my phone?</Text>
                <Text style={styles.text}>
                    Yes, you can use your account to purchase tickets for others. You will need to show all tickets on your phone to the
                    conductor.
                </Text>
                <Text style={styles.title}> Does the booked ticket expire?</Text>
                <Text style={styles.text}>
                Yes, Booked tickets have the same expiration dates as paper tickets. Tickets that are not used within their 
                validity period will appear as EXPIRED and will not be accepted for travel, nor will they be valid for refund.
                </Text>
                <Text style={styles.title}> Where can I see my current and expired tickets?</Text>
                <Text style={styles.text}>
                All of these tickets can be found in your Ticket Wallet.
                </Text>
                <Text style={styles.title}>How do conductors validate the ticket?</Text>
                <Text style={styles.text}>
                Conductors will validate a tickets by the use of scan, which they will use to scan the Qrcode on the ticket.
                (Please ensure that your device is sufficiently charged to avoid run off. If your battery may not last the duration of your trip, we recommend you to print out the ticket after purchasing.)
                </Text>
                <Text style={styles.title}>What if I am having technical problems with the mobile ticketing application?</Text>
                <Text style={styles.text}>
                If you encounter any technical problems or errors, please email us anytime at linonuniford@gmail.com or call 0245666208 Monday - Sunday: 6:30am - 10:00pm.
                </Text>
            </View>
        </ScrollView>
     </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
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
      marginTop: 25,
      paddingHorizontal: 12,
      backgroundColor: Colors.DEFAULT_WHITE,
    },
    Headertopic: {
      flex: 1,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: "bold",
  },
  messageBox: {
    width: '100%',
    backgroundColor: Colors.SECONDARY_BLACK,
    marginBottom: 2,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
},
text: {
    fontSize: 15,
    color: Colors.DEFAULT_WHITE,
    marginLeft:"3%",
    marginRight:"3%"
},
title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.DEFAULT_WHITE,
    marginBottom: 10,
    marginTop: 10,
    marginLeft:"3%",
    
},
    Image: {
  
      height: 30,
      width: 30,
      marginRight: 20,
  },
  });
export default FAQScreen;