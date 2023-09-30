import React from 'react';
import {View,StyleSheet} from 'react-native';
import { Button} from 'react-native-paper';
import { w, h, totalSize } from "../../utils/Dimensions";
import { UiColor, TextColor, TextSize } from "../../theme";


const Buttons = (props) => {
    const { label,color,onPress,mode,contentStyle} = props
    return(
        <View>
         <Button
          color={color}
          mode="contained"
          contentStyle={contentStyle}
          onPress={onPress}
          style={styles.btn}
        >
          {label}
            </Button>
        </View>
       
    )
};

const styles = StyleSheet.create({
  btn: {
    marginTop: h(3), 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
 
 

})

export default Buttons
