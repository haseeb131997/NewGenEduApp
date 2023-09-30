import React, { Component } from "react";
import { View, StyleSheet, TextInput, Platform, TouchableOpacity } from 'react-native';
import { Button, Caption, Text, Dialog, Portal } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from '../../theme';
import { w, h, height } from "../../utils/Dimensions";
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';








export default class FilterSuggestionTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,

    }

  }




  render() {
    const { applyLeftStyle,label, secureTextEntry, onChangeText, value, editable, placeholder, onDateChange, mode, format, required, errorMessage, onFocus, onClear } = this.props;
    console.log('applyLeftStyle',applyLeftStyle)
    var applyLeftStyle1 = typeof applyLeftStyle!=='undefined'?false:true
    return (
      <View style={styles.container}>
        {!applyLeftStyle1?
         <Text style={[styles.labelStyle]}>{label} {required && <Text style={styles.requiredStyle}>*</Text>}</Text>
       :
        <Text style={[styles.labelStyle,AppStyles.marginLeft_1]}>{label} {required && <Text style={styles.requiredStyle}>*</Text>}</Text>
  }
        <View
          style={[styles.inputView, AppStyles.marginTop_1]}>
          <TouchableOpacity
            disabled={editable}
            onPress={onFocus}
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
             onPress={onFocus}
              name={"chevron-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />

          </View>}
          {value == "" && <View style={[styles.iconContainer2]}>

            <Feather
              onPress={onFocus}
              name={"chevron-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />

          </View>}
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


