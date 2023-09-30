
import React, { Component } from 'react';
import { StyleSheet, View,Animated } from 'react-native';
import { h} from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import { Caption, Subheading,} from 'react-native-paper';
import ScreenUtils from "../../utils/ScreenUtils";
import SubScreenUtils from "../../utils/SubScreenUtils";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);


export default class SummaryResultTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }






  render() {
    const { stateObject, } = this.props;
    // var totalRecords = stateObject.state.summaryDataModel.pageDetails.totalRecords
    var items = 'Records'
    var recordLength = stateObject.state.displayContent == 'summaryResultByFilter' ? ((stateObject.state.summaryResultByFilter.length != 0) ? stateObject.state.summaryResultByFilter.SummaryResult.length : 0) : stateObject.state.summaryDataModel.SummaryResult.length


    items = stateObject.state.displayContent == 'summaryResultByFilter' ? ((stateObject.state.summaryResultByFilter.length != 0 && stateObject.state.summaryResultByFilter.SummaryResult.length == 1) ? 'Record' : 'Records') : ((stateObject.state.summaryDataModel.SummaryResult.length == 1) ? 'Record' : 'Records')

    return (
      <View>
        {/* <Text onPress={()=>this.loop()}>Testing</Text>
      <Text onPress={()=>this.stoploop()}>stoploop</Text> */}
        <View style={[AppStyles.row_space_between, AppStyles.marginTop_1, AppStyles.alignItems]}>


          {stateObject.state.displayContent == 'summaryResultByFilter' ?
            <View style={styles.width_75}>
              <Subheading style={AppStyles.filterTextHeading}>{recordLength} {items} Found  <Caption style={{ color: UiColor.LIGHT_TEXT_COLOR }}>by Search</Caption></Subheading>
            </View>
            :
            <View style={styles.width_75}>
              <Subheading style={AppStyles.filterTextHeading}>{recordLength} {items} Found  <Caption style={{ color: UiColor.LIGHT_TEXT_COLOR }}>by Recent Update</Caption></Subheading>
            </View>

          }

          <View style={styles.width_25}>
            <View style={[AppStyles.flexDirectionRow, AppStyles.space_around]}>
              {/* <TouchableOpacity onPress={() => SubScreenUtils.functions.search(stateObject)}>
              <Image resizeMode='contain' style={AppStyles.inactiveMoreIcon}
                source={require('./../../asssets/icons/gen0042.png')}
              /></TouchableOpacity> */}
              {/* <AntDesign onPress={() => SubScreenUtils.functions.search(stateObject)}
                name="search1" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> */}
                 <MaterialCommunityIcons onPress={() => SubScreenUtils.functions.search(stateObject)}
                name="magnify" size={styles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />

              {/* <TouchableOpacity onPress={() => ScreenUtils.functions.discardSearch(stateObject)}>
              <Image resizeMode='contain' style={AppStyles.inactiveMoreIcon}
                source={require('./../../asssets/icons/arr061.png')}
              /></TouchableOpacity> */}

             {stateObject.state.displayContent == 'summaryResultByFilter'  &&  <MaterialCommunityIcons onPress={() => ScreenUtils.functions.discardSearch(stateObject)}
                name="magnify-minus-outline" size={styles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />}
              {stateObject.state.showAnimationRefreshBtn ? <MaterialCommunityIcons onPress={() => SubScreenUtils.functions.refreshFilter(stateObject)}
                name="refresh" size={styles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> :
                <AnimatedIcon onPress={() => SubScreenUtils.functions.refreshFilter(stateObject)}
                  name="refresh" size={styles.iconSize.height} color={UiColor.SKYBLUE}
                  iconStyle={[{
                    opacity: stateObject.state.animatedStartValue,
                    transform: [
                      {
                        scale: stateObject.state.animatedStartValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0.95],
                        }),
                      }]
                  }]}
                />}

              {/* 
            <TouchableOpacity onPress={() => SubScreenUtils.functions.refreshFilter(stateObject)}>

            {stateObject.state.showAnimationRefreshBtn ?  <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon]}
                source={require('./../../asssets/icons/arr029.png')}
              /> : <Animated.Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon,{
                opacity: stateObject.state.animatedStartValue,
                tintColor:UiColor.SKYBLUE,
                transform: [
                {
                  scale: stateObject.state.animatedStartValue.interpolate({ 
                    inputRange: [0, 1],
                    outputRange: [1, 0.95],
                  }),
                }]}]}
                        source={require('./../../asssets/icons/arr029.png')}
                      />}

       
        
              </TouchableOpacity> */}


            </View>

          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  width_75: {
    width: '75%'
  },
  width_25: {
    width: '25%'
  },
  iconSize:{
    height:h('4%')
  }
})