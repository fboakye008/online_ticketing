import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    Pressable,
    Image,
    ScrollView,
    SafeAreaView,
    Linking,
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
  import {Display} from './utils';
  import { Colors } from "../contents";
  import imagePath from '../constants/imagePath';

const url = "abcd://abcd.com";

const CustomerServiceScreen = ({navigation}) => {
  const number = '+233 245666208'
  const message = "linonuniford@gmail.com";

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
    <View style={styles.header}>
        <Pressable  
            onPress={() => navigation.navigate('Help')}>
              <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
           </View>
        </Pressable>
            <View>
            <Text style={styles.Headertopic}>Customer Service</Text>
            </View>
        <View>
          <Image source={imagePath.projectlogo} style={[styles.Image]} resizeMode="cover"/>
        </View>
     </View>
        <ScrollView>
        <Text style={styles.text}>Contact us on:</Text>
        <View style={styles.mailContainer}>
        <Text 
        title="call" style={styles.mailText} onPress={() =>{ Linking.openURL(`tel:${number}`)
        }}>+233 245666208</Text>
        
        </View>

        <Text style={styles.text}>Email:</Text>
        <View style={styles.mailContainer}>
        <Text 
        title="mail" style={styles.mailText} onPress={() =>{
          Linking.openURL(`mailto:linonuniford@gmail.com?subject=testing&body=${message}`)
        }}>linonuniford@gmail</Text> 
        
        </View>
       
        </ScrollView>
     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
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
  
  Image: {

    height: 30,
    width: 30,
    marginRight: 20,
},
text: {
  marginHorizontal: 20,
  fontSize: 15,
    textAlign: 'center',
    fontWeight: "bold",
    marginTop: "8%"
},
mailContainer: {
  marginHorizontal: 20,
  alignItems: 'center',
},
mailText: {
  fontSize: 18,
  lineHeight: 20 * 1.4,
  color: Colors.DEFAULT_GREEN,
},
});
export default CustomerServiceScreen;