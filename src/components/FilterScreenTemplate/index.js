
/*
 * * Â© Copyright 2017-2020 IBD Tecnologies Private Limited.
 * *                       3/506 Kannadhsan Street ,ShanmugaNagar,Porur
 * *                       Chennai - 600125.
 * *                       India
 * *
 * * This source is part of the General Framework and is copyrighted by
 * * IBD Technologies Private Limited.
 * *
 * * All rights reserved.  No part of this work may be reproduced, stored in a
 * * retrieval system, adopted or transmitted in any form or by any means,
 * * electronic, mechanical, photographic, graphic, optic recording or otherwise,
 * * translated in any language or computer language, without the prior written
 * * permission of IBD Technologies Private Limited.
 /**/
/**/
/**/


import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Card, Divider, Caption } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from "../../theme";
import { ScrollView } from 'react-native-gesture-handler';
import AlertBox from '../../components/AlertBox';
import AppHeader from "../../components/AppHeader";
import Spinner from '../../components/Loader';
import CustomButtons from '../../components/CustomButtons';
import SpeedDailMenu from '../../components/SpeedDailMenu';
import CreateComponent from '../../components/CreateComponent';
import StudentFilterScreen from '../../components/StudentFilterScreen';
import EditComponent from '../../components/EditComponent';
import ViewComponent from '../../components/ViewComponent';
import FilterScreenHeader from '../../components/FilterScreenHeader';
import FilterSummaryResultTitle from '../../components/FilterSummaryResultTitle';

import NewOperation from "../../utils/NewOperation";
import ScreenUtils from "../../utils/ScreenUtils";
import Toast from 'react-native-toast-message';

import FullViewDocument from '../../components/FullViewDocument';
import GeneralUtils from "../../utils/GeneralUtils";

import HeaderTooltipModal from '../../components/HeaderTooltipModal';
import SubScreenUtils from "../../utils/SubScreenUtils";
import ImpNotes from '../../components/ImpNotes';



const toastConfig = {

  my_custom_type: ({ text2, props, ...rest }) => (

    <View style={[{
      width: '95%', backgroundColor: UiColor.WHITE,
      borderRadius: h('1%')
    }, AppStyles.projection]}>
      <Card.Content style={{ paddingVertical: h('1%') }}>
        <View style={AppStyles.row_space_between}>
          <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
            <Image
              resizeMode="contain"
              style={{ height: h('5%'), width: w('10%') }}
              source={require('./../../asssets/app-icon.png')}
            />

            <Text style={AppStyles.marginLeft_1}>NewGenEducationApp</Text>
          </View>

          <TouchableOpacity onPress={() => Toast.hide()}>
            <Image resizeMode='contain' style={AppStyles.crossIcon}
              source={require('../../asssets/icons/arr061.png')}
            /></TouchableOpacity>
        </View>

      </Card.Content>
      <Divider />
      <Card.Content style={{ padding: h('1%') }}>
        <Caption>{text2}</Caption>
      </Card.Content>
    </View>

  )
};



class FilterScreenTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }



  showMore = function (stateObject) {
    NewOperation.functions.ParentTransactionScreenSummaryQuery(stateObject)
  }
  // welComeTitle:'Academic year configuration',
  //     welcomeInstruction:Instruction


  render() {
    const { stateObject, CreateTemplate, QueryTemplate, EditTemplate, ViewTemplate, ViewDetailsTemplate, AuthTemplate, viewHeading, viewTitle, viewDetailsHeading } = this.props
    // var lengthOfSummaryResult = GeneralUtils.functions.getSummaryResult(stateObject).length
    try{
    var lengthOfSummaryResult = GeneralUtils.functions.getParentTransactionSummaryResult(stateObject).length}
    catch(err)
    {
      try{
      var lengthOfSummaryResult = GeneralUtils.functions.getSummaryResult(stateObject).length
      }
      catch(err)
      {
        lengthOfSummaryResult = 0
      }
      
    }

//console.log('stateObject.state.summaryDataModel.pageDetails.moreRecExists',stateObject.state.summaryDataModel.pageDetails.moreRecExists);
console.log('lengthOfSummaryResult',lengthOfSummaryResult);
console.log('stateObject.state.userType',stateObject.state.userType);
console.log('stateObject.state.serviceName',stateObject.state.serviceName);

    return (
      <View style={AppStyles.subScreenContainer}>
        <AppHeader
          stateObject={stateObject}
        />
        {/* {(stateObject.state.displayContent == 'summaryResultByFilter' && stateObject.state.userType != 'P') && <View>
          <SpeedDailMenu
            stateObject={stateObject}
          />
        </View>} */}

        {((stateObject.state.userType == 'P' || stateObject.state.userType == 'S') && SubScreenUtils.functions.parentScreenType.includes(stateObject.state.serviceName)) ? <View /> : 
          (stateObject.state.displayContent == 'summaryResultByFilter' && !stateObject.state.serviceType.includes('Report') && !stateObject.state.isChildRecordShow) && <View>
            <SpeedDailMenu
              stateObject={stateObject}
            />
          </View>}



        <ScrollView
          bounces={false} showsVerticalScrollIndicator={false}>

          {((stateObject.state.userType == 'P' || stateObject.state.userType == 'S') && SubScreenUtils.functions.parentScreenType.includes(stateObject.state.serviceName)) ?
            <View style={AppStyles.container}>


              {<View style={AppStyles.marginTop_1}>
                <StudentFilterScreen
                  stateObject={stateObject}
                  templates={QueryTemplate}
                  title={viewHeading}
                />
              </View>}
              <View style={stateObject.state.userType == 'P' ? AppStyles.marginTop_2 : {}}>
                <FilterScreenHeader
                  stateObject={stateObject}
                  title={stateObject.state.heading}
                  breadcrumb={stateObject.state.breadcrumb}
                  intialFetching={stateObject.state.intialFetching}
                />

              </View>

              <View>
                <FilterSummaryResultTitle
                  stateObject={stateObject}
                />
                {stateObject.state.displayContent == 'summaryResultByFilter' && ViewTemplate}
              </View>
              {((stateObject.state.userType == 'P' || stateObject.state.userType == 'S')&&(SubScreenUtils.functions.parentTransactionScreens.includes(stateObject.state.serviceName))
             && (stateObject.state.summaryDataModel.pageDetails.moreRecExists && lengthOfSummaryResult < 30)) &&
                <View style={[AppStyles.alignItems, AppStyles.marginTop_3,]}>
                  <CustomButtons
                    onPress={() => this.showMore(stateObject)}
                    title="Show more"
                    titleStyle={AppStyles.signInTextStyle}
                    containerStyle={AppStyles.btnContainer}
                    buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
                  />


                </View>}

              {((stateObject.state.userType == 'P' || stateObject.state.userType == 'S')&&(SubScreenUtils.functions.parentTransactionScreens.includes(stateObject.state.serviceName))
                 && lengthOfSummaryResult >= 30) &&
                <View>
                  <ImpNotes
                    isArray={false}
                    message={`At the maximum you can load upto ${lengthOfSummaryResult} recent records.`}
                  />
                  <Text>{'\n \n \n'}</Text>
                </View>
              }

            </View>
            :
            <View style={AppStyles.container}>
      
              <FilterScreenHeader
                stateObject={stateObject}
                title={stateObject.state.heading}
                breadcrumb={stateObject.state.breadcrumb}
                intialFetching={stateObject.state.intialFetching}
              />
              {<View>

             

                {stateObject.state.displayContent == 'summaryDataModel' && <View style={AppStyles.marginTop_2}>
                  <StudentFilterScreen
                    stateObject={stateObject}
                    templates={QueryTemplate}
                    title={viewHeading}
                  />
                </View>}

                {(stateObject.state.displayContent == 'summaryResultByFilter' && !stateObject.state.serviceType.includes('Report')) ?
                  <View>
                    <FilterSummaryResultTitle
                      stateObject={stateObject}
                    />
                    {ViewTemplate}
                  </View> : stateObject.state.displayContent == 'summaryResultByFilter' && ViewTemplate
                }

             


               








                {(stateObject.state.displayContent == 'summaryResultByFilter' && !stateObject.state.serviceType.includes('Report')) && <View style={[AppStyles.alignItems, AppStyles.marginTop_3,]}>
                  <CustomButtons
                    onPress={() => ScreenUtils.functions.discardSearch(stateObject)}
                    title={'Back'}
                    containerStyle={AppStyles.errorBtnContainer}
                    buttonStyle={{ backgroundColor: UiColor.ERROR_COLOR }}
                  />
                </View>}
              </View>
              }
            </View>}

        </ScrollView>


        
        {(stateObject.state.serviceName == 'StudentStudyMaterial' || stateObject.state.serviceName == 'StudentECircular' || stateObject.state.serviceName == 'StudentPayment' || stateObject.state.serviceName == 'NewStudentAssignment' || stateObject.state.serviceType.includes('Report')) && <FullViewDocument
          stateObject={stateObject}
          source={GeneralUtils.functions.getSource(GeneralUtils.functions.contentPath, stateObject)}
          fileName={GeneralUtils.functions.getFileName(GeneralUtils.functions.contentPath)}
        />}

        {(SubScreenUtils.functions.parentTransactionScreens.includes(stateObject.state.serviceName) || stateObject.state.serviceName == 'StudentProfile') && <View>
          <CreateComponent
            stateObject={stateObject}
            templates={CreateTemplate}
            stepsHeading={stateObject.state.createStepsHeading}
            title={stateObject.state.heading}
          />

          <EditComponent
            stateObject={stateObject}
            templates={EditTemplate}
            title={stateObject.state.heading}
          />
          <ViewComponent
            stateObject={stateObject}
            templates={ViewDetailsTemplate}
            title={viewTitle}
            viewHeading={viewDetailsHeading}
          />
        </View>}

        <HeaderTooltipModal
          stateObject={stateObject}
        />
     {/*
     Rajfix001 starts
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        */
        <Toast config={toastConfig}/>
       //Rajfix001 ends
      } 
        <AlertBox
          stateObject={stateObject}
        />
        {stateObject.state.isLoading &&
          <Spinner loading={stateObject.state.isLoading} />}

      </View>
    );
  }
}


const styles = StyleSheet.create({

})

export default FilterScreenTemplate



