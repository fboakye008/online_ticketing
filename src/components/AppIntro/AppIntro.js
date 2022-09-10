import React from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import styled from "styled-components";
import { defaultColors } from "../../../DefaultValues";

const AppIntro = ({ item }) => {
  return (
    <StyledContainer>
      <View>
        <View>
          <StyledTitle>{item.title}</StyledTitle>
        </View>
        <View>
          <StyledImage source={item.image} />
        </View>
        <View>
          <StyledText>{item.text}</StyledText>
        </View>
      </View>
    </StyledContainer>
  );
};

const StyledContainer = styled(View)`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding:20px;
`;

const StyledTitle = styled(Text)`
  font-size: ${(props) => (props.size ? props.size + "px" : "40px")};
  color: ${(props) => (props.color ? props.color : defaultColors.dark)};
  text-align: center;
  letter-spacing: 0.5px;
`;
const StyledText = styled(Text)`
  font-size: ${(props) => (props.size ? props.size + "px" : "14px")};
  color: ${(props) => (props.color ? props.color : defaultColors.secondary)};
  letter-spacing: 0.4px;
  text-align: center;
`;
const StyledImage = styled(Image)`
margin:60px 0px;
width:300px;
height:360px;
`

export default AppIntro;
