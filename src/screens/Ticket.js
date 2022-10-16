import { View, Text , StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import { Colors } from '../contents';
import Receipt from '../components/CustomTicket/Receipt'

const Ticket = () => {
  return (
    <SafeAreaView style={styles.container}>
     <ScrollView>
      <View>
        <Receipt />
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