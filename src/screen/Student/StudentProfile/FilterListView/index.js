
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title,Avatar } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";
import Batch from "../../../../components/Batch";
import CustomButtons from '../../../../components/CustomButtons';
import NewOperation from "../../../../utils/NewOperation";



export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  viewDetails(rowData,index) {
    const { stateObject } = this.props;
    
    stateObject.setState({
          viewDetail: rowData,
          currentOperation: 'Query',
          selectedTabIndex: 0,
    }, () => {
      NewOperation.functions.screenEventHandler(stateObject)
    })
  }


  render() {
    const { stateObject } = this.props;
    var showResults = []




    // showResults = (stateObject.state.summaryDataModel.pageDetails.searchType == 'More' || stateObject.state.summaryDataModel.pageDetails.searchType == 'Initial') ? stateObject.state.summaryDataModel.SummaryResult : stateObject.state.summaryResultByFilter.SummaryResult

    showResults = GeneralUtils.functions.getSummaryResult(stateObject)
  
    return (
      <View>
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>
            {(stateObject.state.userType == "A" || stateObject.state.userType == "T" || stateObject.state.userType == "O") ? <View style={AppStyles.row_space_between}>
                <Ribbon
                  stateObject={stateObject}
                  label={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AuthStatusMaster, rowData.authStat)}
                  status={rowData.authStat}
                />
                <View style={AppStyles.menuContainer}>
                <SideMenu
                summaryResultIndex={index}
                 viewDetail={rowData}
                 stateObject={stateObject}
                  menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ?  ['View', 'Edit', 'Delete'] : ['View', 'Edit', 'Delete', 'Approve/Reject']}
                  // menuTitle={['View', 'Edit', 'Delete', 'Approve/Reject']}
                />
                </View>
              </View> : <View style={AppStyles.marginTop_3}/>}
              <Card.Content>
                <View style={AppStyles.alignItems}>
                <Avatar.Image size={AppStyles.profileAvatarSize.height} source={GeneralUtils.functions.getImagePath(stateObject,rowData.profileImgPath)} />

                  
                <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                <Caption >{rowData.studentID}</Caption>
                </View>

               {(rowData.class != '' && rowData.class != undefined) ? <View style={[ AppStyles.marginTop_2,AppStyles.alignItems]}>
               <Title style={AppStyles.primaryTitleStyle}>{rowData.class}</Title>
                <Caption >{rowData.classDesc}</Caption>
                </View>
                :
                 <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                 <Batch
                    value={'Student is not assigned to any class'}
                    status={'app'}
                  />
                 </View>
                }

                {(stateObject.state.userType == "P" || stateObject.state.userType == "S") && <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Profile"
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



