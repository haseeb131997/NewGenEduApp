
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image } from 'react-native';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import CustomButtons from '../../../../components/CustomButtons';
import SubScreenUtils from "../../../../utils/SubScreenUtils";
import NewOperation from "../../../../utils/NewOperation";
import apiCall from "../../../../ApiCall/ActionApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem } from 'react-native-elements';
import Batch from "../../../../components/Batch";



export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  async viewDetails(rowData, index) {
    const { stateObject } = this.props;
    console.log(rowData)

    var filenameArray = []

    stateObject.state.currentOperation = "SecondLevel";
    stateObject.state.childViewDetails = rowData
    await NewOperation.functions.screenEventHandler(stateObject);

    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

 


    
    var iterate = stateObject.state.childViewDetails.lessonDetails

  
    for (let i = 0; i < iterate.length && i < 10; i++) {
      if (!iterate[i].contentPath.includes("CohesiveUpload") && !iterate[i].contentPath.includes("youtube") && !iterate[i].contentPath.includes("youtu.be")) {
        var filename = iterate[i].contentPath.substr(iterate[i].contentPath.lastIndexOf('/') + 1, iterate[i].contentPath.length);
        var obj = {
          filename: filename
        };
        filenameArray.push(obj);
      }

    }


    stateObject.parentStateChange({
      isLoading: true,
      isChildRecordShow: true,
    })

    await SubScreenUtils.functions.getOracleUrl_Util(filenameArray, stateObject);

    const result_oracleURI = new Map();

    for (let j = 0; j < SubScreenUtils.functions.oracleURL.length; j++) {
      result_oracleURI.set(SubScreenUtils.functions.oracleURL[j].fileName, SubScreenUtils.functions.HOST + SubScreenUtils.functions.oracleURL[j].URI);

    }


    for (let i = 0; i < iterate.length && i < 10; i++) {
      if (!stateObject.state.childViewDetails.lessonDetails[i].contentPath.includes("CohesiveUpload") && !stateObject.state.childViewDetails.lessonDetails[i].contentPath.includes("youtube") && !stateObject.state.childViewDetails.lessonDetails[i].contentPath.includes("youtu.be") ) {

        var filename = stateObject.state.childViewDetails.lessonDetails[i].contentPath.substr(stateObject.state.childViewDetails.lessonDetails[i].contentPath.lastIndexOf('/') + 1, stateObject.state.childViewDetails.lessonDetails[i].contentPath.length);
        stateObject.state.childViewDetails.lessonDetails[i].contentPath = result_oracleURI.get(filename);
      }
      else{
        stateObject.state.childViewDetails.lessonDetails[i].instituteID = globalData.instituteID;
      }
    }





    if (apiCall.functions.apiError) {
      stateObject.parentStateChange({
        isLoading: false,
      })
    }
    else {
      stateObject.parentStateChange({
        summaryResultIndex: index,
        // isChildRecordShow: true,
        childViewDetails: stateObject.state.childViewDetails,
        isLoading: false,
        currentOperation: ''
      })
    }

  }


  render() {
    const { stateObject } = this.props;
    var showResults = []
    showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    return (
      <View>
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>
             
              <Card.Content>
                <View style={[AppStyles.alignSelf]}>
                  <View style={[AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.subjectName}</Subheading>
                    <Caption style={AppStyles.textColor}>{'Subject'}</Caption>
                  </View>
                  <View style={[AppStyles.alignItems, AppStyles.marginTop_1]}>
                  <Caption style={AppStyles.textColor}>{'Lessons applicable to'}</Caption>
                    <Subheading style={[AppStyles.titleColor,AppStyles.textAlign_center]}>{rowData.groupDesc}</Subheading>
                  </View>
                </View>
                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor]}
                    source={require('./../../../../asssets/icons/video-lesson.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of lessons</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.lessonCount}</Text>
                  </View>
                </ListItem>

                <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Lessons"
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleColor: {
    color: UiColor.SKYBLUE,
    fontWeight: '500'
  },
  instructionStyle: {
    color: UiColor.LIGHT_TEXT_COLOR, textAlign: 'center'
  }
})



