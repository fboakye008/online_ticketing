import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, SafeAreaView} from 'react-native';

import {Colors} from '../contents';
import HomeMap from '../components/HomeMap';
import {Display} from './utils';
import {
    MaterialIcons,
    AntDesign,
  } from "@expo/vector-icons";


// import {map} from "../contents/image"


import utils from "../apis/utils";
import {updateError} from "../utils";


const HomeScreen = ({navigation}) => {
    const [error, setError] = useState("");
    const keyPressRef = React.useRef(null);
    const  map = require('../../src/images/map.jpeg');
    const handleSchedule = () => {
        navigation.navigate('ScheduleScreen');
        
      };
      const handleMap = () => {
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
                    <Image source={map} style={[styles.Image]} resizeMode="cover" /> 
                        {/* <HomeMap/> */}
                    {/* <TouchableOpacity
                        style={styles.mapContainer}
                        onPress={() => handleMap()}
                        ref={keyPressRef}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15  }}>
                          <AntDesign name="enviromento" size={24} color="black" />
                          <Text style={styles.topic}>View Bus Location on Map</Text>
                          <View>
                            <MaterialIcons
                              name="keyboard-arrow-right"
                              size={26}
                              color="black"
                            />
                        </View>
                        </View>
                        
                   </TouchableOpacity> */}
                      
                        <View style={styles.messageBox}>
                        <Text style={styles.title}> Travel only if necessary</Text>
                          <Text style={styles.text}>
                          We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                          </Text>
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
      color: Colors.DEFAULT_WHITE,
      marginBottom: 10,
    },
    text: {

      fontSize: 15,
      color: Colors.DEFAULT_WHITE,
      marginBottom: 10,
    },

    topic: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 5,
        fontWeight: "500",
      },

        mapContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 2,
       marginLeft: 1,
       width: "100%",
       borderTopLeftRadius: 20,
       borderTopRightRadius: 20,
         backgroundColor: Colors.Light,
         paddingHorizontal: 10,
         height: Display.setHeight(13),
         marginTop: 2,
         marginBottom: 8,
         shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.121,
       shadowRadius: 9.14,
       elevation: 10,
      },
      messageBox: {

        width: '100%',
        backgroundColor: Colors.SECONDARY_BLACK,
        padding: 10,
        marginBottom: 2,
        paddingTop: 2,
         height: Display.setHeight(11),
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
       marginVertical: 2,
       marginLeft: 1,
       width: "100%",
       borderTopLeftRadius: 20,
       borderTopRightRadius: 20,
         backgroundColor: Colors.LIGHT_GREEN,
         paddingHorizontal: 10,
         height: Display.setHeight(8),
         marginTop: 2,
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
        
        height: 390,
        width: "100%"
      },
});

export default HomeScreen;