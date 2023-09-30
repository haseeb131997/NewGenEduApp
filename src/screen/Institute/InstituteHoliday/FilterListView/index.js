
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image } from 'react-native';
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
    showResults = GeneralUtils.functions.getSummaryResult(stateObject)
  
    return (
      <View>
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>
            {(stateObject.state.userType == "A" || stateObject.state.userType == "O" || stateObject.state.userType == "T") && <View style={AppStyles.row_space_between}>
                <Ribbon
                  stateObject={stateObject}
                  label={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AuthStatusMaster, rowData.authStat)}
                  status={rowData.authStat}
                />
               {stateObject.state.userType != "T" ? <View style={AppStyles.menuContainer}>
                <SideMenu
                summaryResultIndex={index}
                 viewDetail={rowData}
                 stateObject={stateObject}
                  menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ?  ['View', 'Edit', 'Delete'] : ['View', 'Edit', 'Delete', 'Approve/Reject']}
                />
                </View> : <View/>}
              </View>}
              <Card.Content>
                <View style={[AppStyles.row_space_between,AppStyles.width80,AppStyles.alignSelf,AppStyles.marginTop_2]}>
                  <View style={AppStyles.alignItems}>
                  <Subheading style={AppStyles.titleColor}>{rowData.year} {SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MonthMaster, rowData.month)}</Subheading>
                  <Caption >{'Year & Month'}</Caption>
                    </View>
                    <View style={AppStyles.alignItems}>
                  <Subheading style={AppStyles.titleColor}>{rowData.classCode}</Subheading>
                  <Caption >{'Class'}</Caption>
                    </View>
                    
                </View>

                <View style={[AppStyles.dashContainer,AppStyles.marginTop_2]}>
                    {/* <Subheading >{rowData.month}</Subheading> */}
                    <Text style={AppStyles.holidayInstructionStyle}> {rowData.classCode == 'ALL' ? 'Holiday is applicable for all the classes in the Institute' : `Holiday is applicable for the class ${rowData.classDesc}`}</Text>
                  </View>


                  { <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor]}
                    source={require('./../../../../asssets/icons/grp.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of working days</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.workingDayCount}</Text>
                  </View>
                </ListItem>}
                { <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor]}
                    source={require('./../../../../asssets/icons/grp.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of holidays</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.holidayCount}</Text>
                  </View>
                </ListItem>}



                {(stateObject.state.userType == "P" || stateObject.state.userType == "S" || stateObject.state.userType == "T" ) && <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View calendar"
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
    top:h('1%'),
    right:h('2%')
  
  },
  titleColor:{
    color: UiColor.SKYBLUE,
    fontWeight:'500' 
  },
  instructionStyle:{
    color: UiColor.LIGHT_TEXT_COLOR,textAlign:'center'
  }
})



