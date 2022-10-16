import React from 'react';
import { View, Text,StyleSheet,SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '../contents';
import {MaterialIcons} from "@expo/vector-icons";


const PaymentMessage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
    <TouchableOpacity
                style={styles.arrowContainer}
                onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>
                <Text style={{ justifyContent: "space-between", alignItems: "center", fontSize:10 , fontWeight: 'bold'}}> Message</Text>
            </TouchableOpacity>

     <View style={styles.container}>
      <View style={styles.messageBox}>
        <Text style={styles.text}>We are waiting for you .Please follow the instructions below. Only leave this page to authorise the payment in another app or window.
This may take up to 2 minutes.
You should receive a prompt on your mobile number to enter your PIN to authorize the payment.
If you do not receive the prompt within 10 seconds follow the instructions below:</Text>

<Text style={styles.text}>Dial *170# to see the main MTN USSD menu. If the prompt appears instead, cancel it and dial *170# again</Text>
<Text>Choose 6) My Wallet</Text>
<Text>Choose 3) My Approvals</Text>

<Text style={styles.text}>Enter your PIN to proceed</Text>
<Text style={styles.text}>Look for the transaction and follow the prompts to authorise it.</Text>
<Text style={styles.text}>Make sure the amount is correct You have 5 mins to authorise the transaction so if anything goes wrong, simply dial and try again</Text>

      </View>
         <TouchableOpacity
             style={styles.btn}
             onPress={() => navigation.navigate("TicketScreen")}
         >
             <Text style={styles.btnText}>Submit</Text>
         </TouchableOpacity>
    </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
      },
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      messageBox:{
        width: '90%',
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 20,
        padding: 20,
      },
      text:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500',
        color: Colors.SECONDARY_BLACK,
        marginBottom: 20,
      },
      btn: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: Colors.SECONDARY_WHITE,
        width: "100%",
        height: 50,
        borderRadius: 50,
        shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.121,
        shadowRadius: 9.11,
        elevation: 5,
    },
})
export default PaymentMessage;