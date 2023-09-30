import React from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import { Button, Caption, Subheading, Text, Title } from 'react-native-paper';
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from '../../theme';
import { w, h, height } from "../../utils/Dimensions";
import { Input } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tooltip } from 'react-native-elements';


const ImpNotes = (props) => {
  const {
    isArray,
    message,
    highLightMessage,
    arrayMessage,
    title = 'Note!'
  } = props
  return (
    <View>
      {!isArray ? <View style={[AppStyles.marginTop_2, styles.container, AppStyles.flexDirectionRow]}>
        <Image
          resizeMode='contain'
          style={AppStyles.infoIcon}
          source={require('../../asssets/icons/gen045.png')}
        />
        <View style={[AppStyles.marginLeft_1,AppStyles.flex_one]}>
          <Subheading style={AppStyles.bold_600}>{title}</Subheading>
          <Text style={styles.textStyle}>{message}</Text>
        </View>
      </View>
        :
        <View style={[AppStyles.marginTop_2, styles.container, AppStyles.flexDirectionRow]}>
          <Image
            resizeMode='contain'
            style={AppStyles.infoIcon}
            source={require('../../asssets/icons/gen045.png')}
          />
          <View style={[AppStyles.marginLeft_1,AppStyles.flex_one]}>
            <Subheading style={AppStyles.bold_600}>{title}</Subheading>
            {arrayMessage.map((item, index) => (
              <View key={index.toString()} style={styles.arrayContainer}>
                <Text style={styles.textColor}>{'\u2022'}</Text>
                <Text style={[{ color: item.color }, AppStyles.marginLeft_1]}>{item.text}</Text>
              </View>))
            }
          </View>
        </View>}
    </View>

  )
};



const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: UiColor.SKYBLUE,
    borderRadius: 5,
    padding: h('2%'),
    backgroundColor: UiColor.LIGHT_SKYBLUE

  },
  textStyle: {
    // textAlign: 'justify',
    color: UiColor.DRAK_GRAY_COLOR
  },
  arrayContainer: {
    flexDirection: 'row', marginTop: h('1%')
  },
  textColor: {
    color: UiColor.DRAK_GRAY_COLOR
  }

})

export default ImpNotes
