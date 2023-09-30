
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

/* * * Change Tag:NEW3.01
Change Desc: to set setMount and setUnMount  according to new navigation  and remove the onEnter and onExit
Changed By : Shashank
Date:17-09-2021 
*/



// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import {
  View,
  Image,
  Linking,
  TouchableOpacity, ToastAndroid, Platform, SafeAreaView
} from "react-native";
import AppHeader from "../../components/AppHeader";

import { httpUtils } from '../../utils/HttpUtils';
import { w, h } from "../../utils/Dimensions";
import { Card, Text, Portal, Provider, Divider, List, Title, Subheading } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertBox from '../../components/AlertBox';
import apiCall from "../../ApiCall/ActionApi";
import Spinner from '../../components/Loader';
import AppStyles from "../../AppStyles/AppStyles";
import Exception from '../../utils/Exception'
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import GeneralUtils from "../../utils/GeneralUtils";
import SelectListUtils from "../../utils/SelectListUtils";
import { UiColor } from "../../theme";
import { CheckBox } from 'react-native-elements'
import CustomButtons from '../../components/CustomButtons';
import ImpNotes from '../../components/ImpNotes';












class ChangeInstitute extends Component {
  // starts NEW3.01
  // static onEnter() {
  //   const c = Actions.refs.ChangeInstitute; c.setMount(false);
  // }

  // static onExit() {
  //   const c = Actions.refs.ChangeInstitute; c.setUnmount(true);
  // }
  // ends NEW3.01
  constructor(props) {
    super(props);
    this.state = {
      dataModel: null,
      newConfirmPwd: '',
      operation: 'View',
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      errorType: "",
      searchIsLoading: false,
      token: '',
      showAlert: false,
      auditDataModel: {},
      selectedId: '',
      instituteName: '',
      globalData: {},
      status: false,
      unMount: false,
      isLoading: false

    }
    this.onOkClick = this.onOkClick.bind(this)
    this.parentStateChange = this.parentStateChange.bind(this)
    this.setUnmount = this.setUnmount.bind(this)
    this.setMount = this.setMount.bind(this)
  }



  // starts NEW3.01
  //  componentWillMount() {
  //   this._unsubscribe = this.props.navigation.addListener('focus', () => {
  //     this.setMount(false)
  //   });
  // }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setMount(false)
    });
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      this.setUnmount(true)
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  // ends NEW3.01


  setUnmount(unMount) {
    this.setState({
      unMount: unMount,
    })
    apiCall.functions.cancelToken.cancel('Api is being canceled');
  }


  async setMount(unMount) {
    try {                             //  NEAI-229
      apiCall.functions.cancelToken = axios.CancelToken.source()
      const { dataModel, operation, auditDataModel } = this.state
      var apiObject = {}

      // emptyDataModel empty record
      var emptyDataModel = {
        searchFilter: "",
        searchResults: [{
          instituteID: "",
          instituteName: ""
        }]
      }

      var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
      //console.log(globalData, "globalData on laod")
      if (globalData != null) {
        this.setState({
          globalData: globalData,
          selectedId: globalData.instituteID,
          unMount: unMount
          // dataModel:emptyDataModel
        })
      }

      apiCall.functions.apiCallRequired = true
      apiObject = {
        serviceName: 'InstituteSearchService',
        serviceType: 'Institute',
        datamodel: emptyDataModel,
        operation: operation,
        businessEntity: [{ "entityName": "filter", "entityValue": "" }],
        audit: auditDataModel
      }
      await apiCall.functions.callApi(apiObject, null, this.parentStateChange)
    }
    // start NEAI-229
    catch (err) {
      this.setState({
        isLoading: false
      })
    }
    // end NEAI-229
  }







  async SelectedInstituteId(data) {
    const { globalData } = this.state
    var dummyGlobalData = cloneDeep(globalData)
    dummyGlobalData.instituteID = data.instituteID
    dummyGlobalData.instituteName = data.instituteName
    this.setState({
      selectedId: data.instituteID,
      globalData: dummyGlobalData
    })
  }


  async onOkClick() {
    const { globalData } = this.state
    if (apiCall.functions.isDashBoardProgress) {
      Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-052', errorMessage: '', errorParam: '' }])
      return false
    }
    else {
      await AsyncStorage.setItem('GLOBAL', JSON.stringify(globalData))
      GeneralUtils.functions.globalHeadarData.instituteName = globalData.instituteName

      await AsyncStorage.removeItem('Rst')
      await AsyncStorage.removeItem('selectBox')
      await AsyncStorage.getAllKeys()
        .then(keys => {
          for (let item of keys) {
            if (item.includes('SearchService')) {
              AsyncStorage.removeItem(item)
            }
          }
        }
        )
      SelectListUtils.functions.getSelectMaster()
      GeneralUtils.functions.ChangeInstitute = true
      Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-031', errorMessage: '', errorParam: '' }])

    }
  }





  parentStateChange(object) {
    this.setState(
      object
    );
  }



  render() {
    const { isLoading, selectedId, unMount } = this.state
    return (unMount == false) ? (<Provider>
      <View style={AppStyles.mainContainer}>
        <AppHeader
          stateObject={this}
        />
        <Card style={AppStyles.flex_one}>
          <Card.Title title="Select Institute" />
          <View style={AppStyles.flex_one}>
            <Card.Content >

              {apiCall.functions.searchDataModel.searchResults && apiCall.functions.searchDataModel.searchResults.map((item, index) => (
                <View key={index.toString()} style={[AppStyles.eventContainer,]}>
                  <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems,]}>
                    <View style={AppStyles.checkboxContainer}>
                      <CheckBox
                        onPress={() => this.SelectedInstituteId(item)}
                        checked={selectedId == item.instituteID ? true : false}
                      />
                    </View>
                    <View style={[AppStyles.marginLeft_2,AppStyles.flex_one]}>
                      <Subheading>{item.instituteName}</Subheading>
                      <Text style={[AppStyles.textColor,]}>{item.instituteID}</Text>
                    </View>
                  </View>
                </View>))
              }

           {apiCall.functions.searchDataModel.searchResults.length == 1 &&  <ImpNotes
          isArray={false}
          message={`You cannot change institute now, you do not have access to any other institutes`}
        />}
            </Card.Content>
          </View>
         {apiCall.functions.searchDataModel.searchResults.length != 1 &&  <Card.Content>
            <View style={AppStyles.alignItems}>
              <CustomButtons
                onPress={() => this.onOkClick()}
                title="Ok"
                titleStyle={AppStyles.signInTextStyle}
                containerStyle={AppStyles.signInContainer}
                buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
              />
            </View>
          </Card.Content>}


        </Card>
        <AlertBox
          stateObject={this}
        />
        {isLoading &&
          <Spinner loading={isLoading} />
        }
      </View>
    </Provider>
    ) : null
  }
}


export default ChangeInstitute;