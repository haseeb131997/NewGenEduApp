
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform,Image } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";
import { ListItem } from 'react-native-elements';

import CustomButtons from '../../../../components/CustomButtons';
import NewOperation from "../../../../utils/NewOperation";
import { cloneDeep } from 'lodash';




export default class ChildRecordListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentPath: '',
      showWebView: false
    }
  }




async showMore(){
  const { stateObject } = this.props;
  var  parentPageDetial = cloneDeep(stateObject.state.summaryDataModel.pageDetails)

  stateObject.state.summaryDataModel.pageDetails = stateObject.state.secondLevelPageDetails
  stateObject.state.currentOperation = "SecondLevel";
  await NewOperation.functions.screenEventHandler(stateObject);

  stateObject.state.summaryDataModel.pageDetails = parentPageDetial
  stateObject.setState({
    summaryDataModel:stateObject.state.summaryDataModel
  })
}




  render() {
    const { stateObject } = this.props;
    const { childViewDetails } = stateObject.state

  

    return (
      <View>
        {childViewDetails != null && childViewDetails.paymentDetails.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>
              <View style={AppStyles.row_space_between}>
                <Ribbon
                  stateObject={stateObject}
                  label={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AuthStatusMaster, rowData.authStat)}
                  status={rowData.authStat}
                />
                <View/>
                <View style={AppStyles.menuContainer}>
                  <SideMenu
                    summaryResultIndex={stateObject.state.summaryResultIndex}
                    viewDetail={rowData}
                    stateObject={stateObject}
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete'] : ['View', 'Edit', 'Delete','Approve/Reject']}
                  />
                </View>
              </View>
              <Card.Content>

              <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption style={AppStyles.textColor}>{rowData.studentID}</Caption>
                </View>



                
                

             




                <ListItem>
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.voiletImgColor]}
                    source={require('./../../../../asssets/icons/fin003.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Amount Paid</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.amountPaid}</Text>
                    <Caption style={AppStyles.currentTextStyle}>{stateObject.state.currencyCode}</Caption>
                  </View>
                </ListItem>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}




               {stateObject.state.secondLevelPageDetails.moreRecExists &&
                <View style={[AppStyles.alignItems, AppStyles.marginTop_3,]}>
                  <CustomButtons
                    onPress={() => this.showMore(stateObject)}
                    title="Show more"
                    titleStyle={AppStyles.signInTextStyle}
                    containerStyle={AppStyles.btnContainer}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                </View>} 






      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})



