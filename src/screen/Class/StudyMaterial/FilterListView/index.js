
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import CustomButtons from '../../../../components/CustomButtons';
import SubScreenUtils from "../../../../utils/SubScreenUtils";
import { ListItem } from 'react-native-elements';
import SelectListUtils from '../../../../utils/SelectListUtils'



export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  async viewDetails(rowData, index) {
    const { stateObject } = this.props;
    SubScreenUtils.functions.viewDetails(stateObject,rowData,index,'materialsForLesson','dispMaterialsForLesson')

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


                <View style={[AppStyles.row_space_between, AppStyles.width85, AppStyles.alignSelf, ]}>
       
                  <View style={[AppStyles.width48, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.titleColor}>{rowData.standard}</Subheading>
                    <Caption >{'Year/Standard'}</Caption>
                  </View>
                  <View style={[AppStyles.width48, AppStyles.alignItems]}>
                    <Subheading style={[AppStyles.titleColor, AppStyles.textAlign_center]}>{SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, rowData.subjectID)}</Subheading>
                    <Caption >{'Subject'}</Caption>
                  </View>


                </View>

                <ListItem >
                  <Image resizeMode='contain' style={[AppStyles.labelImgIcon, AppStyles.appImgColor]}
                    source={require('./../../../../asssets/icons/material.png')}
                  />
                  <ListItem.Content>
                    <Text style={AppStyles.textColor}>No. of materials</Text>
                  </ListItem.Content>
                  <View>
                    <Text>{rowData.materialCount}</Text>
                  </View>
                </ListItem>

             
                <View style={[AppStyles.alignItems,AppStyles.marginTop_2]}>
           
                  <CustomButtons
                    onPress={() => this.viewDetails(rowData, index)}
                    title="View Materials"
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



