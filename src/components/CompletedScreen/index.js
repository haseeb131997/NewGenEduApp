
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Caption, Subheading, Text, Title } from 'react-native-paper';
import CustomButtons from '../../components/CustomButtons';
import cloneDeep from 'lodash/cloneDeep';
import SubScreenUtils from "../../utils/SubScreenUtils";




export default class CompletedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {


    }
  }




  render() {
    const { stateObject, title,Subheading } = this.props;
    return (
      <View style={[AppStyles.alignInCenter,AppStyles.margin_2]}>
        <Title>Completed!</Title>
        <Caption style={AppStyles.textAlign_center}>{title} {Subheading} successfully</Caption>
        {stateObject.state.serviceName == 'HolidayMaintenance'  && <Caption style={AppStyles.textAlign_center}>{`If you want to send parent notifications about this change in institute calendar you can send in the menu "Home > Notifications > Instant Notification`}</Caption>}



        <View style={AppStyles.marginTop_2}>
     <CustomButtons
          onPress={() => SubScreenUtils.functions.closeModal(stateObject)}
          title={`Ok, got it!`}
          // titleStyle={AppStyles.graybtnTextStyle}
          buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
        />
     </View>

     {stateObject.state.serviceName == 'InstitutePayment' && <View style={AppStyles.marginTop_2}>
     <CustomButtons
          onPress={() => stateObject.callReport()}
          title={`View Receipt`}
          // titleStyle={AppStyles.graybtnTextStyle}
          buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
        />
     </View>}

        <View>
          <Image
            resizeMode="contain"
            style={AppStyles.wellComeimageStyle}
            source={require('../../asssets/image/17.png')}
          />
        </View>

      </View>

    )
  }
}


