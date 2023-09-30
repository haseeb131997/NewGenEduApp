
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
//import { h, w } from '../../../../utils/Dimensions';
//import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import ImageDocumentView from '../../../../components/ImageDocumentView';
import {  Card, } from 'react-native-paper';
import FullViewDocument from '../../../../components/FullViewDocument';

import CustomVideo from '../../../../components/CustomVideo';
//import SelectListUtils from "../../../../utils/SelectListUtils";
//import Batch from "../../../../components/Batch";
//import StudentSerachBox from '../../../../components/StudentSerachBox';
//import CustomButtons from '../../../../components/CustomButtons';
//import { UiColor } from '../../../../theme';
//import NewOperation from "../../../../utils/NewOperation";
//import apiCall from "../../../../ApiCall/ActionApi";
//import SubScreenUtils from "../../../utils/SubScreenUtils";
import { Platform } from 'react-native';

var showResults = []

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      summaryResult: [],
      searchQuery:''
    }*/
    this.openDocument = this.openDocument.bind(this)
  }
  openDocument(path) {
    const { stateObject } = this.props;
    GeneralUtils.functions.contentPath = path
    if (Platform.OS === 'ios') {
      stateObject.parentStateChange({
        showFullViewDoc: true
      })
    }
    else {
      GeneralUtils.functions.contentPath = path
      this.setState({
        showWebView: true
      })
      setTimeout(function () {
        this.setState({ showWebView: false })
      }.bind(this), 3000)
    }
  }
  /*onChangeSearch(text){
    this.setState({
     searchQuery:text
    }) 
   }
gallery(rowData, index,stateObject)
{
  stateObject.parentStateChange({
    viewModelVisible : true,

})
}

   enroll(rowData, index){
    const { stateObject } = this.props;
    console.log('Inside sign')
    //var 
     //stateObject.state.dataModel=rowData;
    stateObject.setState({
      dataModel: rowData,
     // currentOperation: 'Query',
      //selectedTabIndex: 0
    }, async () => {
     await NewOperation.functions.viewRecordfornextOperation(stateObject)
     console.log('Data feching api call is completed ')
     if (!apiCall.functions.apiError)
    {
    //stateObject.setState({
      //dataModel: rowData,
      
      //currentOperation: 'Query',
      //selectedTabIndex: 0
    //}, async () => {
     await NewOperation.functions.studentEdit(stateObject)
     console.log('enroll Api call is completed ')
    //})
  }
    })

  }

  getParticipationStatus(data) {
    if (data.participate && data.enroll) {
      return {
        lable: 'Enrolled & Participated',
        status: 'S'
      }
    }
    else if (!data.participate && data.enroll) {
      return {
        lable: 'Enrolled & Not Participated',
        status: 'W'
      }
    }
    else if (!data.participate && !data.enroll) {
      return {
        lable: 'Not Enrolled & Not Participated',
        status: 'E'
      }
    }
    else {
      return {
        lable: '',
        status: ''
      }
    }

  }
*/

  render() {
    const {stateObject,imagesList } = this.props;
    var fileName;
    var fileType;
    /*if (imagesList.imagePath != '' && (imagesList.imagePath.includes('CohesiveUpload') || imagesList.imagePath.includes('objectstorage'))) {
      fileName = imagesList.imagePath.substring(dataModel.contentPath.lastIndexOf('/') + 1)
    }
    else {
      fileName = ''
    }

  


    var fileType = imagesList.imagePath.substring(dataModel.contentPath.lastIndexOf('.') + 1)*/

    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)

   // var mapping=['activityName','date','dueDate','maxEnroll','maxParticipation','venue','feeDescription','feeDueDate','feeDescription','amount']

    //showResults = GeneralUtils.functions.studentSerachFilter(stateObject, GeneralUtils.functions.getSummaryResult(stateObject),mapping,this.state.searchQuery)
console.log('Inside Gallery',imagesList)
    return (
      <View>
        
        {imagesList.length>0 && imagesList.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>

              <Card.Content>
             
     
              <ImageDocumentView
          openDocument={() => GeneralUtils.functions.openDocument(stateObject,rowData.imagePath)}
          value={rowData.imagePath} 
          stateObject={stateObject}
          fileName={rowData.imagePath.substring(rowData.imagePath.lastIndexOf('/') + 1)}
          fileType={rowData.imagePath.substring(rowData.imagePath.lastIndexOf('.') + 1)}
        />
          <CustomVideo
                      openDocument={() => GeneralUtils.functions.openDocument(rowData.imagePath)}
                      value={rowData.imagePath}
                      stateObject={stateObject}
                      fileName={GeneralUtils.functions.getFileName(rowData.imagePath)}
                      fileType={GeneralUtils.functions.getFileType(rowData.imagePath)}
                      source={GeneralUtils.functions.getSource(rowData.imagePath, stateObject)}
                    />
         <FullViewDocument
            stateObject={stateObject}
            source={GeneralUtils.functions.getSource(GeneralUtils.functions.contentPath, stateObject)}
            fileName={GeneralUtils.functions.getFileName(GeneralUtils.functions.contentPath)}
          ></FullViewDocument>
              </Card.Content>
            </Card>
            </TouchableOpacity>
        ))}

      </View>
    )
  }
}

const styles = StyleSheet.create({


})



