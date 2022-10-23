import * as React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {GOOGLE_API_KEY} from "@env";
import MapViewDirections from 'react-native-maps-directions';



const MapScreen = ({navigation}) => {
    const {width, height} = Dimensions.get('window');
    const origin = {latitude: 5.723669726699578, longitude: 0.043682456624945014};
 const destination = {latitude: 5.722853131829537, longitude: 0.03143773186297082};
    
    const ASPECT_RATIO = width /height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INITIAL_POSITION = {
        latitude: 5.723669726699578,
        longitude: 0.043682456624945014,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      provider={PROVIDER_GOOGLE} 
      initialRegion = {INITIAL_POSITION}
      >
        
  <MapViewDirections
    origin={origin}
    destination={destination}
    strokeWidth={5}
    strokeColor="hotpink"
    apikey={GOOGLE_API_KEY}
  />
</MapView>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
 
});
export default MapScreen;