
import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Text, Portal, Dialog, Button, Title, Subheading } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import { UiColor, TextColor, TextSize } from "../../theme";
import AppStyles from "../../AppStyles/AppStyles";
import { WebView } from 'react-native-webview';
import Pdf from 'react-native-pdf';
import Ionicons from 'react-native-vector-icons/Ionicons';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height




class DocumentCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }

  }
  hideSpinner() {
    this.setState({ visible: false });
  }
 


  render() {
    const { source, onLoadComplete, onPageChanged, onError, onPressLink, style,stateObject,fileName,openDocument } = this.props
    
    console.log(source.uri)
    return (<View >
        {/* <View style={AppStyles.btnContainer}>
        <Buttons
          color={"#2b982b"}
          mode="contained"
          label={'Full View of Document'}
          onPress={() =>  stateObject.parentStateChange({
            showFullViewDoc:true
           })}
          contentStyle={styles.contentStyle}
        />
      </View> */}
      {(Platform.OS == 'android' || Platform.OS == 'ios') ? 
      <View style={[AppStyles.marginTop_2,AppStyles.alignItems]}>
       <Pdf
        source={source}
        onLoadComplete={onLoadComplete}
        onPageChanged={onPageChanged}
        onError={onError}
        onPressLink={onPressLink}
        style={styles.pdfConationer} /> 
        <View style={styles.textConationer}>
          <Image
          resizeMode='contain'
          source={require('../../asssets/icons/pdf.png')}
          style={styles.iconImg}
          />
          <Subheading style={AppStyles.marginLeft_1}>{fileName}</Subheading>
          <Ionicons
                onPress={openDocument}
                name="eye"
                size={h('3%')}
                color={UiColor.LIGHT_TEXT_COLOR}
                style={AppStyles.addIconStyle}
              />
        </View>
        </View>
        :
        <View style={[AppStyles.marginTop_2]}>
          <WebView
          //  onContentProcessDidTerminate={this.reload}
          automaticallyAdjustContentInsets = {false}
          scalesPageToFit={false}
          style={styles.pdfConationer}
            onLoad={() => this.hideSpinner()}
            source={{ uri: source.uri }} />
          {this.state.visible && (
            <ActivityIndicator
              style={styles.loader}
              size="small"
            />
          )}
           <View style={styles.textConationer}>
          <Image
          resizeMode='contain'
          source={require('../../asssets/icons/pdf.png')}
          style={styles.iconImg}
          />
          <Subheading style={AppStyles.marginLeft_1}>{fileName}</Subheading>
          <Ionicons
                onPress={openDocument}
                name="eye"
                size={AppStyles.eyeIcon.h}
                color={UiColor.LIGHT_TEXT_COLOR}
                style={AppStyles.addIconStyle}
              />
        </View>
        </View>
      }
    </View>
    );
  }
}

const styles = StyleSheet.create({
  pdfConationer:{
    height: h('30%'), width: w('50%')

  },
  textConationer:{
    width: w('50%'),flexDirection:'row',alignItems:'center'

  },
  iconImg:{
    width:w('5%'),height:h('5%'),marginLeft:w('2%')
  },
  loader:{
    position: "absolute", top: h(10), left: w('50%') / 2
  }


})

export default DocumentCustom
