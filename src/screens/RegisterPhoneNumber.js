// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StatusBar,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import { Colors } from '../contents';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import Separator from '../components/WelcomeCard/Separator';
// import { Display } from './utils';

// const RegisterPhoneNumberScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor={Colors.DEFAULT_WHITE}
//         translucent
//       />
//       <Separator height={StatusBar.currentHeight} />
      
//         <Text style={styles.headerTitle}>Registered Number</Text>
     
//       <Text style={styles.content}>
//         Enter your registered phone number to login.
//       </Text>
//       <View>
//         <Text style={styles.content}>Phone Number</Text>
//       </View>
//       <View style={styles.phoneInputContainer}>
//         <TextInput
//           placeholder="(+233) 24-645-5566"
//           placeholderTextColor={Colors.DEFAULT_GREY}
//           selectionColor={Colors.DEFAULT_GREY}
//           keyboardType="number-pad"
//           style={styles.inputText}
//           onChangeText={(text) => setPhoneNumber(text)}
//         />
//       </View>
//       <TouchableOpacity
//         style={styles.signinButton}
//         activeOpacity={0.8}
//         onPress={() => navigation.navigate('Verification', { phoneNumber })}
//       >
//         <Text style={styles.signinButtonText}>Continue</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     backgroundColor: Colors.LIGHT_GREY,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   headerTitle: {
//     fontSize: 25,
//     lineHeight: 20 * 1.4,
//     width: Display.setWidth(80),
//     textAlign: 'center',
//   },
//   title: {
//     fontSize: 20,
//     lineHeight: 20 * 1.4,
//     marginTop: 50,
//     marginBottom: 10,
//     marginHorizontal: 20,
//   },
//   content: {
//     fontSize: 20,
//     marginTop: 30,
//     marginBottom: 20,
//     marginHorizontal: 20,
//   },
//   phoneInputContainer: {
//     backgroundColor: Colors.LIGHT_GREY2,
//     borderColor: Colors.Silver,
//     borderRadius: 8,
//     marginHorizontal: 10,
//     paddingHorizontal: 25,
//     marginTop: 10,
//     height: Display.setHeight(6),
//     justifyContent: 'center',
//   },
//   inputText: {
//     fontSize: 18,
//     textAlignVertical: 'center',
//     padding: 5,
//     height: Display.setHeight(6),
//     color: Colors.DEFAULT_BLACK,
//   },
//   signinButton: {
//     backgroundColor: Colors.DEFAULT_GREEN,
//     borderRadius: 8,
//     marginHorizontal: 10,
//     marginTop: 30,
//     height: Display.setHeight(6),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   signinButtonText: {
//     color: Colors.DEFAULT_WHITE,
//     fontSize: 18,
//     lineHeight: 18 * 1.4,
//   },
// });

// export default RegisterPhoneNumberScreen;
