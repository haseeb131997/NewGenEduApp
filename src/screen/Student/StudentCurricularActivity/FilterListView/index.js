
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
//import { h, w } from '../../../../utils/Dimensions';
//import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import {  Card, Subheading, Text,} from 'react-native-paper';
import SelectListUtils from "../../../../utils/SelectListUtils";
import Batch from "../../../../components/Batch";
import StudentSerachBox from '../../../../components/StudentSerachBox';
import CustomButtons from '../../../../components/CustomButtons';
import { UiColor } from '../../../../theme';
import NewOperation from "../../../../utils/NewOperation";
import apiCall from "../../../../ApiCall/ActionApi";
import SubScreenUtils from "../../../../utils/SubScreenUtils";
import cloneDeep from 'lodash/cloneDeep';
var showResults = []

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
      searchQuery:''
    }
  }

  onChangeSearch(text){
    this.setState({
     searchQuery:text
    }) 
   }
async gallery(rowData, index,stateObject)
{
  var filenameArray = [];
const result_oracleURI = new Map();
for(let i=0; i<rowData.eventImages.length; i++){
	var obj = {
		filename: rowData.eventImages[i].imagePath
	};
	filenameArray.push(obj);
}
stateObject.parentStateChange({
  isLoading: true,
  // isChildRecordShow: true,
})
await SubScreenUtils.functions.getOracleUrl_Util(filenameArray, stateObject);

stateObject.parentStateChange({
  isLoading: false,
})
var dummyimages = cloneDeep(rowData.eventImages)
if(!SubScreenUtils.functions.getOracleURIStatus){
	return false;
}
for(let j=0; j<SubScreenUtils.functions.oracleURL.length; j++){
	result_oracleURI.set(SubScreenUtils.functions.oracleURL[j].fileName, SubScreenUtils.functions.HOST+(SubScreenUtils.functions.oracleURL[j].URI )); 
}
for(let i=0; i<dummyimages.length; i++){
	var filename = dummyimages[i].imagePath;
	dummyimages[i].imagePath = result_oracleURI.get(filename);
}
console.log('Inside galerry function',dummyimages)

  stateObject.parentStateChange({
    viewModelVisible : true,
    imagesList:dummyimages

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


  render() {
    const { stateObject } = this.props;

    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    var mapping=['activityName','date','dueDate','maxEnroll','maxParticipation','venue','feeDescription','feeDueDate','feeDescription','amount']

    showResults = GeneralUtils.functions.studentSerachFilter(stateObject, GeneralUtils.functions.getSummaryResult(stateObject),mapping,this.state.searchQuery)

    return (
      <View>
        <StudentSerachBox
    searchQuery={this.state.searchQuery}
    stateObject={stateObject}
    onChangeSearch={(text)=> this.onChangeSearch(text)}
    />
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>

              <Card.Content>
                {/* <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption style={AppStyles.textColor}>{rowData.studentID}</Caption>
                </View> */}


                <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  <Subheading style={AppStyles.primaryTitleStyle}>{'Event Information'}</Subheading>
                </View>

                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.textAlign_center}>{rowData.activityName}</Subheading>
                    <Text style={AppStyles.textColor}>{'Activity Name'}</Text>
                  </View>
                </View>



                {rowData.level != '' ? <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.ActivityTypeMaster, rowData.activityType)}</Subheading>
                    <Text style={AppStyles.textColor}>{'Activity Type'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.OtherActivityLevelMaster, rowData.level)}</Subheading>
                    <Text style={AppStyles.textColor}>{'Level'}</Text>
                  </View>
                </View> : <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.ActivityTypeMaster, rowData.activityType)}</Subheading>
                    <Text style={AppStyles.textColor}>{'Activity Type'}</Text>
                  </View>
                </View>}

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.date}</Subheading>
                    <Text style={AppStyles.textColor}>{'Event Date'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.textAlign_center}>{rowData.venue}</Subheading>
                    <Text style={AppStyles.textColor}>{'Venue'}</Text>
                  </View>
                </View>


                <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  <Subheading style={AppStyles.primaryTitleStyle}>{'Enroll details'}</Subheading>
                </View>

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    {/* <Subheading >{rowData.dueDate}</Subheading> */}
                    <Batch
                      value={this.getParticipationStatus(rowData).lable}
                      status={this.getParticipationStatus(rowData).status}
                    />
                    <Text style={AppStyles.textColor}>{'Participation status'}</Text>
                  </View>
                </View>
                
                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                {rowData.maxEnroll!='' && 
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.maxEnroll}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Maximum no. of students who can enroll'}</Text>
                  </View> }
                 {rowData.maxParticipation!='' && 
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.maxParticipation}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Maximum no. of students who can partcipate'}</Text>
                  </View>}
                </View>
               {rowData.dueDate !='' &&
                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.dueDate}</Subheading>
                    <Text style={AppStyles.textColor}>{'Last date for enrollment'}</Text>
                  </View>
                </View>}


                {rowData.feeID != '' && <View>
                  <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.primaryTitleStyle}>{'Fee Information'}</Subheading>
                  </View>

                  <View style={[AppStyles.marginTop_1]}>
                    <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                      <Subheading >{rowData.feeDescription}</Subheading>
                      <Text style={AppStyles.textColor}>{'Fee Description'}</Text>
                    </View>
                  </View>

                  <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                    <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                      <Subheading >{rowData.feeDueDate}</Subheading>
                      <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Fee Due date'}</Text>
                    </View>

                    <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                      <Subheading >{rowData.amount} {stateObject.state.currencyCode}</Subheading>
                      <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Amount'}</Text>
                    </View>
                  </View>
                </View>}

                {(!rowData.enroll && rowData.eventImages.length>0) && <View style={[AppStyles.alignItems, AppStyles.marginTop_3, AppStyles.flexDirectionRow, AppStyles.space_around]}>
                  <CustomButtons
                    onPress={() => this.enroll(rowData, index)}
                    title="Enroll"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                  <CustomButtons
                    onPress={() => this.gallery(rowData, index,stateObject)}
                    title="Gallery"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                </View>}
                {(!rowData.enroll && rowData.eventImages.length==0) && <View style={[AppStyles.alignItems, AppStyles.marginTop_3]}>
                  <CustomButtons
                    onPress={() => this.enroll(rowData, index)}
                    title="Enroll"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                  
                </View>}
                {(rowData.enroll && rowData.eventImages.length>0) && <View style={[AppStyles.alignItems, AppStyles.marginTop_3]}>
                   <CustomButtons
                    onPress={() => this.gallery(rowData, index,stateObject)}
                    title="Gallery"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                </View>}  


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



