
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Subheading,Text} from 'react-native-paper';



export default class CarouselPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  


  render() {
    const { activeDotIndex,dotsLength} = this.props;
    return (
        <Pagination
        dotsLength={dotsLength}
        activeDotIndex={activeDotIndex}
        containerStyle={AppStyles.pagginationContainer}
        dotStyle={AppStyles.pagginationDotes}
        inactiveDotStyle={AppStyles.pagginationInactiveDotes}
         dotColor={UiColor.DRAK_GRAY_COLOR}
        inactiveDotColor={UiColor.LIGHT_TEXT_COLOR}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        // tappableDots={true}
        // carouselRef={this._carousel}
      />
  
    )
  }
}


