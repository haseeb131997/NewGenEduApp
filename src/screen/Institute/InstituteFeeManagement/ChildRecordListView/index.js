
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





export default class ChildRecordListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentPath: '',
      showWebView: false
    }
  }









  render() {
    const { stateObject } = this.props;
    const { childViewDetails } = stateObject.state

    return (
      <View>
        {childViewDetails != null && childViewDetails.feeDetails.map((rowData, index) => (
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
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete','Copy'] : ['View', 'Edit', 'Delete','Copy','Approve/Reject']}
                  />
                </View>
              </View>
              <Card.Content>
              <View style={[AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.feeDescription}</Subheading>
                    <Caption >{rowData.feeID}</Caption>
                  </View>

              {/* <View style={[AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.dueDate}</Subheading>
                    <Caption >{'Due Date'}</Caption>
                  </View> */}

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.dueDate}</Subheading>
                    <Text style={AppStyles.textColor}>{'Due Date'}</Text>
                  </View>
                </View>

                {/* <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.feePerStudent}</Subheading>
                    <Text style={AppStyles.textColor}>{'Fee amount per student'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                  <Text style={AppStyles.textColor}>{'Applicable to'}</Text>
                    <Subheading >{rowData.noOfStudents} Students</Subheading>
                   
                  </View>
                </View> */}


             <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth,AppStyles.alignItems]}>
                    <Subheading >{stateObject.state.currencyCode} {rowData.feePerStudent}</Subheading>
                    <Text style={[AppStyles.textColor,AppStyles.textAlign_center]}>{'Per student'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth,AppStyles.alignItems]}>
                    <Subheading >{rowData.noOfStudents} Students</Subheading>
                    <Text style={AppStyles.textColor}>{'Applicable'}</Text>
                  </View>
                </View>


                <ListItem>
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.voiletImgColor]}
                    source={require('./../../../../asssets/icons/fin003.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Total fee</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.totalFeeAmount}</Text>
                    <Caption style={AppStyles.currentTextStyle}>{stateObject.state.currencyCode}</Caption>
                  </View>
                </ListItem>


                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.primaryImgColor]}
                    source={require('./../../../../asssets/icons/gen037.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Received</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.amountCollected}</Text>
                    <Caption style={AppStyles.currentTextStyle}>{stateObject.state.currencyCode}</Caption>
                  </View>
                </ListItem>


                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
                    source={require('./../../../../asssets/icons/abs019.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Pending</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.amountPending}</Text>
                    <Caption style={AppStyles.currentTextStyle}>{stateObject.state.currencyCode}</Caption>
                  </View>
                </ListItem>


                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
                    source={require('./../../../../asssets/icons/gen044.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>Overdue</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.amountOverDue}</Text>
                    <Caption style={AppStyles.currentTextStyle}>{stateObject.state.currencyCode}</Caption>
                  </View>
                </ListItem>
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



