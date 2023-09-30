
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";
import { ListItem } from 'react-native-elements';



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
                <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                  <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{rowData.groupDescription}</Subheading>
                  <Caption style={[AppStyles.width85, AppStyles.textAlign_center]}>Group Description</Caption>
                </View>

                {rowData.classCount != '0' && <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor,]}
                    source={require('./../../../../asssets/icons/grp.png')}
                  />
                  <ListItem.Content>
                    <Text style={[AppStyles.textColor,]}>No of classes under this group</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.classCount}</Text>
                  </View>
                </ListItem>}

                {rowData.studentCount != '0' && <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor]}
                    source={require('./../../../../asssets/icons/grp.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No of students under this group</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.studentCount}</Text>
                  </View>
                </ListItem>}

                {/* <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, styles.contaierWidth]}>
                    <Subheading >{rowData.teacherName}</Subheading>
                    <Text style={AppStyles.textColor}>{'Teacher Name'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, styles.contaierWidth]}>
                    <Subheading >{rowData.Standard}/{rowData.Section}</Subheading>
                    <Text style={AppStyles.textColor}>{'Standard/Section'}</Text>
                  </View>
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
    fontWeight: '500',
    textAlign: 'center'
  },





})



