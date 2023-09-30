
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image} from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import CustomButtons from '../../../../components/CustomButtons';
import NewOperation from "../../../../utils/NewOperation";
import apiCall from "../../../../ApiCall/ActionApi";
import { ListItem } from 'react-native-elements';



export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async viewDetails(rowData, index) {

  

    rowData.assessmentStatus = 'Y'
    const { stateObject } = this.props;
    stateObject.state.currentOperation = "SecondLevel";
    stateObject.state.childViewDetails = rowData
    await NewOperation.functions.screenEventHandler(stateObject);

    for(let item of stateObject.state.childViewDetails.assignments){
      item.classID = stateObject.state.childViewDetails.classID
    }

    if (apiCall.functions.apiError) {

    }
    else {
      stateObject.parentStateChange({
        summaryResultIndex: index,
        isChildRecordShow: true,
        childViewDetails:stateObject.state.childViewDetails,
        currentOperation: ''
      })
    }

  }

  async assessDetails(rowData, index) {


    rowData.assessmentStatus = 'N'
    const { stateObject } = this.props;
    stateObject.state.currentOperation = "SecondLevel";
    stateObject.state.childViewDetails = rowData
    await NewOperation.functions.screenEventHandler(stateObject);

    for(let item of stateObject.state.childViewDetails.assignments){
      item.classID = stateObject.state.childViewDetails.classID
    }

    if (apiCall.functions.apiError) {

    }
    else {
      stateObject.parentStateChange({
        summaryResultIndex: index,
        isChildRecordShow: true,
        childViewDetails:stateObject.state.childViewDetails,
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
                    <Text style={AppStyles.textColor}>Total no. of assignments : <Text>{rowData.assignmentCount}</Text></Text>
                  </ListItem.Content>
                  {/* <View>
                    <Text>{rowData.assignmentCount}</Text>
                  </View> */}
                </ListItem>

                {rowData.assessedCount != 0 && <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.succusImgColor]}
                    source={require('./../../../../asssets/icons/assignment.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of assignments assessed : <Text>{rowData.assessedCount}</Text></Text>
                  </ListItem.Content>
                  <View>
                    {/* <Text>{rowData.assessedCount}</Text> */}
                    <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                  </View>
                </ListItem>}

                {rowData.notAssessedCount != 0 && <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.errorImgColor]}
                    source={require('./../../../../asssets/icons/assignment.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of assignments yet to be assessed : <Text>{rowData.notAssessedCount}</Text></Text>
                  </ListItem.Content>
                  <View>
                    {/* <Text>{rowData.notAssessedCount}</Text> */}
                    <CustomButtons
                    onPress={() => this.assessDetails(rowData, index)}
                    title="Assess"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                  </View>
                </ListItem>}


                {/* <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
             
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Assignments"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                </View> */}
          


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



