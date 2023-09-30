import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Caption, Subheading, Text } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from '../../theme';


const LabelText = (props) => {
  const { label,value } = props
  return (
    <View style={AppStyles.marginTop_3}>
    <Caption style={AppStyles.textColor}>{label}</Caption>
    <Text>{value}</Text>
    </View>)
};



const styles = StyleSheet.create({
  // valueStyle:{
  //   // fontWeight:'400',color:UiColor.BLACK
  // },

  // labelStyle: {
  //   color:UiColor.LIGHT_TEXT_COLOR
  // },

})

export default LabelText
