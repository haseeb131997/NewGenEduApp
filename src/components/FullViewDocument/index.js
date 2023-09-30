/*
 * * Â© Copyright 2017-2020 IBD Tecnologies Private Limited.
 * *                       3/506 Kannadhsan Street ,ShanmugaNagar,Porur
 * *                       Chennai - 600125.
 * *                       India
 * *
 * * This source is part of the General Framework and is copyrighted by
 * * IBD Technologies Private Limited.
 * *
 * * All rights reserved.  No part of this work may be reproduced, stored in a
 * * retrieval system, adopted or transmitted in any form or by any means,
 * * electronic, mechanical, photographic, graphic, optic recording or otherwise,
 * * translated in any language or computer language, without the prior written
 * * permission of IBD Technologies Private Limited.
 /**/
/**/
/**/

/* * * Change Tag: SHA230821
Change Desc: in ios error visible state not define.
Changed By : Shashank
Date:18-06-2021 
*/





import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions, ActivityIndicator, Platform,Modal } from 'react-native';
//import { TextInput } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import AppStyles from "../../AppStyles/AppStyles";
import {  Appbar,  } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { httpUtils } from '../../utils/HttpUtils';
import Pdf from 'react-native-pdf';
import VideoPlayer from 'react-native-video-player';
import GeneralUtils from "../../utils/GeneralUtils"



var width = Dimensions.get('window').width; //full width
//var height = Dimensions.get('window').height; //full height




class FullViewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }

  }
  hideSpinner() {
    this.setState({ visible: false });
  }

  renderComponent() {
    const { source, onLoadComplete, onPageChanged, onError, onPressLink, style, stateObject } = this.props



    var filePath = source.uri
    //var fileType = source.uri.substring(source.uri.lastIndexOf('.') + 1)
    var fileType = GeneralUtils.functions.contentPath.substring(GeneralUtils.functions.contentPath.lastIndexOf('.') + 1)
console.log('file type inside full view doc',fileType)
console.log('file type inside full view doc',filePath)

    if (Platform.OS === 'ios' && fileType == 'pdf') {
      filePath = `${httpUtils.FILE_URL()}assets/web/viewer.html?file=${source.uri}`
    }


  
    if (Platform.OS === 'android' && fileType == 'pdf') {
      console.log('inside full view doc pdf')
      return (
       <View style={AppStyles.flex_one}>
          <Pdf
          source={source}
          onLoadComplete={onLoadComplete}
          onPageChanged={onPageChanged}
          onError={onError}
          onPressLink={onPressLink}
          style={AppStyles.pdf} />
       </View>
      )
    }
    else if (Platform.OS === 'android' && (fileType == 'png' || fileType == 'PNG' || fileType == 'jpg' || fileType == 'JPG' || fileType == 'jpeg' || fileType == 'JPEG')) {
      return (
       <View >
          <Image
          resizeMode='contain'
          source={{ uri: filePath }}
          style={styles.imgViewStyle}
        />
       </View>
      )
    }
    else if (Platform.OS === 'android' &&  (fileType == 'mp4')) {
      return (
        <View style={[styles.videoStyle,AppStyles.flex_one]}>
        <VideoPlayer
      fullScreenOnLongPress={true}
      thumbnail={{ uri: httpUtils.VIDEO_THUMBNAIL()}}
        resizeMode='contain'
        video={{uri :filePath}}
        // video={{uri : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'}}
        ref={r => this.player = r}

      />
     </View>
      )
    }
    else {
      return (<View style={AppStyles.flex_one}>
        <WebView
          //  onContentProcessDidTerminate={this.reload}
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={false}
          style={styles.webViewStyle}
          onLoad={() => this.hideSpinner()}
          source={{ uri: filePath }} />
        {this.state.visible && (
          <ActivityIndicator
            style={styles.loader}
            size="small"
          />
        )}
      </View>)
    }

  }

  render() {
    console.log('inside full view doc')
    const { stateObject } = this.props
    // if (fileType == 'pdf' && Platform.OS === 'ios') {
    //   filePath = `${httpUtils.FILE_URL()}assets/web/viewer.html?file=${source.uri}`
    // }


    // console.log(filePath,"filePath")
    // console.log(fileType,"fileType")

    return (<Modal visible={stateObject.state.showFullViewDoc}
      onDismiss={() => stateObject.parentStateChange({
        showFullViewDoc: false
      })} contentContainerStyle={styles.containerStyle}>
      <Appbar.Header style={styles.HeaderStyle}>
        <Appbar.BackAction onPress={() => stateObject.parentStateChange({
          showFullViewDoc: false
        })} />
      </Appbar.Header>
      {this.renderComponent()}
    
    </Modal>
    );
  }
}
// ends  SHA230821
const styles = StyleSheet.create({
  containerStyle: {
     backgroundColor: '#fff', width: "100%", height: '100%' 
    
    },
  HeaderStyle: { backgroundColor: '#fff' },
  webViewStyle: {
    height: h('100%'), width: w('100%')
  },
  imgViewStyle: {
    height: h('60%'), width: w('100%')
  },
  loader: {
    position: "absolute", top: h(10), left: width / 2
  },
  videoStyle: {
    height: h('50%'), width: w('100%')
  },
})

export default FullViewDocument
