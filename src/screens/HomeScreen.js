import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, SafeAreaView} from 'react-native';

import {Colors, image as MyImage} from '../contents';

import {Display} from './utils';
import {
    MaterialIcons,
    AntDesign,
  } from "@expo/vector-icons";

import logo from "../../src/images/logo1.png";
import utils from "../apis/utils";




const HomeScreen = ({navigation}) => {
    
    const keyPressRef = React.useRef(null);
    const handleSchedule = () => {
        navigation.navigate('Schedule');
       
      };

    
      const handleBuyTicket = async () => {
        const y = await utils.isLoggedIn();
        let  navPage =  'Route';
        
        if(y){
            navigation.navigate(navPage);
        }else{
          navigation.navigate('Signin',{navPage});
        }
       
      };
      const handleTicketWallet =  async() => {
        const y = await utils.isLoggedIn()
        let  navPage =  'Wallet';
        
        if(y){
            navigation.navigate(navPage);
        }else{
          navigation.navigate('Signin',{navPage});
        }
      };

    return (

        <SafeAreaView>
           <View style={styles.container}>
      <View>
        <Image source={logo} style={[styles.Image]} resizeMode="cover" />

        
       
        <TouchableOpacity
                style={styles.topicsContainer}
                onPress={() => handleBuyTicket()}
                ref={keyPressRef}
              >
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15  }}>
                  <AntDesign name="bars" size={24} color="black" />
                  <Text style={styles.topic}>Buy Ticket</Text>
                </View>
                <View>
                 
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={26}
                      color="black"
                    />
                  
                </View>
              </TouchableOpacity>

        <TouchableOpacity
                style={styles.topicsContainer}
                onPress={() => handleTicketWallet()}
                ref={keyPressRef}
              >
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15 }}>
                  <AntDesign name="wallet" size={24} color="black" />
                  <Text style={styles.topic}>Ticket Wallet</Text>
                </View>
                <View>
                 
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={30}
                      color="black"
                
                    />
                  
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.topicsContainer}
                onPress={() => handleSchedule()}
                ref={keyPressRef}
              >
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15  }}>
                  <AntDesign name="clockcircleo" size={24} color="black" />
                  <Text style={styles.topic}>Today's Schedule</Text>
                </View>
                <View>
                 
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={26}
                      color="black"
                    />
                  
                </View>
              </TouchableOpacity>
      </View>
    </View>

           
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
   
    topic: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10,
        fontWeight: "500",
      },
   
    topicsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 15,
       marginLeft: 20,
       width: "90%",
         backgroundColor: Colors.LIGHT_GREEN,
         borderRadius: 5,
         paddingHorizontal: 10,
         height: Display.setHeight(13),
         justifyContent: 'center',
         alignItems: 'center',
         marginTop: 5,
     
         shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.121,
       shadowRadius: 9.11,
       elevation: 5,
      },
      Image: {
        height: Display.setHeight(30),
        width: Display.setWidth(100),
      },
});

export default HomeScreen;