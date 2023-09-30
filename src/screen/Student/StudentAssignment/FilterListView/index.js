
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image} from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text,  } from 'react-native-paper';
import CustomButtons from '../../../../components/CustomButtons';
import NewOperation from "../../../../utils/NewOperation";
import apiCall from "../../../../ApiCall/ActionApi";
import { ListItem } from 'react-native-elements';
import { cloneDeep } from 'lodash';
import StudentSerachBox from '../../../../components/StudentSerachBox';



export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery:''
    }
  }

  async viewDetails(rowData, index,status) {

  
    const { stateObject } = this.props;



    var emptySummaryDataModel  = cloneDeep(stateObject.state.emptySummaryDataModel)

    stateObject.state.summaryDataModel.filter.answerStatus = status
    stateObject.state.emptySummaryDataModel.filter =  stateObject.state.summaryDataModel.filter 

    stateObject.state.currentOperation = "SecondLevel";
    stateObject.state.childViewDetails = rowData
    await NewOperation.functions.screenEventHandler(stateObject);

     for (let i = 0; i < stateObject.state.childViewDetails.assignments.length; i++) {
      stateObject.state.childViewDetails.assignments[i].studentID = stateObject.state.summaryDataModel.filter.studentID
      stateObject.state.childViewDetails.assignments[i].studentName = stateObject.state.summaryDataModel.filter.studentName
      stateObject.state.childViewDetails.assignments[i].classID = rowData.classID
      stateObject.state.childViewDetails.assignments[i].classDescription = rowData.classDescription
    }

    if (apiCall.functions.apiError) {
      stateObject.parentStateChange({
        isLoading: false,
      })
    }
    else {
      stateObject.parentStateChange({
        summaryResultIndex: index,
        isChildRecordShow: true,
        childViewDetails:stateObject.state.childViewDetails,
        currentOperation: '',
        emptySummaryDataModel:emptySummaryDataModel,
        showAnswer:false
      })
    }

  }

  onChangeSearch(text){
    this.setState({
     searchQuery:text
    }) 
   }


  render() {
    const { stateObject } = this.props;
    var showResults = []
    //showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    var mapping=['classDescription','classID','subjectName','month','year']

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
                <View style={[AppStyles.row_space_between,AppStyles.alignSelf,]}>
                  <View style={[AppStyles.width48,AppStyles.alignItems]}>
                    <Subheading style={AppStyles.titleColor}>{rowData.classID}</Subheading>
                    <Caption style={AppStyles.textAlign_center}>{rowData.classDescription}</Caption>
                  </View>
                  <View style={[AppStyles.width48,AppStyles.alignItems]}>
                    <Subheading style={AppStyles.titleColor}>{rowData.subjectName}</Subheading>
                    <Caption style={AppStyles.textAlign_center}>{'Subject'}</Caption>
                  </View>
                </View>



                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, styles.contaierWidth, AppStyles.alignItems]}>
                    <Subheading >{GeneralUtils.functions.getMonthFullName(rowData.month)}</Subheading>
                    <Text style={AppStyles.textColor}>{'Month'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, styles.contaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.year}</Subheading>
                    <Text style={AppStyles.textColor}>{'Year'}</Text>
                  </View>
                </View>

                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor]}
                    source={require('./../../../../asssets/icons/assignment.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Total no. of assignments : <Text>{rowData.totalCount}</Text></Text>
                  </ListItem.Content>
                  {/* <View>
                    <Text>{rowData.assignmentCount}</Text>
                  </View> */}
                </ListItem>

             {//(stateObject.state.userType == "P" || stateObject.state.userType == "S") && 
             <View>
               <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.succusImgColor]}
                    source={require('./../../../../asssets/icons/assignment.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of assignments answered : <Text>{rowData.answeredCount}</Text></Text>
                  </ListItem.Content>
                  <View>
                    {/* <Text>{rowData.assessedCount}</Text> */}
                    {rowData.answeredCount != 0 && (stateObject.state.userType == "P" || stateObject.state.userType == "S") && 
                    <CustomButtons
                    onPress={() => this.viewDetails(rowData, index,"A")}
                    title="View"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />}
                  </View>
                </ListItem>


                {rowData.notAnsweredCount != 0 && <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.errorImgColor]}
                    source={require('./../../../../asssets/icons/assignment.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of assignments yet to be answered : <Text>{rowData.notAnsweredCount}</Text></Text>
                  </ListItem.Content>
                  <View>
                    {/* <Text>{rowData.notAssessedCount}</Text> */}
                    {(stateObject.state.userType == "P" || stateObject.state.userType == "S") &&  //N0U-105
                    <CustomButtons
                    onPress={() => this.viewDetails(rowData, index,"N")}
                    title="Answer"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  /> }
                  </View>
                </ListItem>}
              </View>}


                {(stateObject.state.userType == "A" || stateObject.state.userType == "T" || stateObject.state.userType == "O") && <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index,'')}
                    title="View Assignments"
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
  contaierWidth: {
    width: '48%'
  },
  menuContainer: {
    top: h('1%'),
    right: h('2%')

  },
  titleColor: {
    color: UiColor.SKYBLUE,
    fontWeight: '500'
  },
  instructionStyle: {
    color: UiColor.LIGHT_TEXT_COLOR, textAlign: 'center'
  }
})



