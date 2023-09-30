
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image } from 'react-native';
//import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import CustomButtons from '../../../../components/CustomButtons';
//import SideMenu from "../../../../components/SideMenu";
//import SelectListUtils from '../../../../utils/SelectListUtils'
//import Ribbon from "../../../../components/Ribbon";
//import ListItems from '../../../../components/ListItems';
//import Batch from "../../../../components/Batch";
import MeetingAttendance from '../MeetingAttendance';

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async viewDetails(rowData, index) {
    const { stateObject } = this.props;
    
    
    
      stateObject.parentStateChange({
        viewModelVisible : true,
        meetingData:rowData,
          speedDialRequired:false  
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
              {/*<View style={AppStyles.row_space_between}>
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
                />
                </View>
        </View>*/}
              <Card.Content>
                <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.date}</Title>
                  <Caption >{'Date'}</Caption>
                </View>
                
                <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.meetingType}</Title>
                  <Caption >{'Meeting Type'}</Caption>
                </View>
                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth,AppStyles.alignItems]}>
                    <Subheading >{rowData.applicableFor}</Subheading>
                    <Text style={AppStyles.textColor}>{'Attendees'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth,AppStyles.alignItems]}>
                    <Subheading >{rowData.startTime}</Subheading>
                    <Text style={AppStyles.textColor}>{'Start Time'}</Text>
                  </View>
                  
                </View>
                <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                    <Subheading >{rowData.duration}</Subheading>
                    <Text style={AppStyles.textColor}>{'Duration (in min)'}</Text>
                  </View>

               
                  { !(stateObject.state.userType == 'P' || stateObject.state.userType == 'S') &&
               
                <View >
                  <ListItem >
                <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor]}
                    source={require('./../../../../asssets/icons/grp.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of people who are applicable to attend this meeting</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.totalCount}</Text>
                  </View>
                </ListItem>



              
                <ListItem>
                <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor]}
                    source={require('./../../../../asssets/icons/grp.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of people who attendend this meeting</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.attendedCount}</Text>
                  </View>
                </ListItem>
                

              
                
                <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Meeting Attendance"
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                </View>
                </View>}
                { (stateObject.state.userType == 'P' || stateObject.state.userType == 'S') &&
                     <View >
                     <MeetingAttendance stateObject={stateObject} data={rowData}></MeetingAttendance>
                    </View>
                    }       

                     
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



