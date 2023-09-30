
import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Text, Portal, Dialog, Button, Title, Subheading } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import { UiColor } from "../../theme";
import AppStyles from "../../AppStyles/AppStyles";
import { httpUtils } from '../../utils/HttpUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';




var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height




class CustomVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }

  }

  getIcon(fileType) {
    switch (fileType) {
      case 'mp4':
        return require('../../asssets/icons/mp4.png')
        break;
      default:
        return require('../../asssets/icons/doc.png')
        break;
    }
  }







  render() {
    const { stateObject, fileName, fileType, value, openDocument, source } = this.props
    return value != '' && (fileType == 'mp4') ? (<View style={[styles.backgroundVideo,]}>
      <VideoPlayer
        // starts NEAI2-292
        fullScreenOnLongPress={true}
        thumbnail={{ uri: httpUtils.VIDEO_THUMBNAIL() }}
        // ends NEAI2-292
        resizeMode='contain'
        video={{ uri: source.uri }}
        ref={r => this.player = r}
      />
      <View style={[styles.textConationer, AppStyles.alignSelf, AppStyles.marginTop_1]}>
        <Image
          resizeMode='contain'
          source={require('../../asssets/icons/mp4.png')}
          style={styles.iconImg}
        />
        <Subheading style={AppStyles.marginLeft_1}>{fileName}</Subheading>
       {/* <Ionicons
          onPress={openDocument}
          name="eye"
          size={styles.eyeIcon.height}
          color={UiColor.LIGHT_TEXT_COLOR}
          style={AppStyles.addIconStyle}
       />*/}
      </View>
    </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  textConationer: {
    width: w('50%'), flexDirection: 'row', alignItems: 'center'

  },
  iconImg: {
    width: w('5%'), height: h('5%'), marginLeft: w('2%')
  },

  backgroundVideo: {
    height: h('30%'),
    margin: h('1%'),
    width: '100%'
  },
  eyeIcon: {
    height: h('3%'),

  },



})

export default CustomVideo
