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
import projectlogo from "../../src/images/projectLogo.png";
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
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
                 <Text style={styles.Headertopic}>Ticket Wallet </Text>
           <View>
               <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
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
      titleContainer:{
        flex: 1,
      },
      Image: {

        height: 30,
        width: 30,
        marginRight: 20,
    },

});

export default Wallet;
