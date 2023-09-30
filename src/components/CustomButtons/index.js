import React from 'react';
import {View,StyleSheet} from 'react-native';
import { w, h } from "../../utils/Dimensions";
import { Button } from 'react-native-elements';
import { Text } from 'react-native-paper';
import { UiColor } from '../../theme';



const CustomButtons = (props) => {
    const { title,onPress,titleStyle,containerStyle,buttonStyle,icon} = props
    return(
        <View>
             <Button
              onPress={onPress}
              title={<Text style={[styles.titleStyle,titleStyle]}>{title}</Text>}
            //   titleStyle={titleStyle}
              // containerStyle={{}}
              buttonStyle={buttonStyle}
              icon={icon}
            />
        </View>
       
    )
};


const styles = StyleSheet.create({

  titleStyle: {
    color:UiColor.WHITE,
    marginHorizontal:h('1%')
  }

})

export default CustomButtons
