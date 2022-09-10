// import React,{useState} from "react";
// import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import { appIntroData, defaultColors } from "./DefaultValues";
// import AppIntro from "./src/components/AppIntro/AppIntro";
// import AppIntroButton from "./src/components/AppIntro/AppIntroButton";
// import RootNavigation from "./src/Navigation";
// import AppIntroSlider from "react-native-app-intro-slider";

// const App = () => {
//   const [showRealApp, SetShowRealApp] = useState(false);

//   const onDone = () => {
//     SetShowRealApp(true);
//   };

//   return (
//     // This is where the app renders the input/data onto the users screen
//     <>
//       {showRealApp ? (
//         <SafeAreaView style={styles.root}>
//           <RootNavigation />
//         </SafeAreaView>
//       ) : (
//         <AppIntroSlider
//           renderItem={AppIntro}
//           data={appIntroData}
//           onDone={onDone}
//           dotStyle={{ backgroundColor: defaultColors.light }}
//           activeDotStyle={{ backgroundColor: "#00CCFF" }}
//           dotClickEnabled={true}
//           renderNextButton={() => <AppIntroButton icon="arrow-right-alt" />}
//           renderDoneButton={() => <AppIntroButton icon="done" text="Get Started" />}
//         />
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "#F9FBFC",
//   },
// });
// export default App;

import React from 'react';
import Navigation from './src/Navigation';


export default () => <Navigation/>