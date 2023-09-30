
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView ,Image} from 'react-native';
import AppStyles from "../../AppStyles/AppStyles";
import { Caption, Text, } from 'react-native-paper';




export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  


  render() {
    const { activeDotIndex,dotsLength} = this.props;
    return (
      <View style={[AppStyles.dashBoardFooter]}>
      <Image
        resizeMode="contain"
        style={AppStyles.appLogo}
        source={require('./../../asssets/logoBlack.png')}
      />
      <View style={[AppStyles.flexDirectionRow, AppStyles.marginTop_1]}>
        <Caption >About</Caption>
        <Caption style={AppStyles.marginLeft_1} >Support</Caption>
      </View>
      <View style={AppStyles.marginTop_1}>
        <Text >©2021 IBD Technologies</Text>
      </View>
    </View>
  
    )
  }
}


