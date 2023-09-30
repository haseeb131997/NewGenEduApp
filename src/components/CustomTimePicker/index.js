import React, { Component } from "react";
import { View, StyleSheet, TextInput, Platform,TouchableOpacity } from 'react-native';
import { Button, Caption, Text,Dialog,Portal } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from '../../theme';
import { w, h, height } from "../../utils/Dimensions";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Tooltip } from 'react-native-elements';






export default class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      selectedDate: moment(new Date()).format('HH:mm'),
      pickDate:new Date()
    }
    this.onClickDate = this.onClickDate.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
  }

  onClickDate(){
    this.setState({
      showDate: true
    })
  }

  onDateChange(event, selectedDate){
     var date = ''
    const currentDate = selectedDate || date;
    var selectDate = currentDate != '' ? moment(currentDate).format('HH:mm') : currentDate
    var pickDate =  currentDate != '' ? currentDate : new Date()
    this.setState({
      showDate: Platform.OS === 'ios' ? true : false,
      selectedDate: selectDate,
      pickDate : pickDate 
    })
    this.props.onDateChange(selectDate)
  }



  datePickerHide =()=>{
    const { value } = this.props
    var currentDate = moment(new Date()).format('HH:mm')
    if(value == ""){
      this.setState({
        selectedDate :currentDate,
        showDate:  false,
      })
      this.props.onDateChange(currentDate)
    }
    else{
      this.setState({
        showDate:  false,
      })
    }

  }

  onClearDate =()=>{
    this.setState({
      showDate: false,
      selectedDate: '',
      pickDate : new Date() 
    })
    this.props.onDateChange('')
      }


  render() {
    const { label, secureTextEntry, onChangeText, value, editable, placeholder,onDateChange,mode,format,required,errorMessage,  tooltipReq,
      tooltipMsg,
      tooltipStyle, } = this.props;
    return (
      <View style={styles.container}>
      {/* <Text style={styles.labelStyle}>{label} {required && <Text style={styles.requiredStyle}>*</Text>}</Text> */}
      <View style={AppStyles.flexDirectionRow}>
       <Text style={styles.labelStyle}>{label} {required && <Text style={styles.requiredStyle}>* </Text>}</Text>
      {tooltipReq &&<Tooltip
       overlayColor={UiColor.TRANSPARENT}
       containerStyle={[AppStyles.tooltipContainer,AppStyles.projection,AppStyles.degfaulttooltipStyle,tooltipStyle]}
       popover={<Caption>{tooltipMsg}</Caption>}>
        <AntDesign  name="questioncircle" size={AppStyles.tooltipIcn.height} color={UiColor.LIGHT_TEXT_COLOR} />
        </Tooltip>}
       </View>

      <TouchableOpacity 
      disabled={editable} 
      onPress={this.onClickDate}
      style={[styles.inputView, AppStyles.marginTop_1]}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={"time-outline"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
        </View>
        <TextInput
          autoCapitalize='none'
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={text => onChangeText(text)}
          style={styles.inputs}
          editable={false}
          placeholder={placeholder}
          pointerEvents="none"
        />
      </TouchableOpacity>
      <Caption style={AppStyles.fieldErrorMsg}>{errorMessage}</Caption>

      {this.state.showDate && Platform.OS == 'android' ? 
    <DateTimePicker
        testID="dateTimePicker"
        value={this.state.pickDate}
        dateFormat={format}
        mode={mode}
        is24Hour={true}
        //NEAI-168 starts
        /*display="default"*/ 
         display="spinner"
         themeVariant="light"
         //NEAI-168 ends 
        onChange={this.onDateChange}
      /> : <Portal>
      <Dialog visible={this.state.showDate} onDismiss={false}>
      <Dialog.Content>
      <DateTimePicker
      testID="dateTimePicker"
      value={this.state.pickDate}
      dateFormat={format}
      mode={mode}
      is24Hour={true}
      //NEAI-168 starts
        /*display="default"*/ 
        display="spinner"
        themeVariant="light"
        //NEAI-168 ends 
      onChange={this.onDateChange}
     />
      </Dialog.Content>
      <Dialog.Actions>
        <Button color={UiColor.ERROR_COLOR} onPress={this.onClearDate}>Clear</Button>
        <Button color={UiColor.SKYBLUE}  onPress={this.datePickerHide}>Ok</Button>
      </Dialog.Actions>
    </Dialog>
    </Portal>}

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


