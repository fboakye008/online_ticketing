import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { defaultColors } from '../../../DefaultValues';
const AppIntroButton = (props) => {
  return (
    <View
      style={{
        backgroundColor: '#00CCFF',
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: defaultColors.white }}>
        {props.text ? (
          props.text
        ) : (
          <MaterialIcons name={props.icon} size={30} color="#fff" />
        )}
      </Text>
    </View>
  );
};

export default AppIntroButton;
