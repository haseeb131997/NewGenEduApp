
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, Platform, TouchableOpacity } from 'react-native';
import AppStyles from "../../AppStyles/AppStyles";
import { UiColor } from '../../theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { Text, Caption } from 'react-native-paper';
import { h } from '../../utils/Dimensions';
import DropdownList from '../DropdownList';
import Feather from 'react-native-vector-icons/Feather';
import SelectListUtils from '../../utils/SelectListUtils'
import Entypo from 'react-native-vector-icons/Entypo';





var dropdownList = []
var dropdownStatus = ''

export default class CustomDropDownPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: null,
      items: props.items

    }
    // this.setOpen = this.setOpen.bind(this)
    // this.setValue = this.setValue.bind(this)
    this.onClickFocus = this.onClickFocus.bind(this)
  }


  // setOpen(open) {
  //   this.setState({
  //     open
  //   });
  // }


  // setValue(callback){
  //   const {onChangeValue} = this.props;
  //   this.setState(state => ({
  //     value: callback(state.value)
  //   }),()=>{
  //     onChangeValue(this.state.value)
  //   }); 
  // }

  // setItems(callback) {
  //   this.setState(state => ({
  //     items: callback(state.items)
  //   }));
  // }

  onClickFocus() {
    const { stateObject} = this.props;
    stateObject.parentStateChange({
      dropdownVisible: true,
    })

  const { items,dropdownName } = this.props
  // switch(dropdownName){
  //   case 'authDropdown':
  //    return dropdownList = SelectListUtils.functions.selectMaster.AuthStatusMaster
  //   break;
  //   case 'yearDropdown':
  //    return dropdownList = SelectListUtils.functions.selectMaster.YearMaster
  //   break;
  // }

  //  dropdownList = items

   dropdownStatus = dropdownName

  }



  render() {
    const { stateObject, label, secureTextEntry, onChangeValue, value, editable, placeholder, required, errorMessage, onFocus,dropdownName,
      items,subHeadingRecordName,onClear,labelStyleStatus } = this.props;
    const { open } = this.state;
    return (
      //     <View >
      //     <Text style={[styles.labelHeadingStyle,AppStyles.marginLeft_1]}>{label}</Text>
      //     <DropDownPicker
      //     open={open}
      //     items={this.state.items}
      //     value={value}
      //     activeLabelStyle={styles.activeLabelStyle}
      //     labelStyle={styles.labelStyle}
      //     placeholder={placeholder}
      //     style={styles.dropDownStyle}
      //     dropDownContainerStyle={styles.dropDownContainerStyle}
      //     setOpen={this.setOpen}
      //     // setValue={this.setValue}
      //     setValue={this.setValue}
      //     listMode="SCROLLVIEW"  
      //     arrowIconStyle={styles.arrowIconStyle}
      //     tickIconStyle={styles.tickIconStyle}
      //     textStyle={styles.textStyle}
      //     // setItems={this.setItems}
      //     zIndex={zIndex}
      //     zIndexInverse={zIndexInverse}

      //   />
      // </View>
      <View style={styles.container}>
        <Text style={[ labelStyleStatus ? styles.labelStyle1 : styles.labelStyle, AppStyles.marginLeft_1]}>{label} {required && <Text style={styles.requiredStyle}>*</Text>}</Text>
        <View
          style={[styles.inputView, AppStyles.marginTop_1]}>
          <TouchableOpacity
            disabled={editable}
            onPress={() => this.onClickFocus(dropdownName)}
            style={AppStyles.width80}>
            <TextInput
              autoCapitalize='none'
              value={value}
              secureTextEntry={secureTextEntry}
              // onChangeText={text => onChangeText(text)}
              style={styles.inputs}
              editable={false}
              placeholder={placeholder}
              pointerEvents="none"
            />
          </TouchableOpacity>
          {value != "" && <View style={[styles.iconContainer]}>
            <Entypo
              onPress={onClear}
              name={"cross"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
            <Feather
             onPress={() => this.onClickFocus()}
              name={"chevron-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
          </View>}

          {value == "" && <View style={[styles.iconContainer2]}>
            <Feather
              onPress={() => this.onClickFocus()}
              name={"chevron-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
          </View>}
        </View>
        <Caption style={AppStyles.fieldErrorMsg}>{errorMessage}</Caption>


       {dropdownStatus == dropdownName && <DropdownList
          stateObject={stateObject}
          items={items}
          visible={stateObject.state.dropdownVisible}
          label={label}
          SuggestionHeading={placeholder}
          onChangeValue={(value) => onChangeValue(value)}
          subHeadingRecordName={subHeadingRecordName}
        />}
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
    paddingHorizontal: 5,

  },
  inputView: {
    width: '100%',
    height: h('6%'),
    backgroundColor: UiColor.WHITE,
    borderRadius: 6,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  labelStyle: {
    // marginLeft:h('1%'),
    fontWeight: '400'
  },
  labelStyle1: {
    color:'#fff',
    fontWeight: '400'
  },
  iconContainer: {
    flexDirection: 'row', alignItems: 'center', width: '20%', justifyContent: 'space-around'
  },
  iconContainer2: {
    alignItems: 'flex-end', width: '20%', justifyContent: 'space-around'
  },
  requiredStyle: {
    fontWeight: '400',
    color: UiColor.ERROR_COLOR
  },
  // activeLabelStyle:{
  //   color: UiColor.SKYBLUE 
  // },
  // labelStyle:{
  //   color: UiColor.DRAK_GRAY_COLOR
  // },
  // textStyle:{
  //   color: UiColor.DRAK_GRAY_COLOR
  // },
  // arrowIconStyle:{
  //   tintColor:UiColor.DRAK_GRAY_COLOR
  // },
  // tickIconStyle:{
  //   tintColor:UiColor.SUCCESS_COLOR
  // },
  // dropDownStyle:{
  //   backgroundColor: UiColor.WHITE, color: '#000',borderWidth:0,width:'95%',alignSelf:'center' 
  // },
  // dropDownContainerStyle:{
  //   borderWidth:0,
  //   width:'95%',
  //   alignSelf:'center' 
  // },
  // labelHeadingStyle: {
  //   fontWeight: '400',
  //   // marginLeft:h('1%') 
  // },
})
