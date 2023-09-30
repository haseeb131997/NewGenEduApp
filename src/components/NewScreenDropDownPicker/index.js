import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {  Caption, Text,  } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from '../../theme';
import { h,} from "../../utils/Dimensions";
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Tooltip } from 'react-native-elements';
import DropdownList from '../DropdownList';







var dropdownStatus = ''

export default class NewScreenDropDownPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,

    }
this.onClickFocus = this.onClickFocus.bind(this)
  }


  onClickFocus(){
    const { stateObject,items,dropdownName} = this.props;
    stateObject.parentStateChange({
      dropdownVisible: true,
    })
    // dropdownList = items

    dropdownStatus = dropdownName
  }

 
  

  render() {
    const { stateObject,label, secureTextEntry, onChangeValue, value, editable, placeholder,  required, errorMessage, onFocus,   tooltipReq,
    tooltipMsg,
     tooltipStyle, items,dropdownName,subHeadingRecordName,onClear} = this.props;
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

        <View
          style={[styles.inputView, AppStyles.marginTop_1]}>
          <TouchableOpacity
            disabled={editable}
            onPress={()=> this.onClickFocus()}
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

          {(!editable && value != "" )&& <View style={[styles.iconContainer]}>
            <Entypo
              onPress={onClear}
              name={"cross"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
            <Feather
             onPress={() => this.onClickFocus()}
              name={"chevron-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />

          </View>}
          
          {(!editable && value == "") && <View style={[styles.iconContainer2]}>
            <Feather
              onPress={() => this.onClickFocus()}
              name={"chevron-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />

          </View>}
        </View>
        <Caption style={AppStyles.fieldErrorMsg}>{errorMessage}</Caption>


     {dropdownStatus == dropdownName &&  <DropdownList
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
    backgroundColor: UiColor.APP_BACKGROUND,
    borderRadius: 6,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  labelStyle: {
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
})


