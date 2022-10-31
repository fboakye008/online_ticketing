import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  Linking,
  Dimensions,
  ScrollView,
} from "react-native";
import React, {useCallback, useState, useEffect} from "react";
import {AntDesign, MaterialIcons,} from "@expo/vector-icons";
import {Display} from './utils';
import { Colors } from "../contents";
import imagePath from '../constants/imagePath';

const { width, height } = Dimensions.get("window");

const url ="https://online-ticketing.github.io/terms-and%20conditions.html";


const Help = ({navigation}) => {
  
  const openUrl = async (url) => {
      const isSupported = await Linking.canOpenURL(url);
      if (isSupported){
        await Linking.openURL(url);
      }else{
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
  };


  return (
    <SafeAreaView style={styles.container}>
         <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate('Account')}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
                 <Text style={styles.Headertopic}>Help </Text>
           <View>
               <Image source={imagePath.projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
          </View>
        </TouchableOpacity>
      <ScrollView style={{ flex: 1, backgroundColor: "#e6e7e8" }}>
        <View style={styles.topicsWrapper}>
        <View >
                <TouchableOpacity
                    style={styles.topicsContainer}
                    onPress={() => openUrl(url)}>
                    <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                        <AntDesign name="bars" size={24} color="black"/>
                        <Text style={styles.topic}>Terms and Conditions</Text>
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

            <View >
                <TouchableOpacity
                    style={styles.topicsContainer}
                    onPress={() => navigation.navigate('CustomerServiceScreen')}>
                    <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                        <AntDesign name="customerservice" size={24} color="black"/>
                        <Text style={styles.topic}>Customer Service</Text>
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

            <View >
                <TouchableOpacity
                    style={styles.topicsContainer}
                    onPress={() => navigation.navigate('FAQScreen')}>
                    <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                        <AntDesign name="question" size={24} color="black"/>
                        <Text style={styles.topic}>FAQ</Text>
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

            <View>
                <TouchableOpacity
                    style={styles.topicsContainer}
                    onPress={() => navigation.navigate('AppInfoScreen')}>
                    <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                        <AntDesign name="mobile1" size={24} color="black"/>
                        <Text style={styles.topic}>App Info</Text>
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
  topic: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 20,
    fontWeight: "500",
  },
  topicsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 10,
    width: "95%",
    borderRadius: 50,
    backgroundColor: Colors.LIGHT_GREEN,
    paddingHorizontal: 10,
    height: Display.setHeight(8),
    marginTop: 8,
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

    height: 30,
    width: 30,
    marginRight: 20,
},
});
export default Help;
