import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, SafeAreaView} from 'react-native';

import {Colors} from '../contents';

import {Display} from './utils';
import {
    MaterialIcons,
    AntDesign,
  } from "@expo/vector-icons";

import logo from "../../src/images/logo1.png";
import utils from "../apis/utils";
import {updateError} from "../utils";


const HomeScreen = ({navigation}) => {
    const [error, setError] = useState("");
    const keyPressRef = React.useRef(null);
    const handleSchedule = () => {
        navigation.navigate('ScheduleScreen');
        
      };
      const handleMap = () => {
        // navigation.navigate('ScheduleScreen');
        navigation.navigate('MapScreen');
      };
      const handleBuyTicket = async () => {
          try {
              const y = await utils.isLoggedIn();
              let navPage = 'Route';
              if (y) {
                  navigation.navigate(navPage);
              } else {
                  navigation.navigate('Signin', {navPage});
              }
          }catch(ee){
              console.log("Error",ee);
              return updateError(ee.toString(), setError);

          }
      };
      const handleTicketWallet =  async() => {
          try {
                const y = await utils.isLoggedIn()
                let navPage =  'Wallet';
                if(y){
                    navigation.navigate(navPage);
                }else{
                  navigation.navigate('Signin',{navPage});
                }
          }catch(ee){
              console.log("Error",ee)
              return updateError(ee.toString(), setError);
          }
      };
    return (
        <SafeAreaView>
            
           <View style={styles.container}>
               <View>
                    <Image source={logo} style={[styles.Image]} resizeMode="cover" />
                      
                        <View style={styles.messageBox}>
                        <Text style={styles.title}> Travel only if necessary</Text>
                          <Text style={styles.text}>
                          We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                          </Text>
                          <Text style={styles}>Learn more!</Text>
         
                          
                        </View>
                        
                   
                    <TouchableOpacity
                        style={styles.topicsContainer}
                        onPress={() => handleBuyTicket()}
                        ref={keyPressRef}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15  }}>
                          <AntDesign name="bars" size={24} color="black" />
                          <Text style={styles.topic}>Buy Ticket</Text>
                          <View>
                            <MaterialIcons
                              name="keyboard-arrow-right"
                              size={26}
                              color="black"
                            />
                        </View>
                        </View>
                        
                    </TouchableOpacity>

                   
                    <TouchableOpacity
                        style={styles.topicsContainer}
                        onPress={() => handleTicketWallet()}
                        ref={keyPressRef}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15 }}>
                          <AntDesign name="wallet" size={24} color="black" />
                          <Text style={styles.topic}>Ticket Wallet</Text>
                          <View>
                            <MaterialIcons
                              name="keyboard-arrow-right"
                              size={30}
                              color="black"
                            />
                        </View>
                        </View>
                        
                    </TouchableOpacity>

                   <TouchableOpacity
                        style={styles.topicsContainer}
                        onPress={() => handleSchedule()}
                        ref={keyPressRef}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15  }}>
                          <AntDesign name="clockcircleo" size={24} color="black" />
                          <Text style={styles.topic}>Today's Schedule</Text>
                          <View>
                            <MaterialIcons
                              name="keyboard-arrow-right"
                              size={26}
                              color="black"
                            />
                        </View>
                        </View>
                        
                   </TouchableOpacity>

                   <TouchableOpacity
                        style={styles.topicsContainer}
                        onPress={() => handleMap()}
                        ref={keyPressRef}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15  }}>
                          <AntDesign name="clockcircleo" size={24} color="black" />
                          <Text style={styles.topic}>Map</Text>
                          <View>
                            <MaterialIcons
                              name="keyboard-arrow-right"
                              size={26}
                              color="black"
                            />
                        </View>
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
    container1: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.SECONDARY_BLACK,
      marginBottom: 10,
    },
    text: {

      fontSize: 15,
      color: Colors.SECONDARY_BLACK,
      marginBottom: 10,
    },

    topic: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 5,
        fontWeight: "500",
      },
      messageBox: {

        width: '100%',
        backgroundColor: Colors.Light,
       borderTopLeftRadius: 20,
       borderTopRightRadius: 20,
        padding: 10,
        marginBottom: 5,
        paddingTop: 5,
       marginLeft: 1,
         height: Display.setHeight(19),
         shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.121,
       shadowRadius: 9.11,
       elevation: 5,
      },

    topicsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
       marginLeft: 1,
       width: "100%",
       borderTopLeftRadius: 20,
       borderTopRightRadius: 20,
         backgroundColor: Colors.LIGHT_GREEN,
         paddingHorizontal: 10,
         height: Display.setHeight(10),
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