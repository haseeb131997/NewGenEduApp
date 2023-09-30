
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import Ribbon from "../../../../components/Ribbon";
import CustomButtons from '../../../../components/CustomButtons';
import { UiColor } from '../../../../theme';
import EmailModal from '../EmailModal';
import StudentSerachBox from '../../../../components/StudentSerachBox';






var showResults = []

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
      twoLevelModalVisible: false,
      message: '',
      searchQuery:''
    }
  }



  onChangeSearch(text){
    this.setState({
     searchQuery:text
    }) 
   }
  openModal(rowData, index) {
    this.setState({
      twoLevelModalVisible: true,
      message: rowData.message
    })
  }


  childStateChange(object) {
    this.setState(
      object
    );

  }



  render() {
    const { stateObject } = this.props;

    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)
    var mapping=['channel','date','notificationType','status','endPoint','message']

  showResults = GeneralUtils.functions.studentSerachFilter(stateObject, GeneralUtils.functions.getSummaryResult(stateObject),mapping,this.state.searchQuery)



    return (
      <View>
        <StudentSerachBox
    searchQuery={this.state.searchQuery}
    stateObject={stateObject}
    onChangeSearch={(text)=> this.onChangeSearch(text)}
    />
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>
              <Ribbon
                stateObject={stateObject}
                label={rowData.status}
                status={rowData.status == "Success" ? 'A' : 'R'}
              />
              <Card.Content>
                {/* <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption style={AppStyles.textColor}>{rowData.studentID}</Caption>
                </View> */}




                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.titleColor} >{rowData.date}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Date'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.channel}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Channel'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.notificationType}</Subheading>
                    <Text style={AppStyles.textColor}>{'Notification Type'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.endPoint}</Subheading>
                    <Text style={AppStyles.textColor}>{rowData.channel == "SMS" ? 'Mobile' : 'Email'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.primaryTitleStyle}>{'Message'}</Subheading>

                    {rowData.channel == "SMS" ? <Text style={AppStyles.textAlign_center}>{rowData.message}</Text> :
                      <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>

                        <CustomButtons
                          onPress={() => this.openModal(rowData, index)}
                          title="View message"
                          // titleStyle={AppStyles.signInTextStyle}
                          buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                        />
                      </View>
                    }
                  </View>
                </View>







              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

        <EmailModal
          stateObject={this}
          twoLevelModalVisible={this.state.twoLevelModalVisible}
          message={this.state.message}

        />

      </View>
    )
  }
}

const styles = StyleSheet.create({


})



