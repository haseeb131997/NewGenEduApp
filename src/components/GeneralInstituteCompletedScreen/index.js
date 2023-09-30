
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




export default class GeneralInstituteCompletedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {


    }
  }




  render() {
    const { stateObject, title,Subheading } = this.props;
    return (
      <View style={AppStyles.alignInCenter}>
        <Title>Completed!</Title>
        <Caption>{title} {Subheading} successfully</Caption>


        <View style={AppStyles.marginTop_2}>
     <CustomButtons
          onPress={() => SubScreenUtils.functions.instituteCloseModal(stateObject)}
          title={`Ok, got it!`}
          // titleStyle={AppStyles.graybtnTextStyle}
          buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
        />
     </View>

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


