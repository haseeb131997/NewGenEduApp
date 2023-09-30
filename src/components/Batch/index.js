import React from 'react';
import {View,StyleSheet} from 'react-native';
import { w, h } from "../../utils/Dimensions";
import { Text,Caption } from 'react-native-paper';
import { UiColor } from '../../theme';
import AppStyles from '../../AppStyles/AppStyles';



const Batch = (props) => {
    const {value,status} = props
    return(
      <View style={AppStyles.flex_start}>
      {status == "E" && <Caption style={AppStyles.errorStatusStyle}>{value}</Caption>}

      {status == "S" && <Caption style={AppStyles.successStatusStyle}>{value}</Caption>}

      {status == "W" && <Caption style={AppStyles.warningStatusStyle}>{value}</Caption>}

      {status == "app" && <Caption style={AppStyles.appStatusStyle}>{value}</Caption>}

      </View>
       
    )
};


const styles = StyleSheet.create({
  titleStyle: {
    color:UiColor.WHITE,
    marginHorizontal:h('1%')
  }

})

export default Batch
