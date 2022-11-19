import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    ScrollView,
    Image,
    SafeAreaView,
    Pressable,
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
  import {Display} from './utils';
  import { Colors } from "../contents";
  import imagePath from '../constants/imagePath';

const AppInfoScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
<View style={styles.header}>
      <Pressable  
              onPress={() => navigation.navigate('Help')}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
          </View>
       </Pressable>
            <View>
               <Text style={styles.Headertopic}>App Info</Text>
            </View>
            <View>
                <Image source={imagePath.projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
</View>

        <ScrollView>
        <Text></Text>
        <Text style={styles.text}>Application Identified</Text>
        <Text style={styles.text}>A515U1UES7CVD1</Text>
        <Text style={styles.text}>Application Version</Text>
        <Text style={styles.text}>6.13.90</Text>
        <Text style={styles.text}>SDK Version</Text>
        <Text style={styles.text}>8.3.0</Text>
        <Text style={styles.text}>Platform Name</Text>
        <Text style={styles.text}>Android Version 11</Text>
        <Text style={styles.text}>Device Model</Text>
        <Text style={styles.text}>Galaxy A51</Text>
        <Text style={styles.text}>Build Number</Text>
        <Text style={styles.text}>1629973879</Text>
        {/* <View style={styles.messageBox}>
        <Text style={styles.text}>The application is an online ticketing system. It allows users to book ticket with the VIP Bus transport 
        for travelling, just as, going to the VIP Bus station to purchase ticket before travel.</Text>
        <Text></Text>
                <Text style={styles.text}>The application has come to save people 
                from the stress of going to VIP Bus stations to queue for ticket, also to save time and money while the bus passes your route.</Text>
                  <Text></Text>
                <Text style={styles.text}>Also, to avoid the situation where passengers would have to travel all the way to the stations to board bus while there is no available bus going to their destinations.</Text>
                <Text></Text>
                <Text style={styles.text}>From the app, users can see if there is any available bus to their destination, the time of departure, the fare per route, and even, the number of available seats for each bus.</Text>
            </View> */}
        </ScrollView>
     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e7e8",
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
text1: {
  fontSize: 16,
  marginLeft:"3%",
  marginRight:"3%"
},
text: {
  marginHorizontal: 20,
  fontSize: 15,
    textAlign: 'center',
    marginTop: "5%"
},
title: {
  fontSize: 18,
  fontWeight: 'bold',
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
export default AppInfoScreen;