
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity ,Image} from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import CustomButtons from '../../../../components/CustomButtons';
import apiCall from "../../../../ApiCall/ActionApi";
import NewOperation from "../../../../utils/NewOperation";
import Ribbon from "../../../../components/Ribbon";
import Batch from "../../../../components/Batch";
import SelectListUtils from '../../../../utils/SelectListUtils'
import SideMenu from "../../../../components/SideMenu";
import { ListItem } from 'react-native-elements';
import { cloneDeep } from 'lodash';


export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async viewDetails(rowData, index) {
    const { stateObject } = this.props;

    stateObject.state.childViewDetails.notesDetails = []

   var emptySummaryDataModel  = cloneDeep(stateObject.state.emptySummaryDataModel)

    stateObject.state.emptySummaryDataModel.filter =  stateObject.state.summaryDataModel.filter 

    var  parentPageDetial = cloneDeep(stateObject.state.summaryDataModel.pageDetails)

    stateObject.state.summaryDataModel.pageDetails.pageNumber =  0
    stateObject.state.summaryDataModel.pageDetails.recordStartingNumber =  0
    stateObject.state.summaryDataModel.pageDetails.recordEndingNumber =  0
    stateObject.state.summaryDataModel.pageDetails.totalRecords =  0
    stateObject.state.summaryDataModel.pageDetails.totalPages =  0

    stateObject.state.currentOperation = "SecondLevel";
    stateObject.state.childViewDetails = rowData
    await NewOperation.functions.screenEventHandler(stateObject);

    for (let i = 0; i < stateObject.state.childViewDetails.notesDetails.length; i++) {
      stateObject.state.childViewDetails.notesDetails[i].studentID = stateObject.state.summaryDataModel.filter.studentID
      stateObject.state.childViewDetails.notesDetails[i].studentName = stateObject.state.summaryDataModel.filter.studentName
    }

    stateObject.state.summaryDataModel.pageDetails = parentPageDetial
    if (apiCall.functions.apiError) {
      stateObject.parentStateChange({
        isLoading: false,
      })
    }
    else {
      stateObject.parentStateChange({
        summaryResultIndex: index,
        isChildRecordShow: true,
        childViewDetails: stateObject.state.childViewDetails,
        summaryDataModel:stateObject.state.summaryDataModel,
        emptySummaryDataModel:emptySummaryDataModel,
        isLoading: false,
        currentOperation: ''
      })
    }
  }





  getNoon(noon) {
    switch (noon) {
      case 'F':
        return 'Forenoon'
        break
      case 'A':
        return 'Afternoon'
        break
    }
  }

  getType(type) {
    if(type == 'S' || type == 'P' || type == 'C'){
     return SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LeaveMaster,type)
    }
    else{
      return type
    }
  }



  render() {
    const { stateObject } = this.props;
    var showResults = []
    //showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    if (stateObject.state.userType == 'P' || stateObject.state.userType == 'S')
    showResults = GeneralUtils.functions.getParentTransactionSummaryResult(stateObject)
   else
   showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    return (
      <View>
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>

              <Card.Content>

                <View style={[AppStyles.alignItems]}>
                  <Title style={[AppStyles.titleColor]}>{rowData.subjectName}</Title>
                  <Caption style={[AppStyles.width85, AppStyles.textAlign_center,AppStyles.textColor]}>{'Subject'}</Caption>
                </View>

                {/* <View style={[ AppStyles.marginTop_2]}>
                  

                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.standard}</Subheading>
                    <Text style={AppStyles.textColor}>{'Standard'}</Text>
                  </View>
                </View> */}



               {rowData.notesCount != 0 && <ListItem >
                <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor]}
                    source={require('./../../../../asssets/icons/grp.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of notes  </Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.notesCount}</Text>
                   
                  </View>
                </ListItem>}


                <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Notes"
                    // titleStyle={AppStyles.signInTextStyle}
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

})



