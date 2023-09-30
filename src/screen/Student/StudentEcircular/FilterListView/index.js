
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity ,Image} from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import CustomButtons from '../../../../components/CustomButtons';
import SubScreenUtils from "../../../../utils/SubScreenUtils";
import { ListItem } from 'react-native-elements';




export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async viewDetails(rowData, index) {
    const { stateObject } = this.props;
    SubScreenUtils.functions.viewDetails(stateObject,rowData,index,'circularDetails','dispCircular')


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
             
              <Card.Content>

              <View style={[AppStyles.alignItems,]}>
                  <Caption >{'eCircular applicable to'}</Caption>
                    <Subheading style={[AppStyles.titleColor,AppStyles.textAlign_center]}>{rowData.groupDesc}</Subheading>
                  
                  </View>


                <View style={[AppStyles.row_space_between,AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{GeneralUtils.functions.getMonthFullName(rowData.month)}</Subheading>
                    <Text style={AppStyles.textColor}>{'Month'}</Text>
                  </View>

                  <View style={[AppStyles.dashContainer, AppStyles.dashContaierWidth, AppStyles.alignItems]}>
                    <Subheading >{rowData.year}</Subheading>
                    <Text style={AppStyles.textColor}>{'Year'}</Text>
                  </View>
                </View>


                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor]}
                    source={require('./../../../../asssets/icons/community.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of circulars issused</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.circularCount}</Text>
                  </View>
                </ListItem>
         
             
                <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View eCirculars"
                    // titleStyle={AppStyles.signInTextStyle}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />
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



