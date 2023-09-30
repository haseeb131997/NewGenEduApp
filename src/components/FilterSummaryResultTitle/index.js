
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Animated } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import { Title, Caption, Subheading, Text, Searchbar } from 'react-native-paper';
import SubScreenUtils from "../../utils/SubScreenUtils";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

export default class FilterSummaryResultTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery:''
    }
  }


  render() {
    const { stateObject, } = this.props;
    
    var items = 'Records'
    var recordLength = 0
    if(SubScreenUtils.functions.parentTransactionScreens.includes(stateObject.state.serviceName) && (stateObject.state.userType == 'P' || stateObject.state.userType == 'S')){
      try{
        if(typeof stateObject.state.summaryDataModel != 'undefined' && typeof stateObject.state.summaryDataModel.SummaryResult !='undefined') 
              {recordLength =  stateObject.state.summaryDataModel.SummaryResult.length 
              items = ((stateObject.state.summaryDataModel.SummaryResult.length == 1) ? 'Record' : 'Records')
            }
        else{
          try{
          recordLength = stateObject.state.displayContent == 'summaryResultByFilter' ? ((stateObject.state.summaryResultByFilter.length != 0) ? stateObject.state.summaryResultByFilter.SummaryResult.length : 0) : stateObject.state.summaryDataModel.SummaryResult.length
          items = stateObject.state.displayContent == 'summaryResultByFilter' ? ((stateObject.state.summaryResultByFilter.length != 0 && stateObject.state.summaryResultByFilter.SummaryResult.length == 1) ? 'Record' : 'Records') : ((stateObject.state.summaryDataModel.SummaryResult.length == 1) ? 'Record' : 'Records')
          }
          catch(err)
          {
            recordLength=0 
          }
        }

      }
      catch(error)
      {
        recordLength=0
        
      }

      
    }
    // else if(stateObject.state.serviceName == 'TeacherTimeTable'){
    //   recordLength =  stateObject.state.dataModel.timeTableResult.length
    //   items = ((stateObject.state.dataModel.timeTableResult.length == 1) ? 'Item' : 'Items')
    // }
    else{
      try{
      recordLength = stateObject.state.displayContent == 'summaryResultByFilter' ? ((stateObject.state.summaryResultByFilter.length != 0) ? stateObject.state.summaryResultByFilter.SummaryResult.length : 0) : stateObject.state.summaryDataModel.SummaryResult.length
      items = stateObject.state.displayContent == 'summaryResultByFilter' ? ((stateObject.state.summaryResultByFilter.length != 0 && stateObject.state.summaryResultByFilter.SummaryResult.length == 1) ? 'Record' : 'Records') : ((stateObject.state.summaryDataModel.SummaryResult.length == 1) ? 'Record' : 'Records')
      }
      catch(err)
      {
        recordLength=0 
      }
    }
     


    return (stateObject.state.serviceName == 'TeacherTimeTable' || stateObject.state.serviceName == 'StudentProfile') ? null : (
      <View>
        <View style={[AppStyles.row_space_between, AppStyles.marginTop_1, AppStyles.alignItems]}>
          {stateObject.state.displayContent == 'summaryResultByFilter' ?
            <View style={styles.width_75}>
              <Subheading style={AppStyles.filterTextHeading}>{recordLength} {items} Found {(stateObject.state.userType == 'P' && SubScreenUtils.functions.parentScreenType.includes(stateObject.state.serviceName)) ? '' : <Caption style={{ color: UiColor.LIGHT_TEXT_COLOR }}>by Search</Caption>}</Subheading>
            </View>
            :
            <View style={styles.width_75}>
              <Subheading style={AppStyles.filterTextHeading}>{recordLength} {items} Found {(stateObject.state.userType == 'P' && SubScreenUtils.functions.parentScreenType.includes(stateObject.state.serviceName)) ? '' :<Caption style={{ color: UiColor.LIGHT_TEXT_COLOR }}>by Recent Update</Caption>}</Subheading>
            </View>
          }
         
         {(stateObject.state.userType == 'P' || stateObject.state.userType == 'S') &&
         <View style={styles.width_25}>
            <View style={[AppStyles.flexDirectionRow, AppStyles.space_around]}>
            
             
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

          </View>   }
         



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