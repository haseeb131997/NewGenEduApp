import React, { Component } from "react";
import { View, StyleSheet, TextInput, } from 'react-native';
import { Button, Caption, Text, } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from '../../theme';
import { h,  } from "../../utils/Dimensions";
import moment from "moment";
import { Tooltip } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';






export default class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      selectedDate: moment(new Date()).format('DD-MM-YYYY'),
      pickDate:new Date()
    }

  }



  render() {
    const { label, secureTextEntry, onChangeText, value, editable, placeholder,required,errorMessage,tooltipReq,tooltipMsg,tooltipStyle,currencyCode } = this.props;
    return (
      <View style={styles.container}>
   <View style={AppStyles.flexDirectionRow}>
      <Text style={styles.labelStyle}>{label} {required && <Text style={styles.requiredStyle}>* </Text>}</Text>
      
      {tooltipReq &&<Tooltip
       overlayColor={UiColor.TRANSPARENT}
       containerStyle={[AppStyles.tooltipContainer,AppStyles.projection,AppStyles.degfaulttooltipStyle, tooltipStyle]}
       popover={<Caption>{tooltipMsg}</Caption>}>
        <AntDesign  name="questioncircle" size={AppStyles.tooltipIcn.height} color={UiColor.LIGHT_TEXT_COLOR} />
        </Tooltip>}
        </View>

      <View 
      style={[styles.inputView, AppStyles.marginTop_1]}>
        <View style={styles.iconContainer}>
         <Text>{currencyCode}</Text>
        </View>
        <TextInput
          autoCapitalize='none'
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={text => onChangeText(text)}
          style={styles.inputs}
          editable={editable}
          placeholder={placeholder}
          keyboardType='numeric'
          // pointerEvents="none"
        />
      </View>
      <Caption style={AppStyles.fieldErrorMsg}>{errorMessage}</Caption>


    </View>
    )
  }
}








const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  inputs: {
    flex: 1,
    color: UiColor.DRAK_GRAY_COLOR,
    paddingHorizontal: 10,

  },
  inputView: {
    width: '100%',
    height: h('6%'),
    backgroundColor: UiColor.APP_BACKGROUND,
    borderRadius: 6,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  labelStyle: {
    fontWeight: '400'
  },
  iconContainer:{
    justifyContent: 'center' 
  },
  requiredStyle: {
    fontWeight: '400',
    color:UiColor.ERROR_COLOR 
  },
  
 



})


