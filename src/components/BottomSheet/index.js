import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import HomeSearch from "../HomeSearch/HomeSearch";

const BottomSheetComponent = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef(BottomSheet);

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <View style={styles.container}>
      <HomeSearch {...{ handleClosePress, handleSnapPress }} />
      <View
        style={[
          styles.sheetContainer,
          { position: visible ? "absolute" : "relative" },
        ]}
      >
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          index={0}
          enablePanDownToClose={true}
        >
          <ScrollView>{children}</ScrollView>
        </BottomSheet>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },

  sheetContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 200,
    zIndex: 1,
    height: "100%",
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default BottomSheetComponent;
