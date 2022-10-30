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

const topics = [
  {
    title: "",
    dropdown:
      "From the home page, click on buy ticket. Select route and click on next. Select bus stop, time, and number of passengers.  Click on next. click on pay. Make payment.",
  },
  {
    title: "How to book a ticket",
    dropdown:
      "From the home page, click on buy ticket. Select route and click on next. Select bus stop, time, and number of passengers.  Click on next. click on pay. Make payment.",
  },
  {
    title: "How to create Account",
    dropdown:
    <Text></Text>
  },

];

const Help = () => {
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
                 <Text style={styles.Headertopic}>Help </Text>
           <View>
               <Image source={imagePath.projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
          </View>
        </TouchableOpacity>
      <ScrollView style={{ flex: 1, backgroundColor: "#e6e7e8" }}>
        <View style={styles.topicsWrapper}>
        <Text style={styles.title}>FAQs</Text>
                <Text >1. How does the conductor gets to know whether the ticket is fake or not?</Text>
                <Text style={styles.answer}>Ans:</Text>
                <Text >2. What if my phone battery run off?</Text>
                <Text style={styles.answer}>Ans:</Text>
                <Text >3. How do i know if the bus is full or not after booking?</Text>
                <Text style={styles.answer}>Ans:</Text>
                <Text >4. After booking a ticket what do i do ?</Text>
                <Text style={styles.answer}>Ans:</Text>
                <Text >5. What do i do if i don't have the app ?</Text>

          {topics?.map((topic, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.topicsContainer}
                onPress={() => handleOnPress(index)}
                ref={keyPressRef}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="bars" size={24} color="black" />
                  <Text style={styles.topic}>{topic.title}</Text>
                </View>
                <View>
                  {index === selected ? (
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={26}
                      color="black"
                    />
                  ) : (
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={26}
                      color="black"
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.dropdown}>{selected === index ? topic.dropdown : null}</Text>
            </View>
          ))}
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
  dropdown:{
    fontSize: 16,
    paddingRight: 10,
    paddingLeft: 10,
  
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
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: "500",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: "8%"
},
answer: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.DEFAULT_RED
    
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
export default Help;
