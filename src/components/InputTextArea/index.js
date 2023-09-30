import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Caption, Text } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from '../../theme';
import { w, h, height } from "../../utils/Dimensions";
import { Input } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Tooltip } from 'react-native-elements';



const InputTextArea = (props) => {
  const { label, secureTextEntry, onChangeText, value, label2,lable2OnPress,editable,placeholder, errorMessage,
    required,
    multiline,
    tooltipReq,
    tooltipMsg,
    tooltipStyle,
    keyboardType,
    maxLength } = props
  return (
    <View style={styles.container}>
     <View style={AppStyles.flexDirectionRow}>
       <Text style={styles.labelStyle}>{label} {required && <Text style={styles.requiredStyle}>* </Text>}</Text>
      {tooltipReq &&<Tooltip
       overlayColor={UiColor.TRANSPARENT}
       containerStyle={[AppStyles.tooltipContainer,AppStyles.projection,AppStyles.degfaulttooltipStyle,tooltipStyle]}
       popover={<Caption>{tooltipMsg}</Caption>}>
        <AntDesign  name="questioncircle" size={AppStyles.tooltipIcn.height} color={UiColor.LIGHT_TEXT_COLOR} />
        </Tooltip>}
       </View>
      <TextInput
        autoCapitalize='none'
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={text => onChangeText(text)}
        style={styles.inputs}
        editable={editable}
        placeholder={placeholder}
        multiline={true}
      />
      <Caption style={AppStyles.fieldErrorMsg}>{errorMessage}</Caption>



    </View>

  )
};



const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  inputs: {
    width: '100%',
    minHeight: h('15%'),
    backgroundColor: UiColor.APP_BACKGROUND,
    borderRadius: 6,
    marginTop: 6,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color:UiColor.DRAK_GRAY_COLOR,
    textAlignVertical:'top'
  },



  labelStyle: {
    fontWeight: '400'
  },
  requiredStyle: {
    fontWeight: '400',
    color: UiColor.ERROR_COLOR
  },




})

export default InputTextArea
