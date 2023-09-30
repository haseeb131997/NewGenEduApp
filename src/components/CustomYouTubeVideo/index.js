
import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions, Platform, ActivityIndicator, PixelRatio } from 'react-native';
// import { TextInput, Text, Portal, Dialog, Button, Title, Subheading } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import AppStyles from "../../AppStyles/AppStyles";
import { WebView } from 'react-native-webview';









class CustomYouTubeVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      playerWidth: Dimensions.get('window').width,
      playing:false
    }

  }



  hideSpinner() {
    this.setState({ visible: false });
  }






  render() {
    const { stateObject, fileName, fileType, value, openDocument, source, videoId } = this.props

    return ((value != '' && (value.toLowerCase().includes("youtube") || value.toLowerCase().includes("youtu.be")) )&&  <View style={AppStyles.flex_one}>
      {/* <YouTube
        videoId={videoId} // The YouTube video ID
        apiKey={httpUtils.APIKEY()}
        play = {this.state.playing} // control playback of video with true/false
        // fullscreen // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        onReady={e => this.setState({ isReady: true })}
        onChangeState={e => this.setState({ status: e.state })}
        onChangeQuality={e => this.setState({ quality: e.quality })}
        onError={e => this.setState({ error: e.error })}
        style={{ alignSelf: 'stretch', height: PixelRatio.roundToNearestPixel(this.state.playerWidth / (16 / 9)) }}
      /> 
  */}
        <WebView
          //  onContentProcessDidTerminate={this.reload}
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={false}
          style={styles.webViewStyle}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
         mediaPlaybackRequiresUserAction
          onLoad={() => this.hideSpinner()}
          source={{ uri: value }} />
        {this.state.visible && (
          <ActivityIndicator
            style={styles.loader}
            size="small"
          />
        )}
   

    </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  webViewStyle:{
    height: h('20%'), width: w('75%')
  }
})

export default CustomYouTubeVideo
