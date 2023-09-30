
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import CarouselPagination from '../../components/CarouselPagination';
import Carousel, { Pagination } from 'react-native-snap-carousel';




export default class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  get pagination() {
    const { stateObject,data,activeSlideIndex } = this.props
    return (
      <CarouselPagination
      dotsLength={data.length}
      activeDotIndex={activeSlideIndex}
      />
    );
  }

  // stateObject={stateObject}
  // data={dataModel.parentRoleMapping}
  // renderItem={this._studentDetailItem}
  // activeSlideIndexStateName= {'activeSlideIndex'}

  render() {
    const {stateObject, renderItem,data,activeSlideIndexStateName } = this.props;
    return (
      <View>
       {this.pagination}
       <Carousel
        ref={(c) => { this._carousel = c; }}
        data={data}
        //autoplay
        //loop
        renderItem={renderItem}
        sliderWidth={AppStyles.carouselWidth.width}
        itemWidth={AppStyles.carouselWidth.width}
        onSnapToItem={(index) => stateObject.parentStateChange({ [activeSlideIndexStateName]: index })}
      />
      </View>
    )
  }
}


