
import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Text, Portal, Dialog, Button, Title, Subheading } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import { UiColor } from "../../theme";
import AppStyles from "../../AppStyles/AppStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';




var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height




class DownloadDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }

  }





  render() {
    const { stateObject,source} = this.props
    console.log(source,"source in download")
    return (
      <WebView
        automaticallyAdjustContentInsets = {false}
        scalesPageToFit={false}
          source={{ uri: source.uri }} />
  
    );
  }
}

const styles = StyleSheet.create({
 


})

export default DownloadDocument
