
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView,Image } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Caption, Subheading,Text, Title} from 'react-native-paper';
import CustomButtons from '../../components/CustomButtons';
import cloneDeep from 'lodash/cloneDeep';
import SubScreenUtils from "../../utils/SubScreenUtils";
import ScreenContents from "../../utils/ScreenContents";



export default class CreateCompleted extends Component {
  constructor(props) {
    super(props);
    this.state = {


    }
  }


  createNew(){
    const { stateObject} = this.props;
    SubScreenUtils.functions.createNew(stateObject)
  }

  viewDetails(){
    const { stateObject, dataModel } = this.props;
    stateObject.setState({
      // viewDetail:dataModel,
      currentOperation: 'View',
      selectedTabIndex: 0,
      currentStep:1
    },()=>{
    })
  }

  getTitle
  


  render() {
    const { stateObject,title} = this.props;
    return (
      <View style={[AppStyles.alignInCenter,AppStyles.margin_2]}>
      <Title>Completed!</Title>
      <Caption>{ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName) != null  ? ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName).createCompletedMessage : `New ${title} created successfully`}</Caption>

     <View style={AppStyles.marginTop_2}>
       {stateObject.state.serviceName != 'NewStudentAssignment' &&  <CustomButtons
          onPress={() => this.createNew()}
          title={ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName) != null  ? ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName).createAgainMessage : `Create New ${title}`}
          titleStyle={AppStyles.graybtnTextStyle}
          buttonStyle={{ backgroundColor: UiColor.APP_BACKGROUND }}
        />
       }
       <View style={AppStyles.marginTop_2}>
       <CustomButtons
          onPress={() => this.viewDetails()}
          title={ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName) != null  ? ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName).createViewMessage : `View ${title}`}
          titleStyle={AppStyles.signInTextStyle}
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


