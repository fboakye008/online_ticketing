import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
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
import projectlogo from "../../src/images/projectLogo.png";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const topics = [
  {
    title: "How to book a ticket",
    dropdown:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A fugiat delectus quae, voluptate quidem architecto tempore est, magnam suscipit expedita exercitationem omnis, placeat repellat laborum voluptas. Veniam officiis aliquid nostrum labore corporis voluptatibus, maiores architecto sunt cupiditate, nisi, ex quisquam? Nobis vero cum explicabo. Perferendis suscipit eligendi aliquam fugit esse",
  },
  {
    title: "Account and Payment Options",
    dropdown:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A fugiat delectus quae, voluptate quidem architecto tempore est, magnam suscipit expedita exercitationem omnis, placeat repellat laborum voluptas. Veniam officiis aliquid nostrum labore corporis voluptatibus, maiores architecto sunt cupiditate, nisi, ex quisquam? Nobis vero cum explicabo. Perferendis suscipit eligendi aliquam fugit esse",
  },
  {
    title: "A Guild to VIP",
    dropdown:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A fugiat delectus quae, voluptate quidem architecto tempore est, magnam suscipit expedita exercitationem omnis, placeat repellat laborum voluptas. Veniam officiis aliquid nostrum labore corporis voluptatibus, maiores architecto sunt cupiditate, nisi, ex quisquam? Nobis vero cum explicabo. Perferendis suscipit eligendi aliquam fugit esse",
  },
  {
    title: "Signing Up",
    dropdown:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A fugiat delectus quae, voluptate quidem architecto tempore est, magnam suscipit expedita exercitationem omnis, placeat repellat laborum voluptas. Veniam officiis aliquid nostrum labore corporis voluptatibus, maiores architecto sunt cupiditate, nisi, ex quisquam? Nobis vero cum explicabo. Perferendis suscipit eligendi aliquam fugit esse",
  },
  {
    title: "Accessibility",
    dropdown:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A fugiat delectus quae, voluptate quidem architecto tempore est, magnam suscipit expedita exercitationem omnis, placeat repellat laborum voluptas. Veniam officiis aliquid nostrum labore corporis voluptatibus, maiores architecto sunt cupiditate, nisi, ex quisquam? Nobis vero cum explicabo. Perferendis suscipit eligendi aliquam fugit esse",
  },
  {
    title: "More",
    dropdown:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A fugiat delectus quae, voluptate quidem architecto tempore est, magnam suscipit expedita exercitationem omnis, placeat repellat laborum voluptas. Veniam officiis aliquid nostrum labore corporis voluptatibus, maiores architecto sunt cupiditate, nisi, ex quisquam? Nobis vero cum explicabo. Perferendis suscipit eligendi aliquam fugit esse",
  },
];

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
      
      <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.goBack()}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
                 <Text style={styles.Headertopic}>About Us </Text>
           <View>
               <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
          </View>
        </TouchableOpacity>
      <ScrollView style={{ flex: 1, backgroundColor: "#e6e7e8" }}>
        <View style={styles.topicsWrapper}>
          <Text style={styles.allTopics}>All Topics</Text>
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
              <Text>{selected === index ? topic.dropdown : null}</Text>
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

  header:{
    borderBottomColor: '#eee',
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    marginLeft: 1,
    marginTop: 12,
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
  allTopics: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
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
