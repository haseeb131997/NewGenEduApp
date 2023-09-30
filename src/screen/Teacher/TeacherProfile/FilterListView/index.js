
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Avatar, Text, Title,Subheading } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";
import Batch from "../../../../components/Batch";



export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
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
              <View style={AppStyles.row_space_between}>
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
              </View>
              <Card.Content>
                <View style={AppStyles.alignItems}>
                <Avatar.Image size={AppStyles.profileAvatarSize.height} source={GeneralUtils.functions.getImagePath(stateObject,rowData.profileImgPath)} />

                  <Title style={[AppStyles.primaryTitleStyle,AppStyles.textAlign_center]}>{rowData.teacherName}</Title>
                  <Caption >{rowData.teacherID}</Caption>
                </View>
                {(rowData.classCode != '' && rowData.classCode != undefined) && <View style={[ AppStyles.marginTop_2,AppStyles.alignItems]}>
               <Subheading style={[AppStyles.primaryTitleStyle,AppStyles.textAlign_center]}>{rowData.classCode}</Subheading>
                <Caption >{rowData.classDescription}</Caption>
                </View>
               
                }

                <View style={[ AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, ]}>
                    {/* <Subheading >{rowData.emailID}</Subheading> */}
                    <Text style={[AppStyles.textColor,styles.textStyle]}>{rowData.emailID}, {rowData.contactNo}, {rowData.qualification}</Text>
                  </View>

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
  contaierWidth: {
    width: '48%'
  },
  menuContainer: {
    // alignItems: 'flex-end'
    top:h('1%'),
    right:h('2%')
  
  },
  textStyle:{
    textAlign:'center'
  }



})



