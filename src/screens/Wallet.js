import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image, ScrollView,
} from "react-native";
import React, {useEffect, useState} from "react";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../contents";
import {useNavigation} from "@react-navigation/native";
import SwitchButton from "../components/CustomSwitch/SwitchButton";
import Receipt from "../components/CustomTicket/Receipt";
import _ from "underscore";
import moment from "moment";
import {fetchTickets} from "../apis/tickets";
import {updateError} from "../utils";

const {width} = Dimensions.get("window");

const Wallet = () => {
    const navigation = useNavigation();
    const [error, setError] = useState("");
    const [switchValue, setSwitchValue] = useState(true);
    const [pastTickets, setPastTickets] = useState([]);
    const [futureTickets, setFutureTickets] = useState([]);

    const handleTickets = function (tickets) {
        let futureTickets = _.filter(tickets, function (ticket) {
            return !moment(ticket.departure_time).isBefore(moment(), "hour");
        });
        let pastTickets = _.filter(tickets, function (ticket) {
            return !moment(ticket.departure_time).isSameOrAfter(moment(), "hour");
        });
        futureTickets = _.sortBy(futureTickets, "departure_time").reverse();
        pastTickets = _.sortBy(pastTickets, "departure_time").reverse();
        setFutureTickets(futureTickets);
        setPastTickets(pastTickets);
        return;
    }

    const toggleSwitch = (value) => {
        if (value === 'Ticket') {
            setSwitchValue(true);
        } else {
            setSwitchValue(false);
        }
    };
    const renderFutureTickets = () => {
        return futureTickets.map(ticket => {
            return <Receipt ticketInfo={ticket} key={ticket.serial_no}></Receipt>
        })
    }
    const renderPastTickets = () => {
        return pastTickets.map(ticket => {
            return <Receipt ticketInfo={ticket} key={ticket.serial_no}></Receipt>
        })
    }
    const options = [
        {label: "Ticket", value: "Ticket"},
        {label: "History", value: "History"}
    ];
    useEffect(() => {
        async function populateData() {
            try {
                const userTickets = await fetchTickets();
                handleTickets(userTickets)
            } catch (e) {
                return updateError(e, setError);
            }
        }
        populateData().catch();
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#e6e7e8"}}>
            {error ? (
                <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                    {error}
                </Text>
            ) : null}

            <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
          <View style={styles.titleContainer}>
          <Text style={styles.title}>Ticket Wallet</Text>
        </View>
        </TouchableOpacity>

            <View style={styles.walletContainer}>
                <SwitchButton toggleSwitch={toggleSwitch} options={options}/>
                <ScrollView>
                    {(() => {
                        if (switchValue) {
                            return (
                                renderFutureTickets()
                            )
                        } else {
                            return (
                                renderPastTickets()
                            )
                        }
                    })()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    header:{
        borderBottomColor: Colors.DEFAULT_GREY,
        borderBottomWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        paddingHorizontal: 12,
        backgroundColor: Colors.DEFAULT_WHITE,
      },
      titleContainer:{
        flex: 1,
      },
      title:{
        fontSize: 18,
        marginLeft: -38,
        fontWeight:'bold',
        textAlign: 'center',
      },


});

export default Wallet;
