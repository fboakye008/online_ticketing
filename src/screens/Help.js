import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "../contents";
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

const Help = () => {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Help</Text>
      <View style={styles.topicsWrapper}>
        <Text style={styles.allTopics}>All Topics</Text>
        {topics?.map((topic, index) => (
          <TouchableOpacity key={index} style={styles.topicsContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign name="bars" size={24} color="black" />
              <Text style={styles.topic}>{topic.title}</Text>
            </View>
            <View>
              {!open ? (
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              )}
            </View>
            <Text>{topic?.dropdown}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 20,
    textAlign: "center",
  },
  arrowContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.SECONDARY_WHITE,
    borderRadius: 10,
    marginLeft: 10,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
  topic: {
    fontSize: 16,
    paddingLeft: 10,
  },
  allTopics: { marginVertical: 10 },
  topicsWrapper: {
    justifyContent: "center",
    height: height / 2,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  topicsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
});
export default Help;
