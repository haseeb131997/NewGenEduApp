import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Caption, Subheading, Text } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from '../../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Tooltip } from 'react-native-elements';

const CustomLabel = (props) => {
  const { 
    label,
    required,
    tooltipReq,
    tooltipMsg,
    tooltipStyle,
    errorMessage = '',
    template
   } = props
  return (
   <View>
      <View style={AppStyles.flexDirectionRow}>
    <Text style={styles.labelStyle}>{label} {required && <Text style={styles.requiredStyle}>* </Text>}</Text>
    {tooltipReq &&<Tooltip
     overlayColor={UiColor.TRANSPARENT}
     containerStyle={[AppStyles.tooltipContainer,AppStyles.projection,AppStyles.degfaulttooltipStyle, tooltipStyle]}
     popover={<Caption>{tooltipMsg}</Caption>}>
      <AntDesign  name="questioncircle" size={AppStyles.tooltipIcn.height} color={UiColor.LIGHT_TEXT_COLOR} />
      </Tooltip>}
      </View>
      {template != null && template}
      {errorMessage != '' && <Caption style={AppStyles.fieldErrorMsg}>{errorMessage}</Caption>}
   </View>
      )
};



const styles = StyleSheet.create({
  requiredStyle: {
    fontWeight: '400',
    color:UiColor.ERROR_COLOR 
  },

})

export default CustomLabel
