import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Caption, Text } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from '../../theme';
import { w, h } from "../../utils/Dimensions";
import { CheckBox } from 'react-native-elements'



const CustomCheckBox = (props) => {
  const { label,
    onPress,
    checked,
    disabled
  } = props
  return (
    <View style={[AppStyles.flexDirectionRow,AppStyles.alignItems,AppStyles.flex_one]}>
       <View style={AppStyles.checkboxContainer}>
      <CheckBox
        onPress={onPress}
        checked={checked}
        disabled={disabled}
        // containerStyle={{backgroundColor:UiColor}}
      />
     </View>
     <Text style={[AppStyles.marginLeft_1,]}>{label}</Text>

    </View>

  )
};



const styles = StyleSheet.create({





})

export default CustomCheckBox
