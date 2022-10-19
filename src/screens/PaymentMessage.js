import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '../contents';
import { MaterialIcons } from "@expo/vector-icons";


const PaymentMessage = ({ navigation, route }) => {
  const bookingId = route.params.bookingId;
  const amount = route.params.amount;
  const numPassengers = route.params.numPassengers
  return (
    <SafeAreaView style={styles.wrapper}>

      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Text style={styles.text1}> Note</Text>
          <Text style={styles.text}>If you do not receive prompt to make payment within 10 seconds, follow the instructions below:</Text>

          <Text style={styles.text}>Go to your momo account</Text>
          <Text style={styles.text}>Navigate to My Approvals</Text>
          <Text style={styles.text}>Select and approve transaction</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("TicketScreen", {
              bookingId: bookingId,
              amount: amount,
              numPassengers: numPassengers
            })}
        >
          <Text style={styles.btnText}>Close</Text>
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
  messageBox: {
    width: '90%',
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    paddingTop: 5,
  },
    btnText: {
      color: Colors.SECONDARY_WHITE,
      fontSize: 15,
      fontWeight: "bold",
      justifyContent: 'center',
      paddingLeft: 14

    },

  text: {
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
    backgroundColor: Colors.DEFAULT_GREEN,
    width: "22%",
    height: 40,
    borderRadius: 30,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
  text1: {

    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 100,
    paddingLeft: 135
  },

})
export default PaymentMessage;