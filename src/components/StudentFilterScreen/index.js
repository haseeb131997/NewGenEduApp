
import React, { Component } from 'react';
import { StyleSheet, View,  } from 'react-native';
import { h, w } from '../../utils/Dimensions';
import { UiColor } from '../../theme';
import AppStyles from "../../AppStyles/AppStyles";
import {  Card, Subheading,  } from 'react-native-paper';
import CustomButtons from '../../components/CustomButtons';
import NewOperation from "../../utils/NewOperation";
import SubScreenUtils from "../../utils/SubScreenUtils";




export default class StudentFilterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  onSearch = function (stateObject) {
    if (stateObject.state.serviceName != 'TeacherTimeTable') {
      NewOperation.functions.search(stateObject)
    }
    else {
      NewOperation.functions.viewRecord(stateObject)
    }


  }



  onGenerateReport = function (stateObject) {
    NewOperation.functions.report(stateObject)
  }



  render() {
    const { stateObject, title, templates } = this.props;

    return (stateObject.state.userType == 'P' || stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O') ? (
      <View>
        <View style={styles.container}>
          {((stateObject.state.userType == 'P' || stateObject.state.userType == 'S') && SubScreenUtils.functions.parentScreenType.includes(stateObject.state.serviceName)) ? <View style={AppStyles.marginTop_2} /> :
            <Card.Content>
              <View style={[AppStyles.alignItems, AppStyles.marginBottom_2]}>
                <Subheading style={{ color: "#fff", textAlign: 'center' }}>{title}</Subheading>
              </View>
            </Card.Content>

          }

          {/* {<ScrollView bounces={false} showsVerticalScrollIndicator={false}> */}
          <Card style={[AppStyles.marginHorizontal_1]}>
            {templates}

            {stateObject.state.serviceType.includes('Report') ?

              <View style={[AppStyles.flex_End, AppStyles.marginTop_2, AppStyles.margin_2]}>
                <CustomButtons
                  onPress={() => this.onGenerateReport(stateObject)}
                  title="Generate report"
                  titleStyle={AppStyles.signInTextStyle}
                  containerStyle={AppStyles.btnContainer}
                  buttonStyle={{ backgroundColor: UiColor.SUCCESS_COLOR }}
                />
              </View> : <View>
                {((stateObject.state.userType == 'P' || stateObject.state.userType == 'S') && SubScreenUtils.functions.parentScreenType.includes(stateObject.state.serviceName)) ? <View /> : <View style={[AppStyles.flex_End, AppStyles.marginTop_2, AppStyles.margin_2]}>
                  <CustomButtons
                    onPress={() => this.onSearch(stateObject)}
                    title="Search"
                    titleStyle={AppStyles.signInTextStyle}
                    containerStyle={AppStyles.btnContainer}
                    buttonStyle={{ backgroundColor: UiColor.SUCCESS_COLOR }}
                  />
                </View>}
              </View>
            }




          </Card>
          {<View style={AppStyles.marginTop_2} />}


        </View>
        {/* <AlertBox
          stateObject={stateObject}
        />

        {stateObject.state.isLoading &&
          <Spinner loading={stateObject.state.isLoading} />} */}
      </View>
    ) : null
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: UiColor.SKYBLUE,
    padding: h('.5%'),
    borderRadius: h('1%'),
    // height:'100%'
  },

})



