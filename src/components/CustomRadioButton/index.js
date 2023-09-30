import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Caption, Text,RadioButton } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from '../../theme';
import { w, h } from "../../utils/Dimensions";
import { CheckBox } from 'react-native-elements'



const CustomRadioButton = (props) => {
  const { label,
    onPress,
    checked,
    disabled
  } = props
  return (
    <View style={[AppStyles.flexDirectionRow,AppStyles.flex_one,AppStyles.alignItems]}>
       <View >
       <RadioButton.Android
        value={checked}
        status={ checked ? 'checked' : 'unchecked' }
        onPress={onPress}
      />
     </View>
     <Text style={[AppStyles.marginLeft_1,AppStyles.flex_one]}>{label}</Text>
      {/* <Caption style={AppStyles.fieldErrorMsg}>{errorMessage}</Caption> */}
    </View>

  )
};



const styles = StyleSheet.create({





})

export default CustomRadioButton
