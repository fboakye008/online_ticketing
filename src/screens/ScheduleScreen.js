import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity,Image, SafeAreaView,} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import _ from "lodash"
import uds from "underscore"
import {RequestSchedule} from "../apis/schedules";
import {Colors,image} from "../contents";
import {updateError} from '../utils';
import SearchBar from "../components/ListSearch/SearchBar";
import moment from "moment";


const ScheduleScreen = ({navigation, route}) => {
    const {projectlogo} = image.projectlogo;
    const [dateToday] = moment().startOf('day').toISOString().split("T");
    const [error, setError] = useState("");
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [columns, setColumns] = useState([
        "Route",
        "Departure",
        "Bus #",
        "# Av. Seats",
        // "Fare"
    ]);
    let selectedR = route?.params?.selectedRoute;

    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null);

    const [data, setData] = useState([])
    useEffect(() => {
        async function populateData() {
            try {
                let schedules = await RequestSchedule();
                if (selectedR) {
                    schedules = uds.where(schedules, {route: selectedR})
                }
                schedules = uds.sortBy(schedules, 'departure')
                setData(schedules);
            }catch(err){
                return updateError(err.toString(), setError);
            }
        }
        populateData().catch();
    }, []);
    const sortTable = (column) => {
        let mappedCol = column;
        switch (column) {
            case "# Av. Seats" :
                mappedCol = "available_seats"
                break;
            case "Route" :
                mappedCol = "route"
                break;
            case "Departure" :
                mappedCol = "short_depart"
                break;
            case "Bus #" :
                mappedCol = "plate_no"
                break;
            default:
                break;
        }
        const newDirection = direction === "desc" ? "asc" : "desc"
        const sortedData = _.orderBy(data, [mappedCol], [newDirection])
        setSelectedColumn(column)
        setDirection(newDirection)
        setData(sortedData)
    }
    const tableHeader = () => (
        <View style={styles.tableHeader}>
            {
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.columnHeader}
                                onPress={() => sortTable(column)}>
                                <Text style={styles.columnHeaderTxt}>{column + " "}
                                    {selectedColumn === column && <MaterialCommunityIcons
                                        name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                                    />
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }
        </View>
    )
    const includesText = function(item) {
        let phrase = searchPhrase?searchPhrase.trim() : "";
        if (phrase === "") {
            return true;
        }
        if (item.route.toUpperCase().includes(phrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return true;
        }
        if (item.short_depart.toUpperCase().includes(phrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return true;
        }
        let num = null;
        if(phrase.startsWith(">=")){
            num = phrase.match(/[0-9]+$/);
            if(num) {
                return item.available_seats >= parseInt(num);
            }
            return false;
        }
        if(phrase.startsWith("<=")){
            num = phrase.match(/[0-9]+$/);
            if(num) {
                return item.available_seats <= parseInt(num);
            }
            return false;
        }
        if(phrase.startsWith("<")){
            num = phrase.match(/[0-9]+$/);
            if(num) {
                return item.available_seats < parseInt(num);
            }
            return false;
        }
        if(phrase.startsWith(">")){
            num = phrase.match(/[0-9]+$/);
            if(num) {
                return item.available_seats > parseInt(num);
            }
            return false;
        }
        if(phrase.startsWith("=")){
            num = phrase.match(/[0-9]+$/);
            if(num) {
                return item.available_seats === parseInt(num);
            }
            return false;
        }
        if(!isNaN(phrase)){
            return item.available_seats === parseInt(phrase)
        }
        return false;
    }
    const renderItem = ({ item, index }) => {

        if(includesText(item)){
            return (<View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
                <Text style={styles.columnRowTxt}>{item.route}</Text>
                <Text style={styles.columnRowTxt}>{item.short_depart}</Text>
                <Text style={styles.columnRowTxt}>{item.plate_no}</Text>
                <Text style={styles.columnRowTxt}>{item.available_seats}</Text>
                {/* <Text style={styles.columnRowTxt}>{item.fare}</Text> */}
            </View>);
        }
    };
  return (
      <View style={styles.container}>
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
                        {!clicked && <Text style={styles.topic}>Schedule ({dateToday})</Text>}

                            <View>
                            <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>
                            </View>
                        </View>

                    </TouchableOpacity>
          <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
          />
        <FlatList
            data={data}
            style={{width:"90%",flexGrow: 0,height: "75%"}}
            keyExtractor={(item, index) => index+""}
            ListHeaderComponent={tableHeader}
            stickyHeaderIndices={[0]}
            renderItem={renderItem}
        />
        {/* <StatusBar style="auto" /> */}
      </View>


    );
}

const styles = StyleSheet.create({
//
  columnHeader: {
    width: "30%",
    justifyContent: "center",
    alignItems:"center"
  },

  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width:"25%",
    textAlign:"center",
  },


  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10
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
    paddingTop:12,
    paddingHorizontal: 12,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#37C2D0",
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    height: 50,

  },

  tableRow: {
    flexDirection: "row",
    height: 60,
    alignItems:"center",
  },
  topic: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: "500",
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
  Image: {

    height: 30,
    width: 30,
    marginRight: 20,
},
});


export default ScheduleScreen;
