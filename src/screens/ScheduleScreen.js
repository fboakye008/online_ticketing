import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView,} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import _ from "lodash"
import uds from "underscore"
import {RequestSchedule} from "../apis/schedules";
import {Colors} from "../contents";
import {updateError} from '../utils';
import SearchBar from "../components/ListSearch/SearchBar";


const ScheduleScreen = ({navigation, route}) => {
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
        // when no input, show all
        // if (searchPhrase === "") {
        //     //return <Item name={item.name} details={item.details} />;
        //     return (<View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
        //         <Text style={styles.columnRowTxt}>{item.route}</Text>
        //         <Text style={styles.columnRowTxt}>{item.short_depart}</Text>
        //         <Text style={styles.columnRowTxt}>{item.plate_no}</Text>
        //         <Text style={styles.columnRowTxt}>{item.available_seats}</Text>
        //         {/* <Text style={styles.columnRowTxt}>{item.fare}</Text> */}
        //     </View>);
        //
        // }
        // // filter of the name
        // if (item.route.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        //     return (<View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
        //         <Text style={styles.columnRowTxt}>{item.route}</Text>
        //         <Text style={styles.columnRowTxt}>{item.short_depart}</Text>
        //         <Text style={styles.columnRowTxt}>{item.plate_no}</Text>
        //         <Text style={styles.columnRowTxt}>{item.available_seats}</Text>
        //         {/* <Text style={styles.columnRowTxt}>{item.fare}</Text> */}
        //     </View>);
        // }
        // // filter of the description
        // if (item.short_depart.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        //     return (<View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
        //         <Text style={styles.columnRowTxt}>{item.route}</Text>
        //         <Text style={styles.columnRowTxt}>{item.short_depart}</Text>
        //         <Text style={styles.columnRowTxt}>{item.plate_no}</Text>
        //         <Text style={styles.columnRowTxt}>{item.available_seats}</Text>
        //         {/* <Text style={styles.columnRowTxt}>{item.fare}</Text> */}
        //     </View>);
        // }
        // if (item.available_seats >= searchPhrase.trim()) {
        //     return (<View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
        //         <Text style={styles.columnRowTxt}>{item.route}</Text>
        //         <Text style={styles.columnRowTxt}>{item.short_depart}</Text>
        //         <Text style={styles.columnRowTxt}>{item.plate_no}</Text>
        //         <Text style={styles.columnRowTxt}>{item.available_seats}</Text>
        //         {/* <Text style={styles.columnRowTxt}>{item.fare}</Text> */}
        //     </View>);
        // }

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
          <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
          <View style={styles.titleContainer}>
              {!clicked && <Text style={styles.title}>Bus Schedules</Text>}
        {/*<Text style={styles.title}>Bus Schedules</Text>*/}
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
            style={{width:"90%",flexGrow: 0,height: "70%"}}
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
    borderBottomWidth: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    paddingHorizontal: 12,

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


export default ScheduleScreen;
