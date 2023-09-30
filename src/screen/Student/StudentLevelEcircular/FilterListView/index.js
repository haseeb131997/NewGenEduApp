
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
//import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Card, Subheading, Text,  } from 'react-native-paper';
import Ribbon from "../../../../components/Ribbon";
import CustomButtons from '../../../../components/CustomButtons';
import StudentSerachBox from '../../../../components/StudentSerachBox';
import DocumentCustom from '../../../../components/DocumentCustom';
import NewOperation from "../../../../utils/NewOperation";
import apiCall from "../../../../ApiCall/ActionApi";


var showResults = []

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
      searchQuery:''
    }
  }



  // getlable(status){
  //  if(status == 'Not Signed'){
  //   return 'Parent not signed'
  //  }
  //  else{
  //   return 'Parent signed'
  //  }
  // }

  sign(rowData, index){
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
     console.log('Sign Api call is completed ')
    //})
  }
    })

  }


  onChangeSearch(text){
    this.setState({
     searchQuery:text
    }) 
   }


  render() {
    const { stateObject } = this.props;
    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    
    var mapping=['circularDate','circularDescription','circularPath','signStatus']

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
              <Ribbon
                stateObject={stateObject}
                label={rowData.signStatus}
                status={rowData.signStatus == 'Not Signed' ? 'R' : 'A'}
              />
              <Card.Content>
                {/* <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption style={AppStyles.textColor}>{rowData.studentID}</Caption>
                </View> */}


                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.titleColor}>{rowData.circularDate}</Subheading>
                    <Text style={AppStyles.textColor}>{'Cicular Date'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.circularDescription}</Subheading>
                    <Text style={AppStyles.textColor}>{'Circular Description'}</Text>
                  </View>
                </View>

               




                {(rowData.circularPath != '' && (GeneralUtils.functions.getFileType(rowData.circularPath) == 'pdf')) &&
                  <DocumentCustom
                    openDocument={() => GeneralUtils.functions.openDocument(stateObject, rowData.circularPath)}
                    stateObject={stateObject}
                    source={GeneralUtils.functions.getSource(rowData.circularPath, stateObject)}
                    fileName={GeneralUtils.functions.getFileName(rowData.circularPath)}
                  />}






                {((stateObject.state.userType == "P" || stateObject.state.userType == "S") && rowData.signStatus == 'Not Signed') && <View style={[AppStyles.alignItems, AppStyles.marginTop_3]}>
                  <CustomButtons
                    onPress={() => this.sign(rowData, index)}
                    title="Sign"
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



