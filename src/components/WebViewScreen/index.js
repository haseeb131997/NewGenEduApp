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




import React from 'react';
import {  StyleSheet, Modal, } from 'react-native';
// import { TextInput } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import {  Appbar } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import AlertBox from '../AlertBox';
import Spinner from '../Loader';




class WebViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,

    }
    this.hideSpinner = this.hideSpinner.bind(this)
    this.showSpinner = this.showSpinner.bind(this)
  }

  hideSpinner() {
    console.log('inside webview spinner hide')
    this.setState({ visible: false });
  }
  showSpinner() {
    console.log('inside webview spinner show')
    this.setState({ visible: true });
  }

  render() {
    const {
      stateObject,
      URL
    } = this.props
    const { dataModel, editable, } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <Modal
        visible={stateObject.state.showWebview}
        // onRequestClose={() => stateObject.parentStateChange({
        //   showWebview: false,
        // })}
        contentContainerStyle={[styles.containerStyle,]}>
        <Appbar.Header style={styles.headerColor}>
          <Appbar.BackAction onPress={() => stateObject.parentStateChange({
            showWebview: false,

          })} />
          {/* <Appbar.Content title="Comments"  /> */}
        </Appbar.Header>

        <WebView
          //  onContentProcessDidTerminate={this.reload}
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={false}
          style={styles.webViewStyle}
          onLoad={() => this.hideSpinner()}
          onLoadStart={() => this.showSpinner()}
          onLoadEnd={() => this.hideSpinner()}
          source={{ uri: URL }} />
       {/*} {this.state.visible && (


          <Spinner loading={this.state.visible} />
       )} 

        <AlertBox
          stateObject={stateObject}
       /> */}
        <Spinner loading={this.state.visible} />
       {/* {stateObject.state.isLoading &&
          <Spinner loading={stateObject.state.isLoading} />} */}

      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  headerColor: { backgroundColor: '#fff' },
  containerStyle: {
    backgroundColor: 'yellow',
    flex: 1,
  },
  webViewStyle:{
    height: h('100%'), width: w('100%') 
  }



})
export default WebViewScreen;


