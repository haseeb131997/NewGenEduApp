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


import React, { Component } from "react";
import { View, StyleSheet,Modal} from 'react-native';
//import { TextInput, Card, Text, Avatar,ActivityIndicator } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
//import AppStyles from "../../AppStyles/AppStyles";
import { httpUtils } from '../../utils/HttpUtils';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from 'react-native-webview';
import apiCall from "../../ApiCall/ActionApi";
import Exception from '../../utils/Exception'
import Spinner from '../../components/Loader';
import GeneralUtils from "../../utils/GeneralUtils";
import { cloneDeep, stubFalse } from 'lodash';
import {  Appbar } from 'react-native-paper';
//import WebViewScreen from '../../components/WebViewScreen';
var source =''
class StripePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      resToken:'',
      userID:'',
      instituteID:'',
      sourceUrl:null,
      showWebview:false
    }
    this.callBack = this.callBack.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.hideSpinner = this.hideSpinner.bind(this)
    this.showSpinner = this.showSpinner.bind(this)
    this.closeStripeModel = this.closeStripeModel.bind(this)
  }



  hideSpinner() {
    console.log('inside webview spinner hide')
    this.setState({ visible: false });
  }
  showSpinner() {
    console.log('inside webview spinner show')
    this.setState({ visible: true });
  }

closeStripeModel(stateObject)
{
 console.log('inside stripe screen back button ');
    GeneralUtils.functions.goToStripe =false;
    stateObject.parentStateChange({
      showStripeModel: false,
      isLoading:false 
    })
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-064', errorMessage: '', errorParam: '' }])
  }

  /*hideSpinner() {
    // this.setState({ visible: false });
    const {
      stateObject
    } = this.props
     setTimeout(()=>{
      stateObject.parentStateChange({
        isLoading:false
      }) 
     },1000 * 3)
   
    
  }*/


// async  UNSAFE_componentWillMount(){
  async  componentDidMount(){
  const {
    stateObject
  } = this.props
  const {
    payDataModel
  } = stateObject.state

  console.log(payDataModel,"payDataModel")

    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    var resToken = ''

    var tempRst = JSON.parse(await AsyncStorage.getItem('Rst'));

    if(tempRst != null){
      var filteredResToken = tempRst.filter(
        item => item.service !== "StripePayment"
      );
      await AsyncStorage.setItem('Rst', JSON.stringify(filteredResToken));
     }
    
    await apiCall.functions.getServiceToken('StripePayment').then(
      async (values) => {
        if (values == null) {
          await apiCall.functions.callRequestToken(globalData, 'StripePayment')
          await apiCall.functions.getServiceToken('StripePayment').then((token) => {
            resToken = token;
            return
          })
        }
        else{
          resToken = values;
        }
      });

      this.setState({
        resToken:resToken,
        userID:globalData.userID,
        instituteID:globalData.instituteID,
        //showWebview:true, //N0U-102
        sourceUrl: `${httpUtils.FILE_URL()}stripe.min.jsp?rst=${resToken}&tet=${globalData.userID}~${globalData.instituteID}&ac=${payDataModel.accountNo}&ses=${payDataModel.sessionID}`
      },()=>{})
      
  }

   getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


  callBack(navEvent){
    const {
      stateObject
    } = this.props
    const {
      dataModel,
      payDataModel,
      paymentFeeId,
      selectStudentIndex
    } = stateObject.state

    console.log(navEvent,"navEvent")

    if(navEvent.url.includes('stripe.min.jsp')){

    
if(this.getParameterByName('payment_status',navEvent.url) == 'Cancel'){
  GeneralUtils.functions.goToStripe = false
  stateObject.parentStateChange({
    showStripeModel: false,
    isLoading:false 
  })
  Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-064', errorMessage: '', errorParam: '' }])
}
else if(this.getParameterByName('payment_status',navEvent.url) == 'Success'){
  var emptySummaryDataModel = cloneDeep(stateObject.state.emptySummaryDataModel)
  var emptyDataModel = cloneDeep(stateObject.state.emptyDataModel)
  var dummyDataModel = cloneDeep(dataModel)
  
  GeneralUtils.functions.goToStripe = false

  if(stateObject.state.serviceName == 'ParentDashBoard'){
    for(let item of dummyDataModel.studentDetails[selectStudentIndex].feeDetails){
       if(item.feeId == paymentFeeId){
          item.status  = 'Payment Submitted'
          item.Balance = '0.00',
          item.amountPaid = item.feeAmount
       }
    }
    
    stateObject.parentStateChange({
      dataModel:dummyDataModel,
      showStripeModel: false,
    })
    stateObject.resfreshDataModelStore(dummyDataModel)
  }

  if(stateObject.state.serviceName == 'StudentFeeManagement'){
    stateObject.parentStateChange({
      summaryDataModel:emptySummaryDataModel,
      dataModel:emptyDataModel,
      showStripeModel: false,
      currentStep: 0,
      //currentOperation: 'ReadOnlyWithDatatable',
    })
  }
  Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-065', errorMessage: '', errorParam: '' }])
}
else if(this.getParameterByName('payment_status',navEvent.url) == 'Error'){
  stateObject.parentStateChange({
    showStripeModel: false,
    isLoading:false
  }) 
  GeneralUtils.functions.goToStripe = false
  Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-066', errorMessage:'', errorParam: [this.getParameterByName('errMsg',navEvent.url)] }])
}

    }
  }




  handleMessage(event){
console.log(event,"handleMessage")
    // let data = event.nativeEvent.data;
    // data = JSON.parse(data);
    // if(data.status == 'success'){
    //     alert(data.reference);
        
    // }else{
    //     this.setState({loading: false});
    //     alert('Failed, '+ data.message);
        
    // }
  
}


  render() {
    const {
      stateObject
    } = this.props
    const {
      dataModel,
      payDataModel
    } = stateObject.state

    // var source = `${httpUtils.FILE_URL()}stripe.min.jsp?rst=${this.state.resToken}&tet=${this.state.userID}~${this.state.instituteID}&ac=${payDataModel.accountNo}&ses=${payDataModel.sessionID}`

    return (
    
     <View > 

          {// this.state.sourceUrl !== null && 

<Modal
visible={stateObject.state.showStripeModel}
// onRequestClose={() => stateObject.parentStateChange({
//   showWebview: false,
// })}
contentContainerStyle={[styles.containerStyle,]}>
<Appbar.Header style={styles.headerColor}>
  <Appbar.BackAction onPress={() => this.closeStripeModel(stateObject) }/>
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
  source={{ uri:  this.state.sourceUrl }}
  onNavigationStateChange={(navEvent)=> this.callBack(navEvent)}
  //onMessage={(event) => this.handleMessage(event)}
  
  />
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


          
         }
          
          {/*<WebView
          //  onContentProcessDidTerminate={this.reload}
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={false}
            style={{ height: h('90%'), width: w('100%') }}

            onLoad={() => this.hideSpinner()}
            source={{ uri: this.state.sourceUrl }}
            onNavigationStateChange={(navEvent)=> this.callBack(navEvent)}
            // onMessage={(event) => this.handleMessage(event)}
            // javaScriptEnabled={false}
            // injectedJavaScript={this.patchPostMessageJsCode}
          />} 
          {stateObject.state.isLoading && (
            <Spinner loading={stateObject.state.isLoading} />
            // <ActivityIndicator
            //   style={{ position: "absolute", top: h(10), left: width / 2 }}
            //   size="small"
            // />
          )} */}
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  headerColor: { backgroundColor: '#fff' },
  containerStyle: {
    backgroundColor: 'yellow',
    flex: 1,
  },
  webViewStyle:{
    height: h('100%'), width: w('100%') 
  }
})
export default StripePayment;

