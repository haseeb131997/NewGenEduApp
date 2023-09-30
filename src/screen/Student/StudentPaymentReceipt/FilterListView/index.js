
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import StudentSerachBox from '../../../../components/StudentSerachBox';
import CustomButtons from '../../../../components/CustomButtons';
import ReceiptModal from '../ReceiptModal';
import NewOperation from "../../../../utils/NewOperation";


var showResults = []

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
      searchQuery: '',
      twoLevelModalVisible:false
    }
  }


  onChangeSearch(text) {
    this.setState({
      searchQuery: text
    })
  }

 async ViewReceipt(rowData, index) {
    const { stateObject } = this.props;

    await  stateObject.setState({
      viewDetail: rowData,
    })

    await NewOperation.functions.view(stateObject)
  
    await  stateObject.callReport(rowData)
  }




  render() {
    const { stateObject } = this.props;

    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    var mapping = ['paymentDate','paymentPaid']

    showResults = GeneralUtils.functions.studentSerachFilter(stateObject, GeneralUtils.functions.getSummaryResult(stateObject), mapping, this.state.searchQuery)


    return (
      <View>
        <StudentSerachBox
          searchQuery={this.state.searchQuery}
          stateObject={stateObject}
          onChangeSearch={(text) => this.onChangeSearch(text)}
        />
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>

              <Card.Content>
                {/* <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption style={AppStyles.textColor}>{rowData.studentID}</Caption>
                </View> */}

                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.titleColor} >{rowData.paymentDate}</Subheading>
                    <Text style={AppStyles.textColor}>{'Payment Date'}</Text>
                  </View>
                </View>
                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading  >{rowData.paymentPaid} {stateObject.state.currencyCode}</Subheading>
                    <Text style={AppStyles.textColor}>{'Paid Amount'}</Text>
                  </View>
                </View>


                {rowData.Payments.length != 0 &&
                  <View >
                    <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                      <Subheading >{'Fee Paid details'}</Subheading>
                    </View>
                    <View style={AppStyles.flex_one}>
                      {rowData.Payments.map((itemData, index1) => (
                        <View key={index1.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index1) }]}>
                          <Text style={AppStyles.primaryTitleStyle}>{itemData.paymentForFee} {stateObject.state.currencyCode}</Text>
                          <View style={[AppStyles.row_space_between,]}>
                            <View style={AppStyles.width48}>
                              <Text style={AppStyles.textColor}>{'Fee Description:'}</Text>
                            </View>
                            {<View style={AppStyles.flex_one}>
                              <Text style={AppStyles.countStyle}>{itemData.feeDescription}</Text>
                            </View>}
                          </View>
                          <View style={[AppStyles.row_space_between,]}>
                            <View style={AppStyles.width48}>
                              <Text style={AppStyles.textColor}>{'Due Date:'}</Text>
                            </View>
                            {<View style={AppStyles.flex_one}>
                              <Text style={AppStyles.countStyle}>{itemData.dueDate}</Text>
                            </View>}
                          </View>
                        </View>))
                      }
                    </View>
                  </View>
                }






                {<View style={[AppStyles.alignItems, AppStyles.marginTop_3]}>
                  <CustomButtons
                    onPress={() => this.ViewReceipt(rowData, index)}
                    title="View Receipt"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
                </View>}




              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

       <ReceiptModal
          stateObject={stateObject}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({


})



