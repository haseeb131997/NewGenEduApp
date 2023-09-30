
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
//import { h, w } from '../../../../utils/Dimensions';
//import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";


export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete'] : ['View', 'Edit', 'Delete', 'Approve/Reject']}

                  />
                </View>
              </View>
              <Card.Content>
                <View style={[AppStyles.row_space_between, AppStyles.width85, AppStyles.alignSelf, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.width48, AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.titleColor,AppStyles.textAlign_center]}>{rowData.examDescription}</Subheading>
                    <Caption >{'Exam'}</Caption>
                  </View>
                  <View style={[AppStyles.width48, AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.class}</Subheading>
                    <Caption >{rowData.classDescription}</Caption>
                  </View>
                </View>

                <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                  <Text style={AppStyles.titleColor}>Skills assessed</Text>
                </View>
                <View >
                  <View style={AppStyles.flex_one}>
                  {rowData.skillsAssessed.map((itemData, index1) => (
                    <View key={index1.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index1) }]}>
                      <View style={[AppStyles.row_space_between,]}>
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Skill name'}</Text>
                        </View>
                        {<View style={[]}>
                          <Text style={AppStyles.countStyle}>{itemData}</Text>
                        </View>}
                      </View>
                    </View>))
                  }
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
 
})



