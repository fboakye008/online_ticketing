import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Image,
    SafeAreaView,
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
  import {Display} from './utils';
  import { Colors } from "../contents";
  import imagePath from '../constants/imagePath';

const AppInfoScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate('Help')}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
                 <Text style={styles.Headertopic}>Help</Text>
           <View>
               <Image source={imagePath.projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView>
            
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
 
  Image: {

    height: 30,
    width: 30,
    marginRight: 20,
},
});
export default AppInfoScreen;