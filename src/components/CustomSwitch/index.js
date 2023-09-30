import React from 'react';
import { View, StyleSheet } from 'react-native';
import {  Text } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { Switch } from 'react-native-elements'



const CustomSwitch = (props) => {
  const { label,
    onPress,
    checked,
    disabled
  } = props
  return (
    <View style={[AppStyles.flexDirectionRow,AppStyles.alignItems,AppStyles.flex_one]}>
       <View style={AppStyles.checkboxContainer}>
      <Switch
        onValueChange={onPress}
        value={checked}
        disabled={disabled}
      />
     </View>
     <Text style={[AppStyles.marginLeft_1,]}>{label}</Text>

    </View>

  )
};


const styles = StyleSheet.create({


})

export default CustomSwitch
