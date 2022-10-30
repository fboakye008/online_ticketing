import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "../contents";
import imagePath from '../constants/imagePath';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const About = () => {
  const keyPressRef = React.useRef(null);
  const [selected, setSelected] = React.useState(null);
  const navigation = useNavigation();

  const handleOnPress = (index) => {
    if (selected === index) {
      return setSelected(null);
    } else {
      return setSelected(index);
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
                 <Text style={styles.Headertopic}>About Us </Text>
           <View>
               <Image source={imagePath.projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
          </View>
        </TouchableOpacity>
      <ScrollView style={{ flex: 1, backgroundColor: "#e6e7e8" }}>
        <View style={styles.topicsWrapper}>
        <Text style={styles.text}>Welcome To FranJat Corp. FranJat is a Professional eCommerse Platform.</Text> 
    <Text style={styles.text}>Here we will provide you only interesting content, which you will like very much. </Text>
    <Text style={styles.text}>We're dedicated to providing you the best of eCommerse, with a focus on dependability and VIP Bus online ticketing.</Text>
    <Text style={styles.text}>We're working to turn our passion for eCommerse into a booming online website.</Text>
    <Text style={styles.text}>We hope you enjoy our eCommerse as much as we enjoy offering them to you.</Text>
    <Text style={styles.text}>We will keep posting more important posts on our Website for all of you. </Text>
    <Text style={styles.text}>Please give your support and love.
    Thanks For Visiting Our Site
    Have a nice day!</Text>
    <Text></Text>
    
    <Text style={styles.text}>Contact us on:</Text>
    <Text style={styles.text}>Tel: 0245666208</Text>
    <Text style={styles.text}>Email: linonuniford@gmail.com</Text>

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
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: "500",
  },
  text: {
    fontSize: 15,
    marginVertical: 5,
  },
  topicsWrapper: {
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  topicsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  Image: {

    height: 30,
    width: 30,
    marginRight: 20,
},
});
export default About;
