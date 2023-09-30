
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";

import CustomButtons from '../../../../components/CustomButtons';
import NewOperation from "../../../../utils/NewOperation";
import { cloneDeep } from 'lodash';
import ViewDetailsModal from '../ViewDetailsModal';
import NotesDetail from '../NotesDetail';
import SubScreenUtils from "../../../../utils/SubScreenUtils";




export default class ChildRecordListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentPath: '',
      showWebView: false
    }

  }


  getNoon(noon) {
    switch (noon) {
      case 'F':
        return 'Forenoon'
        break
      case 'A':
        return 'Afternoon'
        break
    }
  }

  getType(type) {
    if (type == 'S' || type == 'P' || type == 'C') {
      return SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LeaveMaster, type)
    }
    else {
      return type
    }
  }


  async showMore() {
    const { stateObject } = this.props;
    var parentPageDetial = cloneDeep(stateObject.state.summaryDataModel.pageDetails)

    stateObject.state.summaryDataModel.pageDetails = stateObject.state.secondLevelPageDetails
    stateObject.state.currentOperation = "SecondLevel";
    await NewOperation.functions.screenEventHandler(stateObject);

    stateObject.state.summaryDataModel.pageDetails = parentPageDetial
    stateObject.setState({
      summaryDataModel: stateObject.state.summaryDataModel
    })
  }


 async viewDetails(itemData, index1) {
  const { stateObject } = this.props;

 

    if (itemData.contentPath != '' && !itemData.contentPath.includes("objectstorage") && !itemData.contentPath.includes("CohesiveUpload")) {
    var filenameArray = []
    filenameArray = [{
      filename: itemData.contentPath
    }]
    
    stateObject.parentStateChange({
      isLoading: true,
    })
    await SubScreenUtils.functions.getOracleUrl_Util(filenameArray, stateObject);

    const result_oracleURI = new Map();

    for (let j = 0; j < SubScreenUtils.functions.oracleURL.length; j++) {
      result_oracleURI.set(SubScreenUtils.functions.oracleURL[j].fileName, SubScreenUtils.functions.HOST + SubScreenUtils.functions.oracleURL[j].URI);
    }
      if (!itemData.contentPath.includes("CohesiveUpload")) {
        var filename = itemData.contentPath.substr(itemData.contentPath.lastIndexOf('/') + 1, itemData.contentPath.length);
        console.log(result_oracleURI.get(filename),'result_oracleURI')
        itemData.contentPath = result_oracleURI.get(filename) != undefined ? result_oracleURI.get(filename) : '';
      } 

    }

 


  
    stateObject.parentStateChange({
      detailsModalVisible: true,
      notesDetails:itemData,
      isLoading: false,
    })
  }




  render() {
    const { stateObject } = this.props;
    const { childViewDetails } = stateObject.state

    return (
      <View>
        {childViewDetails != null && childViewDetails.notesDetails.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>
              <View style={AppStyles.row_space_between}>
                <Ribbon
                  stateObject={stateObject}
                  label={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AuthStatusMaster, rowData.authStat)}
                  status={rowData.authStat}
                />
                <View />
                <View style={AppStyles.menuContainer}>
                  <SideMenu
                    summaryResultIndex={stateObject.state.summaryResultIndex}
                    viewDetail={rowData}
                    stateObject={stateObject}
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete'] : ['View', 'Edit', 'Delete', 'Approve/Reject']}
                  />
                </View>
              </View>
              <Card.Content>

                <View style={[AppStyles.alignItems]}>
                <Caption style={[AppStyles.width85, AppStyles.textAlign_center,AppStyles.textColor]}>{'Dated'}</Caption>
                  <Title style={[AppStyles.titleColor]}>{rowData.date}</Title>
                </View>

                <View style={[AppStyles.alignItems]}>
                <Caption style={[AppStyles.width85, AppStyles.textAlign_center,AppStyles.textColor]}>{'Created by'}</Caption>
                  <Subheading >{rowData.teacherName}</Subheading>
                 
                </View>
                



                <View style={AppStyles.flex_one}>
                  {rowData.detailedNotes.map((itemData, index1) => (
                    <View key={index1.toString()} style={[AppStyles.eventContainer, { borderLeftColor: GeneralUtils.functions._getRandomColor(index1) }]}>

                      <View style={[AppStyles.row_space_between,]}>
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Unit/Lesson:'}</Text>
                        </View>
                        {<View>
                          <Text >{itemData.lesson}</Text>
                        </View>}
                      </View>

                      <View style={[AppStyles.row_space_between,]}>
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Heading:'}</Text>
                        </View>
                        {<View>
                          <Text >{itemData.heading != '' ? itemData.heading : 'No heading'}</Text>
                        </View>}
                      </View>
                      <View style={[AppStyles.row_space_between,]}>
                        <View style={AppStyles.width48}>
                          <Text style={AppStyles.textColor}>{'Sub Heading:'}</Text>
                        </View>
                        {<View>
                          <Text >{itemData.subHeading != '' ? itemData.subHeading : 'No sub heading'}</Text>
                        </View>}
                      </View>

                      <View style={[AppStyles.alignItems, AppStyles.marginTop_2]}>
                        <CustomButtons
                          onPress={() => this.viewDetails(itemData, index1)}
                          title="View Details"
                          // titleStyle={AppStyles.signInTextStyle}
                          buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                        />
                      </View>



                    </View>))
                  }
                </View>








              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

        <ViewDetailsModal
            templates={<NotesDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={'Notes Details'}
          detailsModalVisible={stateObject.state.detailsModalVisible}
        // subTitle={'Notes'}
        // onSubmit={() => this.onSubmit()}
        />


        {stateObject.state.secondLevelPageDetails.moreRecExists &&
          <View style={[AppStyles.alignItems, AppStyles.marginTop_3,]}>
            <CustomButtons
              onPress={() => this.showMore(stateObject)}
              title="Show more"
              titleStyle={AppStyles.signInTextStyle}
              containerStyle={AppStyles.btnContainer}
              buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
            />
          </View>}

      </View>
    )
  }
}

const styles = StyleSheet.create({

})



