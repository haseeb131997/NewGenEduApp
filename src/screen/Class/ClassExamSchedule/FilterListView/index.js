
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
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
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete', 'Copy'] : ['View', 'Edit', 'Delete', 'Copy', 'Approve/Reject']}
                  />
                </View>
              </View>
              <Card.Content>
                <View style={[AppStyles.row_space_between, AppStyles.width80, AppStyles.alignSelf, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.examDescription}</Subheading>
                    <Caption style={AppStyles.textAlign_center}>{rowData.exam}</Caption>
                  </View>
                  <View style={[AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.class}</Subheading>
                    <Caption style={AppStyles.textAlign_center}>{rowData.classDesc}</Caption>
                  </View>
                </View>



                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, styles.contaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.startDate}</Subheading>
                    <Text style={AppStyles.textColor}>{'Start Date'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, styles.contaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.endDate}</Subheading>
                    <Text style={AppStyles.textColor}>{'End Date'}</Text>
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

})



