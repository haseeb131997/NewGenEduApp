import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Caption, Text } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from '../../theme';
import { w, h, height } from "../../utils/Dimensions";
import { Input } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Tooltip } from 'react-native-elements';

const FilterInputText = (props) => {
  const { label,
    secureTextEntry,
    onChangeText,
    value,
    label2,
    lable2OnPress,
    editable,
    errorMessage,
    required,
    multiline,
    tooltipReq,
    tooltipMsg,
    tooltipStyle,
    keyboardType,
    maxLength,
    placeholder

  } = props
  return (
    <View style={styles.container}>
      <View style={AppStyles.row_space_between}>
        <View style={AppStyles.flexDirectionRow}>
          <Text style={[styles.labelStyle, AppStyles.marginLeft_1]}>{label} {required && <Text style={styles.requiredStyle}>* </Text>}</Text>
          {tooltipReq && <Tooltip
            overlayColor={UiColor.TRANSPARENT}
            containerStyle={[AppStyles.tooltipContainer, AppStyles.projection, AppStyles.degfaulttooltipStyle, tooltipStyle]}
            popover={<Caption>{tooltipMsg}</Caption>}>
            <AntDesign name="questioncircle" size={AppStyles.tooltipIcn.height} color={UiColor.LIGHT_TEXT_COLOR} />
          </Tooltip>}
        </View>

        <Text onPress={lable2OnPress} style={styles.forgotStyle}>{label2}</Text>
      </View>
      <TextInput
        multiline={multiline}
        autoCapitalize='none'
        value={value}
        keyboardType={keyboardType}
        // keyboardType='numeric'
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={text => onChangeText(text)}
        style={styles.inputs}
        editable={editable}
        maxLength={maxLength}
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
    height: h('6%'),
    backgroundColor: "#fff",
    borderRadius: 6,
    marginTop: 6,
    paddingHorizontal: 15,
    // paddingVertical: 10,
    color: UiColor.DRAK_GRAY_COLOR,


  },

  labelStyle: {
    fontWeight: '400'
  },
  forgotStyle: {
    fontWeight: 'bold', color: UiColor.SKYBLUE
  },
  requiredStyle: {
    fontWeight: '400',
    color: UiColor.ERROR_COLOR
  },





})

export default FilterInputText
