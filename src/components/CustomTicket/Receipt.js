import { View, Text , StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import { Colors } from '../contents';

const TicketContainer = () => {
  return (
    <SafeAreaView style={styles.container}>
    
    <ScrollView>
    <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
      </TouchableOpacity>
        <View style = {styles.T_container}>
        <Text style={styles.title}>VIP Bus Ticket</Text>
      <Text style={styles.text}>Route:</Text>
      <Text style={styles.text}>Departure:</Text>
      <Text style={styles.text}>Bus Stop:</Text>
      <Text style={styles.text}>Fare:</Text>
      <Text style={styles.text}>Bus no:</Text>
      <Text style={styles.text}>Serial no:</Text>
      <Text style={styles.text}>Barcode:</Text>
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
    T_container:{
        width: '90%',
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