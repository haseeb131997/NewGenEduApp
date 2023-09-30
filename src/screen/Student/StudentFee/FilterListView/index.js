
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
//import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Card, Subheading, Text, } from 'react-native-paper';
//import SelectListUtils from "../../../../utils/SelectListUtils";
import Batch from "../../../../components/Batch";
import StudentSerachBox from '../../../../components/StudentSerachBox';
import CustomButtons from '../../../../components/CustomButtons';





var showResults = []

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
      searchQuery:''
    }
  }


  onChangeSearch(text){
    this.setState({
     searchQuery:text
    }) 
   }


   payFee (rowData){
    const { stateObject } = this.props;
    console.log(rowData)
   
    stateObject.state.dataModel = rowData
    stateObject.state.dataModel.amount = rowData.feeAmount
    stateObject.state.dataModel.feePaid = rowData.feeAmount
    GeneralUtils.functions.pay(stateObject,stateObject.state.dataModel)
  }
  
  getFeeStatus(status,stateObject)
{

  switch(status)
  {
        case 'P' :
             return 'Not paid yet'
        break ;
       case 'O' :
         if (stateObject.state.userType == "P" || stateObject.state.userType == "S") 
            return ('Due date is crossed, Please pay as soon as possible')
         else
            return 'Overdue' 
       break ;
       case 'C' :
          return ('Paid')  
       default:  
          if(status.includes("~")){
            console.log("type contains tilda");
            var paymentStatus=status.split("~")[0];
            var paymentDate=status.split("~")[1];
            var paymentamount=status.split("~")[2];
            if(paymentStatus=="S"){
            result="Payment["+paymentamount+","+paymentDate+"] submission is under processing. You can refresh after sometime to check the final status.";
            }else{
            result="Payment["+paymentamount+","+paymentDate+"] submission is failed";
            }
            console.log("end of "+result);
            return result
            }   

  }
  
}

  render() {
    const { stateObject } = this.props;

    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)

    var mapping=['feeDescription','feeType','dueDate','feeAmount','paidAmount','paidDate','outStanding']

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
              <Card.Content>
                {/* <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption style={AppStyles.textColor}>{rowData.studentID}</Caption>
                </View> */}
                <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  <Subheading style={AppStyles.primaryTitleStyle}>{'Fee Details'}</Subheading>
                </View>

                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.feeDescription}</Subheading>
                    <Text style={AppStyles.textColor}>{'Fee Description'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_1]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.feeType}</Subheading>
                    <Text style={AppStyles.textColor}>{'Fee Type'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.dueDate}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Due date'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.feeAmount} {stateObject.state.currencyCode}</Subheading>
                    <Text style={[AppStyles.textColor, AppStyles.textAlign_center]}>{'Amount'}</Text>
                  </View>
                </View>

               
                <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  <Subheading style={AppStyles.primaryTitleStyle}>{'Payment Details'}</Subheading>
                </View>

                {rowData.paidDate =='' ? <View/> : // N0U-102
              
                <View style={[AppStyles.row_space_between, AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.paidAmount} {stateObject.state.currencyCode}</Subheading>
                    <Text style={AppStyles.textColor}>{'Paid Amount'}</Text>
                  </View>
                 
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.paidDate}</Subheading>
                    <Text style={AppStyles.textColor}>{'Paid Date'}</Text>
                  </View> 
                  
                  </View> }
                  

                <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                  <Batch
                    value={this.getFeeStatus(rowData.status,stateObject)}
                    status={rowData.status == "C" ? 'S': (rowData.status == "P" ? 'W' : 'E')}
                  />
                </View>


                {((stateObject.state.userType == "P" || stateObject.state.userType == "S") && (rowData.status != 'C' && !rowData.status.startsWith('S'))) && <View style={[AppStyles.alignItems, AppStyles.marginTop_3]}>
                  <CustomButtons
                    onPress={() => this.payFee(rowData, index)}
                    title="Pay"
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


})



